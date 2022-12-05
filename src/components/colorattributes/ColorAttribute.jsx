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
            <h4>COLOR:</h4>
            <div className='content-wrapper'>
            {this.props.colors.map((color,i)=> {
                return(
                    <div className={ i == this.state.selectedIndex ? "selected" : "" } onClick={(e)=> this.handleClick(e,i) }>
                        <p key={i}  style={{ backgroundColor: color.value}}></p>
                    </div>
                )
            })}
            </div>
        </div>
        )
    }
}
