import { TrashIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

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
    <section className="bg-bgMain min-h-screen">
      {/* ===== Banner ===== */}
      <div className="bg-primary py-14 text-center">
        <h1 className="text-4xl font-bold text-white">Wishlist</h1>
        <p className="text-bgSoft mt-1">
          Products you saved for later ❤️
        </p>
      </div>

      {/* ===== Wishlist Rows ===== */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {wishlistItems.length === 0 ? (
          <p className="text-center text-textMuted">
            Your wishlist is empty
          </p>
        ) : (
          <div className="space-y-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-6 bg-bgSoft px-6 py-4 rounded-xl"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain bg-bgMain rounded-lg p-2"
                />

                {/* Title */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-textMain">
                    {item.title}
                  </h3>
                </div>

                {/* Price */}
                <div className="text-primary font-bold text-lg">
                  {item.price}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition flex items-center gap-2">
                    <ShoppingCartIcon className="w-5 h-5" />
                    Add
                  </button>

                  <button className="bg-bgMain p-3 rounded-lg hover:bg-accent transition">
                    <TrashIcon className="w-5 h-5 text-primary" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
