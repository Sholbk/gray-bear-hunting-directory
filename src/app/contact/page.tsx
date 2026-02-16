import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us | Gray Bear Hunting Directory",
  description: "Get in touch with the Gray Bear Hunting Directory team. Questions, feedback, or partnership inquiries welcome.",
};

export default function ContactPage() {
  return (
    <div className="bg-gray-darker min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-text mb-4">
            Contact Us
          </h1>
          <p className="text-gray-muted max-w-xl mx-auto">
            Have a question, feedback, or want to list your business? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-gray-dark rounded-xl p-6 border border-gray-light">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-dark rounded-xl p-6 border border-gray-light">
              <h3 className="text-gray-text font-semibold mb-3">Email</h3>
              <p className="text-gray-muted text-sm">info@graybearhunting.com</p>
            </div>
            <div className="bg-gray-dark rounded-xl p-6 border border-gray-light">
              <h3 className="text-gray-text font-semibold mb-3">Business Hours</h3>
              <p className="text-gray-muted text-sm">Monday - Friday: 8am - 6pm CST</p>
              <p className="text-gray-muted text-sm">Saturday: 9am - 2pm CST</p>
            </div>
            <div className="bg-gray-dark rounded-xl p-6 border border-gray-light">
              <h3 className="text-gray-text font-semibold mb-3">List Your Business</h3>
              <p className="text-gray-muted text-sm mb-3">
                Want to be featured in our directory? Sign up for a membership to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
