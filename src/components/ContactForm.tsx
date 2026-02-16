"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-gray-dark rounded-xl p-8 border border-gray-light text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-gray-text mb-2">Message Sent!</h3>
        <p className="text-gray-muted">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-text mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-text mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-text mb-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-text mb-1">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-amber-brand text-gray-dark py-3 rounded-lg font-semibold hover:bg-amber-light transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
