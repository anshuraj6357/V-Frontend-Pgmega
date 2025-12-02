import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { User } from "lucide-react";
import {
  useAddRoomMutation,
  useGetAllBranchbybranchIdQuery,
  useGetAllRoomQuery
} from "../../../Bothfeatures/features2/api/propertyapi";
import { useNavigate } from "react-router-dom";

function AddRoomForm() {
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState({
    roomNumber: "",
    type: "",
    price: "",
    facilities: [],
    images: [],
    branch: "",
    category: "",

    // New fields
    description: "",
    notAllowed: [],
    rules: [],
    allowedFor: "Anyone",
    furnishedType: "Semi Furnished",
    areaSize: "",
    availabilityStatus: "Available",
    extraNotes: "",
    rentperday: "",
    rentperhour: "",
    rentperNight: "",
    city: "",
    capacity: "",
 
  });

  const { refetch } = useGetAllRoomQuery();
  const [
    addRoom,
    { data: AddRoomdata, isLoading, isSuccess: addroomsuccess, isError, error }
  ] = useAddRoomMutation();

  const { data: Allbranchdata, isLoading: AllBranchloading } =
    useGetAllBranchbybranchIdQuery();

  const facilityOptions = [
    "AC",
    "Non-AC",
    "Bathroom",
    "WiFi",
    "Power Backup",
    "Laundry",
    "CCTV",
    "Parking",
    "Refrigerator",
    "24x7 Electricity",
  ];

  const notAllowedOptions = ["Smoking", "Alcohol", "Pets", "Visitors", "Loud Music"];
  const rulesOptions = ["Keep room clean", "No loud music", "Maintain hygiene", "No outside guests", "Respect timings"];
  const allowedForOptions = ["Boys", "Girls", "Family", "Anyone"];
  const furnishedOptions = ["Fully Furnished", "Semi Furnished", "Unfurnished"];

  // Checkbox handler
  const handleCheckboxArray = (field, value) => {
    setRoomData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  // Image handlers
  const handleSingleImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedImages = [...roomData.images];
    updatedImages[index] = file;
    setRoomData({ ...roomData, images: updatedImages });
  };

  const addMoreImageInput = () => {
    setRoomData(prev => ({ ...prev, images: [...prev.images, null] }));
  };

  const handleAddRoom = async () => {
      console.log(roomData)


    const formData = new FormData();
    formData.append("roomNumber", roomData.roomNumber);
    formData.append("type", roomData.type);
    formData.append("price", roomData.price);
    formData.append("branch", roomData.branch);
    formData.append("category", roomData.category);
    formData.append("description", roomData.description);
    formData.append("allowedFor", roomData.allowedFor);
    formData.append("furnishedType", roomData.furnishedType);
   
    formData.append("availabilityStatus", roomData.availabilityStatus);

    formData.append("rentperday", roomData.rentperday);
    formData.append("rentperhour", roomData.rentperhour);
    formData.append("rentperNight", roomData.rentperNight);
    formData.append("city", roomData.city);
    formData.append("capacity", roomData.capacity);
  
    roomData.facilities.forEach(f => formData.append("facilities", f));
    roomData.notAllowed.forEach(f => formData.append("notAllowed", f));
    roomData.rules.forEach(f => formData.append("rules", f));

    roomData.images.forEach(img => img && formData.append("images", img));

    await addRoom(formData);
  };

  useEffect(() => {
    if (addroomsuccess) {
      toast.success("Room Will Be Listed after Verification");
      refetch();
      navigate(-1);
    }

    if (isError) {
      toast.error(error?.data?.message || "Failed to add room!");
    }
  }, [addroomsuccess, isError, error]);

  if (AllBranchloading) return <div>Loading branches...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-gray-100 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.1)]">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Add New Room</h2>
      <p className="text-gray-500 mb-8 text-sm">Fill all details carefully before adding a room.</p>

      {/* Branch selection */}
      <div className="mt-6">
        <label className="label-style">Branch</label>
        <select
          className="input-style"
          value={roomData.branch}
          onChange={(e) => setRoomData({ ...roomData, branch: e.target.value })}
        >
          <option value="">Select Branch</option>
          {Allbranchdata?.allbranch?.map(branch => (
            <option key={branch._id} value={branch._id}>{branch.name}</option>
          ))}
        </select>
      </div>

      {/* Grid for Room Number, City, Capacity, Allowed For */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="label-style">Room Number</label>
          <input
            type="number"
            placeholder="101"
            className="input-style"
            value={roomData.roomNumber}
            onChange={e => setRoomData({ ...roomData, roomNumber: e.target.value })}
          />
        </div>

        <div>
          <label className="label-style">City</label>
          <input
            type="text"
            placeholder="City name"
            className="input-style"
            value={roomData.city}
            onChange={e => setRoomData({ ...roomData, city: e.target.value })}
          />
        </div>

        


        <div>
          <label className="label-style">Allowed For</label>
          <select
            className="input-style"
            value={roomData.allowedFor}
            onChange={e => setRoomData({ ...roomData, allowedFor: e.target.value })}
          >
            {allowedForOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="label-style">Description</label>
        <textarea
          className="input-style h-28 resize-none"
          placeholder="Write room description..."
          value={roomData.description}
          onChange={e => setRoomData({ ...roomData, description: e.target.value })}
        />
      </div>

      {/* Not Allowed */}
      <div className="mt-6">
        <p className="section-heading">Not Allowed</p>
        <div className="grid grid-cols-2 gap-3">
          {notAllowedOptions.map(item => (
            <label key={item} className="checkbox-style">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={roomData.notAllowed.includes(item)}
                onChange={() => handleCheckboxArray("notAllowed", item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Rules */}
      <div className="mt-6">
        <p className="section-heading">Rules</p>
        <div className="grid grid-cols-2 gap-3">
          {rulesOptions.map(item => (
            <label key={item} className="checkbox-style">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={roomData.rules.includes(item)}
                onChange={() => handleCheckboxArray("rules", item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Furnished Type */}
      <div className="mt-6">
        <label className="label-style">Furnishing Type</label>
        <select
          className="input-style"
          value={roomData.furnishedType}
          onChange={e => setRoomData({ ...roomData, furnishedType: e.target.value })}
        >
          {furnishedOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>


      {/* Category */}
      <div className="mt-6">
        <label className="label-style">Category</label>
        <select
          className="input-style"
          value={roomData.category}
          onChange={e => setRoomData({ ...roomData, category: e.target.value })}
        >
          <option value="">Select</option>
          <option value="Pg">PG</option>
          <option value="Hotel">Hotel</option>
          <option value="Rented-Room">Rented Room</option>
        </select>
      </div>

      {/* Pricing */}
      {(roomData.category === "Pg" || roomData.category === "Rented-Room") && (
        <div className="mt-6">
          <label className="label-style">Price (Per Month)</label>
          <input
            type="number"
            className="input-style"
            value={roomData.price}
            onChange={e => setRoomData({ ...roomData, price: e.target.value })}
          />
        </div>
      )}

       {!roomData.category === "Pg"?
        <></>:<><div>
          <label className="label-style">Room Type</label>
          <select
            className="input-style"
            value={roomData.type} // use category to store type
            onChange={(e) => setRoomData({ ...roomData, type: e.target.value })}
          >
            <option value="">Select Room Type</option>
            <option value="Single">single Room</option>
            <option value="Double">double Room</option>
            <option value="Triple">triple Room</option>
          </select>
        </div></>
      }

      {roomData.category === "Hotel" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="label-style">Rent Per Day</label>
            <input
              type="number"
              className="input-style"
              value={roomData.rentperday}
              onChange={e => setRoomData({ ...roomData, rentperday: e.target.value })}
            />
          </div>
          <div>
            <label className="label-style">Rent Per Hour</label>
            <input
              type="number"
              className="input-style"
              value={roomData.rentperhour}
              onChange={e => setRoomData({ ...roomData, rentperhour: e.target.value })}
            />
          </div>
          <div>
            <label className="label-style">Rent Per Night</label>
            <input
              type="number"
              className="input-style"
              value={roomData.rentperNight}
              onChange={e => setRoomData({ ...roomData, rentperNight: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Facilities */}
      <div className="mt-8">
        <p className="section-heading">Facilities</p>
        <div className="grid grid-cols-2 gap-3">
          {facilityOptions.map(f => (
            <label key={f} className="checkbox-style">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={roomData.facilities.includes(f)}
                onChange={() => handleCheckboxArray("facilities", f)}
              />
              {f}
            </label>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="mt-6">
        <p className="section-heading">Room Images</p>
        {roomData.images.map((img, index) => (
          <div key={index}>
            <input
              type="file"
              accept="image/*"
              className="input-style"
              onChange={e => handleSingleImage(e, index)}
            />
            {img && (
              <img
                src={URL.createObjectURL(img)}
                className="w-full h-32 object-cover rounded-xl mt-3 shadow-md border"
                alt="Preview"
              />
            )}
          </div>
        ))}
        <button
          onClick={addMoreImageInput}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 w-full transition-all"
        >
          + Add More Images
        </button>
      </div>

      {/* Submit */}
      <button
        onClick={handleAddRoom}
        disabled={isLoading}
        className={`w-full mt-8 py-3 rounded-xl font-semibold text-lg transition-all shadow-lg
          ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#ff6b35] hover:bg-[#e55a2b] text-white"}`}
      >
        {isLoading ? "Adding..." : "Add Room"}
      </button>
    </div>
  );
}

export default AddRoomForm;
