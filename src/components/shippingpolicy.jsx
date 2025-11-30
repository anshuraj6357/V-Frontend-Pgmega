export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Card Container */}
      <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full p-10 text-center">
        
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8">
          Shipping Policy – ROOMGI
        </h1>

        {/* Content */}
        <p className="text-gray-700 text-lg sm:text-xl mb-4 leading-relaxed">
          ROOMGI is a service-based platform that provides online PG, hostel, and hotel booking services.
        </p>
        <p className="text-gray-700 text-lg sm:text-xl mb-4 leading-relaxed">
          We do not ship any physical products.
        </p>
        <p className="text-gray-700 text-lg sm:text-xl mb-4 leading-relaxed">
          All bookings, confirmations, and receipts are delivered digitally via email, SMS, or WhatsApp.
        </p>
        <p className="text-gray-700 text-lg sm:text-xl font-semibold">
          Therefore, shipping charges and delivery timelines are <span className="text-blue-600">not applicable</span> to our services.
        </p>
      </div>
    </div>
  );
}
