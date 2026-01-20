// ReviewSection.jsx
import React, { useState } from "react";
import { Star, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reviewsData = [
    {
        id: 1,
        name: "Kristin Watson",
        time: "1 month ago",
        rating: 5,
        verified: true,
        text: "I recently picked up some new clothes and I have to say, I'm loving them! From the fit to the fabric, everything about these pieces is just perfect.",
        images: ["/images/review1-1.jpg", "/images/review1-2.jpg", "/images/review1-3.jpg"],
    },
    {
        id: 2,
        name: "Bessie Cooper",
        time: "2 months ago",
        rating: 5,
        verified: true,
        text: "I recently treated myself to some new clothes, and I couldn't be happier with my purchase! The fit is spot-on, and the fabric feels amazing against my skin.",
        images: [],
    },
];

// Star Component
const StarRating = ({ rating = 0, size = 4 }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                fill="currentColor"
                className={`w-${size} h-${size} ${i < rating ? "text-[var(--accent)]" : "text-gray-300"}`}
            />
        ))}
    </div>
);

// Avatar Component
const Avatar = ({ name, img }) => {
    if (img) return <img src={img} alt={name} className="w-12 h-12 rounded-full object-cover" />;
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    return (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-[var(--secondary)] font-semibold">
            {initials}
        </div>
    );
};

