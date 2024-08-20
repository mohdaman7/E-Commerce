import React, { createContext, useContext, useState } from "react";

// Create a Cart Context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart,setCart] = useState([])

  const addToCart = (product) => {
    setCart((prevCart)=>{
      const existingProduct = prevCart.find((item)=>item.id===product.id);
      if(existingProduct){
        return prevCart.map((itme)=>
          item.id === product.id?{...item,quantity:item.quantity + 1}:item
        );
      }else{
        return [...prevCart,{...product,quantity:1}];
      }
    })
  };

  const removeFromCart = (id) => {
    setCart((prevCart)=>prevCart.filter((item)=>item.id !== id));
  }

  const increaseQuantity = (id) => {
    setCart((prevCart)=>
      prevCart.map((item)=>
        item.id === id ? {...item,quantity:item.quantity+1} : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    setCart((prevCart)=>
      prevCart.map((item)=>
        item.id === id ? {...item,quantity:Math.max(item.quantity -1,1)} : item 
      )
    )
  }

  return (
    <CartContext.Provider value={{cart,addToCart,removeFromCart,increaseQuantity,decreaseQuantity}}>
      {children}
    </CartContext.Provider>
  );

};



// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
