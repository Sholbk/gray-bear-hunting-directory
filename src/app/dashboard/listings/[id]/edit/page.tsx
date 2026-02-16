import ListingForm from "@/components/dashboard/ListingForm";

export const metadata = {
  title: "Edit Listing | Gray Bear Hunting Directory",
};

export default function EditListingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-text mb-6">Edit Listing</h1>
      <div className="bg-gray-dark rounded-xl border border-gray-light p-6">
        <ListingForm mode="edit" />
      </div>
    </div>
  );
}
