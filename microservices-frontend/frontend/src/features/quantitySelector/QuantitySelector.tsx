import React, { useState, useRef, useEffect } from 'react';

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onQuantityChange }) => {
    const quantityInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (quantityInputRef.current) {
            quantityInputRef.current.value = quantity.toString();
        }
    }, [quantity]);

    const handleIncrease = () => {
        if (quantityInputRef.current) {
            const newQuantity = quantity + 1;
            onQuantityChange(newQuantity);
        }
    };

    const handleDecrease = () => {
        if (quantityInputRef.current) {
            const newQuantity = Math.max(quantity - 1, 1);
            onQuantityChange(newQuantity);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), 1);
        onQuantityChange(value);
    };

    return (
        <div className="quantity-selector">
            <button className="quantity-button" onClick={handleDecrease}>
                -
            </button>
            <input
                type="number"
                className="quantity-input"
                ref={quantityInputRef}
                value={quantity}
                onChange={handleChange}
                min="1"
            />
            <button className="quantity-button" onClick={handleIncrease}>
                +
            </button>
        </div>
    );
};

export default QuantitySelector;