// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   Plus,
//   Edit,
//   UserPlus,
//   Trash2,
//   Eye,
//   MapPin,
//   Users,
//   BedDouble,
// } from "lucide-react";

// import {
//   useAddbranchMutation,
//   useDeletePropertyMutation,
//   useGetAllBranchQuery,
//   useGetAllBranchByOwnerQuery,
//   useAddbranchmanagerMutation,
//   useGetAllBranchbybranchIdQuery
// } from "../../Bothfeatures/features2/api/propertyapi";

// export default function Properties() {

//   const user = useSelector((state) => state.auth.user);

//   console.log(user?.role)
//   const [deleteProperty] = useDeletePropertyMutation()

//   const { data: allbranch, error: dataerror } = useGetAllBranchQuery(
//     undefined,
//     { skip: user?.role !== "branch-manager" }
//   );

//   const { data: allbranchowner, error: dataerrors } = useGetAllBranchByOwnerQuery(
//     undefined,
//     { skip: user?.role !== "owner" }
//   );

//   const { data: branchmanagerdata } = useGetAllBranchbybranchIdQuery(
//     undefined,
//     { skip: user?.role !== "branch-manager" }
//   );

//   const [addbranch, { data }] = useAddbranchMutation();
//   const [addbranchmanager] = useAddbranchmanagerMutation();

//   const navigate = useNavigate();

//   const [branchfetched, setbranchfetched] = useState(null);

//   useEffect(() => {
//     if (allbranch) setbranchfetched(allbranch?.allbranch);
//     if (allbranchowner) setbranchfetched(allbranchowner?.allbranch);
//     if (branchmanagerdata) setbranchfetched(branchmanagerdata?.allbranch);
//   }, [allbranch, branchmanagerdata, allbranchowner]);

//   // Modals
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [addmanager, setAddManager] = useState(false);

//   // Manager states
//   const [branchid, setbranchid] = useState(null);
//   const [managerData, setManagerData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   // Property form
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     state: "",
//     pincode: "",
//     city: "",
//     streetAdress: "",
//     landmark: "",
//     images: [],
//     previewImages: [],
//   });


//   // Handlers
//   const handleManagerChange = (e) => {
//     const { name, value } = e.target;
//     setManagerData({ ...managerData, [name]: value });
//   };

//   const handleAppointManager = (id) => {
//     setbranchid(id);
//     setAddManager(true);
//   };
//   const vaccalclate = (totalBeds, length) => {
//     if (totalBeds === 0) return 0;
//     else return totalBeds - length

//   }

//   const handleSaveManager = async (e) => {
//     e.preventDefault();
//     await addbranchmanager({ managerData, branchid }).unwrap();
//     setAddManager(false);
//   };

//   const handlePropertyChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSaveProperty = async (e) => {
//     e.preventDefault();

//     const payload = new FormData();
//     payload.append("name", formData.name);
//     payload.append("address", formData.address);
//     payload.append("city", formData.city);
//     payload.append("state", formData.state);
//     payload.append("pincode", formData.pincode);
//     payload.append("streetAdress", formData.streetAdress);
//     payload.append("landmark", formData.landmark);


//     formData.images.forEach((file) => {
//       payload.append("images", file);
//     });
//     console.log(payload)

//     await addbranch(payload);
//     setShowAddModal(false);
//   };
//   const DeletingProperty = async (len, id) => {
//     if (len == 0) {
//       console.log(id)
//       await deleteProperty(id);
//     }
//   }


//   const getStatusColor = (vacancy) => {
//     if (vacancy === 0) return "bg-red-100 text-red-600";
//     if (vacancy <= 5) return "bg-yellow-100 text-yellow-600";
//     return "bg-green-100 text-green-600";
//   };

//   const getOccupancyRate = (occupied, total) => {
//     if (total === 0) return 0;
//     return Math.round((occupied / total) * 100);
//   };

//   return (
//     <div className="space-y-6">

//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100">

//         {/* Left Section */}
//         <div>
//           <h1 className="text-[#1e3a5f] text-3xl font-bold tracking-tight">
//             Property Management
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Manage your PG properties with ease & clarity
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-4">

//           {user?.role === "owner" && (
//             <button
//               onClick={() => setShowAddModal(true)}
//               className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white
//                    bg-gradient-to-r from-[#ff6b35] to-[#ff8c4a]
//                    shadow-md hover:shadow-lg transition-all duration-300
//                    hover:scale-[1.03] active:scale-[0.97]"
//             >
//               <Plus size={18} />
//               Add Property
//             </button>
//           )}

