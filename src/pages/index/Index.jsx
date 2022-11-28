import React, { Component } from 'react';
import Productcard from '../../components/productcard/Productcard';
// import { useQuery, gql } from '@apollo/client';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Productslist from '../../components/productslist/Productslist';

class Indexpage extends Component {
    
    constructor(){
        super();
        this.state = {
            productsCategories:[]
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
                        categories {
                            name
                            products {
                                id,
                                name,
                                inStock,
                                description,
                                brand,
                                gallery,
                                prices{
                                    currency{
                                        label
                                        symbol
                                    }
                                    amount
                                }
                            }
                        }
                    }
                `,
            }).then((data) => this.setState({productsCategories: data?.data?.categories}))
    
        }
    

    render() {
        console.log(this.state.productsCategories[0])
        return (
            <div className='index-page'>
                <Productslist  productscategory= {this.state.productsCategories[0]} />
            </div>
        );
    }
}

export default Indexpage;