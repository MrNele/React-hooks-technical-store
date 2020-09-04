import React, { useContext } from "react";
import { ProductContext } from "../context/products";
import Loading from "../components/Loading";
import ProductList from "../components/Products/ProductList";
export default function Products() {
  // console.log(React.useContext(ProductContext));
  // const { greeting } = React.useContext(ProductContext);
  const { loading, products } = React.useContext(ProductContext);
  // console.log(products);
  if (loading) {
    return <Loading />;
  }
  return <ProductList title="our products" products={products} />;
}
