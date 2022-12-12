import React, { Component } from 'react'
import ProductCard from '../product-card/ProductCard'
import './ProductsList.scss'

export default class ProductsList extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <h2>{this.props.productsCategory?.name}</h2>
                <div className='container'>
                    <div className="products-wrapper">
                        {this.props.productsCategory?.products?.map((product,i)=> {
                            return(
                                <div key={i}> 
                                    <ProductCard product = {product}/>
                                </div> 
                            )
                        })} 
                    </div>
                </div>
            </div>
        )
    }
}
