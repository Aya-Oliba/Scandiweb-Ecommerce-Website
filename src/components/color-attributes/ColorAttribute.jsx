import React, { Component } from 'react'
import { toast } from 'react-toastify';
import './ColorAttribute.scss'

export default class ColorAttribute extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedIndex: this.props.selectedIndex === undefined ? null : this.props.selectedIndex,
        }
    }

    /**
     * updates the component state with the selected index and pass it to the parent as well
     * @param {*} e 
     * @param {int} i 
     */
    handleAttributeSelection = (e,i)=> {
        if(this.props.isEditable == true) {
            this.setState({selectedIndex: i});
            this.props.passSelectionToParent(i, this.props.id)
        }else {
            toast.error("You can Edit products Choices From Product details Page");
        }
    }

    render() {
        return (
        <div className='color-attribute'>
            <h4 style={this.props.miniView === true ? {fontSize:"13px"} :{fontSize:"16px"}}>COLOR:</h4>
            <div className='content-wrapper'>
            {this.props.colors.map((color,i)=> {
                return(
                    <div key={i} className={ i == this.state.selectedIndex ? "selected" : "" } style={this.props.miniView === true ? {width:"20px",height:"20px"}: {width:"40px",height:"40px"} } onClick={(e)=> this.handleAttributeSelection(e,i) }>
                        <p  style={{ backgroundColor: color.value}}></p>
                    </div>
                )
            })}
            </div>
        </div>
        )
    }
}
