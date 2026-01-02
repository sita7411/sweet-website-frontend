import { TrashIcon, ShoppingCartIcon, StarIcon } from "@heroicons/react/24/solid";

const wishlistItems = [
  {
    id: 1,
    title: "Pista Chocolate Chikki",
    desc: "Rich chocolate with crunchy pista",
    price: "₹199",
    rating: 4,
    image: "/images/pista.png",
  },
  {
    id: 2,
    title: "Classic Peanut Chikki",
    desc: "Peanut delight for sweet lovers",
    price: "₹149",
    rating: 5,
    image: "/images/peanut.png",
  },
  {
    id: 3,
    title: "Dry Fruit Chikki",
    desc: "Loaded with dry fruits for energy",
    price: "₹249",
    rating: 4,
    image: "/images/dryfruit.png",
  },
];

export default function Wishlist() {
  return (
    <section className="bg-bgMain min-h-screen">
      {/* ===== Banner ===== */}
      <div className="bg-primary py-16 text-center">
        <h1 className="text-4xl font-bold text-white">My Wishlist</h1>
        <p className="mt-2 text-bgSoft">
          Your favorite products saved for later ❤️
        </p>
      </div>

      {/* ===== Wishlist Rows ===== */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-6">
        {wishlistItems.length === 0 ? (
          <p className="text-center text-textMuted">
            Your wishlist is empty
          </p>
        ) : (
          wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 bg-bgSoft px-4 py-4 rounded-lg hover:bg-bgCard transition"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 object-contain rounded-lg bg-bgMain p-2"
              />

              {/* Product Info */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-textMain">
                  {item.title}
                </h3>
                <p className="text-textMuted mt-1">{item.desc}</p>

                {/* Rating */}
                <div className="flex mt-1 justify-center sm:justify-start">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < item.rating ? "text-accent" : "text-bgSoft"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Price + Actions */}
              <div className="flex flex-col items-center sm:items-end gap-3 mt-3 sm:mt-0">
                <span className="text-primary font-bold text-xl">{item.price}</span>

                <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition">
                  <ShoppingCartIcon className="w-5 h-5" />
                  Add to Cart
                </button>

                <button className="bg-bgMain p-3 rounded-lg hover:bg-accent transition">
                  <TrashIcon className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
