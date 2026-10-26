import React from 'react';

const QuantityStepper = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrement}
        disabled={quantity <= 0}
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-gray-700 transition-colors"
      >
        -
      </button>
      <span className="w-8 text-center font-semibold text-gray-800">{quantity}</span>
      <button
        onClick={onIncrement}
        className="w-8 h-8 rounded-full bg-secondary hover:bg-orange-600 flex items-center justify-center font-bold text-white transition-colors"
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
