import React, { useState, useEffect } from "react";
import {
    useGetRoomByIdQuery,
    useUpdateRoomMutation,
    useGetAllBranchbybranchIdQuery
} from "../../../Bothfeatures/features2/api/propertyapi";
import { useParams, useNavigate } from "react-router-dom";

function EditRoomForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: roomDataRes, isLoading } = useGetRoomByIdQuery(id);
    const { data: BranchData } = useGetAllBranchbybranchIdQuery();
    const [updateRoom, { isSuccess }] = useUpdateRoomMutation();

    const [roomData, setRoomData] = useState({
        roomNumber: "",
        type: "",
        price: "",
        facilities: [],
        branch: "",
        images: []
    });

    useEffect(() => {
        if (roomDataRes?.room) {
            setRoomData({
                roomNumber: roomDataRes.room.roomNumber,
                type: roomDataRes.room.type,
                price: roomDataRes.room.price,
                facilities: roomDataRes.room.facilities,
                branch: roomDataRes.room.branch,
                images: []
            });
        }
    }, [roomDataRes]);

    const handleFacilities = (facility) => {
        setRoomData((prev) => ({
            ...prev,
            facilities: prev.facilities.includes(facility)
                ? prev.facilities.filter((f) => f !== facility)
                : [...prev.facilities, facility]
        }));
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("roomNumber", roomData.roomNumber);
        formData.append("type", roomData.type);
        formData.append("price", roomData.price);
        formData.append("branch", roomData.branch);
        roomData.facilities.forEach((f) => formData.append("facilities", f));
        roomData.images.forEach((img) => img && formData.append("images", img));
        console.log("formData",roomData)

        await updateRoom({ id, data: formData });
    };

    useEffect(() => {
        if (isSuccess) navigate(-1);
    }, [isSuccess]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="max-w-lg mx-auto mt-6 p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Edit Room</h2>

            <label className="font-medium">Room Number</label>
            <input className="input-box"
                value={roomData.roomNumber}
                onChange={(e) => setRoomData({ ...roomData, roomNumber: e.target.value })}
            />

            <label className="font-medium mt-4">Room Type</label>
            <select className="input-box"
                value={roomData.type}
                onChange={(e) => setRoomData({ ...roomData, type: e.target.value })}
            >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
            </select>

            <label className="font-medium mt-4">Price</label>
            <input className="input-box"
                type="number"
                value={roomData.price}
                onChange={(e) => setRoomData({ ...roomData, price: e.target.value })}
            />

            <label className="font-medium mt-4">Facilities</label>
            <div className="grid grid-cols-2 gap-2">
                {["AC", "Non-AC", "Attached Bathroom", "Balcony", "Cupboard", "Geyser", "Table", "Fan", "WiFi"]
                    .map((facility) => (
                        <label key={facility} className="flex gap-2">
                            <input type="checkbox"
                                checked={roomData.facilities.includes(facility)}
                                onChange={() => handleFacilities(facility)}
                            />
                            {facility}
                        </label>
                    ))}
            </div>

            <button onClick={handleUpdate}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded">
                Update Room
            </button>
        </div>
    );
}

export default EditRoomForm;
