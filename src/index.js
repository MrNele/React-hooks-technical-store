import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ProductProvider from './context/products'
import {CartProvider} from './context/cart'

// CartContext,CartProvider
ReactDOM.render(
    <ProductProvider>
    <CartProvider>
    <App />
    </CartProvider>
    </ProductProvider>,
    
     document.getElementById("root"));
