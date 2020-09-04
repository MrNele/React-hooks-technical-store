// products context
import React from "react";
import axios from "axios";
import url from "../utils/URL";
import {featuredProducts} from '../utils/helpers';

export const ProductContext = React.createContext();

// kada se kreira context, onda imamo pristup dvema kompomentama: 1) Provider i 2) Consumer za koji se koristi useContext hook

export default function ProductProvider({ children }) {
  // console.log(React.useState(false));
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);

  // const greeting="hello";
  // const product={id:1, title:'product name'}

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}/products`)
      .then(response => {
        const featured=featuredProducts(response.data);
           setProducts(response.data);
           setFeatured(featured);
           setLoading(false);
      });

    return () => {};
  }, []);
  return (
    <ProductContext.Provider value={{ products, loading, featured }}>
      {children}
    </ProductContext.Provider>
  );
}
