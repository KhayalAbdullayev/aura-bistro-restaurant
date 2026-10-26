import React, { useState, useEffect } from 'react';
import QuantityStepper from './QuantityStepper';

const MenuItem = ({ item, onQuantityChange, initialQuantity = 0 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  const subtotal = quantity * item.price;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border-b border-dashed border-gray-200 last:border-0">
      <div className="flex-1">
        <h4 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h4>
        <p className="text-gray-600 text-sm">{item.description}</p>
        {quantity > 0 && (
          <p className="text-secondary font-semibold mt-2">
            Subtotal: ${subtotal.toFixed(2)}
          </p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-amber-600 text-xl whitespace-nowrap">
          ${item.price}
        </span>
        <QuantityStepper
          quantity={quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </div>
    </div>
  );
};

export default MenuItem;
