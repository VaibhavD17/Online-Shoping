import React from 'react';

function OrderSuccess() {
    return (
        <div className="order-success-container">
            <div className="success-icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M9 11l3 3L22 4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
            </div>
            <h1 className="success-title">Thank You!</h1>
            <p className="success-message">Your order has been placed successfully.</p>
            <button className="go-home-btn" onClick={() => (window.location.href = '/')}>
                Go to Homepage
            </button>
        </div>
    );
}

export default OrderSuccess;