//           {user?.role === "branch-manager" && (
//             <button
//               onClick={() => navigate('/admin/addroom')}
//               className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white
//                    bg-gradient-to-r from-[#1e3a5f] to-[#274a75]
//                    shadow-md hover:shadow-lg transition-all duration-300
//                    hover:scale-[1.03] active:scale-[0.97]"
//             >
//               <Plus size={18} />
//               Add Room
//             </button>
//           )}

//         </div>
//       </div>



//       {/* PROPERTIES GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//         {branchfetched?.length > 0 ? (
//           branchfetched.map((property) => {
//             const occupancyRate = getOccupancyRate(
//               property.occupiedRoom?.length,
//               property.totalBeds
//             );

//             return (
//               <div
//                 key={property._id}
//                 className="bg-white rounded-3xl shadow-lg border hover:shadow-2xl transition-all duration-300 overflow-hidden"
//               >
//                 {/* Image Section */}
//                 <div className="relative h-56">
//                   <img
//                     src={property.Propertyphoto}
//                     className="w-full h-full object-cover rounded-t-3xl"
//                   />

//                   {/* Manager Badge */}
//                   {!property.branchmanager ? (
//                     <button
//                       onClick={() => handleAppointManager(property._id)}
//                       className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2 text-sm"
//                     >
//                       <UserPlus size={16} /> Appoint Manager
//                     </button>
//                   ) : (
//                     <button className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2 text-sm">
//                       <UserPlus size={16} /> {property.branchmanager.name}
//                     </button>
//                   )}

//                   {/* Vacancy Badge */}
//                   <div
//                     className={`absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-medium shadow-md ${getStatusColor(
//                       property.vacancy
//                     )}`}
//                   >
//                     {vaccalclate(
//                       property.totalBeds,
//                       property.occupiedRoom?.length
//                     )}{" "}
//                     Vacant
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="p-6">
//                   <h3 className="text-2xl font-semibold text-[#1e3a5f] mb-2 tracking-tight">
//                     {property.name}
//                   </h3>

//                   {/* Address */}
//                   <div className="flex items-center gap-2 text-gray-600 text-sm mb-5">
//                     <MapPin size={18} className="text-gray-500" />{" "}
//                     <span className="truncate">{property.address}</span>
//                   </div>

//                   {/* Stats */}
//                   <div className="grid grid-cols-3 gap-4 mb-6">
//                     <div className="text-center p-4 bg-gray-100 rounded-2xl shadow-inner">
//                       <BedDouble size={20} className="mx-auto text-gray-600 mb-1" />
//                       <p className="text-sm text-gray-600">Beds</p>
//                       <p className="text-lg font-semibold text-[#1e3a5f]">
//                         {property.totalBeds}
//                       </p>
//                     </div>

//                     <div className="text-center p-4 bg-gray-100 rounded-2xl shadow-inner">
//                       <Users size={20} className="mx-auto text-gray-600 mb-1" />
//                       <p className="text-sm text-gray-600">Occupied</p>
//                       <p className="text-lg font-semibold text-[#1e3a5f]">
//                         {(property?.occupiedRoom?.length || 0)} /
//                         {property.totalBeds}
//                       </p>
//                     </div>

//                     <div className="text-center p-4 bg-gray-100 rounded-2xl shadow-inner">
//                       <p className="text-sm text-gray-600">Occupancy</p>
//                       <p className="text-lg font-semibold text-orange-600">
//                         {occupancyRate}%
//                       </p>
//                     </div>
//                   </div>

//                   {/* Buttons */}
//                   <div className="flex gap-3">
//                     <button className="flex-1 bg-[#1e3a5f] text-white py-2.5 rounded-2xl flex items-center justify-center gap-2 font-medium hover:bg-[#162f4b] transition-all">
//                       <Eye size={18} /> View Layout
//                     </button>

//                     {user?.role !== "branch-manager" && (
//                       <>
//                         <button className="p-3 border rounded-2xl hover:bg-gray-100 transition">
//                           <Edit size={18} />
//                         </button>

//                         <button
//                           onClick={() =>
//                             DeletingProperty(
//                               property.occupiedRoom?.length,
//                               property._id
//                             )
//                           }
//                           className="p-3 border border-red-400 rounded-2xl hover:bg-red-50 transition"
//                         >
//                           <Trash2 className="text-red-500" size={18} />
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="text-gray-500 text-center col-span-3">
//             No branches found.
//           </div>
//         )}
//       </div>


