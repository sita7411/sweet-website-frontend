'use client';

export default function StatsSection() {
    const stats = [
        { img: '/images/users.png', value: '5,000+', label: 'Happy Customers' },
        { img: '/images/cube.png', value: '50+', label: 'Chikki Varieties' },
        { img: '/images/sparkles.png', value: '10+', label: 'Special Flavors' },
        { img: '/images/cart.png', value: '1,00,000+', label: 'Chikki Sold' },
    ];

    return (
        <section
            className="relative py-24 overflow-hidden bg-center bg-cover"
            style={{
                backgroundImage: "url('Frame 36.png')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[var(--bg-main)] opacity-10"></div>

            {/* Content */}
            <div className="relative z-10">
                {/* Stats */}
                <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 text-center px-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center relative px-2">
                            {/* Divider (except last item) */}
                            {index !== stats.length - 1 && (
                                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 h-24 w-[1px] opacity-30 bg-[var(--text-muted)]"></div>
                            )}

                            <div className="mb-2">
                                {/* Outer circle */}
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center"
                                    style={{
                                        backgroundColor: 'var(--accent)',
                                        border: '2px solid var(--secondary)',
                                    }}
                                >
                                    {/* Inner circle */}
                                    <div
                                        className="w-18 h-18 rounded-full flex items-center justify-center shadow-md overflow-hidden"
                                        style={{
                                            backgroundColor: 'var(--primary)',
                                            border: '2px solid var(--secondary)',
                                        }}
                                    >
                                        <img 
                                            src={stat.img} 
                                            alt={stat.label} 
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-[var(--secondary)]">
                                {stat.value}
                            </h3>

                            <p className="mt-1 text-[var(--text-muted)] font-medium text-sm">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
