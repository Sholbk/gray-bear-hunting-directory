"use client";

import { useState } from "react";

interface CalendarEvent {
  title: string;
  date: string;
  category: string;
}

interface CalendarGridProps {
  events: CalendarEvent[];
}

const categoryColors: Record<string, string> = {
  season: "bg-green-500",
  expo: "bg-blue-500",
  class: "bg-purple-500",
  tournament: "bg-amber-brand",
  meetup: "bg-pink-500",
};

export default function CalendarGrid({ events }: CalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("en-US", { month: "long", year: "numeric" });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 bg-gray-dark/50 rounded" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDay(day);
    const isToday =
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    days.push(
      <div
        key={day}
        className={`h-24 bg-gray-dark rounded p-1.5 border ${
          isToday ? "border-amber-brand" : "border-gray-light/50"
        }`}
      >
        <span className={`text-xs font-medium ${isToday ? "text-amber-brand" : "text-gray-muted"}`}>
          {day}
        </span>
        <div className="mt-1 space-y-0.5">
          {dayEvents.slice(0, 2).map((evt, i) => (
            <div
              key={i}
              className={`text-[10px] text-white px-1 py-0.5 rounded truncate ${
                categoryColors[evt.category] || "bg-gray-muted"
              }`}
            >
              {evt.title}
            </div>
          ))}
          {dayEvents.length > 2 && (
            <span className="text-[10px] text-gray-muted">+{dayEvents.length - 2} more</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="text-gray-muted hover:text-amber-brand transition-colors p-2">
          &larr;
        </button>
        <h2 className="text-lg font-bold text-gray-text">{monthName}</h2>
        <button onClick={nextMonth} className="text-gray-muted hover:text-amber-brand transition-colors p-2">
          &rarr;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center text-xs font-medium text-gray-muted py-2">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
}
