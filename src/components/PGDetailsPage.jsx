// import { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Phone,
//   MessageCircle,
//   Navigation,
//   Share2,
//   Star,
//   CheckCircle,
//   XCircle,
//   ChevronLeft,
//   ChevronRight,
//   BadgeCheck,
// } from 'lucide-react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import AuthModal from '../components/AuthModal';
// import pgData from '../data/pgData.json';

// export default function PGDetailsPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
//   const [selectedBed, setSelectedBed] = useState<{ room: string; bed: number } | null>(null);

//   const pg = pgData.find((p) => p.id === parseInt(id || '0'));

//   if (!pg) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header onAuthClick={() => setIsAuthModalOpen(true)} showHome />
//         <div className="max-w-7xl mx-auto px-4 py-16 text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">PG Not Found</h2>
//           <button
//             onClick={() => navigate('/')}
//             className="text-blue-600 hover:text-blue-700"
//           >
//             Go back to home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const handleAction = (action: string) => {
//     setIsAuthModalOpen(true);
//   };

//   const handleBookBed = (roomName: string, bedId: number) => {
//     setSelectedBed({ room: roomName, bed: bedId });
//     setIsAuthModalOpen(true);
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % pg.images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + pg.images.length) % pg.images.length);
//   };

//   const nextFloor = () => {
//     setCurrentFloorIndex((prev) => (prev + 1) % pg.floors.length);
//   };

