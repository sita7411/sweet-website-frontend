import { useState } from "react";
import { Camera, Mail, Phone, MapPin, Pencil, Check, X, Lock } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "Sita Usdadiya",
    role: "Administrator",
    bio: "Creating elegant admin interfaces, scalable systems & delightful experiences.",
    email: "sita.usdadiya@example.com",
    phone: "+91 98765 43210",
    location: "Surat, Gujarat, India",
    avatar: "https://i.pravatar.cc/300?img=47",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setFormData((prev) => ({ ...prev, avatar: url }));
    }
  };

  const handleSave = () => {
    console.log("Saved Profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => setIsEditing(false);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] rounded-lg p-4 md:p-8 flex flex-col items-center">
      
      {/* Avatar */}
    {/* Avatar */}
<div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl">
  <img 
    src={formData.avatar} 
    alt="avatar" 
    className="w-full h-full object-cover" 
  />
  
  <label 
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/40 w-10 h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-[#f2b705] transition z-20"
  >
    <Camera size={18} className="text-[#c63b2f]" />
    <input 
      type="file" 
      className="hidden" 
      accept="image/*" 
      onChange={handleAvatarChange} 
    />
  </label>
</div>


      {/* Name & Role */}
      <div className="mt-4 text-center">
        {isEditing ? (
          <div className="flex flex-col items-center gap-1">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-xl md:text-2xl font-bold border-b-2 border-[#c63b2f] focus:outline-none focus:border-[#f2b705]"
            />
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="text-sm md:text-base text-[#c63b2f] font-medium border-b-2 border-[#f2b705]/40 focus:outline-none focus:border-[#f2b705]"
            />
          </div>
        ) : (
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#3a2416]">{formData.name}</h1>
            <p className="text-sm md:text-base text-[#c63b2f] font-semibold mt-1">{formData.role}</p>
            <p className="text-[#3a2416] mt-1 md:mt-2 max-w-lg mx-auto text-sm md:text-base">{formData.bio}</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="mt-8 max-w-4xl w-full grid md:grid-cols-2 gap-6">

        {/* Contact Info */}
        <GlassCard title="Contact Info">
          <InfoField icon={Mail} label="Email" value={formData.email} editing={isEditing} name="email" onChange={handleChange} />
          <InfoField icon={Phone} label="Phone" value={formData.phone} editing={isEditing} name="phone" onChange={handleChange} />
          <InfoField icon={MapPin} label="Location" value={formData.location} editing={isEditing} name="location" onChange={handleChange} />
        </GlassCard>

        {/* Password */}
        <GlassCard title="Change Password">
          {["Current Password", "New Password", "Confirm Password"].map((label, i) => (
            <div key={i} className="mb-3">
              <label className="block text-xs md:text-sm text-[#3a2416] mb-1">{label}</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-2 md:p-3 rounded-lg border border-[#f2b705] focus:ring-1 focus:ring-[#f2b705]/50 focus:outline-none transition text-sm md:text-base"
              />
            </div>
          ))}
          <button className="mt-2 w-full py-2 md:py-3 rounded-lg bg-[#c63b2f] text-white hover:brightness-110 transition flex justify-center items-center gap-2 text-sm md:text-base">
            <Lock size={16} /> Update Password
          </button>
        </GlassCard>
      </div>

      {/* Edit / Save Buttons */}
      <div className="flex justify-center gap-3 mt-6 md:mt-8">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 md:px-8 md:py-3 rounded-full bg-[#f2b705] text-[#3a2416] font-semibold hover:scale-105 transition flex items-center gap-2 text-sm md:text-base"
          >
            <Pencil size={16} /> Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={handleCancel}
              className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-[#8a6a52] text-white hover:scale-105 transition flex items-center gap-2 text-sm md:text-base"
            >
              <X size={16} /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-[#c63b2f] text-white hover:scale-105 transition flex items-center gap-2 text-sm md:text-base"
            >
              <Check size={16} /> Save
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Glassmorphism Card
function GlassCard({ title, children }) {
  return (
    <div className="bg-white/50 backdrop-blur-md shadow-lg rounded-2xl p-4 md:p-6 space-y-3 border border-white/20">
      <h3 className="text-sm md:text-base font-semibold text-[#3a2416]">{title}</h3>
      {children}
    </div>
  );
}

// Editable Field
function InfoField({ icon: Icon, label, value, editing, name, onChange }) {
  return (
    <div className="flex items-center gap-2 p-2 md:p-3 bg-white/40 rounded-lg border border-white/20 text-sm md:text-base">
      <div className="p-1 md:p-2 rounded-lg bg-[#f2b705]/30">
        <Icon size={16} className="text-[#c63b2f]" />
      </div>
      {editing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent focus:outline-none text-sm md:text-base"
        />
      ) : (
        <p className="text-[#3a2416] text-sm md:text-base">{value}</p>
      )}
    </div>
  );
}
