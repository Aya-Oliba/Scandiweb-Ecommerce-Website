import React, { Component } from 'react'
import './customattribute.scss'

export default class CustomAttribute extends Component {
    constructor(props){
        super(props)
        this.state = {
            sizes : [
                {size: "XS"},
                {size:"S"},
                {size:"M"},
                {size:"L"},
            ],
            selectedIndex: 0
        }
    }
    handleClick = (e,i)=> {
        this.setState({selectedIndex : i})
        e.target.classList.add("selected");
        this.props.attributeValue(i,this.props.id)
    }
    render() {
        return (
        <div className='size-attribute'>
            <h4>{this.props.attribute.name}:</h4>
            <div className='content-wrapper'>
            {this.props.attribute.items.map((item,i)=> {
                return(
                    <div onClick={(e)=> this.handleClick(e,i) }>
                        <p className={i == this.state.selectedIndex ? 'selected' : ''} key={i}>{item.displayValue}</p>
                    </div>
                )
            })}
            </div>
        </div>
        )
    }
}
