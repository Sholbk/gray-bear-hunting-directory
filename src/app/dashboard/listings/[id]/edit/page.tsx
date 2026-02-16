import ListingForm from "@/components/dashboard/ListingForm";

export const metadata = {
  title: "Edit Listing | Gray Bear Hunting Directory",
};

export default function EditListingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Edit Listing</h1>
      <div className="bg-bg-card rounded-2xl border border-border p-6">
        <ListingForm mode="edit" />
      </div>
    </div>
  );
}
