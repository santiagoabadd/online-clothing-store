import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";


const Slider: React.FC = () => {




    return (
        <section id="slider">
            <div className="container-slider">
                <div className="carousel-wrapper">
                    <button className="carousel-navv prev">
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <Swiper
                        className="slider-card"
                        spaceBetween={0}
                        slidesPerView={1}

                        navigation={{
                            prevEl: ".carousel-navv.prev",
                            nextEl: ".carousel-navv.next",
                        }}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        modules={[Navigation]}

                    >
                        <SwiperSlide >
                            <div>
                                <img
                                    src="/img/slide1.webp"
                                    alt="Descripción"
                                    className="img-collection"
                                />
                                <div className="slider-info-container">
                                    <div className="slider-info-container-side">
                                        <div className="slider-header"><span>FASHION GUIDE</span></div>
                                        <div className="slider-title"><h1>Denim Perfect</h1></div>
                                        <div className="slider-footer"><span>Shop the latest clothing, shoes, and handbags from top fashion brands, style icons, and celebrities.</span></div>
                                        <div className="slider-button-container"><button className="slider-button-v2">DISCOVER NOW</button></div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <div>
                                <img
                                    src="/img/slide2.webp"
                                    alt="Descripción"
                                    className="img-collection"
                                />
                                <div className="slider-info-container">
                                    <div className="slider-info-container-side">
                                        <div className="slider-header"><span>MEN'S SWEATERS AND CARDIGANS</span></div>
                                        <div className="slider-title"><h1>New season edit</h1></div>
                                        <div className="slider-footer"><span>You can't go wrong with a simple men's half zip pullover and jeans</span></div>
                                        <div className="slider-button-container"><button className="slider-button-v2">DISCOVER NOW</button></div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <div>
                                <img
                                    src="/img/slide3.webp"
                                    alt="Descripción"
                                    className="img-collection"
                                />
                            </div>
                            <div className="slider-info-container">
                                    <div className="slider-info-container-side">
                                        <div className="slider-header"><span>WOMEN'S ACCESSORIES</span></div>
                                        <div className="slider-title"><h1>Update your look!</h1></div>
                                        <div className="slider-footer"><span>You can find everything from wallets for women, to handbags, belts, hats and jewelry in this selection.</span></div>
                                        <div className="slider-button-container"><button className="slider-button-v2">DISCOVER NOW</button></div>
                                    </div>
                                </div>
                        </SwiperSlide>
                    </Swiper>
                    <button className="carousel-navv next">
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </section>
    );

};

export default Slider;