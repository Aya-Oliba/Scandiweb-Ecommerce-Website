import React, { Component } from 'react'
import './bagproduct.scss'
import ColorAttribute from '../colorattributes/ColorAttribute'
import CustomAttribute from '../customattribute/CustomAttribute'
import { Link } from 'react-router-dom'

export default class Bagproduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            count : 1
        }
    }
    handleIncreaseProductCount = ()=> {
        this.setState({count: this.state.count +1})
    }
    handleDecreaseProductCount = ()=> {
        if (this.state.count > 1)
        this.setState({count: this.state.count -1})
    }

    render() {
        return (
        <div className='Bagproduct'>
            <div style={{display: "flex"}}>
                <div className='product-info'>
                    <p>{this.props.product.product.brand}</p>
                    <p>{this.props.product.product.name}</p>
                    <p>$50</p>
                    <div>
                        {this.props.product.product.attributes.map((attribute,i)=> {
                            if (attribute.id !== "Color"){
                                return <CustomAttribute key={i} attribute={attribute} id={attribute.id} attributeValue={this.getValue} miniView="true"/>
                            }
                            else{
                                return <ColorAttribute key={i} colors={attribute.items} id={attribute.id} attributeValue={this.getValue} miniView="true"/>
                            }
                        })}
                    </div>
                </div>
                <div className="quantity">
                    <div className="count">
                        <button onClick={this.handleIncreaseProductCount}>+</button>
                        <p>{this.state.count}</p>
                        <button onClick={this.handleDecreaseProductCount}>-</button>
                    </div>
                    <div className="img">
                    </div>
                </div>
            </div>
            <div style={{display:"flex",width:"100%",justifyContent: "space-between"}}>
                <Link to="/bag">
                    <button className='btn secondary'>VIEW BAG</button>
                </Link>
                <button className='btn primary'>CHECK OUT</button>
            </div>
            {
                console.log(this.props.product)
            }
        </div>
        )
    }
}
