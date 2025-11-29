import { useState, useEffect } from "react";
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
} from "lucide-react";

import {
  useAddbranchMutation,
  useDeletePropertyMutation,
  useGetAllBranchQuery,
  useGetAllBranchByOwnerQuery,
  useAddbranchmanagerMutation,
  useGetAllBranchbybranchIdQuery
} from "../../Bothfeatures/features2/api/propertyapi";

export default function Properties() {

  const user = useSelector((state) => state.auth.user);

  console.log(user?.role)
  const [deleteProperty] = useDeletePropertyMutation()

  const { data: allbranch, error: dataerror } = useGetAllBranchQuery(
    undefined,
    { skip: user?.role !== "branch-manager" }
  );

  const { data: allbranchowner, error: dataerrors } = useGetAllBranchByOwnerQuery(
    undefined,
    { skip: user?.role !== "owner" }
  );

  const { data: branchmanagerdata } = useGetAllBranchbybranchIdQuery(
    undefined,
    { skip: user?.role !== "branch-manager" }
  );

  const [addbranch, { data }] = useAddbranchMutation();
  const [addbranchmanager] = useAddbranchmanagerMutation();

  const navigate = useNavigate();

  const [branchfetched, setbranchfetched] = useState(null);

  useEffect(() => {
    if (allbranch) setbranchfetched(allbranch?.allbranch);
    if (allbranchowner) setbranchfetched(allbranchowner?.allbranch);
    if (branchmanagerdata) setbranchfetched(branchmanagerdata?.allbranch);
  }, [allbranch, branchmanagerdata, allbranchowner]);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [addmanager, setAddManager] = useState(false);

  // Manager states
  const [branchid, setbranchid] = useState(null);
  const [managerData, setManagerData] = useState({
    name: "",
    email: "",
    phone: "",
  });

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


  // Handlers
  const handleManagerChange = (e) => {
    const { name, value } = e.target;
    setManagerData({ ...managerData, [name]: value });
  };

  const handleAppointManager = (id) => {
    setbranchid(id);
    setAddManager(true);
  };
  const vaccalclate = (totalBeds, length) => {
    if (totalBeds === 0) return 0;
    else return totalBeds - length

  }

  const handleSaveManager = async (e) => {
    e.preventDefault();
    await addbranchmanager({ managerData, branchid }).unwrap();
    setAddManager(false);
  };

  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProperty = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("address", formData.address);
    payload.append("city", formData.city);
    payload.append("state", formData.state);
    payload.append("pincode", formData.pincode);
    payload.append("streetAdress", formData.streetAdress);
    payload.append("landmark", formData.landmark);


    formData.images.forEach((file) => {
      payload.append("images", file);
    });
    console.log(payload)

    await addbranch(payload);
    setShowAddModal(false);
  };
  const DeletingProperty = async (len, id) => {
    if (len == 0) {
      console.log(id)
      await deleteProperty(id);
    }
  }


  const getStatusColor = (vacancy) => {
    if (vacancy === 0) return "bg-red-100 text-red-600";
    if (vacancy <= 5) return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  const getOccupancyRate = (occupied, total) => {
    if (total === 0) return 0;
    return Math.round((occupied / total) * 100);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#1e3a5f] text-3xl mb-2">Property Management</h1>
          <p className="text-gray-600">Manage all PG properties</p>
        </div>

        {user?.role === "owner" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#ff6b35] text-white px-6 py-3 rounded-xl"
          >
            <Plus /> Add Property
          </button>
        )}

        {user?.role === "branch-manager" && (
          <button
            onClick={() => navigate("/admin/addroom")}
            className="flex items-center gap-2 bg-[#ff6b35] text-white px-6 py-3 rounded-xl"
          >
            <Plus /> Add Room
          </button>
        )}
      </div>

      {/* PROPERTIES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {branchfetched?.length > 0 ? (
          branchfetched.map((property) => {
            const occupancyRate = getOccupancyRate(
              property.occupiedRoom?.length,
              property.totalBeds
            );

            return (
              <div key={property._id}
                className="bg-white rounded-2xl shadow-sm border overflow-hidden"
              >
                <div className="relative h-48">
                  <img src={property.Propertyphoto} className="w-full h-full object-cover" />

                  {!property.branchmanager ? (
                    <button
                      onClick={() => handleAppointManager(property._id)}
                      className="absolute top-4 left-4 bg-[#ff6b35] text-white px-3 py-2 rounded-xl"
                    >
                      <UserPlus size={16} /> Appoint Manager
                    </button>
                  ) : (
                    <button className="absolute top-4 left-4 bg-[#ff6b35] text-white px-3 py-2 rounded-xl">
                      <UserPlus size={16} /> {property.branchmanager.name}
                    </button>
                  )}

                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm ${getStatusColor(
                      property.vacancy
                    )}`}
                  >
                    {vaccalclate(property.totalBeds, property.occupiedRoom?.length)} Vacant
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl text-[#1e3a5f] mb-2">{property.name}</h3>

                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                    <MapPin size={16} /> {property.address}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <BedDouble size={16} className="text-gray-600" />
                      <p>Beds</p>
                      <p className="text-[#1e3a5f]">{property.totalBeds}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <Users size={16} className="text-gray-600" />
                      <p>Occupied</p>
                      <p className="text-[#1e3a5f]">
                        {(property?.occupiedRoom?.length || 0)} / {(property?.totalBeds || 0)}
                      </p>

                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <p>Occupancy</p>
                      <p className="text-[#ff6b35]">{occupancyRate}%</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#1e3a5f] text-white p-2 rounded-xl">
                      <Eye size={16} /> View Layout
                    </button>

                    {
                      user?.role !== "branch-manager" ? (
                        <>
                          <button className="p-2 border rounded-xl">
                            <Edit />
                          </button>

                          <button
                            className="p-2 border border-red-400 rounded-xl"
                            onClick={() =>
                              DeletingProperty(
                                property?.occupiedRoom?.length,
                                property?._id
                              )
                            }
                          >
                            <Trash2 className="text-red-500" />
                          </button>
                        </>
                      ) : null
                    }
                  </div>

                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500">No branches found.</div>
        )}
      </div>

      {/* ADD MANAGER MODAL */}
      {addmanager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Appoint Manager</h2>

            <form onSubmit={handleSaveManager} className="space-y-4">
              <input type="text" name="name" placeholder="Name"
                className="w-full border p-2 rounded-xl"
                onChange={handleManagerChange}
              />
              <input type="email" name="email" placeholder="Email"
                className="w-full border p-2 rounded-xl"
                onChange={handleManagerChange}
              />
              <input type="text" name="phone" placeholder="Phone"
                className="w-full border p-2 rounded-xl"
                onChange={handleManagerChange}
              />

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setAddManager(false)}
                  className="flex-1 border p-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-[#ff6b35] text-white p-3 rounded-xl"
                >
                  Save Manager
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PROPERTY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold">Add Property</h2>
            </div>

            <form onSubmit={handleSaveProperty} className="p-6 space-y-6">

              {/* PG Name */}
              <input
                type="text"
                name="name"
                placeholder="PG Name"
                className="w-full border p-2 rounded-xl"
                value={formData.name}
                onChange={handlePropertyChange}
                required
              />

              {/* Address */}
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full border p-2 rounded-xl"
                value={formData.address}
                onChange={handlePropertyChange}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="border p-2 rounded-xl"
                  value={formData.city}
                  onChange={handlePropertyChange}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="border p-2 rounded-xl"
                  value={formData.state}
                  onChange={handlePropertyChange}
                  required
                />
              </div>

              <input
                type="number"
                name="pincode"
                placeholder="Pincode"
                className="w-full border p-2 rounded-xl"
                value={formData.pincode}
                onChange={handlePropertyChange}
                required
              />
              <input
                type="text"
                name="streetAdress"
                placeholder="Street Address"
                className="w-full border p-2 rounded-xl"
                value={formData.streetAdress}
                onChange={handlePropertyChange}
                required
              />

              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                className="w-full border p-2 rounded-xl"
                value={formData.landmark}
                onChange={handlePropertyChange}
                required
              />


              {/* Image Upload */}
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="w-full border p-2 rounded-xl"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const previews = files.map((f) => URL.createObjectURL(f));

                    setFormData({
                      ...formData,
                      images: files,
                      previewImages: previews,
                    });
                  }}
                />

                {/* image previews */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {formData.previewImages.map((img, i) => (
                    <div key={i}>
                      <img
                        src={img}
                        className="w-full h-24 rounded-xl object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border p-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-[#ff6b35] text-white p-3 rounded-xl"
                >
                  Save Property
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
