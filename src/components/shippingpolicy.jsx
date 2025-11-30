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
          ROOMGI does not provide any physical products.
        </p>
        <p className="text-gray-700 text-lg sm:text-xl mb-4 leading-relaxed">
          All services offered (PG, hostel, hotel booking) are digital services.
        </p>
        <p className="text-gray-700 text-lg sm:text-xl font-semibold">
          Hence, shipping is <span className="text-blue-600">not applicable</span>.
        </p>

        {/* Optional Illustration */}
        <div className="mt-8">
          <img
            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-delivery-shopping-flaticons-lineal-color-flat-icons.png"
            alt="No Shipping"
            className="mx-auto w-24 h-24"
          />
        </div>
      </div>
    </div>
  );
}
