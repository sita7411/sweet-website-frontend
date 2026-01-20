import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    PlusCircle,
    Image as ImageIcon,
    Trash2,
    Package,
    IndianRupee,
    Tag,
    Barcode,
} from "lucide-react";

const MAX_IMAGES = 4;
const API_BASE = import.meta.env.VITE_API_BASE;

export default function AddProduct() {
    const [productName, setProductName] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [fullDesc, setFullDesc] = useState("");
    const [weights, setWeights] = useState([
        { weight: "200g", mrp: "", sellingPrice: "", stockQuantity: "" },
        { weight: "500g", mrp: "", sellingPrice: "", stockQuantity: "" },
    ]);
    const [ingredients, setIngredients] = useState(["Peanuts", "Jaggery"]);
    const [newIngredient, setNewIngredient] = useState("");
    const [images, setImages] = useState([]);
    const [selectedWeight, setSelectedWeight] = useState("500g");
    const [category, setCategory] = useState("Bestseller");
    const [tags, setTags] = useState([]);
    const [sku, setSku] = useState("");
    const [shipping, setShipping] = useState("");
    const [status, setStatus] = useState(true);
    const [newTagInput, setNewTagInput] = useState("");

    // Handlers (unchanged)
    const addWeight = () =>
        setWeights([...weights, { weight: "", mrp: "", sellingPrice: "", stockQuantity: "" }]);

    const removeWeight = (index) => setWeights(weights.filter((_, i) => i !== index));

    const updateWeightField = (index, field, value) => {
        const updated = [...weights];
        updated[index][field] = value;
        setWeights(updated);
    };
    const handleTagKeyDown = (e) => {
        if (["Enter", ",", " "].includes(e.key)) {
            e.preventDefault();

            const value = newTagInput.trim().replace(/,$/, "");
            if (!value) return;

            if (!tags.includes(value)) {
                setTags([...tags, value]);
            }

            setNewTagInput("");
        }
    };

    const addIngredient = () => {
        if (!newIngredient.trim()) return;
        setIngredients([...ingredients, newIngredient.trim()]);
        setNewIngredient("");
    };

    const removeIngredient = (ing) => setIngredients(ingredients.filter((i) => i !== ing));

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files).slice(0, MAX_IMAGES - images.length);
        setImages([...images, ...files]);
    };

    const removeImage = (index) => setImages(images.filter((_, i) => i !== index));

    const handlePublish = async () => {
        if (images.length < 4) return toast.error("Please upload 4 images.");

        const hasEmptyStock = weights.some((w) => w.stockQuantity === "");
        if (hasEmptyStock) return toast.error("Please fill stock quantity for all weights");

        try {
            const formData = new FormData();
            formData.append("name", productName);
            formData.append("shortDescription", shortDesc);
            formData.append("fullDescription", fullDesc);
            formData.append("weights", JSON.stringify(weights));
            formData.append("selectedWeight", selectedWeight);
            formData.append("ingredients", JSON.stringify(ingredients));
            formData.append("category", category);
            formData.append("tags", JSON.stringify(tags));
            formData.append("skuCode", sku);
            formData.append("shippingCharge", shipping);
            formData.append("status", status);

            images.forEach((img) => formData.append("images", img));

            const response = await axios.post(`${API_BASE}/api/products`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Product published successfully");
            resetForm();
        } catch (err) {
            console.error(err);
            const msg = err?.response?.data?.message || "Failed to publish product";
            toast.error(msg);
        }
    };

    const resetForm = () => {
        setProductName("");
        setShortDesc("");
        setFullDesc("");
        setWeights([{ weight: "200g", mrp: "", sellingPrice: "", stockQuantity: "" }]);
        setIngredients(["Peanuts", "Jaggery"]);
        setImages([]);
        setSelectedWeight("500g");
        setCategory("Bestseller");
        setTags([]);
        setSku("");
        setShipping("");
        setStatus(true);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-main)] p-4 sm:p-6 md:p-8 lg:p-10">

            {/* Header */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)]">
                        Add New Product
                    </h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                        Professional product listing that converts
                    </p>
                </div>
                <button
                    onClick={handlePublish}
                    className="px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center gap-2 shadow-lg hover:opacity-90 min-w-[160px] sm:min-w-auto"
                >
                    <PlusCircle size={16} /> Publish Product
                </button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-5 sm:space-y-6">
                    <Section title="Basic Info" icon={Package}>
                        <Input label="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                        <Input label="Short Description" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} />
                        <Textarea label="Full Description" value={fullDesc} onChange={(e) => setFullDesc(e.target.value)} />
                    </Section>

                    <Section title="Weights & Pricing" icon={IndianRupee}>
                        <div className="space-y-3 sm:space-y-4">
                            {weights.map((w, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-start sm:items-center flex-wrap"
                                >
                                    <Input
                                        label="Weight"
                                        value={w.weight}
                                        onChange={(e) => updateWeightField(i, "weight", e.target.value)}
                                        className="min-w-[100px]"
                                    />
                                    <Input
                                        label="MRP"
                                        type="number"
                                        value={w.mrp}
                                        onChange={(e) => updateWeightField(i, "mrp", e.target.value)}
                                    />
                                    <Input
                                        label="Selling Price"
                                        type="number"
                                        value={w.sellingPrice}
                                        onChange={(e) => updateWeightField(i, "sellingPrice", e.target.value)}
                                    />
                                    <Input
                                        label="Stock"
                                        type="number"
                                        value={w.stockQuantity}
                                        onChange={(e) => updateWeightField(i, "stockQuantity", e.target.value)}
                                    />
                                    {weights.length > 1 && (
                                        <button
                                            onClick={() => removeWeight(i)}
                                            className="text-[var(--primary)] hover:text-red-500 mt-1 sm:mt-6 self-start sm:self-center"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addWeight}
                            className="mt-3 px-4 py-2 bg-[var(--accent)] text-white rounded-lg shadow-md hover:opacity-90"
                        >
                            Add Weight Variant
                        </button>
                    </Section>

                    <Section title="Ingredients" icon={Package}>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {ingredients.map((ing) => (
                                <div
                                    key={ing}
                                    className="px-3 py-1.5 rounded-lg bg-[var(--bg-soft)] flex items-center gap-2 shadow-sm border border-gray-300"
                                >
                                    {ing}
                                    <Trash2
                                        size={12}
                                        className="cursor-pointer text-red-500 hover:text-red-700"
                                        onClick={() => removeIngredient(ing)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                value={newIngredient}
                                onChange={(e) => setNewIngredient(e.target.value)}
                                placeholder="Add new ingredient..."
                                className="flex-1 px-4 py-2.5 rounded-lg bg-[var(--bg-soft)] border border-gray-300 focus:border-[var(--primary)]"
                            />
                            <button
                                onClick={addIngredient}
                                className="px-5 py-2.5 bg-[var(--accent)] text-white rounded-lg shadow-md whitespace-nowrap"
                            >
                                Add
                            </button>
                        </div>
                    </Section>

                    <Section title="Identifiers" icon={Barcode}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input label="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
                            <Input
                                label="Shipping Charge (₹)"
                                type="number"
                                value={shipping}
                                onChange={(e) => setShipping(e.target.value)}
                            />
                        </div>
                    </Section>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-5 sm:space-y-6">
                    <Section title="Images (need exactly 4)" icon={ImageIcon}>
                        <label className="block rounded-lg cursor-pointer hover:bg-[var(--bg-soft)] p-6 sm:p-8 flex flex-col items-center justify-center bg-[var(--bg-soft)] border-2 border-dashed border-gray-300 text-center transition">
                            <input
                                type="file"
                                multiple
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={images.length >= MAX_IMAGES}
                            />
                            <ImageIcon size={32} className="mb-2 text-gray-500" />
                            <span className="font-medium">
                                Click to upload ({images.length} / {MAX_IMAGES})
                            </span>
                            <span className="text-xs text-gray-500 mt-1">or drag & drop</span>
                        </label>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {Array.from({ length: MAX_IMAGES }).map((_, i) => (
                                <div
                                    key={i}
                                    className="relative aspect-square sm:aspect-[4/3] rounded-lg overflow-hidden bg-[var(--bg-soft)] border border-gray-300 shadow-sm"
                                >
                                    {images[i] ? (
                                        <>
                                            <img
                                                src={URL.createObjectURL(images[i])}
                                                alt={`preview ${i + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            {i === 0 && (
                                                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                                                    Main
                                                </span>
                                            )}
                                            <button
                                                onClick={() => removeImage(i)}
                                                className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white rounded-full p-1.5 transition"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)] text-sm">
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
                            options={["Bestseller", "Seasonal", "Healthy", "Premium", "New"]}
                            value={category}
                            onChange={setCategory}
                        />
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-gray-700">
                                Tags
                            </label>

                            <div className="relative">
                                {/* Tags display */}
                                <div className="min-h-[42px] flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg bg-white focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 transition shadow-sm">
                                    {tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-1.5 px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => setTags(tags.filter((_, i) => i !== index))}
                                                className="text-[var(--primary)] hover:text-red-600 focus:outline-none"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Input inside the container */}
                                    <input
                                        type="text"
                                        value={newTagInput}
                                        onChange={(e) => setNewTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        placeholder={tags.length === 0 ? "Type tag and press Enter, comma or space..." : "Add more..."}
                                        className="flex-1 min-w-[120px] outline-none bg-transparent px-1 py-1 text-sm"
                                    />
                                </div>
                            </div>

                            <p className="mt-1.5 text-xs text-gray-500">
                                Separate tags with comma, space or press Enter
                            </p>
                        </div>
                    </Section>

                    <Section title="Product Status">
                        <div
                            onClick={() => setStatus(!status)}
                            className={`flex justify-between items-center px-4 py-3 rounded-lg cursor-pointer border transition-colors ${status
                                    ? "bg-green-50 border-green-200"
                                    : "bg-gray-50 border-gray-200"
                                }`}
                        >
                            <span className="font-medium">
                                {status ? "Active / Visible" : "Inactive / Hidden"}
                            </span>
                            <div className={`w-11 h-6 rounded-full relative ${status ? "bg-green-500" : "bg-gray-400"}`}>
                                <div
                                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${status ? "right-0.5" : "left-0.5"
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

/* ────────────────────────────────────────────────
   Reusable Components (slightly adjusted for mobile)
───────────────────────────────────────────────── */

function Section({ title, icon: Icon, children }) {
    return (
        <div className="bg-[var(--bg-card)] rounded-xl p-5 sm:p-6 shadow-md border border-gray-200/70">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
                {Icon && (
                    <div className="p-2.5 bg-[var(--primary)]/10 rounded-full">
                        <Icon size={20} className="text-[var(--primary)]" />
                    </div>
                )}
                <h2 className="text-lg font-semibold text-[var(--text-main)]">{title}</h2>
            </div>
            <div className="space-y-4 sm:space-y-5">{children}</div>
        </div>
    );
}

function Input({ label, className = "", ...props }) {
    return (
        <div className={className}>
            {label && <label className="block text-sm font-medium mb-1.5 text-gray-700">{label}</label>}
            <input
                {...props}
                className="w-full px-3.5 sm:px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition shadow-sm"
            />
        </div>
    );
}

function Textarea({ label, ...props }) {
    return (
        <div>
            {label && <label className="block text-sm font-medium mb-1.5 text-gray-700">{label}</label>}
            <textarea
                {...props}
                rows={4}
                className="w-full px-3.5 sm:px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition shadow-sm resize-y"
            />
        </div>
    );
}

function Select({ label, options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div ref={ref} className="relative">
            {label && <label className="block text-sm font-medium mb-1.5 text-gray-700">{label}</label>}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-3.5 sm:px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition shadow-sm"
            >
                <span>{value || "Select category"}</span>
                <span className={`ml-2 transform transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
            </button>

            {open && (
                <div className="absolute left-0 right-0 mt-1 rounded-lg bg-white shadow-xl border border-gray-200 z-10 max-h-60 overflow-auto">
                    {options.map((o) => (
                        <div
                            key={o}
                            onClick={() => {
                                onChange(o);
                                setOpen(false);
                            }}
                            className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm sm:text-base"
                        >
                            {o}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}