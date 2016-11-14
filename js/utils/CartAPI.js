import FluxCartActions from '../actions/FluxCartActions';

module.exports = {
  // Load mock product data from localStorage into ProductStore via Action
  getProductData: () => {
    let data = JSON.parse(localStorage.getItem('product'));
    FluxCartActions.receiveProduct(data);
  }
};