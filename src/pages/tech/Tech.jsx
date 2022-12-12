import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ProductsList from '../../components/products-list/ProductsList';

class Tech extends Component {
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
        client.query({
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
        return (
            <div className='index-page'>
                <ProductsList productsCategory= {this.state.productsCategories[2]} />
            </div>
        );
    }
}

export default Tech;