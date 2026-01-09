import {
    PencilSquareIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* -------------------- MOCK DATA -------------------- */
const stats = [
    { title: "Total Products", value: "124", change: "+12%", changePositive: true },
    { title: "Total Stock Value", value: "₹2,84,750", change: "+9%", changePositive: true },
    { title: "Low Stock Items", value: "7", change: "+2", changePositive: false },
    { title: "Out of Stock", value: "4", change: "+1", changePositive: false },
];

const allInventoryItems = [
    {
        id: 1,
        img: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=80",
        name: "Classic Peanut Chikki",
        sku: "PNK-001",
        stock: 342,
        price: "₹185",
        value: "₹63,270",
        status: "In Stock",
        lastUpdated: "09 Jan 2026",
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1615485290814-92c3c6f5d0e0?w=80",
        name: "Jaggery Sesame Chikki",
        sku: "SES-002",
        stock: 87,
        price: "₹210",
        value: "₹18,270",
        status: "Low Stock",
        lastUpdated: "08 Jan 2026",
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1626796665555-9c94538dd6de?w=80",
        name: "Premium Dryfruit Chikki",
        sku: "DFR-003",
        stock: 0,
        price: "₹320",
        value: "₹0",
        status: "Out of Stock",
        lastUpdated: "05 Jan 2026",
    },
    {
        id: 4,
        img: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=80",
        name: "Ragi Peanut Sugar Free",
        sku: "RAG-001",
        stock: 214,
        price: "₹245",
        value: "₹52,430",
        status: "In Stock",
        lastUpdated: "09 Jan 2026",
    },
    {
        id: 5,
        img: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=80",
        name: "Mango Coconut Bar",
        sku: "MNG-004",
        stock: 12,
        price: "₹190",
        value: "₹2,280",
        status: "Low Stock",
        lastUpdated: "07 Jan 2026",
    },
];

/* -------------------- COMPONENT -------------------- */
export default function InventoryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [selectedItems, setSelectedItems] = useState([]);
    const [products, setProducts] = useState(allInventoryItems);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Filter
    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSelectAll = (e) => {
        setSelectedItems(
            e.target.checked ? paginatedProducts.map((p) => p.id) : []
        );
    };

    const handleSelectItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };
    const openEditModal = (item) => {
        setEditingItem({ ...item });
        setIsEditOpen(true);
    };

    const closeEditModal = () => {
        setIsEditOpen(false);
        setEditingItem(null);
    };

    const handleEditSave = () => {
        setProducts((prev) =>
            prev.map((p) => (p.id === editingItem.id ? editingItem : p))
        );
        toast.success("Inventory updated successfully");
        closeEditModal();
    };

    // Toast Handlers
    const handleAdd = () => toast.success("Product added successfully");
    const handleEdit = () => toast.info("Product updated successfully");
    const handleDelete = () => toast.error("Product deleted");

    const getStatusStyle = (status) => {
        switch (status) {
            case "In Stock":
                return "bg-green-100 text-green-800";
            case "Low Stock":
                return "bg-yellow-100 text-yellow-800";
            case "Out of Stock":
                return "bg-red-100 text-red-800 whitespace-nowrap";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-main)] p-4 md:p-6 lg:p-8 space-y-6 text-[#3a2416]">
            <ToastContainer position="top-right" transition={Slide} autoClose={3000} />

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">
                        Inventory
                    </h1>
                    <p className="text-sm text-[#8a6a52] mt-1">
                        Track stock levels, value & availability
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-[#c63b2f] text-white px-4 py-2 rounded-lg shadow hover:bg-[#b23328] transition"
                >
                    + Add Product
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl p-5 border border-[#fff1db] shadow hover:shadow-xl transition flex flex-col justify-between"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-[#8a6a52] uppercase tracking-wide">
                                {stat.title}
                            </p>
                            <div
                                className={`text-sm font-semibold ${stat.changePositive ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {stat.change}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mt-3">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-xl border border-[#fff1db] shadow overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 flex flex-col lg:flex-row justify-between gap-3 border-b border-[#fff1db]">
                    <div className="relative w-full lg:w-72">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a6a52]" />
                        <input
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search name or SKU..."
                            className="w-full pl-10 pr-3 py-2 text-sm sm:text-base rounded-lg bg-[#fff1db] focus:outline-none focus:ring-2 focus:ring-[#c63b2f]"
                        />
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="overflow-x-auto hidden md:block">
                    <table className="min-w-full text-sm">
                        <thead className="bg-[#fff1db] uppercase text-[#8a6a52] text-xs tracking-wide">
                            <tr>
                                <th className="p-3">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={
                                            paginatedProducts.length > 0 &&
                                            selectedItems.length === paginatedProducts.length
                                        }
                                        className="accent-[#c63b2f]"
                                    />
                                </th>
                                <th className="p-3 text-left">Product</th>
                                <th className="p-3 text-left">SKU</th>
                                <th className="p-3 text-center">Stock</th>
                                <th className="p-3 text-center">Price</th>
                                <th className="p-3 text-center">Value</th>
                                <th className="p-3 text-center">Status</th>
                                <th className="p-3 text-center">Updated</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProducts.map((p) => (
                                <tr key={p.id} className="border-t hover:bg-[#fff6ec] transition">
                                    <td className="p-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(p.id)}
                                            onChange={() => handleSelectItem(p.id)}
                                            className="accent-[#c63b2f]"
                                        />
                                    </td>
                                    <td className="p-3 flex items-center gap-3">
                                        <img
                                            src={p.img}
                                            alt={p.name}
                                            className="w-12 h-12 rounded-lg border object-cover"
                                        />
                                        <div>
                                            <div className="font-medium">{p.name}</div>
                                        </div>
                                    </td>
                                    <td className="p-3 text-center font-mono text-gray-600">{p.sku}</td>
                                    <td className="p-3 text-center font-semibold">{p.stock}</td>
                                    <td className="p-3 text-center font-semibold">{p.price}</td>
                                    <td className="p-3 text-center font-semibold">{p.value}</td>
                                    <td className="p-3 text-center">
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                                                p.status
                                            )}`}
                                        >
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center text-sm text-[#8a6a52]">
                                        {p.lastUpdated}
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => openEditModal(p)}
                                                className="p-2 rounded-lg hover:bg-[#fff1db] transition"
                                            >
                                                <PencilSquareIcon className="w-5 h-5 text-[#c63b2f]" />
                                            </button>

                                            <button
                                                onClick={handleDelete}
                                                className="p-2 rounded-lg hover:bg-red-50 transition"
                                            >
                                                <TrashIcon className="w-5 h-5 text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y">
                    {paginatedProducts.map((p) => (
                        <div key={p.id} className="p-4 space-y-3">
                            <div className="flex gap-3">
                                <img
                                    src={p.img}
                                    alt={p.name}
                                    className="w-14 h-14 rounded-lg border object-cover"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">{p.name}</p>
                                    <p className="text-xs text-[#8a6a52]">{p.sku} </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <span className="text-[#8a6a52]">Stock:</span> {p.stock}
                                </div>
                                <div>
                                    <span className="text-[#8a6a52]">Price:</span> {p.price}
                                </div>
                                <div>
                                    <span className="text-[#8a6a52]">Value:</span> {p.value}
                                </div>
                                <div>
                                    <span
                                        className={`px-2 py-0.5 text-xs rounded-full ${getStatusStyle(p.status)}`}
                                    >
                                        {p.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <div className="flex gap-3">
                                    <button onClick={() => openEditModal(p)}>
                                        <PencilSquareIcon className="w-5 h-5 text-[#c63b2f]" />
                                    </button>
                                    <button onClick={handleDelete}>
                                        <TrashIcon className="w-5 h-5 text-red-600" />
                                    </button>
                                </div>
                                <span className="text-sm text-[#8a6a52]">{p.lastUpdated}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-[#fff1db] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Items per page */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Items per page:</span>
                        <select
                            className="border rounded-lg px-2 py-1"
                            value={itemsPerPage}
                            onChange={(e) => {
                                setCurrentPage(1);
                                setItemsPerPage(Number(e.target.value));
                            }}
                        >
                            {[3, 5, 10, 25, 50, 100].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Page buttons */}
                    <div className="flex items-center gap-1 flex-wrap">
                        <button
                            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border bg-white hover:bg-[#fff1db] disabled:opacity-50 transition"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            if (
                                page === 1 ||
                                page === totalPages ||
                                Math.abs(page - currentPage) <= 2
                            ) {
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-1.5 text-sm rounded-lg border transition ${page === currentPage
                                            ? "bg-[#c63b2f] text-white"
                                            : "bg-white hover:bg-[#fff1db]"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            } else if (
                                (page === 2 && currentPage > 4) ||
                                (page === totalPages - 1 && currentPage < totalPages - 3)
                            ) {
                                return <span key={page}>...</span>;
                            }
                            return null;
                        })}

                        <button
                            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border bg-white hover:bg-[#fff1db] disabled:opacity-50 transition"
                        >
                            <ChevronRightIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Go to page */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Go to:</span>
                        <input
                            type="number"
                            min={1}
                            max={totalPages}
                            value={currentPage}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val >= 1 && val <= totalPages) setCurrentPage(val);
                            }}
                            className="border rounded-lg px-2 py-1 w-16 text-center"
                        />
                        <button
                            onClick={() =>
                                setCurrentPage(Math.min(Math.max(currentPage, 1), totalPages))
                            }
                            className="px-3 py-1 bg-[#c63b2f] text-white rounded-lg transition hover:bg-[#b23328]"
                        >
                            Go
                        </button>
                    </div>
                    {isEditOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                            <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-[scaleIn_0.2s_ease-out]">

                                {/* Header */}
                                <div className="flex justify-between items-start p-5 border-b">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            Edit Inventory Item
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Update product stock, pricing & availability
                                        </p>
                                    </div>
                                    <button
                                        onClick={closeEditModal}
                                        className="text-gray-400 hover:text-gray-600 transition"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="p-5 space-y-5">

                                    {/* Product Info */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">
                                            Product Name
                                        </label>
                                        <input
                                            value={editingItem.name}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, name: e.target.value })
                                            }
                                            className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-[#c63b2f] focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                                SKU
                                            </label>
                                            <input
                                                value={editingItem.sku}
                                                onChange={(e) =>
                                                    setEditingItem({ ...editingItem, sku: e.target.value })
                                                }
                                                className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-[#c63b2f]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                                Stock Quantity
                                            </label>
                                            <input
                                                type="number"
                                                value={editingItem.stock}
                                                onChange={(e) =>
                                                    setEditingItem({
                                                        ...editingItem,
                                                        stock: Number(e.target.value),
                                                    })
                                                }
                                                className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-[#c63b2f]"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                                Price
                                            </label>
                                            <input
                                                value={editingItem.price}
                                                onChange={(e) =>
                                                    setEditingItem({ ...editingItem, price: e.target.value })
                                                }
                                                className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-[#c63b2f]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                                Status
                                            </label>
                                            <select
                                                value={editingItem.status}
                                                onChange={(e) =>
                                                    setEditingItem({ ...editingItem, status: e.target.value })
                                                }
                                                className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-[#c63b2f]"
                                            >
                                                <option>In Stock</option>
                                                <option>Low Stock</option>
                                                <option>Out of Stock</option>
                                            </select>

                                            {/* Status Preview */}
                                            <div className="mt-2">
                                                <span
                                                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
                                                        editingItem.status
                                                    )}`}
                                                >
                                                    {editingItem.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-end gap-3 p-5 border-t bg-gray-50 rounded-b-2xl">
                                    <button
                                        onClick={closeEditModal}
                                        className="px-4 py-2 text-sm w-full sm:w-auto rounded-lg border bg-white hover:bg-gray-100 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleEditSave}
                                        className="px-4 py-2 text-sm w-full sm:w-auto rounded-lg bg-[#c63b2f] text-white hover:bg-[#b23328] transition shadow"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}