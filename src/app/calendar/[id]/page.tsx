import Link from "next/link";
import { notFound } from "next/navigation";
import { calendarEvents } from "@/data/events";
import Icon from "@/components/Icon";

const categoryLabels: Record<string, string> = {
  season: "Season",
  expo: "Expo",
  class: "Class",
  tournament: "Tournament",
  meetup: "Meetup",
  deadline: "Application Deadline",
};

const categoryColors: Record<string, string> = {
  season: "bg-green-500/10 text-green-400",
  expo: "bg-blue-500/10 text-blue-400",
  class: "bg-purple-500/10 text-purple-400",
  tournament: "bg-accent/10 text-accent",
  meetup: "bg-pink-500/10 text-pink-400",
  deadline: "bg-red-500/10 text-red-400",
};

const categoryDescriptions: Record<string, string> = {
  deadline: "This is a hunt application deadline. Make sure to submit your application before this date to be included in the draw. Late applications are typically not accepted. Always verify dates and requirements directly with the state agency, as deadlines and regulations can change.",
  season: "This marks the opening of a hunting season. Make sure you have all required licenses, tags, and permits before the season begins. Check with the state wildlife agency for specific regulations, bag limits, and zone restrictions.",
  expo: "This is an outdoor industry expo or trade show. These events are great opportunities to meet guides and outfitters, see new gear, attend seminars, and connect with the hunting community.",
  class: "This is an educational event or certification course. Hunter education and safety courses are required in most states before purchasing a hunting license for the first time.",
  tournament: "This is a competitive outdoor sports event. Check with the event organizer for registration details, entry fees, and rules.",
  meetup: "This is a community gathering for outdoor enthusiasts. A great opportunity to connect with fellow hunters and anglers.",
};

// Build a small subset at build time; rest render on-demand
export function generateStaticParams() {
  return calendarEvents
    .filter((e) => e.category === "deadline")
    .slice(0, 10)
    .map((e) => ({ id: e.id }));
}

export const dynamicParams = true;

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const event = calendarEvents.find((e) => e.id === id);
    if (!event) return { title: "Event Not Found" };
    return {
      title: `${event.title} | Gray Bear Hunting Directory`,
      description: event.description,
    };
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = calendarEvents.find((e) => e.id === id);

  if (!event) notFound();

  const eventDate = new Date(event.date + "T12:00:00");
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDay = new Date(event.date + "T00:00:00");
  const diffMs = eventDay.getTime() - today.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Find other events in the same state/location
  const relatedEvents = calendarEvents.filter(
    (e) => e.id !== event.id && e.location === event.location
  );

  return (
    <div className="bg-bg-light min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/calendar"
          className="inline-flex items-center gap-1 text-accent hover:text-accent-light text-sm mb-8"
        >
          <Icon name="arrow_back" className="w-4 h-4" />
          Back to Calendar
        </Link>

        {/* Header */}
        <div className="bg-bg-card rounded-xl border border-border p-6 sm:p-8 mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                categoryColors[event.category] || ""
              }`}
            >
              {categoryLabels[event.category] || event.category}
            </span>
            {diffDays > 0 && (
              <span className="text-xs text-text-muted">
                {diffDays} day{diffDays !== 1 ? "s" : ""} away
              </span>
            )}
            {diffDays === 0 && (
              <span className="text-xs font-medium text-accent">Today</span>
            )}
            {diffDays < 0 && (
              <span className="text-xs text-text-muted">
                {Math.abs(diffDays)} day{Math.abs(diffDays) !== 1 ? "s" : ""} ago
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            {event.title}
          </h1>

          <p className="text-text-muted leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Icon name="calendar_month" className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-text-muted mb-0.5">Date</p>
                <p className="text-text-primary font-medium text-sm">{formattedDate}</p>
              </div>
            </div>
            {event.location && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon name="location_on" className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-0.5">Location</p>
                  <p className="text-text-primary font-medium text-sm">{event.location}</p>
                </div>
              </div>
            )}
          </div>

          {/* CTA button */}
          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-light transition-colors"
            >
              {event.category === "deadline"
                ? "Apply Now"
                : event.category === "season"
                ? "View Regulations"
                : "Visit Website"}
              <Icon name="open_in_new" className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Info section */}
        <div className="bg-bg-card rounded-xl border border-border p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-3">What You Need to Know</h2>
          <p className="text-text-muted leading-relaxed">
            {categoryDescriptions[event.category] || "Check the official website for more details about this event."}
          </p>
        </div>

        {/* Related events in same state */}
        {relatedEvents.length > 0 && (
          <div className="bg-bg-card rounded-xl border border-border p-6 sm:p-8">
            <h2 className="text-lg font-bold text-text-primary mb-4">
              Other Events in {event.location}
            </h2>
            <div className="space-y-3">
              {relatedEvents.map((rel) => {
                const relDate = new Date(rel.date + "T12:00:00");
                return (
                  <Link
                    key={rel.id}
                    href={`/calendar/${rel.id}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-bg-input transition-colors"
                  >
                    <div className="text-center shrink-0 w-12">
                      <div className="text-lg font-bold text-accent">{relDate.getDate()}</div>
                      <div className="text-[10px] text-text-muted uppercase">
                        {relDate.toLocaleString("en-US", { month: "short" })}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary font-medium text-sm truncate">{rel.title}</p>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          categoryColors[rel.category] || ""
                        }`}
                      >
                        {categoryLabels[rel.category] || rel.category}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
