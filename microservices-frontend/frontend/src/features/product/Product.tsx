import React, { useState, useEffect } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Product.css";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, HeartIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { addItem, setError, clearError, setLoading } from "../../redux/Slices/CartSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import QuantitySelector from "../quantitySelector/QuantitySelector";
import { callApi } from "../../helpers/axios_helper"

interface ProductProps {
    idProduct: string;
    onOpenCart: () => void;
}



export const Product: React.FC<ProductProps> = ({ idProduct, onOpenCart  }) => {
    interface ProductObject {
        id: number;
        sku: string;
        name: string;
        category: string;
        discount: number;
        price: number;
    }

    interface InventoryObject {
        id: number;
        sku: string;
        size: string;
        quantity:number;
        
    }

    const getImageUrls = (sku: string): string[] => {
        return Array.from({ length: 5 }, (_, index) => `/img/${sku}_${index + 1}.webp`);
    };

    const settings = {
        vertical: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
    };


    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { status, error } = useSelector((state: RootState) => state.cart);
    const cartState = useSelector((state: RootState) => state.cart);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [product, setProduct] = useState<ProductObject | null>(null);
    const [inventory, setInventory] = useState<InventoryObject[]>([]);
    const [quantity, setQuantity] = useState<number>(1);
    const [sizes, setSizes]=useState<string[]>([]);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };


    useEffect(() => {
        console.log("Cart State:", cartState);
    }, [cartState]);

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        try {
            const url = `/api/product/product/${idProduct}`;
            console.log("Request URL:", url);
            const result = await callApi(url);

            setProduct(result.data);
            if (result.data.sku) {
                const images = getImageUrls(result.data.sku);
                setSelectedImage(images[0]); 
                loadSizes(result.data.sku);
                loadInventory(result.data.sku)
                console.log(sizes)
            }
        } catch (error) {
            console.error("Error loading product:", error);
        }
    };

    const loadSizes = async (sku:string) => {
        try {
            const url = `/api/product/sizes/${sku}`;
            console.log("Request URL:", url);
            const result = await callApi(url);
            if (Array.isArray(result.data)) {
                setSizes(result.data);
                console.log("Sizes state updated:", result.data);
            } else {
                console.error("Invalid data format:", result.data);
                setSizes([]);
            }
            console.log(sizes)
        } catch (error) {
            console.error("Error loading sizes:", error);
        }
    };

    const loadInventory = async (sku:string) => {
        try {
            const url = `/api/inventory/${sku}`;
            console.log("Request URL:", url);
            const result = await callApi(url);
            setInventory(result.data)
        } catch (error) {
            console.error("Error loading inventory:", error);
        }
    };


    const handleAddToCart = () => {
        if (product) {
            if (!selectedSize) {
                dispatch(setError("Please select a size"));
                return;
            }
            dispatch(setLoading());
            try {
                dispatch(addItem({ sku: product.sku, price: product.price, quantity: quantity, size: selectedSize }));
                dispatch(clearError());
                onOpenCart()
            } catch (err) {
                dispatch(setError("Error adding item to cart"));
            }
        } else {
            dispatch(setError("Product not found"));
        }
    };

    const handleSizeClick = (size: string) => {
        setSelectedSize(size);

    };


    const PreviousButton = ({ onClick }: { onClick?: () => void }) => (
        <button className="slick-prev custom-arrow" onClick={onClick}>
            &lt;
        </button>
    );

    const NextButton = ({ onClick }: { onClick?: () => void }) => (
        <button className="slick-next custom-arrow" onClick={onClick}>
            &gt;
        </button>
    );

    const images = product ? getImageUrls(product.sku) : [];

    return (
        <div className="product-page-container">
            <div className="header-navigator">
                <div className="home-navigator">Home</div>
                <div className="bar-navigator">|</div>
                <div className="actual-navigator">{`${product?.name}`}</div>
            </div>
            
            <div className="product-container">
                <div className="product-media-wrapper">
                    <div className="carousel-gallery">
                        <div className="thumbnail-slider">
                            <Slider {...settings}>
                                {images.map((image, index) => (
                                    <div key={index} onClick={() => handleImageClick(image)}>
                                        <img
                                            src={image}
                                            alt={`Thumbnail ${index}`}
                                            className={selectedImage === image ? "active" : ""}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className="selected-image">
                            <PreviousButton onClick={() => setSelectedImage((prev) => {
                                if (!images.length) return prev;
                                const currentIndex = images.indexOf(prev || "");
                                const newIndex = (currentIndex - 1 + images.length) % images.length;
                                return images[newIndex];
                            })} />
                            <img src={selectedImage || ""} alt="Selected" />
                            <NextButton onClick={() => setSelectedImage((prev) => {
                                if (!images.length) return prev;
                                const currentIndex = images.indexOf(prev || "");
                                const newIndex = (currentIndex + 1) % images.length;
                                return images[newIndex];
                            })} />
                        </div>
                    </div>
                </div>
                <div className="product-info">
                    <div className="product-title">
                        <h1>{product?.name}</h1>
                    </div>
                    <div className="product-price">
                        {product?.discount !== undefined ? (
                            <div>
                                <div className="product-price-off">${product.price.toFixed(2)}</div>
                                <div className="product-price-real">${(product.price - ((product.price / 100) * product.discount)).toFixed(2)}</div>
                            </div>
                        ) : (
                            <div>
                                <div className="product-price-off">${product?.price.toFixed(2)}</div>
                            </div>
                        )}


                        {product?.discount !== undefined ? (
                            <div className="product-price-label">SALE</div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className="product-stock">
                        <CheckCircleIcon className="h-4 w-4 check-icon" />
                        <span>{}</span>
                    </div>
                    <div className="product-sizes-input">
    
                        <div className="product-sizes-options">

                            <ul className="size-options">
                                {inventory.map((item, index) => {        
                                    const isOutOfStock = item.quantity <= 0;

                                
                                    const isSelected = item.size === selectedSize;
                          
                        
                                    const sizeClass = `size-option ${isOutOfStock ? 'out-of-stock' : ''} ${isSelected ? 'selected' : ''}`;
                          

                                    return (
                                        <li key={index} className={sizeClass} onClick={()=> handleSizeClick(item.size)}>
                                            {item.size} {item.quantity <= 0 ? '' : ''}
                                        </li>
                                    );
                                })}
                            </ul>

                        </div>
                    </div>
                    <div className="product-quantity">
                        <div className="quantity-title">
                            <span>QUANTITY</span>
                        </div>
                        <div className="quantity-buttons">

                            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

                            <div className="extra-button"><button className="favorite-button"><HeartIcon className="h-6 w-6" /></button></div>
                            <div className="extra-button"><button className="compare-button"><ArrowsRightLeftIcon className="h-6 w-6" /></button></div>

                        </div>
                    </div>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                    {status === 'loading' && <div className="loading-message">Adding to cart...</div>}
                    {status === 'failed' && error && <div className="error-message">{error}</div>}

                </div>
            </div>
        </div>
    );
};