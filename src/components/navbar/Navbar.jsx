import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './navbar.scss'
import shoppingBag from '../../logo.png';
import emptyCart from '../../Empty-Cart.png'

class Navbar extends Component {
    constructor(){
        super()
        this.state = {
            selectedCurrency: "$"
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        console.log(e.target.value);
        this.setState({selectedCurrency: e.target.value})
    }
    render() {
        return (
            <div className='navbar'>
                <ul>
                    <NavLink to="/">ALL</NavLink>
                    <NavLink to="/tech">TECH</NavLink>
                    <NavLink to="/clothes">CLOTHES</NavLink>
                </ul>
                <div className='img-wrapper'>
                    <img src={shoppingBag} alt="Shopping-bag" />
                </div>
                <div className='right'>
                    <p>{this.state.selectedCurrency}</p>
                    <select name="" id="" onChange={this.handleChange}>
                        <option value="$">$USD</option>
                        <option value="&euro;">&euro;EUR</option>
                        <option value="&#165;">&#165;Jpy</option>
                    </select>
                    <img src={emptyCart}/>
                </div>
            </div>
        );
    }
}
export default Navbar;