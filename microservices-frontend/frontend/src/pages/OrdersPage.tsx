import React, { useState } from "react";
import "./HomePage.css";

import { Home } from "../features/home/Home";
import { NavBar } from "../features/navbar/NavBar";
import { Footer } from "../features/footer/Footer";
import ShoppingCart from "../features/shoppingCart/ShoppingCart";
import { Orders } from "../features/orders/Orders";
export const OrdersPage: React.FC = () => {
  
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const handleOpenCart = () => {
    setCartOpen(true);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  

  

  return (
    <div className="page-container">
      <div className="home-page-container">
       
      <NavBar onOpenCart={handleOpenCart}/>
        <Orders/>
        <Footer/>
        <ShoppingCart isOpen={cartOpen} onClose={handleCloseCart} />
      </div>
    </div>
  );
};
