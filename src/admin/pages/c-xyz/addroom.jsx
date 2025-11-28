import React, { useState, useEffect } from "react";
import { useAddRoomMutation, useGetAllBranchbybranchIdQuery } from "../../../Bothfeatures/features2/api/propertyapi";
import {useNavigate} from "react-router-dom"
function AddRoomForm() {
    const navigate=useNavigate()
    const [roomData, setRoomData] = useState({
        roomNumber: "",
        type: "",
        price: "",
        facilities: [],
        images: [],
        branch: ""       // FIXED: correct default value
    });

    const [addRoom, { data: AddRoomdata, isLoading,isSuccess }] = useAddRoomMutation();
    const { data: Allbranchdata, isLoading: AllBranchloading } = useGetAllBranchbybranchIdQuery();

    const facilityOptions = [
        "AC", "Non-AC", "Attached Bathroom", "Balcony", "Cupboard",
        "Geyser", "Table", "Fan", "WiFi"
    ];

    const handleFacilities = (facility) => {
        setRoomData((prev) => ({
            ...prev,
            facilities: prev.facilities.includes(facility)
                ? prev.facilities.filter((f) => f !== facility)
                : [...prev.facilities, facility],
        }));
    };

    const handleSingleImage = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const updatedImages = [...roomData.images];
        updatedImages[index] = file;

        setRoomData({ ...roomData, images: updatedImages });
    };

    const addMoreImageInput = () => {
        setRoomData((prev) => ({
            ...prev,
            images: [...prev.images, null]
        }));
    };

    const handleAddRoom = async () => {
        const formData = new FormData();
        formData.append("roomNumber", roomData.roomNumber);
        formData.append("type", roomData.type);
        formData.append("price", roomData.price);
        formData.append("branch", roomData.branch);
        roomData.facilities.forEach((f) => formData.append("facilities", f));
        roomData.images.forEach((img) => {
            if (img) formData.append("images", img);
        });

        await addRoom(formData);
    };


    useEffect(() => {
        if (AddRoomdata) {
            console.log("Room Added Successfully", AddRoomdata);
        }
        if (isSuccess) {
            navigate(-1);
        }
    }, [AddRoomdata, isSuccess]);
    if (AllBranchloading) return <div>Loading all branches </div>

    return (
        <div className="max-w-lg mx-auto mt-6 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Room</h2>
            <p className="text-gray-600 mb-6">Fill all details carefully before adding a room.</p>

            {/* Room Number */}
            <div>
                <label className="block mb-1 font-medium text-gray-700">Room Number</label>
                <input
                    type="number"
                    placeholder="e.g., 101"
                    className="input-box"
                    value={roomData.roomNumber}
                    onChange={(e) => setRoomData({ ...roomData, roomNumber: e.target.value })}
                />
            </div>

            {/* Branch Selection */}
            <div>
                <label className="block mb-1 font-medium text-gray-700 mt-4">Select Branch</label>
                <select
                    className="input-box"
                    value={roomData.branch}
                    onChange={(e) => setRoomData({ ...roomData, branch: e.target.value })}
                >
                    <option value="">Select Branch</option>

                    {Allbranchdata?.allbranch?.map((branch) => (
                        <option key={branch._id} value={branch._id}>
                            {branch.address}
                        </option>
                    ))}
                </select>
            </div>

            {/* Room Type */}
            <div>
                <label className="block mb-1 font-medium text-gray-700 mt-4">Room Type</label>
                <select
                    className="input-box"
                    value={roomData.type}
                    onChange={(e) => setRoomData({ ...roomData, type: e.target.value })}
                >
                    <option value="">Select Type</option>
                    <option value="Single">Single Room</option>
                    <option value="Double">Double Sharing</option>
                    <option value="Triple">Triple Sharing</option>
                </select>
            </div>

            {/* Price */}
            <div>
                <label className="block mb-1 font-medium text-gray-700 mt-4">
                    Price (per month)
                </label>
                <input
                    type="number"
                    placeholder="e.g., 5000"
                    className="input-box"
                    value={roomData.price}
                    onChange={(e) => setRoomData({ ...roomData, price: e.target.value })}
                />
            </div>

            {/* Facilities */}
            <div className="mt-5">
                <p className="font-medium text-gray-700 mb-2">Facilities</p>
                <div className="grid grid-cols-2 gap-2">
                    {facilityOptions.map((facility) => (
                        <label key={facility} className="flex items-center gap-2 text-gray-700">
                            <input
                                type="checkbox"
                                checked={roomData.facilities.includes(facility)}
                                onChange={() => handleFacilities(facility)}
                            />
                            {facility}
                        </label>
                    ))}
                </div>
            </div>

            {/* Images */}
            <div className="mt-5">
                <p className="font-medium text-gray-700 mb-2">Room Images</p>

                {roomData.images.map((img, index) => (
                    <div key={index} className="mb-3">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleSingleImage(e, index)}
                            className="input-box"
                        />

                        {img && (
                            <img
                                src={URL.createObjectURL(img)}
                                className="w-full h-28 object-cover rounded-lg mt-2 border"
                                alt="Preview"
                            />
                        )}
                    </div>
                ))}

                <button
                    onClick={addMoreImageInput}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all w-full"
                >
                    + Add More Images
                </button>
            </div>

            {/* Submit */}
            <button
                onClick={handleAddRoom}
                disabled={isLoading}
                className={`w-full mt-5 py-3 rounded-xl font-semibold text-lg transition-all shadow-md
        ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#ff6b35] hover:bg-[#e55a2b] text-white"}
    `}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                        <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Adding...
                    </div>
                ) : (
                    "Add Room"
                )}
            </button>

        </div>
    );
}

export default AddRoomForm;
