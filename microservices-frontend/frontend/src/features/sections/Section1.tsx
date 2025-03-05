import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";


const Section1: React.FC = () => {




    return (
        <section id="section1">
            <div className="container-slider">
                <div className="carousel-wrapper">
                <   div className="slider-card">
                        <div>
                            <img
                                src="/img/banner2.webp"
                                alt="Descripción"
                                className="img-collection"
                            />
                            <div className="slider-info-container">
                                <div className="slider-info-container-side">
                                    <div className="slider-header"><span>NEWS & TRENDS</span></div>
                                    <div className="slider-title"><h1>Best price,<br /> best selection!</h1></div>
                                    <div className="slider-footer"><span>Get up to 20% off on New Arrivals</span></div>
                                    <div className="slider-button-container"><button className="slider-button-v2">DISCOVER NOW</button></div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );

};

export default Section1;