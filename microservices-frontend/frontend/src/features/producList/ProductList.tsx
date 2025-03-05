import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./ProductList.css";
import { callApi } from "../../helpers/axios_helper"

interface ProductListProps {
    category?: string;
}

interface ProductObject {
    id: number;
    sku: string;
    name: string;
    category: string;
    discount: number;
    price: number;
    size?: string[];
}

export const ProductList: React.FC<ProductListProps> = ({ category }) => {
    let navigate = useNavigate();

    const [products, setProducts] = useState<ProductObject[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<number>(9);
    const [sortOption, setSortOption] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");

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

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSize(event.target.value);
    };

    const filteredAndSortedProducts = products
        .filter(product =>
            (selectedCategory === "" || product.category === selectedCategory) &&
            (selectedSize === "" || (product.size && product.size.includes(selectedSize)))
        )
        .sort((a, b) => {
            switch (sortOption) {
                case "a-z":
                    return a.name.localeCompare(b.name);
                case "z-a":
                    return b.name.localeCompare(a.name);
                case "price-high-low":
                    return b.price - a.price;
                case "price-low-high":
                    return a.price - b.price;
                default:
                    return 0;
            }
        });

    return (
        <div className="shop-container">
            <div className="header-navigator">
                <div className="home-navigator">Home</div>
                <div className="bar-navigator">|</div>
                <div className="actual-navigator">{category || "All Products"}</div>
            </div>

            <div className="header-discount">
                <div className="header-discount-title"><h2>15% off $60, 20% off $80 or 25% off $100 + free shipping</h2></div>
                <div className="header-discount-span"><span>One day only</span></div>
            </div>

            <div className="product-collection">
                <div className="filter-menu">
                    <div className="filter-section">
                        <select id="sort-select" value={sortOption} onChange={handleSortChange}>
                            <option value="a-z">Alphabetically, A-Z</option>
                            <option value="z-a">Alphabetically, Z-A</option>
                            <option value="price-high-low">Price, high to low</option>
                            <option value="price-low-high">Price, low to high</option>
                        </select>
                    </div>


                    <div className="filter-section">
                        <label>Product Type:</label>
                        <div className="checkbox-group">
                            <label><input type="checkbox" value="accessories" /> Accessories</label>
                            <label><input type="checkbox" value="dresses" /> Dresses</label>
                            <label><input type="checkbox" value="hats" /> Hats</label>
                            <label><input type="checkbox" value="jackets" /> Jackets</label>
                            <label><input type="checkbox" value="jeans" /> Jeans</label>
                            <label><input type="checkbox" value="pants" /> Pants</label>
                            <label><input type="checkbox" value="shirts" /> Shirts</label>
                            <label><input type="checkbox" value="sweaters" /> Sweaters</label>
                            <label><input type="checkbox" value="swearshirt" /> Sweatshirts</label>
                        </div>
                    </div>

                    <div className="filter-section">
                        <label>SIZE</label>
                        <div className="size-buttons">
                            <button>XS</button>
                            <button>M</button>
                            <button>XL</button>
                            <button>XXL</button>
                            <button>28</button>
                            <button>30</button>
                            <button>32</button>
                            <button>34</button>
                            <button>36</button>
                        </div>
                    </div>


                
                </div>

                <div className="product-grid-container">
                    <ul className="product-grid">
                        {filteredAndSortedProducts.slice(0, visibleProducts).map((product, index) => (
                            <li key={product.id} className="product-item" onClick={() => handleProductClick(`${product.id.toString()}`)}>
                                <div className="card">
                                    <div className="card-inner">
                                        <div className="card-media">
                                            <img
                                                src={`/img/${product.sku}.webp`}
                                                alt={product.name}
                                                className="card-img"
                                            />
                                            <img
                                                src={`/img/${product.sku}v.webp`}
                                                alt={`${product.name} (variant)`}
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
                                            <div className="price-real">${(product.price - ((product.price / 100) * product.discount)).toFixed(2)}</div>
                                        </div>
                                        <div className="brand"><span>VENDY</span></div>
                                        {product.category === "clothes" && (
                                            <div className="product-sizes-container">
                                                <ul className="product-sizes">
                                                    <li className="product-size"><a href="#">XXL</a></li>
                                                    <li className="product-size"><a href="#">XL</a></li>
                                                    <li className="product-size"><a href="#">L</a></li>
                                                    <li className="product-size"><a href="#">M</a></li>
                                                    <li className="product-size"><a href="#">S</a></li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {visibleProducts < filteredAndSortedProducts.length && (
                        <div className="button-container">
                            <button onClick={loadMoreProducts} className="load-more-button">Load More</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};