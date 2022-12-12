import React, { Component } from 'react'
import './BagContent.scss'
import BagProduct from "../bag-product/BagProduct"
import { Link } from 'react-router-dom'
import CartStoreConnector from '../../redux/connectors/CartStoreConnector'

export class BagContent extends Component {
    constructor(props){
        super(props)
    }

    /**
     * compute the total price of all items within the bag 
     * @returns {Number} 
     */
    getTotalPrice = () => {
        let totalPrice = 0
        Object.keys(this.props.cartProducts).forEach((key,i)=> {
            this.props.cartProducts[key].product.prices.forEach((price)=>{
                if(this.props.currency == price?.currency?.symbol){
                    totalPrice += this.props.cartProducts[key].count * price.amount
                }
            })
        }) 
        return totalPrice;
    }

    /**
     * hide the overlay div and miniview Bag when the button is clicked
     */
    handleViewBag = () => {
        document.getElementById("overlay").classList.toggle("hidden");
        document.getElementById("drop-down").classList.toggle("hidden");
    }

    /**
     * compute the tax amount added within the total price
     * @returns {Number}
     */
    getTaxPrice = () => {
        return (this.getTotalPrice() * 0.21).toFixed(2);
    }

    render() {
        return (
            this.props.cartProducts != undefined && Object.keys(this.props.cartProducts).length?
            <div className='bag-content'>
                <h3>CART</h3>
                {!this.props.miniView ? <hr/> :null}
                {
                    Object.keys(this.props.cartProducts).map((key,i) => {
                        return(
                            <div key={i}>
                                <BagProduct product={this.props.cartProducts[key]} miniView={this.props.miniView}/>
                                {
                                    this.props.miniView !== true ?
                                    <hr/> : null
                                }
                            </div>
                        )
                    })
                }
                {
                    this.props.miniView ?
                    <div style={{display:"flex", width:"100%", justifyContent: "space-around"}}>
                        <Link to="/bag">
                            <button className='btn secondary' onClick={this.handleViewBag}>VIEW BAG</button>
                        </Link>
                        <button className='btn primary'>CHECK OUT</button>
                    </div>
                    :
                    <div className="order">
                        <p><span>Tax 21%:</span><span style={{fontWeight: "bold"}}> {this.props.currency}{this.getTaxPrice()}</span></p>
                        <p><span>Quantity:</span><span style={{fontWeight: "bold"}}> {this.props.totalCartProducts}</span></p>
                        <p><span>Total:</span><span style={{fontWeight: "bold"}}> {this.props.currency}{this.getTotalPrice().toFixed(2)}</span></p>
                        <button className='btn primary'>ORDER</button>
                    </div>
                }
            </div> :
            <div className='empty-cart-msg' style={this.props.miniView ? {marginTop:"30px", padding:"20px 20px"}: null}>
                You don't have any items within your cart yet. please add some items to the cart bag :)
                {
                    !this.props.miniView &&
                    <Link to="/">
                        <button className='btn primary'>Back to shopping</button>
                    </Link>
                }
            </div>
        )
    }
}

export default CartStoreConnector(BagContent);