import React, { Component } from 'react'
import './ProductDetails.scss'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ColorAttribute from '../../components/color-attributes/ColorAttribute';
import CustomAttribute from '../../components/custom-attribute/CustomAttribute';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/CartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// passing store currency global value into component props 
const mapStateToProps = (state) => {
    return {
        currency: state.currencyStore.currency,
    }
};

const mapDispatchToProps = { addToCart };

export class ProductDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            product: {},
            selectedImg: "",
            priceDetails: {
                amount: 0,
                currency: {
                    symbol: '$'
                }
            },
            attributesSelection :{}
        }
    }

    /**
     * this function updates the component state whenever one or more props value was updated
     * @param {{}} props 
     * @param {{}} state 
     * @returns {{}} new state
     */
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

    /**
     * store the selected image into the component state
     * @param {{}} e 
     */
    handleImageSelection = (e) => {
        this.setState({selectedImg: e.target.src})
    }

    /**
     * add the product to the cart store with the current given attributes selections
     * @param {{}} e add to cart button click event
     */
    handleAddToCart = (e) => {
        if(this.state.product.attributes.length == Object.keys(this.state.attributesSelection).length){
            this.props.addToCart({
                product: this.state.product,
                attributesSelection: this.state.attributesSelection
            });
            toast.success("Product added to bag")
        }else {
            toast.error("Please select all missing attributes")
        }
    }

    /**
     * this value is passed to the attributes components as a hook so that it can get the selected value for each attribute
     * and store it into the component state.
     * @param {int} index 
     * @param {string} id 
     */
    getAttributeValue = (index, id)=> {
        console.log('here', index, id);
        this.setState({
            ...this.state,
            attributesSelection: {
                ...this.state.attributesSelection,
                [id]: index,
            }
        });
        console.log(this.state);
    }

    componentDidMount(){
        const client = new ApolloClient({
            uri: "http://localhost:4000/",
            cache: new InMemoryCache(),
        });
        client.query({
            query: gql`
                query {
                    product(id:"${window.location.href.split('/')[4]}"){
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
                {console.log(this.props)}
                <div className='product-images-wrapper'>
                    {
                        this.state.product?.gallery?.map((img,i)=> {
                            return(
                                <img key={i} src={img} alt="image" onClick={(e)=>this.handleImageSelection(e)}/>
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
                                return <ColorAttribute key={i} colors={attribute.items} id={attribute.id} passSelectionToParent={this.getAttributeValue} miniView={false} isEditable={true}/>
                            }
                            else{
                                return <CustomAttribute key={i} attribute={attribute} id={attribute.id} passSelectionToParent={this.getAttributeValue} miniView={false} isEditable={true}/>
                            }
                        })}
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <h4>PRICE:</h4>
                        <span className='product-price'>{this.state.priceDetails.currency.symbol}</span>
                        <span>{this.state.priceDetails.amount}</span>
                    </div>
                    <button onClick={e=>{this.handleAddToCart(e)}} >
                        ADD TO CART
                    </button>
                    <div dangerouslySetInnerHTML={{ __html: this.state.product.description }}></div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
