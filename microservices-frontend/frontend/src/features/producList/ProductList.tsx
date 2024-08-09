import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./ProductList.css";
import {callApi} from "../../helpers/axios_helper"

interface ProductListProps {
    category: string;
}

export const ProducList: React.FC<ProductListProps> = ({ category }) => {
    interface productObject {
        id: number;
        sku: string;
        name: string;
        category: string;
        discount:number;
        price: number;
    }

    let navigate = useNavigate();

    const [products, setProducts] = useState<productObject[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<number>(12);


  
    useEffect(() => {
        loadProducts();
    }, []);

    const handleProductClick = (id: string) => {
        navigate(`/product/${id}`);
    };

    const loadProducts = async () => {
        try {
            const result = await callApi(`/api/product/${category}`);
            setProducts(result.data);
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    };

    const loadMoreProducts = () => {
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 6);
    };


    return (
        <div className="shop-container">
            <div className="header-navigator">
                <div className="home-navigator">Home</div>
                <div className="bar-navigator">|</div>
                <div className="actual-navigator">{`${category}`}</div>
            </div>

            <div className="header-discount">
                <div className="header-discount-title"><h2>15% off $60, 20% off $80 or 25% off $100 + free shipping</h2></div>
                <div className="header-discount-span"><span>One day only</span></div>
            </div>

            <div className="product-collection">
                <div className="product-grid-container">

                
                    <ul className="product-grid">


                        {products.slice(0, visibleProducts).map((product, index) => (
                            <li className="product-item" onClick={() => handleProductClick(`${product.id.toString()}`)}>
                                <div className="card">
                                    <div className="card-inner">
                                        <div className="card-media">
                                            <img
                                                src={`/img/${product.sku}.webp`}
                                                alt="Descripción"
                                                className="card-img"
                                            />
                                            <img
                                                src={`/img/${product.sku}v.webp`}
                                                alt="Descripción"
                                                className="card-img-hover"
                                            />
                                        </div>
                                        <div className="card-inner-content">
                                            <div className="product-labels">
                                                    <div className="product-label-sale" style={{ backgroundColor: '#212121' }}>NEW</div>
                                                {product.discount > 0 && (
                                                    <div className="product-label-sale">SALE</div>
                                                    
                                                )}
                                                {product.discount > 0 && (
                                                    
                                                    <div className="product-label">-{product.discount}%</div>
                                                )}
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <div className="title"><span>{product.name}</span></div>
                                        <div className="price">
                                            {product.discount > 0 && (
                                                <div className="price-off">${product.price.toFixed(2)}</div>
                                            )}
                                            <div className="price-real">${(product.price-((product.price/100)*product.discount)).toFixed(2)}</div>
                                            
                                        </div>
                                        <div className="brand"><span>VENDY</span></div>
                                        {product.category == "clothes" && (
                                        <div className="product-sizes-container">
                                            <ul className="product-sizes">
                                                <li className="product-size"><a href="">XXL</a></li>
                                                <li className="product-size"><a href="">XL</a></li>
                                                <li className="product-size"><a href="">L</a></li>
                                                <li className="product-size"><a href="">M</a></li>
                                                <li className="product-size"><a href="">S</a></li>
                                            </ul>
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}


                    </ul>
                    {visibleProducts < products.length && (
                        <div className="button-container">
                            <button onClick={loadMoreProducts} className="load-more-button">Load More</button>
                        </div>
                        
                    )}
                </div>
            </div>
        </div>
    );
};
