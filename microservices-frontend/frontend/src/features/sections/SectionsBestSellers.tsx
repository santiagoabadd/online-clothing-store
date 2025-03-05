import React, { useState, useEffect } from "react";
import {callApi} from "../../helpers/axios_helper"
import { useNavigate } from 'react-router-dom';
import ProductsCollection from "../collection/ProductsCollection";

interface ProductObject {
  id: number;
  sku: string;
  name: string;
  category: string;
  discount: number;
  price: number;
  size?: string[];
}

export const SectionsBestSellers: React.FC = () => {

     
  return (
    <section id="best-sellers">
      <div className="section-container">
        <div className="heading-content">
          <div className="collection-title"><h1>Best sellers</h1></div>
          <div className="collection-description"><p>Top sale in this week</p></div>
        </div>
        <div className="slider-content">
        <ProductsCollection/>
        </div>
      </div>
    </section>

  );
};