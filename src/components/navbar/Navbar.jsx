import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './navbar.scss'
import shoppingBag from '../../logo.png';
import emptyCart from '../../Empty-Cart.png';
import { connect } from 'react-redux';
import { changeCurrency } from '../../redux/currencySlice';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Bagcontent from '../bagcontent/Bagcontent';

const mapStateToProps = (state) => {
    return {
        currency: state.currencyStore.currency
    }
};

const mapDispatchToProps = { changeCurrency };

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedCurrency: "$",
            currenciesList: []
        }
        this.handleChange = this.handleChange.bind(this)
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
    
    handleChange(e){
        this.setState({selectedCurrency: e.target.value})
        this.props.changeCurrency(e.target.value)
    }
    handleBagClick= ()=> {
        document.getElementById("drop-down").classList.toggle("unvisible");
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
                    <select name="currencySelect" onChange={this.handleChange}>
                        {this.state.currenciesList.map((currency,i)=> {
                            return(
                                <option key={i} value={currency.symbol}>{currency.symbol}{currency.label}</option>
                            )
                        })}
                    </select>
                    <img src={emptyCart} onClick={this.handleBagClick}/>
                </div>
                <div className='drop-down-bag unvisible' id='drop-down'>
                    <Bagcontent/>
                </div>
            </div>
        );
    }
}
// export default Navbar;
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
