import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pollCount, setPollCount] = useState(0);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      console.log('SUCCESS: No session_id in URL');
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    const pollOrderStatus = async () => {
      try {
        console.log('SUCCESS: Polling order status, attempt:', pollCount + 1);
        
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('SUCCESS: No token found');
          setError('Please sign in to view your order');
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/session/${sessionId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log('SUCCESS: Order data received:', data);
          setOrder(data);
          
          if (data.status === 'paid') {
            console.log('SUCCESS: Payment confirmed');
            setLoading(false);
          } else if (pollCount < 10) {
            // Continue polling if not paid and under max attempts (increased to 10)
            console.log('SUCCESS: Payment pending, polling again in 2s');
            setTimeout(() => setPollCount(prev => prev + 1), 2000);
          } else {
            console.log('SUCCESS: Max polling attempts reached');
            setLoading(false);
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('SUCCESS: API error:', errorData);
          setError(errorData.error || 'Failed to fetch order');
          setLoading(false);
        }
      } catch (err) {
        console.error('SUCCESS: Fetch error:', err);
        setError('Network error. Please check your connection.');
        setLoading(false);
      }
    };

    pollOrderStatus();
  }, [sessionId, pollCount]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-secondary mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800">Processing Payment...</h2>
          <p className="text-gray-600 mt-2">Please wait while we confirm your order</p>
          <p className="text-gray-500 text-sm mt-2">Attempt {pollCount + 1} of 10</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <a href="/" className="inline-block px-6 py-3 bg-secondary text-white rounded-lg hover:bg-orange-600 transition-colors">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">Unable to retrieve order details</p>
          <a href="/" className="inline-block px-6 py-3 bg-secondary text-white rounded-lg hover:bg-orange-600 transition-colors">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  const items = order.items || [];
  const isPaid = order.status === 'paid';
  const totalAmount = Number(order.total_amount || 0);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${isPaid ? 'bg-green-100' : 'bg-yellow-100'}`}>
            {isPaid ? (
              <svg
                className="w-16 h-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-16 h-16 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {isPaid ? 'Payment Successful!' : 'Order Processing'}
          </h1>
          <p className="text-gray-600 text-lg">
            {isPaid 
              ? 'Thank you for your order. Your payment has been processed successfully.'
              : 'Your order is being processed. We will confirm payment shortly.'}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Order ID:</span>
                <span className="ml-2 font-semibold text-gray-800">#{order.id || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className={`ml-2 font-semibold ${
                  isPaid ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {isPaid ? 'Paid' : 'Processing'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Date:</span>
                <span className="ml-2 font-semibold text-gray-800">
                  {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Items List */}
          <h3 className="text-xl font-bold text-gray-800 mb-4">Items Ordered</h3>
          {items.length > 0 ? (
            <div className="space-y-4 mb-6">
              {items.map((item, index) => {
                const price = Number(item.price || item.unit_price || 0);
                const quantity = Number(item.quantity || 0);
                const subtotal = price * quantity;
                return (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name || 'Unknown Item'}</h4>
                      <p className="text-sm text-gray-600">
                        Qty: {quantity} × ${price.toFixed(2)}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-800">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 mb-6">No items found</p>
          )}

          {/* Total */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-secondary">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Return Button */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-block px-8 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Return to Menu
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
