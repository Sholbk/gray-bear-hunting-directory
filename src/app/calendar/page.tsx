import CalendarGrid from "@/components/CalendarGrid";
import EventCard from "@/components/EventCard";

export const metadata = {
  title: "Events Calendar | Gray Bear Hunting Directory",
  description: "Upcoming hunting seasons, outdoor expos, safety courses, fishing tournaments, and community events.",
};

const events = [
  { title: "Western Hunting Expo", date: "2026-02-12", location: "Salt Lake City, UT", category: "expo" },
  { title: "Spring Turkey Opens", date: "2026-03-15", location: "Nationwide", category: "season" },
  { title: "Hunter Safety Course", date: "2026-03-22", location: "Denver, CO", category: "class" },
  { title: "Bass Pro Fishing Classic", date: "2026-04-05", location: "Springfield, MO", category: "tournament" },
  { title: "Archery Tournament", date: "2026-04-18", location: "Louisville, KY", category: "tournament" },
  { title: "Walleye Season Opens", date: "2026-05-01", location: "Minnesota", category: "season" },
  { title: "NRA Annual Meeting", date: "2026-05-15", location: "Dallas, TX", category: "expo" },
  { title: "Fly Fishing Film Tour", date: "2026-06-10", location: "Various Cities", category: "meetup" },
  { title: "Dove Season Opens", date: "2026-09-01", location: "Southern States", category: "season" },
  { title: "Elk Archery Season", date: "2026-09-10", location: "Colorado", category: "season" },
  { title: "Waterfowl Expo", date: "2026-10-15", location: "Stuttgart, AR", category: "expo" },
  { title: "Whitetail Rifle Season", date: "2026-11-15", location: "Various States", category: "season" },
];

export default function CalendarPage() {
  return (
    <div className="bg-gray-darker min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-text mb-4">
            Events Calendar
          </h1>
          <p className="text-gray-muted max-w-2xl mx-auto">
            Stay up to date with hunting seasons, outdoor expos, safety courses, and community events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2 bg-gray-dark rounded-xl border border-gray-light p-4">
            <CalendarGrid events={events} />
          </div>

          {/* Upcoming Events List */}
          <div>
            <h2 className="text-lg font-bold text-gray-text mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              {events.slice(0, 8).map((event, i) => (
                <EventCard key={i} {...event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
