import { HeartIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/solid";

const wishlistItems = [
  {
    id: 1,
    title: "Pista Chocolate Chikki",
    price: "₹199",
    image: "/images/pista.png",
  },
  {
    id: 2,
    title: "Classic Peanut Chikki",
    price: "₹149",
    image: "/images/peanut.png",
  },
  {
    id: 3,
    title: "Dry Fruit Chikki",
    price: "₹249",
    image: "/images/dryfruit.png",
  },
];

export default function Wishlist() {
  return (
    <div className="bg-bgMain min-h-screen">
      {/* ===== Banner Section ===== */}
      <div className="bg-primary text-white py-14 text-center">
        <h1 className="text-4xl font-bold mb-2">My Wishlist</h1>
        <p className="text-bgSoft">
          Your favourite products saved for later ❤️
        </p>
      </div>

      {/* ===== Wishlist Content ===== */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <HeartIcon className="w-14 h-14 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-textMain">
              Your wishlist is empty
            </h2>
            <p className="text-textMuted mt-2">
              Start adding products you love 💖
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-bgCard rounded-2xl shadow-md hover:shadow-xl transition p-5 relative"
              >
                {/* Remove Icon */}
                <button className="absolute top-4 right-4 bg-bgSoft p-2 rounded-full hover:bg-primary hover:text-white transition">
                  <TrashIcon className="w-5 h-5 text-primary" />
                </button>

                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-contain mb-4"
                />

                {/* Product Info */}
                <h3 className="text-lg font-semibold text-textMain">
                  {item.title}
                </h3>
                <p className="text-primary font-bold mt-1">{item.price}</p>

                {/* Actions */}
                <div className="mt-5 flex gap-3">
                  <button className="flex-1 bg-primary text-white py-2 rounded-xl hover:bg-secondary transition flex items-center justify-center gap-2">
                    <ShoppingCartIcon className="w-5 h-5" />
                    Add to Cart
                  </button>

                  <button className="bg-bgSoft p-3 rounded-xl hover:bg-accent transition">
                    <HeartIcon className="w-5 h-5 text-primary" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
