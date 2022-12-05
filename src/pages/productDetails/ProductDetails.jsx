import React, { Component } from 'react'
import './productdetails.scss'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ColorAttribute from '../../components/colorattributes/ColorAttribute';
import CustomAttribute from '../../components/customattribute/CustomAttribute';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';


// passing store currency global value into component props 
const mapStateToProps = (state) => {
    return {
        currency: state.currencyStore.currency,
        cart: state.cartStore
    }
};
const mapDispatchToProps = { addToCart };

export class ProductDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            product: {},
            selectedImg:"",
            priceDetails: {
                amount: 0,
                currency: {
                    symbol: '$'
                }
            },
            attributesSelection :{
                
            }
        }
    }
    
    static getDerivedStateFromProps(props, state) {
        let defaultPriceDetails = {
            amount: 0,
            currency: {
                symbol: '$'
            }
        };
        if(state.product?.prices !== undefined){
            state.product?.prices.forEach((priceDetails) => {
                if(priceDetails?.currency?.symbol === props.currency){
                    defaultPriceDetails = priceDetails
                }
            })
        }

        return {
            priceDetails: defaultPriceDetails
        }
    }

    // function to show the image clicked by setting state selected img by the source of clicked img
    handleClick = (e,i) => {
        this.setState({selectedImg: e.target.src})
    }
    handleAddToCart = (e)=> {
        this.props.addToCart({
            product: this.state.product,
            attributesSelection: this.state.attributesSelection
        });
    }

    getValue = (value,id)=> {
        let test = {};
        test[id] = value;
        const newState = {
            ...this.state,
        };
        newState.attributesSelection[id] = value;
        this.setState(newState)
    }

    componentDidMount(){
        const client = new ApolloClient({
            uri: "http://localhost:4000/",
            cache: new InMemoryCache(),
        });
        client
            .query({
                query: gql`
                    query {
                        product(id:"${window.location.href.split('/')[3]}"){
                            id
                            name
                            brand
                            gallery
                            description
                            category
                            prices{
                                currency{
                                    label
                                    symbol
                                }
                                amount
                            }
                            attributes{
                                id
                                name
                                type
                                items {
                                displayValue
                                value
                                id
                                }
                            }
                            
                        }
                    }
                `,
            }).then((data) => this.setState({
                product :data?.data?.product,
                selectedImg: data?.data?.product?.gallery[0]
            }))
    }

    render() {
        return (
        <div className='Product-details'>
            <div className='product-images-wrapper'>
                {
                    this.state.product?.gallery?.map((img,i)=> {
                        return(
                            <img src={img} alt="image" onClick={(e,i)=>this.handleClick(e,i)}/>
                        )
                    })
                }
            </div>
            <div className='product-selected-img'>
                <img src={this.state.selectedImg} alt="selected image" />
            </div>
            <div className="product-description">
                <div className="title">
                    <h3>{this.state.product.brand}</h3>
                    <p style={{fontSize:"20px"}}>{this.state.product.name}</p>
                </div>
                <div>
                    {this.state?.product?.attributes?.map((attribute,i)=> {
                        if (attribute.id == "Color"){
                            return <ColorAttribute key={i} colors={attribute.items} id={attribute.id} attributeValue={this.getValue}/>
                        }
                        else{
                            return <CustomAttribute key={i} attribute={attribute} id={attribute.id} attributeValue={this.getValue}/>
                        }
                    })}
                </div>
                <div style={{marginBottom:"10px"}}>
                    <h4>PRICE:</h4>
                    <span className='product-price'>{this.state.priceDetails.currency.symbol}</span>
                    <span>{this.state.priceDetails.amount}</span>
                </div>
                <button onClick={e =>this.handleAddToCart(e)}>ADD TO CART</button>
                <div dangerouslySetInnerHTML={{ __html: this.state.product.description }}></div>
            </div>
        </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
