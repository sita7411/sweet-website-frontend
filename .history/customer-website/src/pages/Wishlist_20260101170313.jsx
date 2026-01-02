import React from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const wishlistProducts = [
  {
    id: 1,
    title: 'Pista Chocolate Chikki',
    color: 'Chocolate & Peanut Blend',
    size: '250g',
    price: '$12.00',
    date: '18 January 2026',
    stock: 'In stock',
    img: '/images/pista.png',
  },
  {
    id: 2,
    title: 'Cashew Chikki',
    color: 'Cashew & Jaggery',
    size: '200g',
    price: '$15.00',
    date: '15 January 2026',
    stock: 'In stock',
    img: '/images/cashew.png',
  },
  {
    id: 3,
    title: 'Almond Chikki',
    color: 'Almond & Jaggery',
    size: '300g',
    price: '$18.00',
    date: '12 January 2026',
    stock: 'Out of stock',
    img: '/images/almond.png',
  },
];

const Wishlist = () => {
  const handleAddToCart = (item) => {
    if (item.stock === 'In stock') {
      toast.success(`${item.title} added to cart!`);
    } else {
      toast.error(`${item.title} is out of stock!`);
    }
  };

  const handleAddAllToCart = () => {
    const inStockItems = wishlistProducts.filter((item) => item.stock === 'In stock');
    if (inStockItems.length > 0) {
      toast.success('All in-stock items added to cart!');
    } else {
      toast.warn('No items in stock to add!');
    }
  };

  const handleClearWishlist = () => {
    toast.info('Wishlist cleared!');
    // Optionally, clear state if wishlist is dynamic
  };

  return (
    <div className="min-h-screen ">
      {/* Banner */}
      <div className="relative">
        <img
          src="login.png"
          alt="Wishlist Banner"
          className="w-full h-64 object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Wishlist</h1>
          <p className="mt-2 text-sm md:text-base">
            Home / <span className="font-semibold">Wishlist</span>
          </p>
        </div>
      </div>

      {/* Wishlist Table */}
      <div className="container mx-auto mt-12 mb-12 px-4 md:px-10">
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full min-w-[700px] text-left border border-gray-200">
            <thead className="bg-[var(--accent)] text-[var(--text-main)]">
              <tr>
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Date Added</th>
                <th className="py-3 px-6">Stock Status</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlistProducts.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-200 hover:bg-[var(--bg-soft)] transition"
                >
                  <td className="py-4 px-6 flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded shadow-sm"
                    />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-[var(--text-muted)]">
                        {item.color} | {item.size}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium">{item.price}</td>
                  <td className="py-4 px-6">{item.date}</td>
                  <td
                    className={`py-4 px-6 font-medium ${
                      item.stock === 'In stock' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.stock}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      className={`px-4 py-2 rounded text-white font-semibold transition 
                        ${
                          item.stock === 'In stock'
                            ? 'bg-[var(--secondary)] hover:bg-[var(--primary)]'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                      disabled={item.stock !== 'In stock'}
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Wishlist Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="flex gap-2 items-center w-full sm:w-auto">
            <input
              type="text"
              readOnly
              value="https://www.chikkistore.com/wishlist"
              className="border border-gray-300 px-4 py-2 rounded w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
            />
            <button
              className="bg-[var(--secondary)] text-white px-4 py-2 rounded hover:bg-[var(--primary)] transition font-semibold"
              onClick={() => {
                navigator.clipboard.writeText('https://www.chikkistore.com/wishlist');
                toast.success('Wishlist link copied!');
              }}
            >
              Copy
            </button>
          </div>
          <div className="flex gap-4">
            <button
              className="text-[var(--text-main)] underline hover:text-[var(--primary)] transition font-semibold"
              onClick={handleClearWishlist}
            >
              Clear Wishlist
            </button>
            <button
              className="bg-[var(--secondary)] text-white px-4 py-2 rounded hover:bg-[var(--primary)] transition font-semibold"
              onClick={handleAddAllToCart}
            >
              Add All to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container with custom theme */}
   <ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  pauseOnFocusLoss
  draggable
  pauseOnHover
  transition={Slide}
  toastStyle={{
    background: 'var(--bg-main)',
    color: 'var()',
    fontWeight: 600,
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '14px 20px',
  }}
/>

    </div>
  );
};

export default Wishlist;
