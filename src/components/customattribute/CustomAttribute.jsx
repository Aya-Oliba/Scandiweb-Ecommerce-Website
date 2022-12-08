import React, { Component } from 'react'
import './customattribute.scss'

export default class CustomAttribute extends Component {
    constructor(props){
        super(props)
        this.state = {
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
            <h4 style={this.props.miniView === "true" ? {fontSize:"13px"} :{fontSize:"16px"}} >{this.props.attribute.name}:</h4>
            <div className='content-wrapper'>
            {this.props.attribute.items.map((item,i)=> {
                return(
                    <div key={i} onClick={(e)=> this.handleClick(e,i) }>
                        <p className={i == this.state.selectedIndex ? 'selected' : ''} style={this.props.miniView === "true" ? {width:"30px",height:"20px", fontSize:"10px"} : {width:"60px",height:"50px"}} key={i}>{item.displayValue}</p>
                    </div>
                )
            })}
            </div>
        </div>
        )
    }
}
