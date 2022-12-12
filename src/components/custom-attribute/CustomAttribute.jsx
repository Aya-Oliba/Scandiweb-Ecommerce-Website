import React, { Component } from 'react'
import './CustomAttribute.scss'
import { toast } from 'react-toastify';

export default class CustomAttribute extends Component {
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
    handleAttributeSelection = (e, selectionIndex)=> {
        if(this.props.isEditable == true){
            this.setState({selectedIndex : selectionIndex});
            e.target.classList.add("selected");
            this.props.passSelectionToParent(selectionIndex, this.props.id)
        } else {
            toast.error("You can Edit products Choices From Product details Page");
        }
    }

    render() {
        return (
        <div className='size-attribute'>
            <h4 style={this.props.miniView === true ? {fontSize:"13px"} :{fontSize:"16px"}} >{this.props.attribute.name}:</h4>
            <div className='content-wrapper'>
            {this.props.attribute.items.map((item,i)=> {
                return(
                    <div key={i} onClick={(e)=> this.handleAttributeSelection(e,i) }>
                        <p className={i == this.state.selectedIndex ? 'selected' : ''} style={this.props.miniView === true ? {width:"30px",height:"20px", fontSize:"10px", padding:"5px",marginRight:"2px"} : {width:"60px", height:"50px"}} key={i}>{item.displayValue}</p>
                    </div>
                )
            })}
            </div>
        </div>
        )
    }
}
