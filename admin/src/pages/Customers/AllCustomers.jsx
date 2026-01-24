import React, { useState, useMemo, useEffect } from "react";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  XMarkIcon,
  CameraIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://sweet-backend-nhwt.onrender.com";
const ITEMS_PER_PAGE = 10;

export default function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("adminToken");
      console.log(
        "Token from localStorage:",
        token ? "exists (length: " + token.length + ")" : "MISSING",
      );

      if (!token) {
        setError("No admin token found. Please login first.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/admin/customers`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("API response status:", res.status);

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("adminToken");
            setError("Session expired. Please login again.");
            return;
          }
          const errData = await res.json();
          throw new Error(errData.message || `Server error: ${res.status}`);
        }
        const data = await res.json();
        console.log("API full response:", data);

        // backend array return kar raha hai
        const formatted = (Array.isArray(data) ? data : []).map((c) => ({
          id: c._id,
          name: `${c.firstName || ""} ${c.lastName || ""}`.trim(),
          email: c.email || "-",
          phone: c.phone || "-",
          gender:
            c.gender === "male"
              ? "Male"
              : c.gender === "female"
                ? "Female"
                : "Other",
          type: c.accountType || "Regular",
          status: c.isActive === false ? "Inactive" : "Active",
          joinDate: c.createdAt,
          address: c.addresses?.[0]?.street || "",
          notes: c.notes || "",
          avatar:
            c.avatar?.url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              c.firstName || "User",
            )}`,
        }));

        setCustomers(formatted);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      `${c.name} ${c.email} ${c.phone} ${c.notes} ${c.type}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [customers, search]);

  const totalItems = filteredCustomers.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentPageCustomers = filteredCustomers.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const toggleStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c,
      ),
    );
    // TODO: Add real PUT request to backend here if needed
  };

  const handleEditChange = (field, value) => {
    setSelectedCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedCustomer((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(file),
        avatarFile: file, // save file for upload
      }));
    }
  };

  const saveCustomer = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Not authenticated");

      const formData = new FormData();

      // Split name (simple logic)
      const [firstName = "", ...lastNameParts] = (
        selectedCustomer.name || ""
      ).split(" ");
      formData.append("firstName", firstName);
      formData.append("lastName", lastNameParts.join(" "));
      formData.append("email", selectedCustomer.email);
      formData.append("phone", selectedCustomer.phone);
      formData.append(
        "gender",
        selectedCustomer.gender?.toLowerCase() || "other",
      );
      formData.append("accountType", selectedCustomer.type);
      formData.append("notes", selectedCustomer.notes || "");

      // Basic address (you can improve later)
      formData.append(
        "addressStreet",
        selectedCustomer.address?.split(",")[0]?.trim() || "",
      );

      if (selectedCustomer.avatarFile) {
        formData.append("avatar", selectedCustomer.avatarFile);
      }

      const method = selectedCustomer.id ? "PUT" : "POST";
      const url = selectedCustomer.id
        ? `${API_BASE}/api/admin/customers/${selectedCustomer.id}`
        : `${API_BASE}/api/admin/customers`;

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to save customer");
      }

      setIsEditOpen(false);

      // Re-fetch full list after save
      const refreshRes = await fetch(`${API_BASE}/api/admin/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!refreshRes.ok) {
        console.warn("Refresh after save failed");
        return;
      }

      const refreshData = await refreshRes.json();

      const formatted = (
        Array.isArray(refreshData) ? refreshData : refreshData.customers || []
      ).map((c) => ({
        id: c._id,
        name: `${c.firstName || ""} ${c.lastName || ""}`.trim() || "No Name",
        gender: c.gender
          ? c.gender.charAt(0).toUpperCase() + c.gender.slice(1)
          : "Unknown",
        email: c.email || "-",
        phone: c.phone || "-",
        status: c.status || "Active", 
        avatar:
          c.avatar?.url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(c.firstName || "User")}`,
        address: c.addresses?.[0]?.street || "",
        notes: c.notes || "",
        type: c.accountType || "Regular",
        joinDate: c.createdAt
          ? new Date(c.createdAt).toISOString().split("T")[0]
          : "",
      }));

      setCustomers(formatted);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save customer: " + err.message);
    }
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`${API_BASE}/api/admin/customers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  if (loading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-main)" }}
      >
        Loading...
      </div>
    );
  if (error)
    return (
      <div
        className="min-h-screen flex items-center justify-center text-red-600"
        style={{ backgroundColor: "var(--bg-main)" }}
      >
        {error}
      </div>
    );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-main)" }}>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-5 lg:px-6 overflow-x-hidden">
        {/* Header - unchanged */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: "var(--text-main)" }}
            >
              Customers
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
              Manage and view all customer information
            </p>
          </div>

          <div className="relative w-full max-w-md sm:w-80 lg:w-96">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5"
                style={{ color: "var(--text-muted)" }}
              />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, phone or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-lg px-10 py-2 text-sm shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-[var(--primary)] transition-colors"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--text-muted)",
                color: "var(--text-main)",
              }}
            />
          </div>
        </div>

        {/* Table / Cards - unchanged */}
        <div
          className="rounded-xl  shadow-sm overflow-hidden overflow-x-hidden"
          style={{
            borderColor: "var(--text-muted)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table
                className="min-w-full divide-y"
                style={{ borderColor: "var(--text-muted)" }}
              >
                <thead style={{ backgroundColor: "var(--bg-soft)" }}>
                  <tr>
                    <th
                      className="px-2 py-1 md:px-4 md:py-2 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Customer
                    </th>
                    <th
                      className="px-2 py-1 md:px-4 md:py-2 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Gender
                    </th>
                    <th
                      className="px-2 py-1 md:px-4 md:py-2 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Type
                    </th>
                    <th
                      className="px-2 py-1 md:px-4 md:py-2 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Contact
                    </th>
                    <th
                      className="px-2 py-1 md:px-4 md:py-2 text-center text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Status
                    </th>
                    <th
                      className="px-2 py-1 md:px-4 md:py-2 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Joined
                    </th>
                    <th className="relative px-2 py-1 md:px-4 md:py-2">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="divide-y"
                  style={{ borderColor: "var(--text-muted)" }}
                >
                  {currentPageCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="transition-colors hover:bg-[var(--bg-soft)]"
                      style={{ backgroundColor: "var(--bg-card)" }}
                    >
                      <td className="px-2 py-1 md:px-4 md:py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={customer.avatar}
                            alt=""
                            className="h-10 w-10 rounded-full object-cover ring-1"
                            style={{ borderColor: "var(--text-muted)" }}
                          />
                          <div className="min-w-0">
                            <div
                              className="font-medium text-sm md:text-base truncate"
                              style={{ color: "var(--text-main)" }}
                            >
                              {customer.name}
                            </div>
                            <div className="text-xs md:text-sm text-[var(--text-muted)] truncate">
                              {customer.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 md:px-4 md:py-2 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${customer.gender === "Male" ? "bg-blue-50 text-blue-700" : "bg-pink-50 text-pink-700"}`}
                        >
                          {customer.gender}
                        </span>
                      </td>
                      <td
                        className="whitespace-nowrap px-2 py-1 md:px-4 md:py-2 text-sm"
                        style={{ color: "var(--text-main)" }}
                      >
                        {customer.type}
                      </td>
                      <td
                        className="whitespace-nowrap px-2 py-1 md:px-4 md:py-2 text-sm"
                        style={{ color: "var(--text-main)" }}
                      >
                        {customer.phone}
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 md:px-4 md:py-2 text-center">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={customer.status === "Active"}
                            onChange={() => toggleStatus(customer.id)}
                          />
                          <div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[var(--primary)] after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5" />
                        </label>
                      </td>
                      <td
                        className="whitespace-nowrap px-2 py-1 md:px-4 md:py-2 text-sm"
                        style={{ color: "var(--text-main)" }}
                      >
                        {new Date(customer.joinDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                      </td>
                      <td className="whitespace-nowrap px-2 py-1 md:px-4 md:py-2 text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedCustomer({ ...customer });
                              setIsEditOpen(true);
                            }}
                            className="p-1 rounded-lg hover:bg-[var(--bg-soft)]"
                          >
                            <PencilIcon className="h-5 w-5 text-[var(--text-muted)] hover:text-[var(--primary)]" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCustomer({ ...customer });
                              setIsViewOpen(true);
                            }}
                            className="p-1 rounded-lg hover:bg-[var(--bg-soft)]"
                          >
                            <EyeIcon className="h-5 w-5 text-[var(--text-muted)] hover:text-[var(--primary)]" />
                          </button>
                          <button
                            onClick={() => deleteCustomer(customer.id)}
                            className="p-1 rounded-lg hover:bg-red-50"
                          >
                            <TrashIcon className="h-5 w-5 text-[var(--text-muted)] hover:text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards - unchanged */}
          <div className="md:hidden space-y-2 p-2 overflow-x-hidden">
            {currentPageCustomers.map((customer) => (
              <div
                key={customer.id}
                className="bg-[var(--bg-card)] rounded-xl shadow-sm border p-3 space-y-2 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={customer.avatar}
                    alt=""
                    className="h-16 w-16 rounded-full object-cover ring-2 flex-shrink-0"
                    style={{ borderColor: "var(--primary)" }}
                  />
                  <div className="min-w-0 flex-1">
                    <h3
                      className="font-semibold text-lg truncate"
                      style={{ color: "var(--text-main)" }}
                    >
                      {customer.name}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] truncate">
                      {customer.email}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Gender:</span>{" "}
                    <span
                      className="ml-1 font-medium"
                      style={{ color: "var(--text-main)" }}
                    >
                      {customer.gender}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Type:</span>{" "}
                    <span
                      className="ml-1 font-medium"
                      style={{ color: "var(--text-main)" }}
                    >
                      {customer.type}
                    </span>
                  </div>
                  <div className="break-words">
                    <span style={{ color: "var(--text-muted)" }}>Phone:</span>{" "}
                    <span
                      className="ml-1 font-medium"
                      style={{ color: "var(--text-main)" }}
                    >
                      {customer.phone}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Status:</span>{" "}
                    <span
                      className={`ml-1 font-medium ${customer.status === "Active" ? "text-[var(--primary)]" : "text-red-600"}`}
                    >
                      {customer.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedCustomer({ ...customer });
                      setIsEditOpen(true);
                    }}
                    className="p-1 rounded-lg hover:bg-[var(--bg-soft)]"
                  >
                    <PencilIcon className="h-5 w-5 text-[var(--text-muted)] hover:text-[var(--primary)]" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCustomer({ ...customer });
                      setIsViewOpen(true);
                    }}
                    className="p-1 rounded-lg hover:bg-[var(--bg-soft)]"
                  >
                    <EyeIcon className="h-5 w-5 text-[var(--text-muted)] hover:text-[var(--primary)]" />
                  </button>
                  <button
                    onClick={() => deleteCustomer(customer.id)}
                    className="p-1 rounded-lg hover:bg-red-50"
                  >
                    <TrashIcon className="h-5 w-5 text-[var(--text-muted)] hover:text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination - unchanged */}
          <div
            className="flex flex-col items-center justify-between border-t px-4 py-3 sm:flex-row"
            style={{
              borderColor: "var(--text-muted)",
              backgroundColor: "var(--bg-soft)",
            }}
          >
            <div
              className="mb-2 text-sm sm:mb-0"
              style={{ color: "var(--text-muted)" }}
            >
              Showing{" "}
              <span
                className="font-medium"
                style={{ color: "var(--text-main)" }}
              >
                {startIndex + 1}–{endIndex}
              </span>{" "}
              of{" "}
              <span
                className="font-medium"
                style={{ color: "var(--text-main)" }}
              >
                {totalItems}
              </span>{" "}
              customers
            </div>
            {totalPages > 1 && (
              <nav className="flex items-center gap-1" aria-label="Pagination">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border hover:bg-[var(--bg-card)] disabled:opacity-50"
                  style={{ borderColor: "var(--text-muted)" }}
                >
                  <ChevronLeftIcon
                    className="h-5 w-5"
                    style={{ color: "var(--text-muted)" }}
                  />
                </button>
                {getPageNumbers().map((page, idx) => (
                  <React.Fragment key={idx}>
                    {page === "..." ? (
                      <span
                        className="px-3 py-2 text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        onClick={() => goToPage(Number(page))}
                        className={`h-8 w-8 rounded-lg text-sm font-medium ${currentPage === page ? "bg-[var(--primary)] text-white" : "hover:bg-[var(--bg-soft)]"}`}
                        style={{
                          borderColor:
                            currentPage === page
                              ? "transparent"
                              : "var(--text-muted)",
                        }}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border hover:bg-[var(--bg-card)] disabled:opacity-50"
                  style={{ borderColor: "var(--text-muted)" }}
                >
                  <ChevronRightIcon
                    className="h-5 w-5"
                    style={{ color: "var(--text-muted)" }}
                  />
                </button>
              </nav>
            )}
          </div>
        </div>

        {/* Modal - unchanged */}
        {(isEditOpen || isViewOpen) && selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
            <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex flex-col max-h-[80vh] overflow-y-auto">
                <div
                  className="flex items-center justify-between px-6 py-3 sticky top-0 z-10"
                  style={{
                    backgroundColor: isEditOpen
                      ? "var(--primary)"
                      : "var(--bg-soft)",
                    color: isEditOpen ? "white" : "var(--text-main)",
                  }}
                >
                  <h2 className="text-lg font-semibold">
                    {isEditOpen ? "Edit Customer" : "Customer Details"}
                  </h2>
                  <button
                    onClick={() =>
                      isEditOpen ? setIsEditOpen(false) : setIsViewOpen(false)
                    }
                    className="rounded-full p-1 hover:bg-black/20"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="p-4 md:p-6 bg-[var(--bg-main)]">
                  {isEditOpen ? (
                    <form onSubmit={saveCustomer} className="space-y-4 ">
                      {/* Avatar */}
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <img
                            src={selectedCustomer.avatar}
                            alt="profile"
                            className="h-24 w-24 rounded-full object-cover ring-2"
                            style={{ borderColor: "var(--primary)" }}
                          />
                          <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-[var(--primary)] p-2 text-white shadow-lg hover:bg-[var(--secondary)] transition-colors">
                            <CameraIcon className="h-5 w-5" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleAvatarChange}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: "var(--text-main)" }}
                          >
                            Full Name
                          </label>
                          <input
                            value={selectedCustomer.name}
                            onChange={(e) =>
                              handleEditChange("name", e.target.value)
                            }
                            className="block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] transition-colors"
                            style={{
                              borderColor: "var(--text-muted)",
                              backgroundColor: "var(--bg-soft)",
                              color: "var(--text-main)",
                            }}
                          />
                        </div>

                        <div>
                          <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: "var(--text-main)" }}
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            value={selectedCustomer.email}
                            onChange={(e) =>
                              handleEditChange("email", e.target.value)
                            }
                            className="block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] transition-colors"
                            style={{
                              borderColor: "var(--text-muted)",
                              backgroundColor: "var(--bg-soft)",
                              color: "var(--text-main)",
                            }}
                          />
                        </div>

                        <div>
                          <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: "var(--text-main)" }}
                          >
                            Phone
                          </label>
                          <input
                            value={selectedCustomer.phone}
                            onChange={(e) =>
                              handleEditChange("phone", e.target.value)
                            }
                            className="block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] transition-colors"
                            style={{
                              borderColor: "var(--text-muted)",
                              backgroundColor: "var(--bg-soft)",
                              color: "var(--text-main)",
                            }}
                          />
                        </div>

                        <div>
                          <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: "var(--text-main)" }}
                          >
                            Gender
                          </label>
                          <select
                            value={selectedCustomer.gender}
                            onChange={(e) =>
                              handleEditChange("gender", e.target.value)
                            }
                            className="block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] transition-colors"
                            style={{
                              borderColor: "var(--text-muted)",
                              backgroundColor: "var(--bg-soft)",
                              color: "var(--text-main)",
                            }}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: "var(--text-main)" }}
                          >
                            Type
                          </label>
                          <select
                            value={selectedCustomer.type}
                            onChange={(e) =>
                              handleEditChange("type", e.target.value)
                            }
                            className="block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] transition-colors"
                            style={{
                              borderColor: "var(--text-muted)",
                              backgroundColor: "var(--bg-soft)",
                              color: "var(--text-main)",
                            }}
                          >
                            <option value="Regular">Regular</option>
                            <option value="Premium">Premium</option>
                            <option value="VIP">VIP</option>
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: "var(--text-main)" }}
                          >
                            Address
                          </label>
                          <textarea
                            value={selectedCustomer.address}
                            onChange={(e) =>
                              handleEditChange("address", e.target.value)
                            }
                            rows={2}
                            className="block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] transition-colors"
                            style={{
                              borderColor: "var(--text-muted)",
                              backgroundColor: "var(--bg-soft)",
                              color: "var(--text-main)",
                            }}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: "var(--text-main)" }}
                          >
                            Notes
                          </label>
                          <textarea
                            value={selectedCustomer.notes}
                            onChange={(e) =>
                              handleEditChange("notes", e.target.value)
                            }
                            rows={3}
                            className="block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] transition-colors"
                            style={{
                              borderColor: "var(--text-muted)",
                              backgroundColor: "var(--bg-soft)",
                              color: "var(--text-main)",
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsEditOpen(false)}
                          className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50"
                          style={{
                            borderColor: "var(--text-muted)",
                            color: "var(--text-main)",
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium transition-colors hover:bg-[var(--secondary)]"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={selectedCustomer.avatar}
                          alt="profile"
                          className="h-24 w-24 rounded-full object-cover ring-2"
                          style={{ borderColor: "var(--primary)" }}
                        />
                        <h3
                          className="text-xl font-bold"
                          style={{ color: "var(--text-main)" }}
                        >
                          {selectedCustomer.name}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {selectedCustomer.gender} • {selectedCustomer.type} •{" "}
                          <span
                            className={
                              selectedCustomer.status === "Active"
                                ? "text-[var(--primary)] font-medium"
                                : ""
                            }
                          >
                            {selectedCustomer.status}
                          </span>
                        </p>
                      </div>
                      <div
                        className="space-y-2 rounded-xl p-4"
                        style={{ backgroundColor: "var(--bg-soft)" }}
                      >
                        <div className="flex justify-between">
                          <span style={{ color: "var(--text-muted)" }}>
                            Email
                          </span>
                          <span
                            style={{ color: "var(--text-main)" }}
                            className="break-all"
                          >
                            {selectedCustomer.email}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: "var(--text-muted)" }}>
                            Phone
                          </span>
                          <span style={{ color: "var(--text-main)" }}>
                            {selectedCustomer.phone}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: "var(--text-muted)" }}>
                            Joined
                          </span>
                          <span style={{ color: "var(--text-main)" }}>
                            {new Date(
                              selectedCustomer.joinDate,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: "var(--text-muted)" }}>
                            Address
                          </span>
                          <span style={{ color: "var(--text-main)" }}>
                            {selectedCustomer.address}
                          </span>
                        </div>
                        {selectedCustomer.notes && (
                          <div>
                            <span className="block text-[var(--text-muted)] mb-1">
                              Notes
                            </span>
                            <p style={{ color: "var(--text-main)" }}>
                              {selectedCustomer.notes}
                            </p>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => setIsViewOpen(false)}
                        className="w-full py-2.5 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50"
                        style={{
                          borderColor: "var(--text-muted)",
                          color: "var(--text-main)",
                        }}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
