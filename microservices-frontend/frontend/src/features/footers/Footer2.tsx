import React from "react";
import "./Footer.css";
import { PhoneIcon,ClockIcon,EnvelopeIcon} from '@heroicons/react/24/outline';


export const Footer2: React.FC = () => {

    return (
        <section id="footer2">
            <div className="footer2-container-flex">
            <div className="footer2-title">
                <h2>Receive exclusive promotions,<br></br>
                private sales and news</h2>
            </div>
            <div className="footer2-description">
                <p>Be the first to know about new collections and exclusive offers.</p>
            </div>

            <div className="footer2-mail">
                <p>Email</p>
                
            </div>
            
        </div>
        </section>
        

    );
};