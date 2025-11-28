import React, { useState } from "react";
import { useAddHotelRoomMutation, useGetAllBranchbybranchIdQuery } from "../../../Bothfeatures/features2/api/propertyapi";

export function AddHotelRoom() {
  const { data, isLoading, isError, error, isSuccess } = useGetAllBranchbybranchIdQuery();
  const [addHotelRoom] = useAddHotelRoomMutation()
  const facilityOptions = [
    "AC",
    "Non-AC",
    "Attached Bathroom",
    "Balcony",
    "Cupboard",
    "Geyser",
    "Table",
    "Fan",
    "WiFi",
  ];

  const [formData, setFormData] = useState({
    branchId: "",
    roomNumber: "",
    rentperday: "",
    rentperhour: "",
    rentperNight: "",
    facilities: [],
    images: [null], // start with one image input
  });

  const handleFacilities = (facility) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const handleSingleImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedImages = [...formData.images];
    updatedImages[index] = file;

    setFormData({ ...formData, images: updatedImages });
  };

  const addMoreImageInput = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, null],
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("branchId", formData.branchId);
    dataToSend.append("roomNumber", formData.roomNumber);
    dataToSend.append("rentperday", formData.rentperday);
    dataToSend.append("rentperhour", formData.rentperhour);
    dataToSend.append("rentperNight", formData.rentperNight);
    // Ensure the array of facilities is stringified correctly for FormData
    formData.facilities.forEach((facility) => {
      dataToSend.append("facilities", facility);
    });
    formData.images.forEach((image) => {
      if (image) dataToSend.append("images", image);
    });
    console.log(formData)


    await addHotelRoom(dataToSend)

  };


  if (isLoading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 text-center text-gray-500">
        Loading branches...
      </div>
    );
  }

  // 2. **Error State**
  if (isError) {
    console.error("Error fetching branches:", error);
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 border border-red-400 text-red-700 rounded">
        <h2 className="text-xl font-bold mb-2">Error!</h2>
        <p>
          Could not load branch data. Please try again.
          {/* Displaying a more specific error message if available */}
          {error && error.status && <p className="mt-1">Status: {error.status}</p>}
        </p>
      </div>
    );
  }

  // Safely get branches, default to an empty array if data or allbranch is null/undefined
  const branches = data?.allbranch || [];

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Add Hotel Room
      </h2>

      <form className="flex flex-col gap-5" onSubmit={handleAddRoom}>
        {/* Branch Selection */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Select Branch</label>
          <select
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="branchId"
            value={formData.branchId}
            onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.address}
              </option>
            ))}
          </select>
        </div>

        {/* Room Number */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Room Number</label>
          <input
            type="number"
            name="roomNumber"
            placeholder="e.g., 101"
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.roomNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Rent / Day</label>
            <input
              type="number"
              name="rentperday"
              placeholder="₹ per day"
              value={formData.rentperday}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Rent / Night</label>
            <input
              type="number"
              name="rentperNight"
              placeholder="₹ per night"
              value={formData.rentperNight}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Rent / Hour</label>
            <input
              type="number"
              name="rentperhour"
              placeholder="₹ per hour"
              value={formData.rentperhour}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Facilities */}
        <div>
          <p className="font-semibold text-gray-700 mb-2">Facilities</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {facilityOptions.map((facility) => (
              <label key={facility} className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={formData.facilities.includes(facility)}
                  onChange={() => handleFacilities(facility)}
                />
                {facility}
              </label>
            ))}
          </div>
        </div>

        {/* Room Images */}
        <div>
          <p className="font-semibold text-gray-700 mb-2">Room Images</p>

          {formData.images.map((img, index) => (
            <div key={index} className="mb-5">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleSingleImage(e, index)}
                className="border border-gray-300 p-3 rounded-lg w-full"
              />

              {img && (
                <img
                  src={URL.createObjectURL(img)}
                  className="w-full h-40 rounded-xl object-cover shadow mt-3 border"
                  alt="Preview"
                />
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addMoreImageInput}
            className="mt-2 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-all w-full"
          >
            + Add More Images
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-5 py-3 rounded-xl font-semibold text-lg transition-all shadow-md ${isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
            }`}
        >
          {isLoading ? "Adding..." : "Add Room"}
        </button>
      </form>
    </div>
  );

}

export default AddHotelRoom;