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
            className="relative py-16 overflow-hidden bg-center bg-cover"
            style={{
                backgroundImage: "url('Frame 36.png')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[var(--bg-main)] opacity-10"></div>

            {/* Content */}
            <div className="relative z-10">

                {/* Stats */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center px-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center px-4 relative">
                            
                            {/* Divider (except last item) */}
                            {index !== stats.length - 1 && (
                                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 h-12 w-[1px] bg-[var(--secondary)]"></div>
                            )}

                            <div className="mb-3">
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
                                        className="w-17 h-17 rounded-full flex items-center justify-center shadow-md"
                                        style={{
                                            backgroundColor: 'var(--primary)',
                                            border: '2px solid var(--secondary)',
                                        }}
                                    >
                                        <stat.icon className="w-7 h-7 text-[var(--bg-main)]" />
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-3xl font-bold text-[var(--secondary)]">
                                {stat.value}
                            </h3>

                            <p className="mt-1 text-[var(--text-muted)] font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
