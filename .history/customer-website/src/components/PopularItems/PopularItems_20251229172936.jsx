'use client';

import { motion } from 'framer-motion';

const popularItems = [
    {
        name: 'Classic Chikki',
        img: 'pista.png',
        desc: 'Crunchy peanut & jaggery delight',
        price: '$5.99',
    },
    {
        name: 'Strawberry Chikki',
        img: 'stwabarry_chikki.png',
        desc: 'Fruity strawberry crunch',
        price: '$6.49',
    },
    {
        name: 'Mango Chikki',
        img: 'mango_chikki.png',
        desc: 'Sweet mango infused chikki',
        price: '$6.99',
    },
    {
        name: 'Chocolate Chikki',
        img: 'choclate.png',
        desc: 'Rich chocolate coated goodness',
        price: '$7.49',
    },
];

export default function PopularItems() {
    return (
        <section className="py-20 bg-[#FFF9F1]">
            <div className="max-w-7xl mx-auto px-8">
                {/* Section Title */}
                <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">
                    Popular Items
                </h2>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {popularItems.map((item) => (
                        <motion.div
                            key={item.name}
                            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center p-4 hover:shadow-xl transition"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-36 h-36 mb-4">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-gray-500 text-sm mt-1 text-center">{item.desc}</p>
                            <span className="text-yellow-600 font-bold mt-2">{item.price}</span>

                            <button className="mt-4 bg-[#FBC02D] px-6 py-2 rounded-full font-semibold shadow hover:brightness-105 transition">
                                Add to Cart
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
