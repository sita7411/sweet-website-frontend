'use client';

import {
    UsersIcon,
    CubeIcon,
    SparklesIcon,
    TrophyIcon,
} from '@heroicons/react/24/solid';

export default function StatsSection() {
    const stats = [
        { icon: UsersIcon, value: '1,800+', label: 'Satisfied Clients' },
        { icon: CubeIcon, value: '362+', label: 'Active Products' },
        { icon: SparklesIcon, value: '30+', label: 'Food Categories' },
        { icon: TrophyIcon, value: '1,800+', label: 'Awards Winning' },
    ];

    return (
        <section
            className="relative py-19 overflow-hidden bg-center bg-cover"
            style={{
                backgroundImage: "url('Frame 36.png')",
            }}
        >
            {/* Overlay (for text readability) */}
            <div className="absolute inset-0 bg-[var(--bg-main)] opacity-10"></div>

            {/* Content */}
            <div className="relative z-10 ">



                {/* Stats */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 text-center px-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">

                            <div className="mb-4">
                                {/* Outer circle */}
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center"
                                    style={{
                                        backgroundColor: 'var(--accent)',      // yellow fill
                                        border: '2px solid var(--secondary)',   // brown border
                                    }}
                                >
                                    {/* Inner circle */}
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
                                        style={{
                                            backgroundColor: 'var(--primary)',    // dark fill
                                            border: '2px solid var(--secondary)', // dark border
                                        }}
                                    >
                                        <stat.icon className="w-7 h-7 text-[var(--bg-main)]" />
                                    </div>
                                </div>
                            </div>



                            <h3 className="text-3xl font-bold text-[var(--secondary)]">
                                {stat.value}
                            </h3>

                            <p className="mt-2 text-[var(--text-muted)] font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
