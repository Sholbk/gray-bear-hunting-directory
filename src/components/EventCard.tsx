import Link from "next/link";

interface EventCardProps {
  id?: string;
  title: string;
  date: string;
  location?: string;
  category: string;
  url?: string;
}

const categoryColors: Record<string, string> = {
  season: "bg-green-500/10 text-green-400",
  expo: "bg-blue-500/10 text-blue-400",
  class: "bg-purple-500/10 text-purple-400",
  tournament: "bg-accent/10 text-accent",
  meetup: "bg-pink-500/10 text-pink-400",
  deadline: "bg-red-500/10 text-red-400",
};

const categoryLabels: Record<string, string> = {
  season: "Season",
  expo: "Expo",
  class: "Class",
  tournament: "Tournament",
  meetup: "Meetup",
  deadline: "Deadline",
};

export default function EventCard({ id, title, date, location, category }: EventCardProps) {
  const eventDate = new Date(date + "T12:00:00");

  const content = (
    <>
      <div className="flex-shrink-0 w-16 text-center">
        <div className="text-2xl font-bold text-accent">
          {eventDate.getDate()}
        </div>
        <div className="text-xs text-text-muted uppercase">
          {eventDate.toLocaleString("en-US", { month: "short" })}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-text-primary font-semibold mb-1">{title}</h3>
        {location && <p className="text-text-muted text-sm">{location}</p>}
      </div>
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium self-start ${
          categoryColors[category] || ""
        }`}
      >
        {categoryLabels[category] || category}
      </span>
    </>
  );

  const className =
    "bg-bg-card rounded-xl p-5 border border-border flex flex-col sm:flex-row sm:items-center gap-4 hover:border-accent transition-all";

  if (id) {
    return (
      <Link href={`/calendar/${id}`} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
