import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  useGetRoomByIdQuery,
  useUpdateRoomMutation,
  useDeleteRoomImageMutation,
  useAddRoomImagesMutation,
} from "../../../Bothfeatures/features2/api/propertyapi";

import { Toaster, toast } from "react-hot-toast";
import { Trash2, Upload, ArrowLeft, X } from "lucide-react";

const FEATURE_OPTIONS = [
  "AC",
  "WiFi",
  "Washing Machine",
  "Parking",
  "CCTV",
  "Attached Bathroom",
  "Balcony",
  "Power Backup",
  "Geyser",
  "Fridge",
];

export default function EditRoomForm() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetRoomByIdQuery(roomId);
  const [updateRoom] = useUpdateRoomMutation();
  const [deleteImageAPI] = useDeleteRoomImageMutation();
  const [addImagesAPI] = useAddRoomImagesMutation();

  const [formData, setFormData] = useState({
    roomNumber: "",
    price: "",
    type: "",
    facilities: [],
    comment: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (data?.room) {
      setFormData({
        roomNumber: data.room.roomNumber,
        price: data.room.price,
        type: data.room.type,
        facilities: data.room.facilities || [],
        comment: data.room.comment || "",
      });
    }
  }, [data]);

  const handleUpdateRoom = async () => {
    try {
      await updateRoom({ id: roomId, ...formData }).unwrap();
      toast.success("Room updated successfully!");
      navigate(-1);
    } catch (err) {
      toast.error("Failed to update room!");
    }
  };

  // delete image
  const handleDeleteImage = async (imgUrl) => {
    try {
      await deleteImageAPI({ id: roomId, imageurl: imgUrl }).unwrap();
      toast.success("Image deleted!");
      refetch();
    } catch (err) {
      toast.error("Error deleting image!");
    }
  };

  const handleSelectImages = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const removeSelectedImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleAddImages = async () => {
    if (selectedImages.length === 0) {
      return toast.error("Select images first!");
    }

    const form = new FormData();
    form.append("id", roomId);

    selectedImages.forEach((img) => form.append("roomImages", img));

    try {
      await addImagesAPI(form).unwrap();
      toast.success("Images uploaded!");
      setSelectedImages([]);
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload images!");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-52">
        <div className="animate-spin h-10 w-10 border-t-4 border-red-500 rounded-full"></div>
      </div>
    );

  return (
    <>
      <Toaster />

      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-black mb-4"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Room</h1>

        {/* IMAGES */}
        <div className="bg-white p-5 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-3">Room Images</h2>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {data?.room?.roomImages?.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img}
                  className="w-40 h-32 object-cover rounded-lg shadow-md"
                />
                <button
                  onClick={() => handleDeleteImage(img)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="block font-medium text-gray-700 mb-1">
              Add New Images
            </label>

            <input
              type="file"
              multiple
              onChange={handleSelectImages}
              className="border p-2 rounded-md w-full"
            />

            {selectedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {selectedImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(img)}
                      className="w-full h-28 object-cover rounded-lg border"
                    />

                    <button
                      onClick={() => removeSelectedImage(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleAddImages}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex items-center gap-2"
            >
              <Upload size={18} /> Upload Images
            </button>
          </div>
        </div>

        {/* ROOM INFO */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Room Information</h2>

          <label className="font-medium">Room Number</label>
          <input
            type="text"
            value={formData.roomNumber}
            onChange={(e) =>
              setFormData({ ...formData, roomNumber: e.target.value })
            }
            className="w-full border p-2 rounded mb-4"
          />

          <label className="font-medium">Price (₹)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full border p-2 rounded mb-4"
          />

          <label className="font-medium">Room Type</label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
            }
            className="w-full border p-2 rounded mb-4"
          >
            <option value="">Select type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Deluxe">Deluxe</option>
          </select>

          <label className="font-medium block mb-2">Facilities</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {FEATURE_OPTIONS.map((feature) => (
              <label key={feature} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.facilities.includes(feature)}
                  onChange={() => {
                    const updated = formData.facilities.includes(feature)
                      ? formData.facilities.filter((x) => x !== feature)
                      : [...formData.facilities, feature];

                    setFormData({
                      ...formData,
                      facilities: updated,
                    });
                  }}
                  className="h-4 w-4"
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>

          <label className="font-medium">Comment (If Rejected)</label>
          <textarea
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            className="w-full border p-2 rounded mb-4 h-24"
          />

          <button
            onClick={handleUpdateRoom}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg shadow"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
