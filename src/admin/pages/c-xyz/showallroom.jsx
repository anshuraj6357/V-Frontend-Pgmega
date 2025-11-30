import { useEffect } from "react";
import { useGetAllRoomQuery, useDeleteRoomMutation } from "../../../Bothfeatures/features2/api/propertyapi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function ShowRooms() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAllRoomQuery();
  const [deleteRoom, { isLoading: deleteLoading }] = useDeleteRoomMutation();

  // Delete room
  const deletethatroom = async (roomId) => {
    try {
      await deleteRoom(roomId).unwrap();
      toast.success("Room deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete room");
      console.error(err);
    }
  };

  // Navigate to edit page
  const EditRoom = (roomId) => {
    navigate(`/edit-room/${roomId}`);
  };

  useEffect(() => {
    if (data) {
      console.log("Fetched Rooms : ", data?.rooms);
    }
  }, [data]);

  // Loading state
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="text-red-500 text-center mt-10 text-lg">
        Something went wrong while fetching rooms.
      </div>
    );

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 tracking-wide text-center">
          All Rooms
        </h1>

        {data?.rooms?.length === 0 ? (
          <p className="text-gray-500 text-center text-lg mt-10">No rooms added yet.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.rooms.map((room, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-white/80 backdrop-blur-lg shadow-md hover:shadow-2xl 
                           border border-gray-200 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Image Carousel */}
                <div className="relative w-full h-44 overflow-hidden bg-gray-100">
                  <div className="flex overflow-x-auto space-x-3 p-3 snap-x">
                    {room.roomImages?.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Room"
                        className="snap-center rounded-xl w-48 h-40 object-cover shadow-md"
                      />
                    ))}
                  </div>

                  {/* Price Tag */}
                  <span className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 text-sm rounded-lg shadow-lg">
                    ₹{room.price}
                  </span>

                  {/* Room Type */}
                  <span className="absolute bottom-3 right-3 bg-gradient-to-r from-red-600 to-red-700 
                                   text-white px-3 py-1 rounded-lg text-xs shadow-xl">
                    {room.type}
                  </span>
                </div>

                {/* Room Details */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900">
                    Room {room.roomNumber}
                  </h2>
                  <p className="text-gray-600 mt-1 capitalize">{room.type} Room</p>

                  {/* Facilities */}
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Facilities</h3>
                    <div className="flex gap-2 flex-wrap">
                      {room.facilities?.map((f, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-700
                                     text-white text-xs rounded-full shadow"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => EditRoom(room._id)}
                      className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 
                                 text-black font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deletethatroom(room._id)}
                      disabled={deleteLoading}
                      className={`px-4 py-2 ${
                        deleteLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                      } text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all`}
                    >
                      {deleteLoading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ShowRooms;
