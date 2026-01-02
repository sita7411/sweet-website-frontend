import React from 'react';

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
  return (
    <div className=" min-h-screen">
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
      <div className="container mx-auto mt-10 py-10 px-6">
        <div className="overflow-x-auto shadow rounded">
          <table className="w-full min-w-[700px] text-left border border-gray-200">
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
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-[var(--bg-soft)] transition"
                >
                  <td className="py-4 px-4 flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-[var(--text-muted)]">
                        {item.color} | {item.size}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium">{item.price}</td>
                  <td className="py-4 px-4">{item.date}</td>
                  <td
                    className={`py-4 px-4 font-medium ${
                      item.stock === 'In stock' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.stock}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      className={`px-4 py-2 rounded text-white ${
                        item.stock === 'In stock'
                          ? 'bg-[var(--secondary)] hover:bg-[var(--primary)]'
                          : 'bg-gray-400 cursor-not-allowed'
                      } transition`}
                      disabled={item.stock !== 'In stock'}
                    >
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
          <div className="flex gap-2 items-center w-full sm:w-auto">
            <input
              type="text"
              readOnly
              value="https://www.chikkistore.com/wishlist"
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
