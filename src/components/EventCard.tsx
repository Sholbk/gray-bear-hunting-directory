interface EventCardProps {
  title: string;
  date: string;
  location?: string;
  category: string;
}

const categoryColors: Record<string, string> = {
  season: "bg-green-500/10 text-green-400",
  expo: "bg-blue-500/10 text-blue-400",
  class: "bg-purple-500/10 text-purple-400",
  tournament: "bg-amber-brand/10 text-amber-brand",
  meetup: "bg-pink-500/10 text-pink-400",
};

const categoryLabels: Record<string, string> = {
  season: "Season",
  expo: "Expo",
  class: "Class",
  tournament: "Tournament",
  meetup: "Meetup",
};

export default function EventCard({ title, date, location, category }: EventCardProps) {
  const eventDate = new Date(date);

  return (
    <div className="bg-gray-dark rounded-xl p-5 border border-gray-light flex flex-col sm:flex-row sm:items-center gap-4 hover:border-amber-brand transition-all">
      <div className="flex-shrink-0 w-16 text-center">
        <div className="text-2xl font-bold text-amber-brand">
          {eventDate.getDate()}
        </div>
        <div className="text-xs text-gray-muted uppercase">
          {eventDate.toLocaleString("en-US", { month: "short" })}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-gray-text font-semibold mb-1">{title}</h3>
        {location && <p className="text-gray-muted text-sm">{location}</p>}
      </div>
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium self-start ${
          categoryColors[category] || ""
        }`}
      >
        {categoryLabels[category] || category}
      </span>
    </div>
  );
}
