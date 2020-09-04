import React from "react";
import localCart from "../utils/localCart";
function getCartFromLocalStorage(){
  return localStorage.getItem('cart')? JSON.parse(localStorage.getItem("cart")) : [];
}
const CartContext = React.createContext();

function CartProvider({ children }) {
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(getCartFromLocalStorage());
  const [cartItems, setCartItems] = React.useState(0);

  React.useEffect(() => {
    //local storage
    localStorage.setItem("cart",JSON.stringify(cart));
    //cart items
    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);
    setCartItems(newCartItems);
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart]);
  //removeItem
  const removeItem = (id) => {
    setCart([...cart].filter((item) => item.id !== id));
  };
  const increaseAmount = (id) => {
    const newCart = [...cart].map((item) => {
      return item.id === id
        ? { ...item, amount: item.amount + 1 }
        : { ...item };
    });
    setCart(newCart);
  };
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      removeItem(id);
      return;
    } else {
      const newCart = [...cart].map((item) => {
        return item.id === id
          ? { ...item, amount: item.amount - 1 }
          : { ...item };
      });
      setCart(newCart);
    }
  };
  const addToCart = (product) => {
    // console.log(product);
    const {
      id,
      image: { url },
      title,
      price
    } = product;
    const item = [...cart].find((item) => item.id === id);
    if (item) {
      increaseAmount(id);
      return;
    } else {
      const newItem = { id, image: url, title, price, amount: 1 };
      const newCart = [...cart,newItem];
      setCart(newCart);
    }
  };
  const clearCart = () => {
    setCart([]); // samo treba da bude empty array
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
