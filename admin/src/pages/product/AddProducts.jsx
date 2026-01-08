import React, { useState, useEffect } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PlusCircle,
  Image as ImageIcon,
  Package,
  IndianRupee,
  Trash2,
  Tag,
  Barcode,
} from "lucide-react";

const MAX_IMAGES = 4;

export default function AddProduct() {
  const [weights, setWeights] = useState(["200g", "500g", "1kg"]);
  const [newWeight, setNewWeight] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("500g");
  const [status, setStatus] = useState(true);
  const [images, setImages] = useState([]);

  const addWeight = () => {
    if (!newWeight) return;
    setWeights([...weights, newWeight]);
    setNewWeight("");
    toast.success("Weight added");
  };

  const removeWeight = (w) => {
    setWeights(weights.filter((x) => x !== w));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const allowed = files.slice(0, MAX_IMAGES - images.length);
    setImages((prev) => [...prev, ...allowed]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const saveDraft = () => toast.info("Draft saved");

  const publishProduct = () => {
    if (images.length < 4) {
      toast.error("Minimum 4 product images required");
      return;
    }
    toast.success("Product published successfully");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-[var(--bg-main)] to-[var(--bg-soft)] min-h-screen">
      <ToastContainer transition={Slide} position="top-right" />

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-main)]">
            Add New Product
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-lg">
            Create a professional product listing that looks premium and converts
          </p>
        </div>

        <div className="flex gap-2 sm:gap-3 flex-nowrap whitespace-nowrap">
          <button
            onClick={saveDraft}
            className="px-4 py-2 rounded-xl border text-sm font-medium hover:bg-[var(--bg-soft)] transition"
          >
            Save Draft
          </button>
          <button
            onClick={publishProduct}
            className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-medium flex items-center gap-2 hover:opacity-90 transition shadow"
          >
            <PlusCircle size={16} />
            Publish Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <Section title="Basic Information" icon={Package}>
            <Input label="Product Name" placeholder="Crunchy Peanut Chikki" />
            <Input
              label="Short Description"
              placeholder="Traditional peanut chikki made with pure jaggery"
            />
            <Textarea label="Full Description" />

            {/* Weights */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                Available Weights
              </label>

              <div className="flex gap-2 flex-wrap mb-4">
                {weights.map((w) => (
                  <div
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 cursor-pointer transition
                    ${selectedWeight === w
                        ? "bg-[var(--primary)] text-white shadow"
                        : "bg-white hover:border-[var(--primary)]"
                      }`}
                  >
                    {w}
                    <Trash2
                      size={14}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeWeight(w);
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-2 flex-wrap">
                <input
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder="e.g. 2kg"
                  className="flex-1 min-w-[120px] px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-[var(--primary)]/20 outline-none"
                />
                <button
                  onClick={addWeight}
                  className="px-4 py-2 rounded-xl bg-[var(--accent)] text-sm font-medium hover:opacity-90 transition"
                >
                  Add
                </button>
              </div>
            </div>
          </Section>

          <Section title="Pricing & Inventory" icon={IndianRupee}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="MRP (₹)" type="number" />
              <Input label="Selling Price (₹)" type="number" />
              <Input label="Stock Quantity" type="number" />
              <Input label="Shipping Charge (₹)" type="number" />
            </div>
          </Section>

          <Section title="Identifiers" icon={Barcode}>
            <Input label="SKU Code" />
          </Section>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <Section title="Product Images" icon={ImageIcon}>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              Upload exactly 4 images. First image is the main thumbnail.
            </p>

            <label className="block border-2 border-dashed rounded-2xl p-4 sm:p-6 text-center cursor-pointer hover:border-[var(--primary)] transition bg-[var(--bg-soft)]">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={images.length >= 4}
              />
              <div className="flex flex-col items-center gap-2">
                <ImageIcon size={24} className="text-[var(--text-muted)]" />
                <span className="text-sm font-medium">Click to upload images</span>
                <span className="text-xs text-[var(--text-muted)]">
                  Max {MAX_IMAGES} images
                </span>
              </div>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border bg-[var(--bg-soft)]
                  ${i === 0 ? "ring-2 ring-[var(--primary)]" : ""}`}
                >
                  {images[i] ? (
                    <>
                      <img
                        src={URL.createObjectURL(images[i])}
                        className="w-full h-full object-cover"
                      />
                      {i === 0 && (
                        <span className="absolute bottom-2 left-2 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded">
                          Main Image
                        </span>
                      )}
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-lg hover:bg-red-600 transition"
                      >
                        <Trash2 size={12} />
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-[var(--text-muted)]">
                      Image {i + 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>

          <Section title="Category & Tags" icon={Tag}>
            <Select
              label="Category"
              options={["Chikki", "Laddu", "Sweets", "Namkeen"]}
            />
            <Input label="Tags" placeholder="peanut, jaggery, handmade" />
          </Section>

          <Section title="Product Status">
            <div
              onClick={() => setStatus(!status)}
              className="flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer hover:shadow-sm transition"
            >
              <span className="text-sm font-medium">
                {status ? "Active Product" : "Inactive Product"}
              </span>
              <div
                className={`w-11 h-6 rounded-full relative transition ${
                  status ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
                    status ? "right-0.5" : "left-0.5"
                  }`}
                />
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Reusable Components ---------------- */

function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-[var(--bg-card)] rounded-2xl p-4 sm:p-6 lg:p-6 border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        {Icon && (
          <div className="p-2 rounded-lg bg-[var(--bg-soft)]">
            <Icon size={18} className="text-[var(--primary)]" />
          </div>
        )}
        <h2 className="text-lg font-semibold text-[var(--text-main)]">{title}</h2>
      </div>
      <div className="space-y-4 sm:space-y-5">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 sm:mb-2">{label}</label>
      <input
        {...props}
        className="w-full px-3 sm:px-4 py-2.5 rounded-xl border text-sm
        focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20
        outline-none transition"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="w-full px-3 sm:px-4 py-2.5 rounded-xl border text-sm resize-none
        focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20
        outline-none transition"
      />
    </div>
  );
}

function Select({ label, options }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(options[0]);
  const ref = React.useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-medium mb-1 sm:mb-2 text-[var(--text-main)]">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 rounded-xl border
        bg-white text-sm text-[var(--text-main)]
        hover:border-[var(--primary)]
        focus:ring-2 focus:ring-[var(--primary)]/20
        transition"
      >
        <span>{value}</span>

        <svg
          className={`w-4 h-4 transition ${open ? "rotate-180" : ""} text-[var(--text-muted)]`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0  mt-2 w-full rounded-xl border bg-white shadow-lg overflow-hidden">
          {options.map((o) => (
            <div
              key={o}
              onClick={() => {
                setValue(o);
                setOpen(false);
              }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition
              hover:bg-[var(--bg-soft)]
              ${value === o ? "bg-[var(--primary)] text-white" : "text-[var(--text-main)]"}`}
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
