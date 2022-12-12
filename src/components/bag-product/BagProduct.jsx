import React, { Component } from 'react';
import './BagProduct.scss';
import ColorAttribute from '../color-attributes/ColorAttribute';
import CustomAttribute from '../custom-attribute/CustomAttribute';
import { addToCart } from '../../redux/CartSlice';
import { removeFomCart } from '../../redux/CartSlice';
import { connect } from 'react-redux';
import Prev from '../../prev.png'
import Next from '../../next.png'

const mapDispatchToProps = { addToCart, removeFomCart};

const mapStateToProps = (state) => {
    return {
        currency: state.currencyStore.currency,
    }
};

export class BagProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            productImgIndex: 0,
            priceDetails: {
                amount: 0,
                currency: {
                    symbol: '$'
                }
            },
        }
    }

    static getDerivedStateFromProps(props, state) {
        let defaultPriceDetails = {
            amount: 0,
            currency: {
                symbol: '$'
            }
        };
        if(props.product?.product.prices !== null){
            props.product?.product.prices.forEach((priceDetails) => {
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
     * increment the number of the product within cart bag
     */
    handleIncreaseProductCount = ()=> {
        this.props.addToCart({
            product: this.props.product.product,
            attributesSelection: this.props.product.attributesSelection
        })
    }

    /**
     * decrement the number of the product within cart bag
     */
    handleDecreaseProductCount = ()=> {
        this.props.removeFomCart({
            product: this.props.product.product,
            attributesSelection: this.props.product.attributesSelection,
        })
    }

    /**
     * navigate to the next product image
     */
    handlePreviousImg = ()=> {
        if (this.state.productImgIndex > 0){
            this.setState({productImgIndex: this.state.productImgIndex -1})
        }else if (this.state.productImgIndex == 0) {
            this.setState({productImgIndex: this.props.product.product.gallery.length -1})
        }
    }

    /**
     * navigate to the previous product image
     */
    handleNextImg = ()=> {
        if (this.state.productImgIndex == this.props.product.product.gallery.length -1){
            this.setState({productImgIndex: 0})
        }else if (this.state.productImgIndex >= 0) {
            this.setState({productImgIndex: this.state.productImgIndex +1})
        }
    }

    render() {
        return (
        <div className='bag-product'>
            <div style={{display: "flex",justifyContent: "space-between"}}>
                <div className='product-info' style={this.props.miniView !== true ? {width:"80%"} : {width:"65%"}}>
                    {
                        this.props.miniView === true ?
                        <p>{this.props.product.product.brand}</p> :
                        <h3>{this.props.product.product.brand}</h3>
                    }
                    <p style={this.props.miniView === true ? {fontSize: "16px"} : {fontSize: "20px"}}>{this.props.product.product.name}</p>
                    <p>{this.state.priceDetails.currency.symbol}{this.state.priceDetails.amount}</p>
                    <div>
                        {this.props.product?.product?.attributes?.map((attribute,i)=> {
                            if (attribute.id !== "Color"){
                                return <CustomAttribute key={i} attribute={attribute} id={attribute.id} miniView={this.props.miniView} selectedIndex={this.props.product.attributesSelection[attribute.id]} isEditable={false}/>
                            }
                            else{
                                return <ColorAttribute key={i} colors={attribute.items} id={attribute.id} miniView={this.props.miniView} selectedIndex={this.props.product.attributesSelection.Color} isEditable={false}/>
                            }
                        })}
                    </div>
                </div>
                <div className="quantity" style={this.props.miniView === true ? {height:"200px",width:"40%"} : {width:"20%"}}>
                    <div className="count">
                        <button onClick={this.handleIncreaseProductCount}>+</button>
                        <p>{this.props.product.count}</p>
                        <button onClick={this.handleDecreaseProductCount}>-</button>
                    </div>
                    <div className="img" style={this.props.miniView === true ? {height:"190px",width:"77%"} : {height:"280px"}}>
                        <img src={this.props.product.product.gallery[this.state.productImgIndex]} style={{height:"100%",width:"100%"}} alt="product" />
                        {
                            this.props.miniView !== true ? 
                            <div className="arrows">
                                <div className="prev" onClick={this.handlePreviousImg}>
                                    <img src={Prev} alt="left-arrow" />
                                </div>
                                <div className="next" onClick={this.handleNextImg}>
                                    <img src={Next} alt="right-arrow" />
                                </div>
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BagProduct);

