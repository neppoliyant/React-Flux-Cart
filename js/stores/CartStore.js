import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import  FluxCartConstants from '../constants/FluxCartConstants';
import _ from 'underscore';

// Define initial data points
var _products = {}, _cartVisible = false;

// Add product to cart
var add = (sku, update) => {
    update.quantity = sku in _products ? _products[sku].quantity + 1 : 1;
    _products[sku] = _.extend({}, _products[sku], update)
}

// Set cart visibility
var setCartVisible = (cartVisible) => {
    _cartVisible = cartVisible;
}

// Remove item from cart
var removeItem = (sku) => {
    delete _products[sku];
}

// Extend Cart Store with EventEmitter to add eventing capabilities
var CartStore = _.extend({}, EventEmitter.prototype, {

    // Return cart items
    getCartItems: () => {
        return _products;
    },

    // Return # of items in cart
    getCartCount: () => {
        return Object.keys(_products).length;
    },

    // Return cart cost total
    getCartTotal: () => {
        var total = 0;

        for(var product in _products){
            if(_products.hasOwnProperty(product)){
                total += _products[product].price * _products[product].quantity;
            }
        }
        return total.toFixed(2);
    },

    // Return cart visibility state
    getCartVisible: function() {
        console.log('cart visibility :' + _cartVisible);
        return _cartVisible;
    },

    // Emit Change event
    emitChange: function() {
        console.log('emiting change event');
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function(callback) {
        console.log('add change listener : ' + callback);
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function(callback) {
        console.log('remove change listener : ' + callback);
        this.removeListener('change', callback);
    }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
    var action = payload.action;
    console.log('Register Execution Cart Store : ' + JSON.stringify(payload));
    console.log('AppDispatcher Action type: ' + JSON.stringify(action));
    switch(action.actionType) {

        // Respond to CART_ADD action
        case FluxCartConstants.CART_ADD:
            add(action.sku, action.update);
            break;

        // Respond to CART_VISIBLE action
        case FluxCartConstants.CART_VISIBLE:
            setCartVisible(action.cartVisible);
            break;

        // Respond to CART_REMOVE action
        case FluxCartConstants.CART_REMOVE:
            removeItem(action.sku);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    CartStore.emitChange();

    return true;

});

module.exports = CartStore;