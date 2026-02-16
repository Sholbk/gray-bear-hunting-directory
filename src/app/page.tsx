import HomeSearch from "@/components/HomeSearch";
import CategoryScroller from "@/components/CategoryScroller";
import FeaturedExpeditions from "@/components/FeaturedExpeditions";
import RecentlyAdded from "@/components/RecentlyAdded";

export default function HomePage() {
  return (
    <div className="bg-bg-light min-h-screen">
      <HomeSearch />
      <CategoryScroller />
      <FeaturedExpeditions />
      <RecentlyAdded />
    </div>
  );
}
