import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import {callApi} from "../../helpers/axios_helper"


interface ProductObject {
  id: number;
  sku: string;
  name: string;
  category: string;
  discount: number;
  price: number;
  size?: string[];
}

const ProductsCollection: React.FC = () => {


  let navigate = useNavigate();

  const [products, setProducts] = useState<ProductObject[]>([]);

    useEffect(() => {
          loadProducts();
      }, []);

    const handleProductClick = (id: string) => {
      navigate(`/product/${id}`);
    };

    const loadProducts = async () => {
            try {
                const result = await callApi(`/api/product/all`);
                setProducts(result.data);
            } catch (error) {
                console.error('Failed to load products:', error);
            }
        };



  return (
    <section id="carousel">
      <div className="container">
        <div className="carousel-wrapper">
          <button className="carousel-nav prev">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <Swiper
            spaceBetween={10}
            slidesPerView={5}
            slidesPerGroup={5}
            navigation={{
              prevEl: ".carousel-nav.prev",
              nextEl: ".carousel-nav.next",
            }}
            breakpoints={{
              568: { slidesPerView: 2, slidesPerGroup: 2 },
              768: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 2, slidesPerGroup: 2 },
              1200: { slidesPerView: 3, slidesPerGroup: 3 },
            }}
            modules={[Navigation]}
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id}>
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
                                            <div className="price-real">${(product.price-((product.price/100)*product.discount)).toFixed(2)}</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </li>
                            </SwiperSlide>))}
          </Swiper>
          <button className="carousel-nav next">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsCollection;