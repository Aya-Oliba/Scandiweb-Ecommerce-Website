import { connect } from "react-redux";

export function mapStateToProps(state) {
    let totalCartProducts = 0;
    Object.keys(state.cartStore.cartProductsMap)?.forEach((key,i)=>{
        totalCartProducts += state.cartStore.cartProductsMap[key].count
    });

    return {
        currency: state.currencyStore.currency,
        cartProducts: state.cartStore.cartProductsMap,
        totalCartProducts: totalCartProducts,
    };
};

export default connect(mapStateToProps);