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
    <section className="bg-bgMain min-h-screen">
      {/* ===== Banner ===== */}
      <div className="relative bg-primary py-16 text-center">
        <h1 className="text-4xl font-bold text-white">My Wishlist</h1>
        <p className="mt-2 text-bgSoft">
          Save your favourite sweets for later ❤️
        </p>

        {/* Decorative shape */}
        <div className="absolute bottom-0 left-0 w-full h-6 bg-bgMain rounded-t-[40px]" />
      </div>

      {/* ===== Wishlist Cards ===== */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-24">
            <HeartIcon className="w-16 h-16 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-semibold text-textMain">
              Wishlist is empty
            </h2>
            <p className="text-textMuted mt-2">
              Add items you love ❤️
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-bgCard rounded-2xl p-5 shadow-md hover:shadow-xl transition group"
              >
                {/* Image */}
                <div className="bg-bgSoft rounded-xl p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 w-full object-contain group-hover:scale-105 transition"
                  />
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-textMain">
                    {item.title}
                  </h3>

                  <p className="text-primary text-xl font-bold mt-1">
                    {item.price}
                  </p>

                  {/* Buttons */}
                  <div className="mt-5 flex gap-3">
                    <button className="flex-1 bg-primary text-white py-2.5 rounded-xl hover:bg-secondary transition flex items-center justify-center gap-2">
                      <ShoppingCartIcon className="w-5 h-5" />
                      Add to Cart
                    </button>

                    <button className="p-3 bg-bgSoft rounded-xl hover:bg-accent transition">
                      <TrashIcon className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
