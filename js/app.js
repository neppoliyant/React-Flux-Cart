import  React from 'react';
import ReactDom from 'react-dom';
import ProductData from './ProductData';
import CartAPI from './utils/CartAPI';
import FluxCartApp from './components/FluxCartApp.react';

// Load Mock Product Data into localStorage
ProductData.init();

// Load Mock API Call
CartAPI.getProductData();

// Render FluxCartApp Controller View
ReactDom.render(
  <FluxCartApp />,
  document.getElementById('flux-cart')
);