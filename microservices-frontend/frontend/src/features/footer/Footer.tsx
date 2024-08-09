import React from "react";
import "./Footer.css";
import { PhoneIcon,ClockIcon,EnvelopeIcon} from '@heroicons/react/24/outline';


export const Footer: React.FC = () => {

    return (
        <div className="footer-content">
            <div className="footer-container-flex">
            <div className="footer-section">
                <h2>COLLECTIONS</h2>
                <ul className="footer-list-v1">
                    <li><a href="">Accessories</a></li>
                    <li><a href="">Bags</a></li>
                    <li><a href="">Beauty</a></li>
                    <li><a href="">Clothes</a></li>
                    <li><a href="">Gifts</a></li>
                    <li><a href="">Shoes</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h2>INFORMATION</h2>
                <ul className="footer-list-v1">
                    <li><a href="">My account</a></li>
                    <li><a href="">Order history</a></li>
                    <li><a href="">Wishlist</a></li>
                    <li><a href="">My addresses</a></li>
                    <li><a href="">My cart</a></li>
                    <li><a href="">Search</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h2>CONTACTS</h2>
                <ul className="footer-list-v2">
                    <li><a href=""><ClockIcon className="h-8 w-8"/>We offer 24/7 customer service</a></li>
                    <li><a href=""><PhoneIcon className="h-6 w-6"/>Call Us:800-123-4567</a></li>
                    <li><a href=""><EnvelopeIcon className="h-6 w-6"/>Send us an email</a></li>
                    
                </ul>
            </div>
            <div className="footer-section">
                <h2>Join our newsletter</h2>
                <div><span> Subscribe to our newsletter and we will ship 20% discount code today</span></div>
            </div>
            
        </div>
        </div>
        

    );
};