// OrderCompleted.jsx
import React from 'react';

const orderProducts = [
  { id: 1, name: 'Pista Chikki', color: 'Chocolate', size: '250g', price: 300, img: '/images/pista.png' },
  { id: 2, name: 'Dry Fruit Chikki', color: 'Mixed Nuts', size: '200g', price: 165, img: '/images/dryfruit.png' },
  { id: 3, name: 'Peanut Chikki', color: 'Peanut', size: '150g', price: 63, img: '/images/peanut.png' },
  { id: 4, name: 'Almond Chikki', color: 'Almond', size: '100g', price: 180, img: '/images/almond.png' },
];

const OrderCompleted = () => {
  const subtotal = orderProducts.reduce((sum, item) => sum + item.price, 0);
  const shipping = 0;
  const taxes = 0;
  const couponDiscount = 100;
  const total = subtotal + shipping + taxes - couponDiscount;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-4">
      <div className="bg-[var(--bg-card)] shadow-lg rounded-lg max-w-3xl w-full">
        {/* Header */}
        <div className="text-center p-8 border-b border-gray-200">
          <div className="text-[var(--accent)] text-4xl mb-4">✔</div>
          <h1 className="text-[var(--text-main)] text-2xl font-semibold mb-2">Your order is completed!</h1>
          <p className="text-[var(--text-muted)]">Thank you. Your order has been received.</p>
        </div>

        {/* Order Summary */}
        <div className="bg-[var(--bg-soft)] p-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-200">
          <div className="mb-4 md:mb-0 space-y-2">
            <p><span className="font-semibold">Order ID:</span> #SDGT1254FD</p>
            <p><span className="font-semibold">Payment Method:</span> Paypal</p>
            <p><span className="font-semibold">Transaction ID:</span> TR542SSFE</p>
            <p><span className="font-semibold">Estimated Delivery Date:</span> 24 February 2024</p>
          </div>
          <button className="bg-[var(--primary)] text-white px-6 py-2 rounded hover:bg-[var(--secondary)] transition">
            Download Invoice
          </button>
        </div>

        {/* Order Details */}
        <div className="p-6">
          <h2 className="text-[var(--text-main)] font-semibold text-lg mb-4">Order Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 text-[var(--text-muted)]">Product</th>
                  <th className="py-2 text-[var(--text-muted)]">Sub Total</th>
                </tr>
              </thead>
              <tbody>
                {orderProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100">
                    <td className="py-4 flex items-center gap-4">
                      <img src={product.img} alt={product.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <p className="text-[var(--text-main)] font-medium">{product.name}</p>
                        <p className="text-[var(--text-muted)] text-sm">
                          Color: {product.color} | Size: {product.size}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 text-[var(--text-main)] font-semibold">${product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-6 max-w-md ml-auto space-y-2 text-right">
            <div className="flex justify-between text-[var(--text-muted)]"><span>Shipping:</span> <span>${shipping}</span></div>
            <div className="flex justify-between text-[var(--text-muted)]"><span>Taxes:</span> <span>${taxes}</span></div>
            <div className="flex justify-between text-[var(--primary)] font-semibold"><span>Coupon Discount:</span> <span>-${couponDiscount}</span></div>
            <div className="flex justify-between text-[var(--text-main)] font-bold text-lg"><span>Total:</span> <span>${total}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCompleted;
