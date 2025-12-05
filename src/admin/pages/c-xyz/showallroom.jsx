import { useEffect, useState } from "react";
import {
  useGetAllRoomQuery,
  useDeleteRoomMutation,
} from "../../../Bothfeatures/features2/api/propertyapi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

function ShowRooms() {
  const navigate = useNavigate();

  // ✅ GET ROOMS QUERY (refetch comes from here)
  const { data, isLoading, error, refetch } = useGetAllRoomQuery();

  // ✅ DELETE ROOM MUTATION
  const [deleteRoom, { isSuccess }] = useDeleteRoomMutation();

  // 🟡 store currently deleting room ID
  const [deletingRoomId, setDeletingRoomId] = useState(null);

  // 🗑 Delete Room Function
  const deletethatroom = async (roomId) => {
    try {
      setDeletingRoomId(roomId);
      await deleteRoom(roomId).unwrap();
      toast.success("Room deleted successfully!");
    } catch (err) {
      toast.error("Room is Occupied By SomeOne");
      console.error(err);
    } finally {
      setDeletingRoomId(null);
    }
  };

  // ✏ Edit Room
  const EditRoom = (roomId) => {
    navigate(`/admin/edit-room/${roomId}`);
  };

  // 🔄 After success delete → refetch rooms
  useEffect(() => {
    if (isSuccess) {
      refetch(); // only from query
    }
  }, [isSuccess, refetch]);

  // Loading UI
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
      </div>
    );

  // Error UI
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
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800 tracking-wide text-center">
          All Rooms
        </h1>

        {data?.rooms?.length === 0 ? (
          <p className="text-gray-500 text-center text-lg mt-10">
            No rooms added yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.rooms.map((room, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-white shadow-xl hover:shadow-2xl border border-gray-200 
                           transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Room Images */}
                <div className="relative w-full h-48 bg-gray-50 rounded-2xl shadow-lg overflow-hidden group">
                  {/* Image Carousel */}
                  <div className="flex overflow-x-auto space-x-4 p-3 snap-x scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {room.roomImages?.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Room ${idx + 1}`}
                        className="snap-center rounded-xl w-52 h-40 object-cover shadow-md hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                  </div>

                  {/* Price / Rent Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 text-sm rounded-lg shadow-lg flex flex-col space-y-0.5">
                    {room?.category !== "Hotel" && <span>₹{room.price}</span>}

                    {room?.category === "Hotel" && (
                      <>
                        {room.rentperNight && <span>₹{room.rentperNight} / night</span>}
                        {room.rentperday && <span>₹{room.rentperday} / day</span>}
                        {room.rentperhour && <span>₹{room.rentperhour} / hour</span>}
                      </>
                    )}

                    {room?.category === "Rented-Room" && <span>₹{room.price}</span>}
                  </div>

                  {/* Room Type Badge */}
                  <span className="absolute bottom-3 right-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-lg text-xs shadow-xl">
                    {room.category === "Pg" && `${room.type} Room`}
                    {room.category === "Hotel" && room.hoteltype}
                    {room.category === "Rented-Room" &&
                      (room.renttype === "Flat-Rent"
                        ? room.flattype
                        : room.renttype === "Room-Rent"
                          ? room.roomtype
                          : "")}
                  </span>
                </div>

                {/* Room Details */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center justify-between">
                    Room {room.roomNumber}

                    {/* Status Badge */}
                    {room?.toPublish?.status ? (
                      <span className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-xs rounded-full shadow">
                        <CheckCircle size={14} /> Listed
                      </span>
                    ) : room?.comment ? (
                      <span className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white text-xs rounded-full shadow">
                        <XCircle size={14} /> Not Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white text-xs rounded-full shadow">
                        <AlertCircle size={14} /> Under Verification
                      </span>
                    )}
                  </h2>

                  <p className="text-gray-600 mt-1 capitalize">
                    {room.category === "Pg" && <>{room.type} Room</>}
                    {room.category === "Hotel" && <>{room.hoteltype}</>}
                    {room.category === "Rented-Room" && (
                      <>
                        {room.renttype === "Flat-Rent"
                          ? room.flattype
                          : room.renttype === "Room-Rent"
                            ? room.roomtype
                            : ""}
                      </>
                    )}
                  </p>


                  {/* Verification Message */}
                  {!room?.toPublish?.status && (
                    <div className="mt-3">
                      {room?.comment ? (
                        <p className="text-sm bg-orange-100 text-orange-800 p-2 rounded-lg shadow-sm">
                          {room.comment}
                        </p>
                      ) : (
                        <div className="bg-yellow-100 text-yellow-700 text-sm p-2 rounded-lg shadow-sm">
                          This room is under admin verification. It will take 24 hours.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Facilities */}
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Facilities
                    </h3>
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
                      disabled={deletingRoomId === room._id}
                      className={`px-4 py-2 ${deletingRoomId === room._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                        } text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all`}
                    >
                      {deletingRoomId === room._id ? "Deleting..." : "Delete"}
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
