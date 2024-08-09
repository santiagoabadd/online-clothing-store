import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { removeItem, updateItemQuantity } from '../../redux/Slices/CartSlice';
import QuantitySelector from '../quantitySelector/QuantitySelector';
import "./ShoppingCart.css";
import {callApi} from "../../helpers/axios_helper"

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [productDetails, setProductDetails] = useState<{ [sku: string]: { name: string } }>({});

  useEffect(() => {
    if (isOpen) {
      const fetchProductDetails = async (sku: string) => {
        try {
          const response = await callApi(`/api/product/sku/${sku}`);
          setProductDetails(prev => ({
            ...prev,
            [sku]: response.data
          }));
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      cartItems.forEach(item => {
        if (!productDetails[item.sku]) {
          fetchProductDetails(item.sku);
        }
      });
    }
  }, [isOpen, cartItems, productDetails]);

  const handleRemove = (sku: string) => {
    dispatch(removeItem(sku));
  };

  const handleQuantityChange = (sku: string, quantity: number) => {
    dispatch(updateItemQuantity({ sku, quantity }));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    try {
      const orderData = cartItems.map(item => ({
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
      }));
      console.log(orderData);
     await callApi('/api/order', 'POST',undefined,{ orderItems: orderData });
     
      dispatch({ type: 'cart/clear' }); 
      onClose(); 
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className={`shopping-cart ${isOpen ? 'open' : 'closed'}`}>
      <div className='shopping-cart-content'>
        <div className='cart-header'>
          <span className='cart-title'>YOUR CART</span>
          <button className="close-button" onClick={onClose}><XMarkIcon className='h-8 w-8' /></button>
        </div>
        <div className='cart-header-products'>
          <span className='cart-header-title'>PRODUCT</span>
          <span className='cart-header-title'>TOTAL</span>
        </div>
        {cartItems.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          cartItems.map(item => (
            <div key={item.sku} className="cart-item">
              <img src={`/img/${item.sku}_1.webp`} alt={item.sku} />
              <div className='cart-item-info'>
                <div className='item-title'>{productDetails[item.sku]?.name || 'Loading...'}</div>
                <div className='item-price'>${item.price.toFixed(2)}</div>
                <div className='item-size'>Size: {item.size}</div>
                <div className='item-quantity-selector'>
                  <QuantitySelector
                    quantity={item.quantity}
                    onQuantityChange={(newQuantity) => handleQuantityChange(item.sku, newQuantity)}
                  />
                  <button onClick={() => handleRemove(item.sku)}><TrashIcon className='h-5 w-5' /></button>
                </div>

              </div>
              <div className='item-total-price'>${(item.price * item.quantity).toFixed(2)}</div>





            </div>
          ))
        )}
        {cartItems.length > 0 && (
          <div className='cart-footer'>
            <div className='cart-total'>
              <span className='cart-total-title'>Subtotal:</span>
              <span className='cart-total-price'>${getTotalPrice().toFixed(2)} USD</span>
            </div>
            <div className='total-advice'>
              <span>Taxes and shipping calculated at checkout</span>
            </div>
           
            <button className="check-out-button" onClick={handleCheckout}>Check out</button>
            

            </div>
          

        )}
      </div>
    </div>
  );
};

export default ShoppingCart;