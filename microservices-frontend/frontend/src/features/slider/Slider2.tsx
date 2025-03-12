import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, PanelRightClose } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { UserIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { all } from "axios";



const Slider2: React.FC = () => {


    return (
        <section id="slider2">
            <div className="slider2-container">
                <div className="slider2-header"><h2>Our blog</h2></div>
                <div className="slider2-wrapper">
                    <button className="slider2-nav prev">
                        <ChevronLeft className="h-3 w-3" />
                    </button>
                    <Swiper
                        className="slider2-cards-container"
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation={{
                            prevEl: ".slider2-nav.prev",
                            nextEl: ".slider2-nav.next",
                        }}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        modules={[Navigation]}
                    >
                        <SwiperSlide>

                            <div className="slider2-cards">
                                <div className="slide2-img-container">
                                    <img src="/img/Rectangle_254_5.webp" alt="" className="slide2-img" />
                                </div>

                                <div className="slide2-info">
                                    <div className="slider2-title"><span>Dresses all year round</span></div>
                                    <div className="slider2-span"><UserIcon className="slider-span1 h-4 w-4" /><span className="slider-span2">By</span><span className="slider-span3">Tony Stark</span><span className="slider-span4">Feb 16, 23</span><ChatBubbleBottomCenterIcon className="slider-span6 h-4 w-4" /><span className="slider-span5">1</span></div>
                                    <div className="slider2-footer"><span>In winter, there are few reasons to dress up, so we do not want to deprive ourselves of the joy of walking...</span></div>
                                    <div className="slider2-button-container"><button className="slider-button-v2">READ MORE</button></div>
                                </div>
                            </div>

                        </SwiperSlide>
                        <SwiperSlide>

                            <div className="slider2-cards">
                                <div className="slide2-img-container">
                                    <img src="/img/Rectangle_254.webp" alt="" className="slide2-img" />
                                </div>

                                <div className="slide2-info">
                                    <div className="slider2-title"><span>The most famous collections of Christian Dior</span></div>
                                    <div className="slider2-span"><UserIcon className="slider-span1 h-4 w-4" /><span className="slider-span2">By</span><span className="slider-span3">Tony Stark</span><span className="slider-span4">Feb 16, 23</span><ChatBubbleBottomCenterIcon className="slider-span6 h-4 w-4" /><span className="slider-span5">1</span></div>                                                                                                            .
                                    <div className="slider2-footer"><span>The history of the fashion house Christian Dior began in 1946 in a small mansion on the Parisian street Montaigne.The founder of...</span></div>
                                    <div className="slider2-button-container"><button className="slider-button-v2">READ MORE</button></div>
                                </div>
                            </div>

                        </SwiperSlide>
                        <SwiperSlide>

                            <div className="slider2-cards">
                                <div className="slide2-img-container">
                                    <img src="/img/Rectangle_254_4.webp" alt="" className="slide2-img" />
                                </div>

                                <div className="slide2-info">
                                    <div className="slider2-title"><span>White shirt. Which shirt to choose?</span></div>
                                    <div className="slider2-span"><UserIcon className="slider-span1 h-4 w-4" /><span className="slider-span2">By</span><span className="slider-span3">Tony Stark</span><span className="slider-span4">Feb 16, 23</span><ChatBubbleBottomCenterIcon className="slider-span6 h-4 w-4" /><span className="slider-span5">1</span></div>
                                    <div className="slider2-footer"><span>It all started with the Bottega Veneta white t-shirt + jeans look, which became the most downloaded. We can offer you beautiful...</span></div>
                                    <div className="slider2-button-container"><button className="slider-button-v2">READ MORE</button></div>
                                </div>
                            </div>

                        </SwiperSlide>
                    </Swiper>
                    <button className="slider2-nav next">
                        <ChevronRight className="h-3 w-3" />
                    </button>
                </div>
            </div>

        </section>

    );
}
export default Slider2;