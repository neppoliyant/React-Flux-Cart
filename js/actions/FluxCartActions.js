import AppDispatcher from '../dispatcher/AppDispatcher';
import FluxCartConstants from '../constants/FluxCartConstants';

// Define actions object
var FluxCartActions = {

  // Receive inital product data
  receiveProduct: (data) => {
    console.log('Handling receive products');
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.RECEIVE_DATA,
      data: data
    })
  },

  // Set currently selected product variation
  selectProduct: (index) => {
    console.log('Handling select products');
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.SELECT_PRODUCT,
      data: index
    })
  },

  // Add item to cart
  addToCart: (sku, update) => {
    console.log('Handling add to cart');
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.CART_ADD,
      sku: sku,
      update: update
    })
  },

  // Remove item from cart
  removeFromCart: (sku) => {
    console.log('Handling remove from cart');
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.CART_REMOVE,
      sku: sku
    })
  },

  // Update cart visibility status
  updateCartVisible: (cartVisible) => {
    console.log('Handling update from cart');
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.CART_VISIBLE,
      cartVisible: cartVisible
    })
  }

};

module.exports = FluxCartActions;