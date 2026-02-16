import ListingForm from "@/components/dashboard/ListingForm";

export const metadata = {
  title: "Add New Listing | Gray Bear Hunting Directory",
};

export default function NewListingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-text mb-6">Add New Listing</h1>
      <div className="bg-gray-dark rounded-xl border border-gray-light p-6">
        <ListingForm mode="create" />
      </div>
    </div>
  );
}