//   const prevFloor = () => {
//     setCurrentFloorIndex((prev) => (prev - 1 + pg.floors.length) % pg.floors.length);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header onAuthClick={() => setIsAuthModalOpen(true)} showHome />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="relative h-96 rounded-lg overflow-hidden mb-8">
//           <img
//             src={pg.images[currentImageIndex]}
//             alt={pg.name}
//             className="w-full h-full object-cover"
//           />
//           <button
//             onClick={prevImage}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition"
//           >
//             <ChevronLeft className="w-6 h-6 text-gray-800" />
//           </button>
//           <button
//             onClick={nextImage}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition"
//           >
//             <ChevronRight className="w-6 h-6 text-gray-800" />
//           </button>
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//             {pg.images.map((_, index) => (
//               <div
//                 key={index}
//                 className={`w-2 h-2 rounded-full ${
//                   index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900 mb-2">{pg.name}</h1>
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center">
//                       <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
//                       <span className="text-lg font-semibold">{pg.rating}</span>
//                     </div>
//                     {pg.verified && (
//                       <div className="flex items-center text-green-600">
//                         <BadgeCheck className="w-5 h-5 mr-1" />
//                         <span className="text-sm font-medium">Verified</span>
//                       </div>
//                     )}
//                     <span className="text-sm text-gray-500">Since {pg.since}</span>
//                   </div>
//                 </div>
//                 <div
//                   className={`px-4 py-2 rounded-lg text-white font-medium ${
//                     pg.available ? 'bg-green-500' : 'bg-red-500'
//                   }`}
//                 >
//                   {pg.available ? 'Available' : 'Not Available'}
//                 </div>
//               </div>
//               <p className="text-gray-600">{pg.address}</p>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
//               <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
//                 <button
//                   onClick={() => handleAction('call')}
//                   className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
//                 >
//                   <Phone className="w-6 h-6 text-blue-600 mb-2" />
//                   <span className="text-sm font-medium text-gray-700">Call Now</span>
//                 </button>
//                 <button
//                   onClick={() => handleAction('enquiry')}
//                   className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
//                 >
//                   <MessageCircle className="w-6 h-6 text-blue-600 mb-2" />
//                   <span className="text-sm font-medium text-gray-700">Enquiry</span>
//                 </button>
//                 <button
//                   onClick={() => handleAction('direction')}
//                   className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
//                 >
//                   <Navigation className="w-6 h-6 text-blue-600 mb-2" />
//                   <span className="text-sm font-medium text-gray-700">Direction</span>
//                 </button>
//                 <button
//                   onClick={() => handleAction('share')}
//                   className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
//                 >
//                   <Share2 className="w-6 h-6 text-blue-600 mb-2" />
//                   <span className="text-sm font-medium text-gray-700">Share</span>
//                 </button>
//                 <button
//                   onClick={() => handleAction('book')}
//                   className="flex flex-col items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                 >
//                   <span className="text-2xl mb-1">🛏️</span>
//                   <span className="text-sm font-medium">Book</span>
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Facilities</h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                 <div className="flex items-center">
//                   {pg.facilities.acRoom ? (
//                     <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
//                   ) : (
//                     <XCircle className="w-5 h-5 text-red-500 mr-2" />
//                   )}
//                   <span className="text-gray-700">AC Room</span>
//                 </div>
//                 <div className="flex items-center">
//                   {pg.facilities.fanRoom ? (
//                     <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
//                   ) : (
//                     <XCircle className="w-5 h-5 text-red-500 mr-2" />
//                   )}
//                   <span className="text-gray-700">Fan/Cooler Room</span>
//                 </div>
//                 <div className="flex items-center">
//                   {pg.facilities.food ? (
//                     <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
//                   ) : (
//                     <XCircle className="w-5 h-5 text-red-500 mr-2" />
//                   )}
//                   <span className="text-gray-700">Food</span>
//                 </div>
//                 <div className="flex items-center">
//                   {pg.facilities.roWater ? (
//                     <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
//                   ) : (
//                     <XCircle className="w-5 h-5 text-red-500 mr-2" />
//                   )}
//                   <span className="text-gray-700">RO Water</span>
//                 </div>
//                 <div className="flex items-center">
//                   {pg.facilities.wifi ? (
//                     <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
//                   ) : (
//                     <XCircle className="w-5 h-5 text-red-500 mr-2" />
//                   )}
//                   <span className="text-gray-700">Wi-Fi</span>
//                 </div>
//                 <div className="flex items-center">
//                   {pg.facilities.laundry ? (
//                     <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
//                   ) : (
//                     <XCircle className="w-5 h-5 text-red-500 mr-2" />
//                   )}
//                   <span className="text-gray-700">Laundry</span>
//                 </div>
//                 <div className="flex items-center">
//                   {pg.facilities.attachedWashroom ? (
//                     <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
//                   ) : (
//                     <XCircle className="w-5 h-5 text-red-500 mr-2" />
//                   )}
//                   <span className="text-gray-700">Attached Washroom</span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-gray-900">Room Layout</h2>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={prevFloor}
//                     className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>
//                   <span className="text-sm font-medium text-gray-700">
//                     {pg.floors[currentFloorIndex].floorName}
//                   </span>
//                   <button
//                     onClick={nextFloor}
//                     className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
//                   >
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {pg.floors[currentFloorIndex].rooms.map((room) => (
//                   <div key={room.roomName} className="border-2 border-gray-200 rounded-lg p-4">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                       {room.roomName}
//                     </h3>
//                     <div className="grid grid-cols-2 gap-2">
//                       {room.beds.map((bed) => (
//                         <button
//                           key={bed.id}
//                           onClick={() =>
//                             bed.available && handleBookBed(room.roomName, bed.id)
//                           }
//                           disabled={!bed.available}
//                           className={`p-3 rounded-lg text-white font-medium transition ${
//                             bed.available
//                               ? 'bg-green-500 hover:bg-green-600 cursor-pointer'
//                               : 'bg-red-500 cursor-not-allowed'
//                           }`}
//                         >
//                           Bed {bed.id}
//                           <div className="text-xs mt-1">
//                             {bed.available ? '✓ Available' : '✗ Booked'}
//                           </div>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {pg.facilities.food && pg.foodRoutine && (
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Food Section</h2>
//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     Weekly Food Routine
//                   </h3>
//                   <div className="space-y-2">
//                     {Object.entries(pg.foodRoutine).map(([day, menu]) => (
//                       <div
//                         key={day}
//                         className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded"
//                       >
//                         <span className="font-semibold text-gray-900 capitalize">
//                           {day}:
//                         </span>
//                         <p className="text-gray-700 text-sm mt-1">{menu}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <p className="text-sm text-gray-700">
//                     <span className="font-semibold">Charges:</span> {pg.foodCharges}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                 ₹{pg.rent.toLocaleString()}
//                 <span className="text-base font-normal text-gray-500">/month</span>
//               </h2>

//               <div className="space-y-3 mb-6">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Type:</span>
//                   <span className="font-medium text-gray-900">{pg.type}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Distance:</span>
//                   <span className="font-medium text-gray-900">{pg.distance} km</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Location:</span>
//                   <span className="font-medium text-gray-900">{pg.place}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={() => handleAction('book')}
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium text-lg"
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//       <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
//     </div>
//   );
// }


import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Navigation,
  Share2,
  Star,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import pgData from '../data/pgData.json';

export default function PGDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
  const [selectedBed, setSelectedBed] = useState(null);

  const pg = pgData.find((p) => p.id === parseInt(id || '0'));

  if (!pg) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onAuthClick={() => setIsAuthModalOpen(true)} showHome />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">PG Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  const handleAction = (action) => {
    setIsAuthModalOpen(true);
  };

  const handleBookBed = (roomName, bedId) => {
    setSelectedBed({ room: roomName, bed: bedId });
    setIsAuthModalOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % pg.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + pg.images.length) % pg.images.length);
  };

  const nextFloor = () => {
    setCurrentFloorIndex((prev) => (prev + 1) % pg.floors.length);
  };

  const prevFloor = () => {
    setCurrentFloorIndex((prev) => (prev - 1 + pg.floors.length) % pg.floors.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} showHome />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Carousel */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-8">
          <img
            src={pg.images[currentImageIndex]}
            alt={pg.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {pg.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{pg.name}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="text-lg font-semibold">{pg.rating}</span>
                    </div>
                    {pg.verified && (
                      <div className="flex items-center text-green-600">
                        <BadgeCheck className="w-5 h-5 mr-1" />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    )}
                    <span className="text-sm text-gray-500">Since {pg.since}</span>
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg text-white font-medium ${
                    pg.available ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {pg.available ? 'Available' : 'Not Available'}
                </div>
              </div>
              <p className="text-gray-600">{pg.address}</p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <button
                  onClick={() => handleAction('call')}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <Phone className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Call Now</span>
                </button>
                <button
                  onClick={() => handleAction('enquiry')}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <MessageCircle className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Enquiry</span>
                </button>
                <button
                  onClick={() => handleAction('direction')}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <Navigation className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Direction</span>
                </button>
                <button
                  onClick={() => handleAction('share')}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <Share2 className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Share</span>
                </button>
                <button
                  onClick={() => handleAction('book')}
                  className="flex flex-col items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <span className="text-2xl mb-1">🛏️</span>
                  <span className="text-sm font-medium">Book</span>
                </button>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Facilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(pg.facilities).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    {value ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    )}
                    <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Layout */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Room Layout</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevFloor}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-medium text-gray-700">
                    {pg.floors[currentFloorIndex].floorName}
                  </span>
                  <button
                    onClick={nextFloor}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pg.floors[currentFloorIndex].rooms.map((room) => (
                  <div key={room.roomName} className="border-2 border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{room.roomName}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {room.beds.map((bed) => (
                        <button
                          key={bed.id}
                          onClick={() =>
                            bed.available && handleBookBed(room.roomName, bed.id)
                          }
                          disabled={!bed.available}
                          className={`p-3 rounded-lg text-white font-medium transition ${
                            bed.available
                              ? 'bg-green-500 hover:bg-green-600 cursor-pointer'
                              : 'bg-red-500 cursor-not-allowed'
                          }`}
                        >
                          Bed {bed.id}
                          <div className="text-xs mt-1">
                            {bed.available ? '✓ Available' : '✗ Booked'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Section */}
            {pg.facilities.food && pg.foodRoutine && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Food Section</h2>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Weekly Food Routine
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(pg.foodRoutine).map(([day, menu]) => (
                      <div
                        key={day}
                        className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded"
                      >
                        <span className="font-semibold text-gray-900 capitalize">{day}:</span>
                        <p className="text-gray-700 text-sm mt-1">{menu}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Charges:</span> {pg.foodCharges}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ₹{pg.rent.toLocaleString()}
                <span className="text-base font-normal text-gray-500">/month</span>
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">{pg.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Distance:</span>
                  <span className="font-medium text-gray-900">{pg.distance} km</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-900">{pg.place}</span>
                </div>
              </div>

              <button
                onClick={() => handleAction('book')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium text-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
