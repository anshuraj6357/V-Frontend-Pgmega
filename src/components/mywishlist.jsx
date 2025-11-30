// import { useState, useEffect } from "react";
// import { useGetWishlistQuery, useToggleWishlistMutation } from "../Bothfeatures/features/api/authapi";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import WishlistButton from "./WishlistButton";
// import Loader from "../components/Loader";

// export default function Wishlist() {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   const { data: wishlistData, isLoading } = useGetWishlistQuery();
//   const [toggleWishlist] = useToggleWishlistMutation();

//   const [pgData, setPgData] = useState([]);

//   // Sync wishlist to pgData
//   useEffect(() => {
//     if (wishlistData?.data) {
//         console.log(wishlistData?.data)
//       setPgData(wishlistData?.data);
//     }
//   }, [wishlistData]);

//   const handleRemove = async (pgId) => {
//     if (!isAuthenticated) {
//       toast.warn("Please login to continue");
//       return;
//     }

//     try {
//       await toggleWishlist(pgId).unwrap();
//       toast.warn("Removed from wishlist");

//       // Update UI instantly
//       setPgData((prev) => prev.filter((item) => item?.data?.pgId !== pgId));
//     } catch (err) {
//       toast.error("Failed to remove. Try again.");
//     }
//   };

//   // Loader
//   if (isLoading) return <Loader />;

//   // Empty state
//   if (!pgData || pgData.length === 0) {
//     return <div className="text-center mt-20 text-lg font-medium">Your wishlist is empty 💔</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Your Wishlist ❤️</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {pgData.map((pg) => (
//           <div
//             key={pg._id}
//             className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
//             onClick={() => navigate(`/pg/${pg._id}`)}
//           >
//             {/* Image Section */}
//             <div className="relative">
//               <img
//                 src={pg?.roomImages?.[0] || "/placeholder.jpg"}
//                 alt={pg.name}
//                 className="h-40 w-full object-cover"
//               />

//               {/* Wishlist Button */}
//               <div onClick={(e) => e.stopPropagation()}>
//                 <WishlistButton pg={pg} />
//               </div>

//               {/* Remove Button */}
//               <button
//                 className="absolute bottom-2 right-2 text-xs px-2 py-1 bg-red-600 text-white rounded"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleRemove(pg.pgId);
//                 }}
//               >
//                 Remove
//               </button>
//             </div>

//             {/* Details Section */}
//             <div className="p-3">
//               <div className="flex justify-between items-center">
//                 <p className="font-semibold">{pg?.branch?.name}</p>
//                 <p className="text-sm bg-green-600 text-white px-2 py-0.5 rounded-lg">
//                   {pg?.category}
//                 </p>
//               </div>

//               <p className="text-gray-500 text-sm mt-1">📍 {pg?.branch?.address}</p>

//               {/* Price */}
//               {pg?.category === "Pg" ? (
//                 <p className="mt-1 font-semibold text-blue-700">₹{pg?.price}/RentPerMonth</p>
//               ) : (
//                 <p className="mt-1 font-semibold text-blue-700">₹{pg?.rentperNight}/rentperNight</p>
//               )}

//               {/* Facilities */}
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {pg?.facilities?.slice(0, 4).map((item, idx) => (
//                   <span
//                     key={idx}
//                     className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
//                   >
//                     {item}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
