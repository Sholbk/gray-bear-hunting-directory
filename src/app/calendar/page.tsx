"use client";

import { useState } from "react";
import CalendarGrid from "@/components/CalendarGrid";
import EventCard from "@/components/EventCard";
import { calendarEvents } from "@/data/events";

const categories = [
  { value: "all", label: "All Events" },
  { value: "deadline", label: "Application Deadlines" },
  { value: "season", label: "Seasons" },
  { value: "expo", label: "Expos" },
  { value: "class", label: "Classes" },
  { value: "tournament", label: "Tournaments" },
  { value: "meetup", label: "Meetups" },
];

export default function CalendarPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredEvents =
    selectedCategory === "all"
      ? calendarEvents
      : calendarEvents.filter((e) => e.category === selectedCategory);

  const today = new Date().toISOString().split("T")[0];
  const upcoming = filteredEvents
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="bg-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Events Calendar
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Track hunting application deadlines, season dates, expos, and
            community events across all 50 states.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                selectedCategory === cat.value
                  ? "bg-accent text-white"
                  : "bg-bg-card text-text-muted border border-border hover:border-accent hover:text-accent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2 bg-bg-card rounded-xl border border-border p-4">
            <CalendarGrid events={filteredEvents} />
          </div>

          {/* Upcoming Events List */}
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-4">
              Upcoming Events ({upcoming.length})
            </h2>
            <div className="space-y-3">
              {upcoming.slice(0, 12).map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  category={event.category}
                />
              ))}
              {upcoming.length === 0 && (
                <p className="text-text-muted text-sm text-center py-8">
                  No upcoming events in this category.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
