import React, { Component } from 'react'
import Productcard from '../productcard/Productcard'
import './productslist.scss'

export default class Productslist extends Component {
    constructor(props){
        super(props)
    }
    render() {
    return (
        <div>
            <h2>{this.props.productscategory?.name}</h2>
            <div className='container'>
                <div className="products-wrapper">
                    {this.props.productscategory?.products?.map((product,i)=> {
                        return(
                            <div key={i}> 
                                <Productcard product = {product}/>
                            </div> 
                        )
                    })} 
                </div>
            </div>
        </div>
    )
    }
}
