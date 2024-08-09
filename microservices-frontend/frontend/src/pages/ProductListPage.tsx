import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { NavBar } from "../features/navbar/NavBar";
import { Footer } from "../features/footer/Footer";
import ShoppingCart from "../features/shoppingCart/ShoppingCart";
import { ProducList } from '../features/producList/ProductList';


export const ProductListPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const categoryName = category ? category : '';



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
        <ProducList category={categoryName}/>
        <ShoppingCart isOpen={cartOpen} onClose={handleCloseCart} />
        <Footer/>
      </div>
    </div>
  );
};

