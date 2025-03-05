import React from "react";
import "./Home.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
export const Home: React.FC = () => {

  return (
    <div className="home-container-flex">
      <div className="home-container">
        <button className="carousel2-navv prev">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <Swiper
          className="slider-card"
          spaceBetween={0}
          slidesPerView={1}

          navigation={{
            prevEl: ".carousel2-navv.prev",
            nextEl: ".carousel2-navv.next",
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Navigation]}

        >


        
        <SwiperSlide >
        <div className="collection-container">
          <img
            src="/img/img_04_f8346079-19c4-4fe8-bf22-666df5423795.jpg"
            alt="Descripción"
            className="img-collection"
          />
          <div className="collection-info-container">
            <div className="collection-header"><span>MODERN ESSENTIALS</span></div>
            <div className="collection-title"><h1>Sale up to 50% off</h1></div>
            <div className="collection-footer"><span>Get your Fashion Style</span></div>
            <div className="collection-button-container"><button className="collection-button">SHOP THIS COLLECTION</button></div>

          </div>
        </div>
        </SwiperSlide>
        <SwiperSlide >
        <div className="collection-container">
          <img
            src="/img/img_02_e270cf9a-5983-4ff9-9bdc-772b5ad5410e.jpg"
            alt="Descripción"
            className="img-collection"
          />
          <div className="collection-info-container">
            <div className="collection-info-container-side">
              <div className="collection-header"><span>HAPPENING NOW</span></div>
              <div className="collection-title"><h1>2023 Menswear Trends</h1></div>
              <div className="collection-footer"><span>The latest trends in fashion</span></div>
              <div className="collection-button-container"><button className="collection-button-v2">SHOP THIS COLLECTION</button></div>
            </div>


          </div>
        </div>
        </SwiperSlide>
        <SwiperSlide >
        <div className="collection-container">
          <img
            src="/img/img_03_599488cf-afa8-4f97-a1c3-2a03eb09a107.jpg"
            alt="Descripción"
            className="img-collection"
          />
          <div className="collection-info-container">
            <div className="collection-header"><span>NEW IN THIS WEEK</span></div>
            <div className="collection-title"><h1>Women's Clothing</h1></div>
            <div className="collection-footer"><span>The latest trends in fashion</span></div>
            <div className="collection-button-container"><button className="collection-button">SHOP THIS COLLECTION</button></div>

          </div>
        </div>
        </SwiperSlide>
        </Swiper>
        <button className="carousel2-navv next">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
    </div>

  );
};