//       {/* ADD MANAGER MODAL */}
//       {addmanager && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

//           <div className="bg-white rounded-2xl w-full max-w-md shadow-xl border border-gray-200
//                     animate-[fadeIn_0.25s_ease-out]">

//             {/* Header */}
//             <div className="p-6 border-b">
//               <h2 className="text-xl font-semibold text-gray-800">Appoint Manager</h2>
//               <p className="text-sm text-gray-500 mt-1">Fill out the details to appoint a new manager.</p>
//             </div>

//             <form onSubmit={handleSaveManager} className="p-6 space-y-5">

//               {/* Name */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Enter manager name"
//                   className="w-full border border-gray-300 p-3 rounded-xl mt-1
//                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                   onChange={handleManagerChange}
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="manager@example.com"
//                   className="w-full border border-gray-300 p-3 rounded-xl mt-1
//                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                   onChange={handleManagerChange}
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">Phone Number</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Enter phone number"
//                   className="w-full border border-gray-300 p-3 rounded-xl mt-1
//                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                   onChange={handleManagerChange}
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={() => setAddManager(false)}
//                   className="flex-1 border border-gray-300 text-gray-700 p-3 rounded-xl 
//                        hover:bg-gray-100 transition-all font-medium"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="flex-1 bg-blue-600 text-white p-3 rounded-xl shadow-md 
//                        hover:bg-blue-700 transition-all font-medium"
//                 >
//                   Save Manager
//                 </button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}


//       {/* ADD PROPERTY MODAL */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

//           <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl border border-gray-200 
//       animate-scaleIn max-h-[90vh] overflow-y-auto">

//             {/* Header */}
//             <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-2xl">
//               <h2 className="text-2xl font-semibold text-white tracking-wide">
//                 Add New Property
//               </h2>
//             </div>

//             <form onSubmit={handleSaveProperty} className="p-6 space-y-6">

//               {/* PG Name */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">PG Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Enter PG Name"
//                   className="inputField"
//                   value={formData.name}
//                   onChange={handlePropertyChange}
//                   required
//                 />
//               </div>

//               {/* Address */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Enter Full Address"
//                   className="inputField"
//                   value={formData.address}
//                   onChange={handlePropertyChange}
//                   required
//                 />
//               </div>

//               {/* City & State */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">City</label>
//                   <input
//                     type="text"
//                     name="city"
//                     placeholder="City Name"
//                     className="inputField"
//                     value={formData.city}
//                     onChange={handlePropertyChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-700">State</label>
//                   <input
//                     type="text"
//                     name="state"
//                     placeholder="State Name"
//                     className="inputField"
//                     value={formData.state}
//                     onChange={handlePropertyChange}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Pincode */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">Pincode</label>
//                 <input
//                   type="number"
//                   name="pincode"
//                   placeholder="Enter Pincode"
//                   className="inputField"
//                   value={formData.pincode}
//                   onChange={handlePropertyChange}
//                   required
//                 />
//               </div>

//               {/* Street Address */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">Street Address</label>
//                 <input
//                   type="text"
//                   name="streetAdress"
//                   placeholder="Street Address"
//                   className="inputField"
//                   value={formData.streetAdress}
//                   onChange={handlePropertyChange}
//                   required
//                 />
//               </div>

//               {/* Landmark */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">Landmark</label>
//                 <input
//                   type="text"
//                   name="landmark"
//                   placeholder="Nearest Landmark"
//                   className="inputField"
//                   value={formData.landmark}
//                   onChange={handlePropertyChange}
//                   required
//                 />
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">Upload Images</label>

//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   onChange={(e) => {
//                     const files = Array.from(e.target.files);
//                     const previews = files.map((f) => URL.createObjectURL(f));
//                     setFormData({
//                       ...formData,
//                       images: files,
//                       previewImages: previews,
//                     });
//                   }}
//                 />

//                 {/* Previews */}
//                 <div className="grid grid-cols-3 gap-4 mt-4">
//                   {formData.previewImages.map((img, i) => (
//                     <div key={i} className="relative">
//                       <img
//                         src={img}
//                         className="w-full h-28 rounded-xl object-cover shadow-md hover:scale-105 transition"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-4 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="flex-1 border p-3 rounded-xl font-medium hover:bg-gray-100 transition"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="flex-1 bg-blue-600 text-white p-3 rounded-xl font-medium 
//             hover:bg-blue-700 transition shadow-md"
//                 >
//                   Save Property
//                 </button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}


