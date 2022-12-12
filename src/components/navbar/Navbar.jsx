import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './Navbar.scss'
import shoppingBag from '../../logo.png';
import emptyCart from '../../Empty-Cart.png';
import { connect } from 'react-redux';
import { changeCurrency } from '../../redux/CurrencySlice';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import BagContent from '../bag-content/BagContent';
import {mapStateToProps} from '../../redux/connectors/CartStoreConnector'

const mapDispatchToProps = { changeCurrency };

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedCurrency: "$",
            currenciesList: []
        }
    }

    componentDidMount(){
        const client = new ApolloClient({
            uri: "http://localhost:4000/",
            cache: new InMemoryCache(),
        });
        client
            .query({
                query: gql`
                    query {
                        currencies {
                            label
                            symbol
                        }
                    }
                `,
            }).then((data) => this.setState({currenciesList :data?.data?.currencies}))
    }

    /**
     * update the currency within the component state as well as the currency store
     * @param {{}} e click event of 
     */
    handleCurrencyChange = (e) => {
        this.setState({selectedCurrency: e.target.value})
        this.props.changeCurrency(e.target.value)
    }

    /**
     * show/hide the cart bag drop down as well as the overlay when the bag button is clicked
     */
    handleBagClick= ()=> {
        document.getElementById("drop-down").classList.toggle("hidden");
        document.getElementById("overlay").classList.toggle("hidden");
    }

    /**
     * show/hide the overlay div when the div is clicked
     */
    handleOverlayClick() {
        document.getElementById("overlay").classList.toggle("hidden");
        document.getElementById("drop-down").classList.toggle("hidden");
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
                    <select name="currencySelect" onChange={this.handleCurrencyChange}>
                        {this.state.currenciesList.map((currency, i)=> {
                            return(
                                <option key={i} value={currency.symbol}>{currency.symbol}{currency.label}</option>
                            )
                        })}
                    </select>
                    <img src={emptyCart} onClick={this.handleBagClick}/>
                    {
                        Object.keys(this.props.cartProducts).length > 0 ?
                        <span className='cart-span'>{this.props.totalCartProducts}</span> :
                        null
                    }
                </div>
                <div className='drop-down-bag hidden' id='drop-down'>
                    <BagContent miniView={true}/>
                </div>
                <div id="overlay" className='hidden' onClick={this.handleOverlayClick}></div>
            </div>
        );
    }
}
// export default Navbar;
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
