// src/pages/AddCustomer.jsx
import { useState } from "react";
import axios from "axios";

/* -------------------- Reusable Components -------------------- */
const InputField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-[var(--text-main)]">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 
                 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 
                 bg-white outline-none transition-all duration-200"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder, rows = 3 }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-[var(--text-main)]">{label}</label>
    <textarea
      name={name}
      value={value}
      rows={rows}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 
                 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 
                 bg-white outline-none transition-all duration-200 resize-y min-h-[100px]"
    />
  </div>
);

const RadioGroup = ({ label, name, options, selected, onChange }) => (
  <div className="space-y-3">
    <label className="block text-sm font-medium text-[var(--text-main)]">{label}</label>
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex-1 min-w-[100px] text-center px-5 py-3 rounded-lg border cursor-pointer 
                     transition-all duration-200 text-sm font-medium
                     ${selected === option.value
                       ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                       : "border-gray-300 hover:border-gray-400 bg-white"}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={onChange}
            className="sr-only"
          />
          {option.label}
        </label>
      ))}
    </div>
  </div>
);

const ImageUploader = ({ previewImage, onChange }) => (
  <div className="flex flex-col items-center space-y-3">
    <label className="text-sm font-medium text-[var(--text-main)]">Profile Photo</label>
    <div className="relative group w-36 h-36 sm:w-40 sm:h-40">
      <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 
                      bg-gray-50 shadow-sm flex items-center justify-center">
        {previewImage ? (
          <img src={previewImage} alt="Profile preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-gray-400 text-xs px-4">No photo</div>
        )}
      </div>
      <label className="absolute bottom-1 right-1 bg-[var(--primary)] text-white p-2.5 rounded-full 
                        cursor-pointer hover:bg-[var(--primary)]/90 transition-all shadow-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <input type="file" accept="image/*" onChange={onChange} className="hidden" />
      </label>
    </div>
  </div>
);

/* -------------------- Main Component -------------------- */
export default function AddCustomer() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    notes: "",
    gender: "",
    type: "regular",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const form = new FormData();

      // Append all fields
      Object.keys(formData).forEach((key) => {
        if (key !== "confirmPassword") form.append(key, formData[key]);
      });

      if (imageFile) form.append("avatar", imageFile);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/admin/customers/`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Customer added successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          address: "",
          city: "",
          notes: "",
          gender: "",
          type: "regular",
        });
        setPreviewImage(null);
        setImageFile(null);
      } else {
        alert("Failed to add customer: " + response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error adding customer: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] py-8 px-4 sm:px-6 lg:px-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)]">
            Add New Customer
          </h1>
          <p className="mt-2 text-[var(--text-muted)]">Enter customer details below</p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100/80 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 space-y-10">
            {/* Top Section: Image + Gender */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
              <div className="flex justify-center lg:justify-start">
                <ImageUploader previewImage={previewImage} onChange={handleImageChange} />
              </div>
              <div className="lg:col-span-2">
                <RadioGroup
                  label="Gender"
                  name="gender"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                  selected={formData.gender}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Main Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Enter first name" />
              <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Enter last name" />
              <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required type="tel" placeholder="98765 43210" />
              <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="customer@example.com" />
              <InputField label="Password" name="password" value={formData.password} onChange={handleChange} type="password" required placeholder="Enter password" />
              <InputField label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" required placeholder="Confirm password" />
              <InputField label="City" name="city" value={formData.city} onChange={handleChange} placeholder="Surat" />
            </div>

            <TextAreaField label="Full Address" name="address" value={formData.address} onChange={handleChange} placeholder="House no, society name, landmark..." />

            <RadioGroup
              label="Customer Type"
              name="type"
              options={["regular", "retailer", "wholesale"].map((t) => ({
                value: t,
                label: t.charAt(0).toUpperCase() + t.slice(1),
              }))}
              selected={formData.type}
              onChange={handleChange}
            />

            <TextAreaField label="Notes / Additional Information" name="notes" value={formData.notes} onChange={handleChange} placeholder="Any special remarks about this customer..." />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
              <button type="submit" disabled={loading} className="flex-1 sm:flex-none px-8 py-3.5 bg-[var(--primary)] text-white font-medium 
                         rounded-lg hover:bg-[var(--primary)]/90 transition-all shadow-md
                         active:scale-[0.98] disabled:opacity-50">
                {loading ? "Saving..." : "Save Customer"}
              </button>
              <button type="button" className="flex-1 sm:flex-none px-8 py-3.5 bg-white text-[var(--text-main)] font-medium 
                         rounded-lg border border-gray-300 hover:bg-gray-50 transition-all active:scale-[0.98]"
                      onClick={() => window.history.back()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