//     </div>
//   );
// }
// src/admin/Properties.jsx



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Plus,
  Edit,
  UserPlus,
  Trash2,
  Eye,
  MapPin,
  Users,
  BedDouble,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  useAddbranchMutation,
  useDeletePropertyMutation,
  useGetAllBranchQuery,
  useGetAllBranchByOwnerQuery,
  useAddbranchmanagerMutation,
  useGetAllBranchbybranchIdQuery,
} from "../../Bothfeatures/features2/api/propertyapi";

export default function Properties() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Queries (get refetch functions so we can force-refetch after mutations)
  const {
    data: allbranch,
    error: dataerror,
    refetch: refetchAllBranch,
    isLoading: loadingAllBranch,
  } = useGetAllBranchQuery(undefined, { skip: user?.role !== "branch-manager" });

  const {
    data: allbranchowner,
    error: dataerrors,
    refetch: refetchAllBranchOwner,
    isLoading: loadingAllBranchOwner,
  } = useGetAllBranchByOwnerQuery(undefined, { skip: user?.role !== "owner" });

  const {
    data: branchmanagerdata,
    refetch: refetchBranchManagerData,
    isLoading: loadingBranchManagerData,
  } = useGetAllBranchbybranchIdQuery(undefined, { skip: user?.role !== "branch-manager" });

  // Mutations (with loading flags)
  const [addbranch, { isLoading: addingBranch }] = useAddbranchMutation();
  const [addbranchmanager, { isLoading: addingManager }] = useAddbranchmanagerMutation();
  const [deleteProperty, { isLoading: deletingProperty }] = useDeletePropertyMutation();

  // Local state
  const [branchfetched, setbranchfetched] = useState(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [addmanager, setAddManager] = useState(false);

  // Manager form
  const [branchid, setbranchid] = useState(null);
  const [managerData, setManagerData] = useState({ name: "", email: "", phone: "" });

  // Property form
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    state: "",
    pincode: "",
    city: "",
    streetAdress: "",
    landmark: "",
    images: [],
    previewImages: [],
  });

  // Sync fetched branches into local variable
  useEffect(() => {
    if (allbranch) setbranchfetched(allbranch?.allbranch);
    if (allbranchowner) setbranchfetched(allbranchowner?.allbranch);
    if (branchmanagerdata) setbranchfetched(branchmanagerdata?.allbranch);
  }, [allbranch, allbranchowner, branchmanagerdata]);

  // Helpers
  const vaccalclate = (totalBeds, length) => (totalBeds === 0 ? 0 : totalBeds - length);

  const getStatusColor = (vacancy) => {
    if (vacancy === 0) return "bg-red-100 text-red-600";
    if (vacancy <= 5) return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  const getOccupancyRate = (occupied, total) => {
    if (!total) return 0;
    return Math.round((occupied / total) * 100);
  };

  // Handlers
  const handleManagerChange = (e) => {
    const { name, value } = e.target;
    setManagerData({ ...managerData, [name]: value });
  };

  const handleAppointManager = (id) => {
    setbranchid(id);
    setAddManager(true);
    setManagerData({ name: "", email: "", phone: "" });
  };

  const handleSaveManager = async (e) => {
    e.preventDefault();
    if (!managerData.name || !managerData.email || !managerData.phone) {
      toast.warn("Please fill all manager fields.");
      return;
    }

    try {
      const res = await addbranchmanager({ managerData, branchid }).unwrap();
      toast.success(res?.message || "Manager appointed successfully.");
      setAddManager(false);

      // refetch queries that might be affected (owner/manager/main)
      if (user?.role === "owner") {
        console.log("ower")
        refetchAllBranchOwner?.();
      } else if (user.role === "branch-manager") {
         console.log("branch-manager")
        refetchAllBranch?.();
        refetchBranchManagerData?.();
      }

    } catch (err) {
      console.error("appoint manager error:", err);
      toast.error(err?.data?.message || "Failed to appoint manager.");
    }
  };

  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProperty = async (e) => {
    e.preventDefault();

    // 1️⃣ Basic validation
    if (!formData.name || !formData.address) {
      toast.warn("Please provide at least name and address.");
      return;
    }

    // 2️⃣ Create form-data payload
    const payload = new FormData();
    payload.append("name", formData.name.trim());
    payload.append("address", formData.address.trim());
    payload.append("city", formData.city.trim());
    payload.append("state", formData.state.trim());
    payload.append("pincode", formData.pincode.trim());
    payload.append("streetAdress", formData.streetAdress.trim());
    payload.append("landmark", formData.landmark.trim());

    // Append images
    (formData.images || []).forEach((file) => {
      payload.append("images", file);
    });

    try {
      // 3️⃣ API call
      const res = await addbranch(payload).unwrap();

      toast.success(res?.message || "Property added successfully.");

      // 4️⃣ Close modal
      setShowAddModal(false);

      // 5️⃣ Reset form
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        streetAdress: "",
        landmark: "",
        images: [],
        previewImages: [],
      });

     if (user?.role === "owner") {
        console.log("ower")
        refetchAllBranchOwner?.();
      } else if (user.role === "branch-manager") {
         console.log("branch-manager")
        refetchAllBranch?.();
        refetchBranchManagerData?.();
      }

    } catch (err) {
      console.error("Add property error:", err);
      toast.error(err?.data?.message || "Failed to add property.");
    }
  };

  const DeletingProperty = async (len, id) => {
    if (len !== 0) {
      toast.warn("Can't delete property: there are occupied rooms.");
      return;
    }

    if (!confirm("Are you sure you want to delete this property? This action is irreversible.")) return;

    try {
      const res = await deleteProperty(id).unwrap();
      toast.success(res?.message || "Property deleted.");
      // refetch
      if (refetchAllBranch) refetchAllBranch();
      if (refetchAllBranchOwner) refetchAllBranchOwner();
      if (refetchBranchManagerData) refetchBranchManagerData();
    } catch (err) {
      console.error("delete property error:", err);
      toast.error(err?.data?.message || "Failed to delete property.");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-[#1e3a5f] text-3xl font-bold tracking-tight">
            Property Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage your PG properties with ease & clarity</p>
        </div>

        <div className="flex gap-4">
          {user?.role === "owner" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white
                   bg-gradient-to-r from-[#ff6b35] to-[#ff8c4a]
                   shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <Plus size={18} />
              Add Property
            </button>
          )}

          {user?.role === "branch-manager" && (
            <button
              onClick={() => navigate('/admin/addroom')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white
                   bg-gradient-to-r from-[#1e3a5f] to-[#274a75]
                   shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <Plus size={18} />
              Add Room
            </button>
          )}
        </div>
      </div>

      {/* PROPERTIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Loading skeleton when queries are fetching */}
        {(loadingAllBranch || loadingAllBranchOwner || loadingBranchManagerData) && (
          <div className="col-span-3 flex justify-center items-center p-10">
            <Loader2 className="w-12 h-12 animate-spin text-gray-400" />
          </div>
        )}

        {branchfetched?.length > 0 ? (
          branchfetched.map((property) => {
            const occupancyRate = getOccupancyRate(property.occupiedRoom?.length, property.totalBeds);
            return (
              <div
                key={property._id}
                className="bg-white rounded-3xl shadow-lg border hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-56">
                  <img src={property.Propertyphoto} className="w-full h-full object-cover rounded-t-3xl" />

                  {!property.branchmanager ? (
                    <button
                      onClick={() => handleAppointManager(property._id)}
                      className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2 text-sm"
                    >
                      <UserPlus size={16} /> Appoint Manager
                    </button>
                  ) : (
                    <button className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2 text-sm">
                      <UserPlus size={16} /> {property.branchmanager.name}
                    </button>
                  )}

                  <div className={`absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-medium shadow-md ${getStatusColor(property.vacancy)}`}>
                    {vaccalclate(property.totalBeds, property.occupiedRoom?.length)} Vacant
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-[#1e3a5f] mb-2 tracking-tight">{property.name}</h3>

                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-5">
                    <MapPin size={18} className="text-gray-500" />
                    <span className="truncate">{property.address}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-100 rounded-2xl shadow-inner">
                      <BedDouble size={20} className="mx-auto text-gray-600 mb-1" />
                      <p className="text-sm text-gray-600">Beds</p>
                      <p className="text-lg font-semibold text-[#1e3a5f]">{property.totalBeds}</p>
                    </div>

                    <div className="text-center p-4 bg-gray-100 rounded-2xl shadow-inner">
                      <Users size={20} className="mx-auto text-gray-600 mb-1" />
                      <p className="text-sm text-gray-600">Occupied</p>
                      <p className="text-lg font-semibold text-[#1e3a5f]">{(property?.occupiedRoom?.length || 0)} / {property.totalBeds}</p>
                    </div>

                    <div className="text-center p-4 bg-gray-100 rounded-2xl shadow-inner">
                      <p className="text-sm text-gray-600">Occupancy</p>
                      <p className="text-lg font-semibold text-orange-600">{occupancyRate}%</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#1e3a5f] text-white py-2.5 rounded-2xl flex items-center justify-center gap-2 font-medium hover:bg-[#162f4b] transition-all">
                      <Eye size={18} /> View Layout
                    </button>

                    {user?.role !== "branch-manager" && (
                      <>
                        <button className="p-3 border rounded-2xl hover:bg-gray-100 transition">
                          <Edit size={18} />
                        </button>

                        <button
                          onClick={() => DeletingProperty(property?.occupiedRoom?.length, property?._id)}
                          className="p-3 border border-red-400 rounded-2xl hover:bg-red-50 transition flex items-center justify-center"
                        >
                          {deletingProperty ? (
                            <Loader2 className="w-5 h-5 animate-spin text-red-500" />
                          ) : (
                            <Trash2 className="text-red-500" size={18} />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 text-center col-span-3 p-8">
            <p className="text-lg font-medium">No branches found.</p>
            <p className="text-sm text-gray-400 mt-2">
              You can add a new property using the <span className="font-semibold">Add Property</span> button.
            </p>
          </div>
        )}
      </div>

      {/* ADD MANAGER MODAL */}
      {addmanager && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl border border-gray-200 animate-[fadeIn_0.25s_ease-out]">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Appoint Manager</h2>
              <p className="text-sm text-gray-500 mt-1">Fill out the details to appoint a new manager.</p>
            </div>

            <form onSubmit={handleSaveManager} className="p-6 space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" placeholder="Enter manager name" className="w-full border border-gray-300 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500" onChange={handleManagerChange} />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" placeholder="manager@example.com" className="w-full border border-gray-300 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500" onChange={handleManagerChange} />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input type="text" name="phone" placeholder="Enter phone number" className="w-full border border-gray-300 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500" onChange={handleManagerChange} />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setAddManager(false)} className="flex-1 border border-gray-300 text-gray-700 p-3 rounded-xl hover:bg-gray-100 transition-all font-medium">
                  Cancel
                </button>

                <button type="submit" className="flex-1 bg-blue-600 text-white p-3 rounded-xl shadow-md hover:bg-blue-700 transition-all font-medium">
                  {addingManager ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Save Manager"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PROPERTY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl border border-gray-200 animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-2xl">
              <h2 className="text-2xl font-semibold text-white tracking-wide">Add New Property</h2>
            </div>

            <form onSubmit={handleSaveProperty} className="p-6 space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">PG Name</label>
                <input name="name" placeholder="Enter PG Name" className="w-full border border-gray-300 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={handlePropertyChange} required />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Address</label>
                <input name="address" placeholder="Enter Full Address" className="w-full border border-gray-300 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500" value={formData.address} onChange={handlePropertyChange} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <input name="city" placeholder="City Name" className="w-full border border-gray-300 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500" value={formData.city} onChange={handlePropertyChange} required />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">State</label>
                  <input name="state" placeholder="State Name" className="w-full border border-gray-300 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500" value={formData.state} onChange={handlePropertyChange} required />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Pincode</label>
                <input name="pincode" type="number" placeholder="Enter Pincode" className="w-full border border-gray-300 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500" value={formData.pincode} onChange={handlePropertyChange} required />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Street Address</label>
                <input name="streetAdress" placeholder="Street Address" className="w-full border border-gray-300 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500" value={formData.streetAdress} onChange={handlePropertyChange} required />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Landmark</label>
                <input name="landmark" placeholder="Nearest Landmark" className="w-full border border-gray-300 p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500" value={formData.landmark} onChange={handlePropertyChange} required />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Upload Images</label>
                <input type="file" multiple accept="image/*" className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => {
                  const files = Array.from(e.target.files);
                  const previews = files.map((f) => URL.createObjectURL(f));
                  setFormData((prev) => ({ ...prev, images: files, previewImages: previews }));
                }} />
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {formData.previewImages.map((img, i) => (
                    <div key={i} className="relative">
                      <img src={img} className="w-full h-28 rounded-xl object-cover shadow-md hover:scale-105 transition" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 border p-3 rounded-xl font-medium hover:bg-gray-100 transition">Cancel</button>

                <button type="submit" className="flex-1 bg-blue-600 text-white p-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-md">
                  {addingBranch ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Save Property"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