export default function ReviewSection() {
    const [reviews, setReviews] = useState(reviewsData);
    const [showForm, setShowForm] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        rating: 0,
        title: "",
        details: "",
        photo: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.rating) return alert("Please select a rating!");

        const newReview = {
            id: reviews.length + 1,
            name: formData.name,
            time: "Just now",
            rating: formData.rating,
            verified: true,
            text: formData.details,
            images: formData.photo ? formData.photo.map((file) => URL.createObjectURL(file)) : [],
        };

        setReviews([newReview, ...reviews]);
        setShowForm(false);
        setFormData({ name: "", email: "", rating: 0, title: "", details: "", photo: [] });
        setShowThankYou(true);

        // Auto-close after 2.5s
        setTimeout(() => setShowThankYou(false), 3000);
    };

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 text-[var(--text-main)] relative">
            {/* HEADER */}
            <div className="mb-10">
                <h2 className="text-3xl sm:text-4xl font-semibold mb-3">Customer Reviews</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-3">
                    <span className="text-4xl font-bold">4.8</span>
                    <StarRating rating={4.8} size={6} />
                    <span className="text-[var(--text-muted)]">(107 Reviews)</span>
                </div>

                {/* Ratings Breakdown */}
                <div className="mb-8 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = reviews.filter((r) => r.rating === star).length;
                        const percentage = reviews.length ? (count / reviews.length) * 100 : 0;
                        return (
                            <div key={star} className="flex items-center space-x-2">
                                <div className="flex w-20">
                                    {[...Array(star)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-[var(--accent)]" />
                                    ))}
                                </div>
                                <div className="flex-1 bg-gray-200 h-3 rounded overflow-hidden">
                                    <div className="bg-[var(--accent)] h-3 rounded" style={{ width: `${percentage}%` }}></div>
                                </div>
                                <span className="text-sm text-[var(--text-muted)] w-6">{count}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Add Review Button */}
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="mt-5 bg-[var(--primary)] text-white px-6 py-3 rounded hover:bg-[var(--secondary)] transition"
                >
                    {showForm ? "Close Review Form" : "Add Review"}
                </button>
            </div>

            {/* REVIEW FORM */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-[var(--bg-card)] p-6 rounded-lg shadow-md mb-12"
                    >
                        {/* Form content (same as before) */}
                        <h3 className="text-2xl font-semibold mb-5">Add Your Review</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name & Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Name *"
                                    required
                                    className="border p-3 rounded w-full focus:ring-2 focus:ring-[var(--primary)]"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email *"
                                    required
                                    className="border p-3 rounded w-full focus:ring-2 focus:ring-[var(--primary)]"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block mb-2 font-medium">Your Rating *</label>
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            fill="currentColor"
                                            className={`w-8 h-8 cursor-pointer transition ${star <= formData.rating ? "text-[var(--accent)] scale-110" : "text-gray-300"
                                                }`}
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                        />
                                    ))}
                                </div>
                            </div>

                            <input
                                type="text"
                                placeholder="Review Title *"
                                required
                                className="border p-3 rounded w-full focus:ring-2 focus:ring-[var(--primary)]"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />

                            <textarea
                                placeholder="Detailed Review *"
                                required
                                className="border p-3 rounded w-full h-32 focus:ring-2 focus:ring-[var(--primary)]"
                                value={formData.details}
                                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            />

                            {/* Photo Upload */}
                            <div>
                                <label className="block mb-2 font-medium">Photo / Video (Optional)</label>
                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[var(--accent)] transition relative"
                                    onClick={() => document.getElementById("fileInput").click()}
                                >
                                    <UploadCloud className="h-12 w-12 text-gray-400 mx-auto" />
                                    <p className="text-gray-500 font-medium mt-2">
                                        Drag & drop files or{" "}
                                        <span className="text-[var(--primary)] font-semibold">Browse</span>
                                    </p>
                                    {formData.photo && formData.photo.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-4 justify-center">
                                            {formData.photo.map((file, idx) => {
                                                const url = URL.createObjectURL(file);
                                                return (
                                                    <div key={idx} className="relative w-24 h-24 rounded overflow-hidden border">
                                                        {file.type.startsWith("image") ? (
                                                            <img src={url} alt="preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <video src={url} className="w-full h-full object-cover" controls />
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const newFiles = [...formData.photo];
                                                                newFiles.splice(idx, 1);
                                                                setFormData({ ...formData, photo: newFiles });
                                                            }}
                                                            className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs hover:bg-red-700 transition"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*,video/*"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files);
                                        setFormData({ ...formData, photo: [...(formData.photo || []), ...files] });
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-[var(--primary)] text-white px-6 py-3 rounded hover:bg-[var(--secondary)] transition w-full sm:w-auto"
                            >
                                Submit Review
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* REVIEWS LIST */}
            <div className="space-y-8">
                <AnimatePresence>
                    {reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            layout
                            className="border-b border-[var(--accent)] pb-6 flex flex-col space-y-2"
                        >
                            <div className="flex items-center space-x-3">
                                <Avatar name={review.name} img={review.images[0]} />
                                <div>
                                    <p className="font-medium flex items-center gap-2">
                                        {review.name}
                                        {review.verified && (
                                            <span className="text-xs bg-[var(--secondary)] text-white px-2 py-0.5 rounded-full">
                                                Verified
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-xs text-[var(--text-muted)]">{review.time}</p>
                                </div>
                            </div>

                            <StarRating rating={review.rating} />
                            <p className="mb-2">{review.text}</p>

                            {review.images.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {review.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt="review"
                                            className="w-28 h-28 object-cover rounded hover:scale-105 transition"
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* THANK YOU POPUP */}
            <AnimatePresence>
                {showThankYou && (
                    <motion.div
                        className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-[var(--bg-main)] p-8 rounded-xl shadow-2xl text-center max-w-sm mx-4 border border-gray-200"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            {/* Image Icon */}
                            <div className="flex items-center justify-center -mb-30 -mt-9">
                                <img
                                    src="/review.png" 
                                    alt="Chikki"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <h3 className="text-2xl font-semibold mb-2 text-[var(--secondary)]">Thank You!</h3>
                            <p className="text-[var(--text-muted)] mb-6">
                                Your review has been submitted successfully.
                            </p>
                            <button
                                onClick={() => setShowThankYou(false)}
                                className="bg-[var(--primary)] text-white px-6 py-2 rounded hover:bg-[var(--secondary)] transition"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
