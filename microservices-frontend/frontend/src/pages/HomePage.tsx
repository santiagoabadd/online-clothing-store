import React, { useState } from "react";
import "./HomePage.css";

import { Home } from "../features/home/Home";
import { NavBar } from "../features/navbar/NavBar";
import { Footer } from "../features/footers/Footer";
import ShoppingCart from "../features/shoppingCart/ShoppingCart";
import { SectionsBestSellers } from "../features/sections/SectionsBestSellers";
import { Footer2 } from "../features/footers/Footer2";
import Slider from "../features/slider/Slider";
import Section1 from "../features/sections/Section1";
import Slider2 from "../features/slider/Slider2";
export const HomePage: React.FC = () => {
  
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
        <Slider/>
        <Home/>
        <Section1/>
        <SectionsBestSellers/>
        <Slider2/>
        
        <Footer/>
        <ShoppingCart isOpen={cartOpen} onClose={handleCloseCart} />
      </div>
    </div>
  );
};
