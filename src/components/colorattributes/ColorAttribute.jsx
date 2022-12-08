import React, { Component } from 'react'
import './colorattribute.scss'

export default class ColorAttribute extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedIndex: null,
        }
    }
    handleClick = (e,i)=> {
        this.setState({selectedIndex: i});
        this.props.attributeValue(i,this.props.id)
    }
    render() {
        return (
        <div className='color-attribute'>
            <h4 style={this.props.miniView === "true" ? {fontSize:"13px"} :{fontSize:"16px"}}>COLOR:</h4>
            <div className='content-wrapper'>
            {this.props.colors.map((color,i)=> {
                return(
                    <div key={i} className={ i == this.state.selectedIndex ? "selected" : "" } style={this.props.miniView === "true" ? {width:"20px",height:"20px"}: {width:"40px",height:"40px"} } onClick={(e)=> this.handleClick(e,i) }>
                        <p  style={{ backgroundColor: color.value}}></p>
                    </div>
                )
            })}
            </div>
        </div>
        )
    }
}
