// Wishlist.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const wishlistProducts = [
  {
    id: 1,
    title: 'Light Brown Sweater',
    color: 'Light Brown',
    size: 'XXL',
    price: '$64.00',
    date: '18 February 2024',
    stock: 'In stock',
    img: '/images/product1.png', // replace with your images
  },
  {
    id: 2,
    title: 'Modern Brown Dress',
    color: 'Brown',
    size: 'S',
    price: '$90.00',
    date: '17 February 2024',
    stock: 'In stock',
    img: '/images/product2.png',
  },
  {
    id: 3,
    title: 'Brown Winter Coat',
    color: 'Brown',
    size: 'M',
    price: '$60.00',
    date: '11 February 2024',
    stock: 'In stock',
    img: '/images/product3.png',
  },
  {
    id: 4,
    title: 'Classic White Shirt',
    color: 'White',
    size: 'S',
    price: '$45.00',
    date: '05 February 2024',
    stock: 'In stock',
    img: '/images/product4.png',
  },
  {
    id: 5,
    title: 'Trendy Brown Coat',
    color: 'Brown',
    size: 'XXL',
    price: '$75.00',
    date: '05 February 2024',
    stock: 'In stock',
    img: '/images/product5.png',
  },
];

const Wishlist = () => {
  return (
    <div className="bg-[var(--bg-main)] min-h-screen">
      {/* Banner */}
      <div className="bg-[var(--secondary)] py-12">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-3xl font-bold">Wishlist</h1>
          <p className="mt-2 text-sm">
            Home / <span className="font-semibold">Wishlist</span>
          </p>
        </div>
      </div>

      {/* Wishlist Table */}
      <div className="container mx-auto mt-10 px-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-200">
            <thead className="bg-[var(--accent)] text-[var(--text-main)]">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Date Added</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlistProducts.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-4 px-4 flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-[var(--text-muted)]">
                        Color: {item.color} | Size: {item.size}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">{item.price}</td>
                  <td className="py-4 px-4">{item.date}</td>
                  <td className="py-4 px-4 text-green-600">{item.stock}</td>
                  <td className="py-4 px-4">
                    <button className="bg-[var(--secondary)] text-white px-4 py-2 rounded hover:bg-[var(--primary)] transition">
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Wishlist Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              readOnly
              value="https://www.example.com"
              className="border border-gray-300 px-4 py-2 rounded w-full sm:w-72"
            />
            <button className="bg-[var(--secondary)] text-white px-4 py-2 rounded hover:bg-[var(--primary)] transition">
              Copy
            </button>
          </div>
          <div className="flex gap-4">
            <button className="text-[var(--text-main)] underline hover:text-[var(--primary)] transition">
              Clear Wishlist
            </button>
            <button className="bg-[var(--secondary)] text-white px-4 py-2 rounded hover:bg-[var(--primary)] transition">
              Add All to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
