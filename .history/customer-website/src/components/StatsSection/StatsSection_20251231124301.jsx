'use client';

import {
  UsersIcon,
  CubeIcon,
  LeafIcon,
  TrophyIcon,
} from '@heroicons/react/24/solid';

export default function StatsSection() {
  const stats = [
    {
      icon: UsersIcon,
      value: '1,800+',
      label: 'Satisfied Clients',
    },
    {
      icon: CubeIcon,
      value: '362+',
      label: 'Active Products',
    },
    {
      icon: SparklesIcon,
      value: '30+',
      label: 'Food Categories',
    },
    {
      icon: TrophyIcon,
      value: '1,800+',
      label: 'Awards Winning',
    },
  ];

  return (
    <section className="relative bg-[var(--bg-main)] py-20 overflow-hidden">
      
      {/* Decorative Divider */}
      <div className="flex items-center justify-center mb-14">
        <span className="h-px w-24 bg-[var(--secondary)] opacity-40"></span>
        <span className="mx-4 text-[var(--secondary)] text-xl">✦</span>
        <span className="h-px w-24 bg-[var(--secondary)] opacity-40"></span>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center px-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            
            {/* Icon Circle */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-md mb-4">
              <stat.icon className="w-8 h-8" />
            </div>

            {/* Number */}
            <h3 className="text-3xl font-bold text-[var(--secondary)]">
              {stat.value}
            </h3>

            {/* Label */}
            <p className="mt-2 text-[var(--text-muted)] font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
