import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./ProductList.css";
import { callApi } from "../../helpers/axios_helper"
import { Divide } from "lucide-react";

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

    useEffect(() => {
        const style = document.createElement("style")
        style.innerHTML = `
          input[type="checkbox"]:checked {
            background-color: black !important;
            border-color: black !important;
          }
          
          select option:hover,
          select option:focus,
          select option:active,
          select option:checked {
            background-color: black !important;
            color: white !important;
          }
        `
        document.head.appendChild(style)
        return () => {
          document.head.removeChild(style)
        }
      }, [])

    const [products, setProducts] = useState<ProductObject[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<number>(9);
    const [sortOption, setSortOption] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");

    useEffect(() => {
        loadProducts();
    }, [category, selectedCategories, selectedSizes, minPrice, maxPrice]);

    const handleProductClick = (id: string) => {
        navigate(`/product/${id}`);
    };

    const loadProducts = async () => {
        try {
            const params = new URLSearchParams();

            if (selectedCategories.length > 0) {
                selectedCategories.forEach(cat => params.append("categories", cat));
            }
            if (selectedSizes.length > 0) {
                selectedSizes.forEach(size => params.append("sizes", size));
            }
            if (minPrice) {
                params.append("minPrice", minPrice.toString());
            }
            if (maxPrice) {
                params.append("maxPrice", maxPrice.toString());
            }

            const queryString = params.toString();
            const endpoint = `/api/product/filter${queryString ? `?${queryString}` : ""}`;

            const result = await callApi(endpoint, "GET");
            setProducts(result.data);
        } catch (error) {
            console.error("Failed to load products:", error);
        }
    };
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedCategories(prev =>
            prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
        );
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedSizes(prev =>
            prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
        );
    };

    const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(event.target.value ? parseFloat(event.target.value) : "");
    };

    const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(event.target.value ? parseFloat(event.target.value) : "");
    };

    const sortedProducts = products.sort((a, b) => {
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

    const categories = ["accessories", "clothes", "bags", "beauty", "gifts", "shoes"]
    const sizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"]

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

            <div className="filter-menu space-y-6">
        <div className="filter-section">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By:</label>
          <div className="relative">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="appearance-none block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 "
              style={{ accentColor: "black" }}
            >
              <option value="a-z">Alphabetically, A-Z</option>
              <option value="z-a">Alphabetically, Z-A</option>
              <option value="price-high-low">Price, high to low</option>
              <option value="price-low-high">Price, low to high</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="filter-section">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Category:</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  value={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={handleCategoryChange}
                  className="h-4 w-4 rounded border-gray-300 text-[#222222] focus:ring-[#222222]"
                  style={{ accentColor: "black" }}
                />
                <span className="capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Size:</h3>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <label key={size} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  value={size}
                  checked={selectedSizes.includes(size)}
                  onChange={handleSizeChange}
                  className="h-4 w-4 rounded border-gray-300 text-[#222222] focus:ring-[#222222]"
                  style={{ accentColor: "black" }}
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Min Price:</label>
              <input
                type="number"
                value={minPrice}
                onChange={handleMinPriceChange}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#222222] focus:border-[#222222]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Max Price:</label>
              <input
                type="number"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                placeholder="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#222222] focus:border-[#222222]"
              />
            </div>
          </div>
        </div>
                </div>

                <div className="product-grid-container">
                    {products.length === 0 && (<div>No se econtraron productos en esta categoria</div>)}
                    <ul className="product-grid">
                        {sortedProducts.slice(0, visibleProducts).map((product, index) => (
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
                    {visibleProducts < sortedProducts.length && (
                        <div className="button-container">
                            <button onClick={() => setVisibleProducts(prev => prev + 6)} className="load-more-button">Load More</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};