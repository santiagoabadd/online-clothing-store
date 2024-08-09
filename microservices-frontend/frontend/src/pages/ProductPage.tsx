import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../features/product/Product";
import { NavBar } from "../features/navbar/NavBar";
import { Footer } from "../features/footer/Footer";
import ShoppingCart from "../features/shoppingCart/ShoppingCart";

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const productId = id ? id : '';
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const handleOpenCart = () => {
    setCartOpen(true);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  return (
    <div className="page-container">
      <div className="products-page-container">
        <NavBar onOpenCart={handleOpenCart}/>
        <Product idProduct={productId} />
        <Footer />
        <ShoppingCart isOpen={cartOpen} onClose={handleCloseCart} />
      </div>
    </div>
  );
};