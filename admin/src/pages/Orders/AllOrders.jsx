import {
    MagnifyingGlassIcon,
    PencilSquareIcon,
    EyeIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------------- STATS ---------------- */
const stats = [
    { title: "Total Orders", value: "1,248", change: "+6%", positive: true },
    { title: "Completed Orders", value: "986", change: "+4%", positive: true },
    { title: "Pending Orders", value: "162", change: "-2%", positive: false },
    { title: "Revenue", value: "$24,390", change: "+8%", positive: true },
];

/* ---------------- ORDERS ---------------- */
const initialOrders = [
    {
        id: "#998-5878",
        product: "Brand New Bike",
        image: "https://images.unsplash.com/photo-1518655048521-f130df041f66",
        customer: "Oludayo Ayumide",
        date: "2025-01-01",
        price: "$17.84",
        status: "Rejected",
        isNew: true,
        statusHistory: [{ status: "Placed", date: "2025-01-01T11:05" }],
        expectedDates: {
            Processing: "2025-01-02",
            "On the Way": "2025-01-03",
            Delivered: "2025-01-05",
        },
    },
    {
        id: "#623-4534",
        product: "Macbook Pro 16 inch",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        customer: "Edwin Martins",
        date: "2025-01-03",
        price: "$6.48",
        status: "Delivered",
        isNew: false,
        statusHistory: [
            { status: "Placed", date: "2025-01-03T10:10" },
            { status: "Delivered", date: "2025-01-04T16:30" },
        ],
        expectedDates: {},
    },
    {
        id: "#998-5879",
        product: "Lego StarWars Edition",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
        customer: "Hellen Jimmy",
        date: "2025-01-05",
        price: "$11.70",
        status: "Pending",
        isNew: true,
        statusHistory: [{ status: "Placed", date: "2025-01-05T09:45" }],
        expectedDates: {
            Processing: "2025-01-06",
            "On the Way": "2025-01-07",
            Delivered: "2025-01-09",
        },
    },
       {
        id: "#998-5879",
        product: "Lego StarWars Edition",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
        customer: "Hellen Jimmy",
        date: "2025-01-05",
        price: "$11.70",
        status: "Pending",
        isNew: true,
        statusHistory: [{ status: "Placed", date: "2025-01-05T09:45" }],
        expectedDates: {
            Processing: "2025-01-06",
            "On the Way": "2025-01-07",
            Delivered: "2025-01-09",
        },
    },
       {
        id: "#998-5879",
        product: "Lego StarWars Edition",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
        customer: "Hellen Jimmy",
        date: "2025-01-05",
        price: "$11.70",
        status: "Pending",
        isNew: true,
        statusHistory: [{ status: "Placed", date: "2025-01-05T09:45" }],
        expectedDates: {
            Processing: "2025-01-06",
            "On the Way": "2025-01-07",
            Delivered: "2025-01-09",
        },
    },
       {
        id: "#998-5879",
        product: "Lego StarWars Edition",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
        customer: "Hellen Jimmy",
        date: "2025-01-05",
        price: "$11.70",
        status: "Pending",
        isNew: true,
        statusHistory: [{ status: "Placed", date: "2025-01-05T09:45" }],
        expectedDates: {
            Processing: "2025-01-06",
            "On the Way": "2025-01-07",
            Delivered: "2025-01-09",
        },
    },
       {
        id: "#998-5879",
        product: "Lego StarWars Edition",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
        customer: "Hellen Jimmy",
        date: "2025-01-05",
        price: "$11.70",
        status: "Pending",
        isNew: true,
        statusHistory: [{ status: "Placed", date: "2025-01-05T09:45" }],
        expectedDates: {
            Processing: "2025-01-06",
            "On the Way": "2025-01-07",
            Delivered: "2025-01-09",
        },
    },
];

/* ---------------- FILTER / STATUS ---------------- */
const FILTER_OPTIONS = [
    "All",
    "Placed",
    "Pending",
    "Processing",
    "On the Way",
    "Delivered",
    "Rejected",
    "Cancelled",
];

const STATUS_OPTIONS = [
    "Placed",
    "Pending",
    "Processing",
    "On the Way",
    "Delivered",
    "Rejected",
    "Cancelled",
];

/* ---------------- STATUS STYLE ---------------- */
const statusStyle = (status) => {
    switch (status) {
        case "Delivered":
            return "bg-green-100 text-green-800";
        case "Pending":
            return "bg-yellow-100 text-yellow-800";
        case "Processing":
        case "On the Way":
            return "bg-blue-100 text-blue-700";
        case "Rejected":
            return "bg-red-100 text-red-700";
        case "Cancelled":
            return "bg-gray-200 text-gray-700";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export default function AllOrdersPage() {
    const [orders, setOrders] = useState(initialOrders);
    const [search, setSearch] = useState("");
    const [openDropdown, setOpenDropdown] = useState(null);
    const [dropdownPos, setDropdownPos] = useState(null);
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const buttonRefs = useRef({});
    const dropdownRef = useRef(null);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    /* ---------------- HANDLE CLICK OUTSIDE ---------------- */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* ---------------- UPDATE STATUS ---------------- */
    const updateStatus = (id, newStatus) => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === id
                    ? {
                        ...o,
                        status: newStatus,
                        isNew: false,
                        statusHistory: [...(o.statusHistory || []), { status: newStatus, date: new Date().toISOString() }],
                    }
                    : o
            )
        );
        setOpenDropdown(null);
        toast.success(`Order ${id} updated to "${newStatus}"`);
    };

    /* ---------------- EXPORT CSV ---------------- */
    const exportToCSV = (orders) => {
        if (!orders || orders.length === 0) return;
        const csvRows = [
            ["Order ID", "Product", "Customer", "Date", "Status", "Amount"],
            ...orders.map((o) => [o.id, o.product, o.customer, o.date, o.status, o.price]),
        ];
        const csvContent = csvRows.map((r) => r.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "orders.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    /* ---------------- FILTER & SORT ---------------- */
    const filteredOrders = orders.filter((o) => {
        const searchMatch =
            o.product.toLowerCase().includes(search.toLowerCase()) ||
            o.customer.toLowerCase().includes(search.toLowerCase()) ||
            o.id.toLowerCase().includes(search.toLowerCase());

        const statusMatch = filterStatus === "All" || o.status === filterStatus;
        return searchMatch && statusMatch;
    });

    const sortedOrders = [...filteredOrders].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));

    const totalPages = Math.ceil(sortedOrders.length / pageSize);
    const paginatedOrders = sortedOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const goToPage = (p) => p >= 1 && p <= totalPages && setCurrentPage(p);

    /* ---------------- UI ---------------- */
    return (
        <div className="min-h-screen bg-[var(--bg-main)] p-4 sm:p-6 space-y-6 text-[var(--text-main)]">
            <ToastContainer position="top-right" autoClose={2000} />
            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold">Orders</h1>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">Track customer orders, delivery & payments</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <div
                        key={i}
                        className="bg-[var(--bg-card)] rounded-xl p-4 sm:p-5 shadow hover:shadow-lg transition flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-center">
                            <p className="text-xs sm:text-sm uppercase text-[var(--text-muted)]">{s.title}</p>
                            <span className={`text-sm sm:text-base font-semibold ${s.positive ? "text-green-600" : "text-red-600"}`}>
                                {s.change}
                            </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mt-2 sm:mt-3">{s.value}</h3>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-[var(--bg-card)] rounded-xl shadow overflow-hidden">
                {/* Search + Filter + Export */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-3 sm:gap-2 border-b">
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        {/* Search */}
                        <div className="relative w-full sm:w-80 md:w-96">
                            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                            <input
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search by order id, product, customer..."
                                className="w-full pl-10 py-2 text-xs sm:text-sm rounded-lg bg-[var(--bg-soft)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            />
                        </div>

                        {/* Filter */}
                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFilterDropdownOpen((prev) => !prev);
                                }}
                                className="px-3 py-2 text-sm rounded-lg bg-[var(--bg-soft)] flex items-center justify-between w-48 focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            >
                                {filterStatus === "All" ? "Filter by Status" : filterStatus}
                                <ChevronDownIcon className="w-4 h-4 ml-2" />
                            </button>
                            {filterDropdownOpen && (
                                <div
                                    className="absolute mt-1 w-48 bg-[var(--bg-card)] border rounded-xl shadow-xl overflow-hidden z-[29]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {FILTER_OPTIONS.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setFilterStatus(option);
                                                setFilterDropdownOpen(false);
                                                setCurrentPage(1);
                                            }}
                                            className={`w-full px-4 py-2 text-left text-sm transition ${filterStatus === option ? "bg-[var(--primary)] text-white" : "hover:bg-[var(--bg-soft)]"
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => exportToCSV(filteredOrders)}
                        className="px-4 py-2 text-sm bg-[var(--primary)] text-white rounded-lg hover:bg-primary/90 transition"
                    >
                        Export CSV
                    </button>
                </div>

                {/* Desktop Table */}
                <table className="min-w-full text-sm hidden sm:table">
                    <thead className="bg-[var(--bg-soft)] text-[var(--text-muted)] uppercase text-xs">
                        <tr>
                            <th className="p-3 text-left">Order ID</th>
                            <th className="p-3 text-left">Product</th>
                            <th className="p-3 text-center">Customer</th>
                            <th className="p-3 text-center">Date</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-center">Amount</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.length > 0 ? (
                            paginatedOrders.map((o) => (
                                <tr key={o.id} className={`border-t hover:bg-[var(--bg-main)] transition ${o.isNew ? "bg-red-50 animate-pulse" : ""}`}>
                                    <td className="p-3 font-medium">{o.id}</td>
                                    <td className="p-3 flex items-center gap-3">
                                        <img src={o.image} alt={o.product} className="w-10 h-10 rounded-lg object-cover border" />
                                        <span>{o.product}</span>
                                        {o.isNew && <span className="ml-2 bg-[var(--primary)] text-white text-xs px-2 py-0.5 rounded-full">NEW</span>}
                                    </td>
                                    <td className="p-3 text-center">{o.customer}</td>
                                    <td className="p-3 text-center">{o.date}</td>
                                    <td className="p-3 text-center">
                                        <button
                                            ref={(el) => (buttonRefs.current[o.id] = el)}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const dropdownWidth = 176;
                                                const dropdownHeight = 240;
                                                const spaceBelow = window.innerHeight - rect.bottom;
                                                const top = spaceBelow < dropdownHeight ? rect.top - dropdownHeight - 6 : rect.bottom + 6;
                                                const left = Math.min(rect.left, window.innerWidth - dropdownWidth - 12);
                                                setDropdownPos({ top, left });
                                                setOpenDropdown(o.id);
                                            }}
                                            className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyle(o.status)}`}
                                        >
                                            {o.status}
                                        </button>
                                    </td>
                                    <td className="p-3 text-center font-semibold">{o.price}</td>
                                    <td className="p-3 text-center align-middle">
                                        <div className="inline-flex gap-2">
                                            <EyeIcon className="w-5 h-5 text-[var(--text-muted)] cursor-pointer hover:text-[var(--primary)] transition" />
                                            <PencilSquareIcon className="w-5 h-5 text-[var(--primary)] cursor-pointer hover:text-primary/80 transition" />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="p-4 text-center text-[var(--text-muted)]">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Mobile Table */}
                <div className="flex flex-col gap-2 sm:hidden p-3">
                    {paginatedOrders.length > 0 ? (
                        paginatedOrders.map((o) => (
                            <div
                                key={o.id}
                                className={`grid grid-cols-2 gap-2 bg-[var(--bg-main)] p-3 rounded-lg shadow-sm hover:shadow-md transition ${o.isNew ? "border-2 border-[var(--primary)] animate-pulse" : ""
                                    }`}
                            >
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">{o.product}</span>
                                        {o.isNew && <span className="bg-[var(--primary)] text-white text-xs px-2 py-0.5 rounded-full">NEW</span>}
                                    </div>
                                    <span className="text-[var(--text-muted)] text-xs">{o.customer}</span>
                                    <span className="text-[var(--text-muted)] text-xs">Order: {o.id}</span>
                                    <span className="text-[var(--text-muted)] text-xs">Date: {o.date}</span>
                                </div>
                                <div className="flex flex-col items-end justify-between gap-1 relative">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyle(o.status)}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const dropdownWidth = 176;
                                            const dropdownHeight = STATUS_OPTIONS.length * 36; 
                                            const padding = 8;

                                            // initial top
                                            let top = rect.bottom + 6; 
                                            if (top + dropdownHeight + padding > window.innerHeight) {
                                                top = rect.top - dropdownHeight - 6;
                                            }
                                            // clamp to top padding
                                            top = Math.max(top, padding);

                                            // initial left
                                            let left = rect.left;
                                            left = Math.min(left, window.innerWidth - dropdownWidth - padding);
                                            left = Math.max(left, padding);

                                            setDropdownPos({ top, left });
                                            setOpenDropdown(openDropdown === o.id ? null : o.id);

                                        }}
                                    >
                                        {o.status}
                                    </span>
                                    <span className="font-semibold">{o.price}</span>
                                    <div className="flex gap-2 mt-1">
                                        <EyeIcon className="w-5 h-5 text-[var(--text-muted)] cursor-pointer hover:text-[var(--primary)] transition" />
                                        <PencilSquareIcon className="w-5 h-5 text-[var(--primary)] cursor-pointer hover:text-primary/80 transition" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-[var(--text-muted)] p-4">No orders found.</div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-between items-center p-3 border-t">
                    <span className="text-[var(--text-muted)] text-xs sm:text-sm">
                        Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredOrders.length)} of {filteredOrders.length}
                    </span>
                    <div className="flex gap-1 flex-wrap justify-center sm:justify-end">
                        <button onClick={() => goToPage(currentPage - 1)} className="p-2 border rounded-lg hover:bg-[var(--bg-soft)] transition">
                            <ChevronLeftIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => goToPage(i + 1)}
                                className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-[var(--primary)] text-white" : "border hover:bg-[var(--bg-soft)]"}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button onClick={() => goToPage(currentPage + 1)} className="p-2 border rounded-lg hover:bg-[var(--bg-soft)] transition">
                            <ChevronRightIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Dropdown Menu */}
            {openDropdown && dropdownPos && (
                <div
                    ref={dropdownRef}
                    style={{ top: dropdownPos.top, left: dropdownPos.left }}
                    className="fixed z-[99999] w-44 bg-[var(--bg-card)] border rounded-xl shadow-xl overflow-hidden"
                >
                    {STATUS_OPTIONS.map((s) => (
                        <button
                            key={s}
                            onClick={() => updateStatus(openDropdown, s)}
                            className={`w-full px-4 py-2 text-sm text-left transition ${orders.find((o) => o.id === openDropdown)?.status === s
                                    ? "bg-[var(--primary)] text-white"
                                    : "hover:bg-[var(--bg-soft)]"
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
