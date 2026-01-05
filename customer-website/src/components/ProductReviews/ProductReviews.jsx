import React, { useState } from "react";
import { Star } from "lucide-react";

const reviewsData = [
    {
        id: 1,
        name: "Kristin Watson",
        time: "1 month ago",
        rating: 5,
        verified: true,
        text: "I recently picked up some new clothes and I have to say, I'm loving them! From the fit to the fabric, everything about these pieces is just perfect. They're comfortable, stylish, and exactly what I was looking for.",
        images: [
            "/images/review1-1.jpg",
            "/images/review1-2.jpg",
            "/images/review1-3.jpg",
        ],
    },
    {
        id: 2,
        name: "Bessie Cooper",
        time: "2 month ago",
        rating: 5,
        verified: true,
        text: "I recently treated myself to some new clothes, and I couldn't be happier with my purchase! The fit is spot-on, and the fabric feels amazing against my skin. These pieces are not only comfortable but incredibly stylish as well.",
        images: [],
    },
];

export default function ReviewSection() {
    const [reviews, setReviews] = useState(reviewsData);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        rating: 0,
        title: "",
        details: "",
        photo: null,
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
            images: formData.photo ? [URL.createObjectURL(formData.photo)] : [],
        };

        setReviews([newReview, ...reviews]);
        setShowForm(false);

        setFormData({
            name: "",
            email: "",
            rating: 0,
            title: "",
            details: "",
            photo: null,
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 text-[var(--text-main)]">
            {/* TOP LEFT SECTION */}
            <div className="mb-10">
                <h2 className="text-3xl font-semibold mb-3">Customer Reviews</h2>

                <div className="flex items-center mb-2">
                    <span className="text-4xl font-bold mr-3">4.8</span>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                fill="currentColor"
                                className={`w-6 h-6 ${i < 4.8 ? "text-[var(--accent)]" : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="ml-3 text-[var(--text-muted)]">
                        (107 Reviews)
                    </span>
                </div>

                {/* ADD REVIEW BUTTON */}
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="mt-5 bg-[var(--primary)] text-white px-6 py-3 rounded hover:bg-[var(--secondary)] transition"
                >
                    {showForm ? "Close Review Form" : "Add Review"}
                </button>
            </div>

            {/* ADD REVIEW FORM */}
            {showForm && (
                <div className="bg-[var(--bg-card)] p-6 rounded shadow-md mb-12">
                    <h3 className="text-2xl font-semibold mb-5">Add Your Review</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Name *"
                                required
                                className="border p-3 rounded w-full"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            />
                            <input
                                type="email"
                                placeholder="Email *"
                                required
                                className="border p-3 rounded w-full"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
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
                                        className={`w-8 h-8 cursor-pointer ${star <= formData.rating
                                            ? "text-[var(--accent)]"
                                            : "text-gray-300"
                                            }`}
                                        onClick={() =>
                                            setFormData({ ...formData, rating: star })
                                        }
                                    />
                                ))}
                            </div>
                        </div>

                        <input
                            type="text"
                            placeholder="Add Review Title *"
                            required
                            className="border p-3 rounded w-full"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                        />

                        <textarea
                            placeholder="Add Detailed Review *"
                            required
                            className="border p-3 rounded w-full h-32"
                            value={formData.details}
                            onChange={(e) =>
                                setFormData({ ...formData, details: e.target.value })
                            }
                        />

                        <div>
                            <label className="block mb-1">Photo / Video (Optional)</label>
                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={(e) =>
                                    setFormData({ ...formData, photo: e.target.files[0] })
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-[var(--primary)] text-white px-6 py-3 rounded hover:bg-[var(--secondary)] transition"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            )}

            {/* REVIEWS LIST */}
            <div className="space-y-8">
                {reviews.map((review) => (
                    <div key={review.id} className="border-b border-[var(--accent)] pb-6">
                        <div className="flex items-center mb-2 space-x-3">
                            {review.images.length > 0 ? (
                                <img
                                    src={review.images[0]}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-[var(--secondary)]/400 font-semibold">
                                    {review.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                </div>
                            )}
                            <div>
                                <p className="font-medium flex items-center gap-2">
                                    {review.name}{" "}
                                    {review.verified && (
                                        <span className="text-xs bg-[var(--secondary)] text-white px-2 py-0.5 rounded-full">
                                            Verified
                                        </span>
                                    )}
                                </p>
                                <p className="text-xs text-[var(--text-muted)]">
                                    {review.time}
                                </p>
                            </div>
                        </div>


                        <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    fill="currentColor"
                                    className={`w-4 h-4 ${i < review.rating
                                        ? "text-[var(--accent)]"
                                        : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>

                        <p className="mb-3">{review.text}</p>
                        {review.images.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {review.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt="review"
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                ))}
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
}
