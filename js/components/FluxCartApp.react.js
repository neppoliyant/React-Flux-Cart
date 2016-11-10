import React from 'react';
import CartStore from '../stores/CartStore';
import ProductStore from '../stores/ProductStore';
import FluxProduct from './FluxProduct.react';
import FluxCart from './FluxCart.react';


// Method to retrieve state from Stores
var getCartState = () => {
    return {
        product: ProductStore.getProduct(),
        selectedProduct: ProductStore.getSelected(),
        cartItems: CartStore.getCartItems(),
        cartCount: CartStore.getCartCount(),
        cartTotal: CartStore.getCartTotal(),
        cartVisible: CartStore.getCartVisible()
    };
}

// Define main Controller View
const FluxCartApp = React.createClass({

    // Get initial state from stores
    getInitialState: () => {
        return getCartState();
    },

    // Add change listeners to stores
    componentDidMount: function() {
        ProductStore.addChangeListener(this._onChange);
        CartStore.addChangeListener(this._onChange);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
        ProductStore.removeChangeListener(this._onChange);
        CartStore.removeChangeListener(this._onChange);
    },

    // Render our child components, passing state via props
    render: function() {
        return (
            <div className="flux-cart-app">
            <FluxCart products={this.state.cartItems} count={this.state.cartCount} total={this.state.cartTotal} visible={this.state.cartVisible} />
                <FluxProduct product={this.state.product} cartitems={this.state.cartItems} selected={this.state.selectedProduct} />
        </div>
        );
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        this.setState(getCartState());
    }

});

module.exports = FluxCartApp;