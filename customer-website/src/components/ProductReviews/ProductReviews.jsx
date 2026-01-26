// ReviewSection.jsx
import React, { useState, useEffect } from "react";
import { Star, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://sweet-backend-nhwt.onrender.com";

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

const Avatar = ({ name, img }) => {
  if (img)
    return (
      <img
        src={img}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
    );
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";
  return (
    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-[var(--secondary)] font-semibold">
      {initials}
    </div>
  );
};

export default function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ average: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    if (!productId) {
      setError("Product ID is missing");
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `${API_BASE}/api/reviews/product/${productId}`,
        );
        if (res.data.success) {
          setReviews(res.data.reviews || []);
          setStats(res.data.stats || { average: 0, total: 0 });
        } else {
          setError(res.data.message || "Failed to load reviews");
        }
      } catch (err) {
        console.error("Failed to load reviews:", err);
        setError("Could not load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.rating) return alert("Please select a rating!");

    try {
      const formPayload = new FormData();

      // Text fields
      formPayload.append("productId", productId);
      if (formData.name?.trim())
        formPayload.append("name", formData.name.trim());
      if (formData.email?.trim())
        formPayload.append("email", formData.email.trim());
      formPayload.append("rating", formData.rating);
      if (formData.title?.trim())
        formPayload.append("title", formData.title.trim());
      formPayload.append("comment", formData.details.trim());

      // Attach all selected files
      formData.photo.forEach((file) => {
        formPayload.append("images", file); 
      });

      const res = await axios.post(`${API_BASE}/api/reviews`, formPayload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        // For instant preview — create object URLs
        const newReview = {
          _id: Date.now().toString(),
          guestName: formData.name.trim() || "Anonymous",
          rating: formData.rating,
          title: formData.title.trim(),
          comment: formData.details.trim(),
          createdAt: new Date().toISOString(),
          images: formData.photo.map((file) => URL.createObjectURL(file)),
        };

        setReviews([newReview, ...reviews]);
        setShowThankYou(true);
        setFormData({
          name: "",
          email: "",
          rating: 0,
          title: "",
          details: "",
          photo: [],
        });
        setShowForm(false);

        setTimeout(() => setShowThankYou(false), 3000);
      }
    } catch (err) {
      console.error("Review submit error:", err);
      alert(
        err.response?.data?.message ||
          "Failed to submit review. Please try again.",
      );
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        Loading reviews...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 text-[var(--text-main)] relative">
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
          Customer Reviews
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-3">
          <span className="text-4xl font-bold">{stats.average.toFixed(1)}</span>
          <StarRating rating={Math.round(stats.average)} size={6} />
          <span className="text-[var(--text-muted)]">
            ({stats.total} Reviews)
          </span>
        </div>

        <div className="mb-8 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const percentage = reviews.length
              ? (count / reviews.length) * 100
              : 0;
            return (
              <div key={star} className="flex items-center space-x-2">
                <div className="flex w-20">
                  {[...Array(star)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[var(--accent)]" />
                  ))}
                </div>
                <div className="flex-1 bg-gray-200 h-3 rounded overflow-hidden">
                  <div
                    className="bg-[var(--accent)] h-3 rounded"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-[var(--text-muted)] w-6">
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-5 bg-[var(--primary)] text-white px-6 py-3 rounded hover:bg-[var(--secondary)] transition"
        >
          {showForm ? "Close Review Form" : "Add Review"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[var(--bg-card)] p-6 rounded-lg shadow-md mb-12"
          >
            <h3 className="text-2xl font-semibold mb-5">Add Your Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name *"
                  required
                  className="border p-3 rounded w-full focus:ring-2 focus:ring-[var(--primary)]"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  className="border p-3 rounded w-full focus:ring-2 focus:ring-[var(--primary)]"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Your Rating *</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      fill="currentColor"
                      className={`w-8 h-8 cursor-pointer transition ${
                        star <= formData.rating
                          ? "text-[var(--accent)] scale-110"
                          : "text-gray-300"
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
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <textarea
                placeholder="Detailed Review *"
                required
                className="border p-3 rounded w-full h-32 focus:ring-2 focus:ring-[var(--primary)]"
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
              />

              <div>
                <label className="block mb-2 font-medium">
                  Photo / Video (Optional)
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[var(--accent)] transition relative"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <UploadCloud className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="text-gray-500 font-medium mt-2">
                    Drag & drop or{" "}
                    <span className="text-[var(--primary)] font-semibold">
                      Browse
                    </span>
                  </p>

                  {formData.photo?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                      {formData.photo.map((file, idx) => {
                        const url = URL.createObjectURL(file);
                        return (
                          <div
                            key={idx}
                            className="relative w-24 h-24 rounded overflow-hidden border"
                          >
                            {file.type.startsWith("image") ? (
                              <img
                                src={url}
                                alt="preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video
                                src={url}
                                className="w-full h-full object-cover"
                                controls
                              />
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const newFiles = [...formData.photo];
                                newFiles.splice(idx, 1);
                                setFormData({ ...formData, photo: newFiles });
                              }}
                              className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs hover:bg-red-700"
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
                    setFormData({
                      ...formData,
                      photo: [...(formData.photo || []), ...files],
                    });
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

      <div className="space-y-8">
        <AnimatePresence>
          {reviews.length === 0 ? (
            <p className="text-center text-[var(--text-muted)] py-8">
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            reviews.map((review) => (
              <motion.div
                key={review._id || review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                layout
                className="border-b border-[var(--accent)] pb-6 flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-3">
                  <Avatar name={review.guestName || review.name || "User"} />
                  <div>
                    <p className="font-medium flex items-center gap-2">
                      {review.guestName || review.name || "Anonymous"}
                      <span className="text-xs bg-[var(--secondary)] text-white px-2 py-0.5 rounded-full">
                        Verified Purchase
                      </span>
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {new Date(review.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <StarRating rating={review.rating} />

                {review.title && <p className="font-medium">{review.title}</p>}

                <p className="mb-2">{review.comment}</p>

                {review.images?.length > 0 && (
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
            ))
          )}
        </AnimatePresence>
      </div>

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
              <div className="flex items-center justify-center -mb-30 -mt-9">
                <img
                  src="/review.png"
                  alt="Thank You"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-[var(--secondary)]">
                Thank You!
              </h3>
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
