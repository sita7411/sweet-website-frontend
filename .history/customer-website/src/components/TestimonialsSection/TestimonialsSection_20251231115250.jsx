'use client'; // Next.js ke liye (agar React only hai to remove kar dena)

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michelle Smith",
      role: "CEO - Weblabs",
      text: "This plugin is amazing with the current version, I am impressed and will be using it again.",
      img: "/images/user1.png",
    },
    {
      name: "David Anderson",
      role: "CEO - Softwares",
      text: "Outstanding experience! The features exceeded my expectations and the support is top-notch.",
      img: "/images/user2.png",
    },
    {
      name: "Sarah Johnson",
      role: "CEO - Amazon",
      text: "Game-changer for our team. Highly recommended to anyone looking for quality and innovation.",
      img: "/images/user3.png",
    },
    {
      name: "Alex Rivera",
      role: "Founder - TechHub",
      text: "Incredible tool that saved us countless hours. The new version is simply perfect.",
      img: "/images/user4.png", // agar image nahi hai to placeholder use kar lo
    },
    {
      name: "Emma Wilson",
      role: "Product Lead - StartupX",
      text: "Beautiful design, seamless functionality. Our customers love the results!",
      img: "/images/user5.png",
    },
  ];

  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-[var(--text-main)] mb-20">
          Why Our Customers <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Love Us</span>
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={40}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3, spaceBetween: 60 },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="relative bg-[var(--bg-card)] rounded-3xl p-10 lg:p-12 shadow-xl transition-all duration-500 hover:shadow-2xl">
                {/* Curved Quote */}
                <div className="absolute -top-8 left-8 text-8xl font-serif text-[var(--primary)] opacity-20">“</div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className="text-2xl text-[var(--accent)]">★</span>
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg leading-relaxed text-[var(--text-muted)] mb-10">
                  {item.text}
                </p>

                {/* User Info */}
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-gradient-to-r from-[var(--primary)] to-[var(--accent)] p-1">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-20 blur-xl -z-10"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-[var(--text-main)]">{item.name}</h4>
                    <p className="text-[var(--secondary)]">{item.role}</p>
                  </div>
                </div>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] rounded-b-3xl"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Styles for Swiper (optional, Tailwind ke saath) */}
        <style jsx global>{`
          .testimonials-swiper .swiper-slide {
            transition: all 0.5s ease;
            opacity: 0.6;
          }
          .testimonials-swiper .swiper-slide-active {
            opacity: 1;
            transform: scale(1.1);
            z-index: 10;
          }
          .testimonials-swiper .swiper-pagination-bullet {
            background: var(--secondary);
          }
          .testimonials-swiper .swiper-pagination-bullet-active {
            background: linear-gradient(to right, var(--primary), var(--accent));
          }
          .testimonials-swiper .swiper-button-next,
          .testimonials-swiper .swiper-button-prev {
            color: var(--primary);
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            width: 50px;
            height: 50px;
          }
        `}</style>
      </div>
    </section>
  );
}