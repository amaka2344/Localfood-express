import { createContext, useState } from 'react';

export const CartContext = createContext();

 const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState({});

  const updateCartData = (data) => {
    setCartData(data);
  };

  return (
    <CartContext.Provider value={{ cartData, updateCartData }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider