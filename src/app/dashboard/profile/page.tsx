"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    businessName: "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSaved(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Profile Settings</h1>

      <div className="bg-bg-card rounded-2xl border border-border p-6">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          {saved && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-600 text-sm rounded-xl p-3">
              Profile updated successfully.
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Business Name</label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-light transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
