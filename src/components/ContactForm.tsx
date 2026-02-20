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
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:contact@graybearhunting.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-bg-card rounded-xl p-8 border border-border text-center">
        <div className="text-4xl mb-4">&#10003;</div>
        <h3 className="text-xl font-bold text-text-primary mb-2">Opening Email Client</h3>
        <p className="text-text-muted">
          Your default email app should open with the message pre-filled. If it
          didn&apos;t open, you can email us directly at{" "}
          <a
            href="mailto:contact@graybearhunting.com"
            className="text-accent hover:text-accent-light"
          >
            contact@graybearhunting.com
          </a>
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-accent text-sm hover:text-accent-light transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-accent"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-accent resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent-light transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
