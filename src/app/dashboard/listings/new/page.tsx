import ListingForm from "@/components/dashboard/ListingForm";

export const metadata = {
  title: "Add New Listing | Gray Bear Hunting Directory",
};

export default function NewListingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Add New Listing</h1>
      <div className="bg-bg-card rounded-2xl border border-border p-6">
        <ListingForm mode="create" />
      </div>
    </div>
  );
}
