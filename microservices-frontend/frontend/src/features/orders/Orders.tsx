import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Orders.css";
import { callApi } from "../../helpers/axios_helper"


export const Orders: React.FC = () => {

  interface orderItem {
    id: number;
    sku: string;
    price: number;
    size: string;
    quantity: number;
  }

  interface orderObject {
    id: number;
    orderNumber: string;
    date: string;
    orderItems: orderItem[];
  }



  const [orders, setOrders] = useState<orderObject[]>([]);




  useEffect(() => {
    loadOrders();
  }, []);


  const loadOrders = async () => {
    try {
      const result = await callApi('/api/order');
      setOrders(result.data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };




  return (
    <div>
      <div className="header-navigator">
        <div className="home-navigator">Home</div>
        <div className="bar-navigator">|</div>
        <div className="actual-navigator">Orders</div>
      </div>
      <div className="orders-container-flex">

        <div className="orders-container">
          <table className="order-table">
            <thead className="order-table-head">
              <tr>
                <th className="order-number-th">Order Number</th>
                <th className="order-date-th">Date</th>
                <th className="order-items-th">Items</th>
              </tr>
            </thead>
            <tbody className="order-table-body">
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="order-number-td">
                    {order.orderNumber}
                  </td>
                  <td className="order-date-td">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="order-items-container">
                      {order.orderItems.map(item => (
                        <div key={item.id} className="order-item">
                          <img src={`/img/${item.sku}_1.webp`} alt={item.sku} />
                          <div className="cart-item-info">
                            <div className="item-title">Bomber Jacket</div>
                            <div className="item-price">${item.price.toFixed(2)}</div>
                            <div className="item-size">{item.size}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};