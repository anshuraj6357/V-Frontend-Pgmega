import { useState, useEffect } from "react";
import { Plus, Search, Eye, FileText, Download, UserX } from "lucide-react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import {
  useAddTenantMutation,
  useChangeStatusQuery,
  useGetStatusQuery,

  useGetAllTenantQuery
} from "../../Bothfeatures/features2/api/tenant"

import {
  useGetAllBranchbybranchIdQuery
} from "../../Bothfeatures/features2/api/propertyapi"


export default function Tenants() {
  const user = useSelector((state) => state.auth.user);
  const { data: alldata } = useGetAllBranchbybranchIdQuery()
  console.log("user", user)
  const navigate = useNavigate()
  const [addTenant, { data, isSuccess, refetch }] = useAddTenantMutation();
  const { data: tenantdata, refetch: datarefetch } = useGetAllTenantQuery();
  const [tenant, settenant] = useState(null)

  const [adding, setadding] = useState(false);
  const [formdata, setformdata] = useState({
    contactNumber: "",
    name: "",
    Rent: "",
    dues: "",
    advanced: "",
    idProof: "",
    idProofType: "",
    emergencyContactNumber: "",
    documentsPhoto: "",
    roomNumber: "",
    branch: ""
  })
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState(null);
  const { data: tenantStatusData, isFetching, isError } = useChangeStatusQuery(selectedTenant, {
    skip: !selectedTenant,
  });
  const { data: statusdata } = useGetStatusQuery(filter);

  const DetailofTenant = (id) => {
    navigate(`/tenaantdetail/${id}`)
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save button
  const handleSaveTenant = async (e) => {
    e.preventDefault();
    try {
      console.log("🏠 Property Data:", formdata);
      await addTenant(formdata).unwrap();
      console.log("🏠 Property Data:", formdata);
      console.log(data)

      setadding(false);
      setformdata(' ')

    } catch (error) {
      console.log(error)

    }


  };

  const handleChangestatus = async (e) => {

    setFilter(e)

  }



  useEffect(() => {
    console.log("📡 Fetching tenants from backend...");
    if (!isSuccess) {
      console.log(data?.message);
    }
    if (datarefetch) {
      datarefetch();
    }
    if (statusdata) {
      settenant(statusdata?.statususer)
      console.log(statusdata?.statususer)
    }
    if (alldata) {
      console.log("alldata", alldata?.allbranch)
    }


  }, [isSuccess, tenantStatusData, statusdata, alldata, datarefetch]);

  const handleAddTenant = () => {
    setadding(true)
  };



  // ✅ Checkout Tenant (DELETE simulation)
  const handleCheckoutTenant = (tenantId) => {
    console.log(`🚪 Initiating check-out for tenant ID: ${tenantId}`);
    // Placeholder: simulate DELETE /tenants/:id
    setSelectedTenant(tenantId);
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#1e3a5f] text-3xl mb-2">Tenant Management</h1>
          <p className="text-gray-600">
            Manage tenant profiles, documents, and check-in/out records
          </p>
        </div>
        {
          user?.role === "branch-manager" ? <button
            onClick={handleAddTenant}
            className="flex items-center gap-2 bg-[#ff6b35] text-white px-6 py-3 rounded-xl hover:bg-[#e55a2b] transition-colors"
          >
            <Plus size={20} />
            Add Tenant
          </button> : <></>
        }

      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, phone, or room number..."
              value={searchQuery}
              onChange={(e) => {
                console.log("🔍 Search query:", e.target.value);
                setSearchQuery(e.target.value);
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>
          <select
            value={filter}

            onChange={(e) => {
              handleChangestatus(e.target.value)

            }}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
          >
            <option value="all">All Tenants</option>
            <option value="Active">Active</option>
            <option value="In-Active">In-Active</option>
          </select>
        </div>
      </div>

      {/* Adding tenant */}
      {
        adding && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                <h2 className="text-2xl text-[#1e3a5f] font-semibold">
                  Add New Tenant
                </h2>
              </div>

              {/* Form Fields */}
              <div className="p-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formdata.name}
                    onChange={handleChange}
                    placeholder="Tenant Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    name="contactNumber"
                    value={formdata.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>

                {/* Rent & Dues */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Rent</label>
                    <input
                      type="number"
                      name="Rent"
                      value={formdata.Rent}
                      onChange={handleChange}
                      placeholder="Monthly Rent"
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Dues</label>
                    <input
                      type="number"
                      name="dues"
                      value={formdata.dues}
                      onChange={handleChange}
                      placeholder="Pending Dues"
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
                    />
                  </div>
                </div>

                {/* Advanced */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Advance Payment
                  </label>
                  <input
                    type="number"
                    name="advanced"
                    value={formdata.advanced}
                    onChange={handleChange}
                    placeholder="Advance amount paid"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>

                {/* ID Proof Type */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    ID Proof Type
                  </label>
                  <input
                    type="text"
                    name="idProofType"
                    value={formdata.idProofType}
                    onChange={handleChange}
                    placeholder="Aadhaar, PAN, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>

                {/* ID Proof Number */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    ID Proof Number
                  </label>
                  <input
                    type="text"
                    name="idProof"
                    value={formdata.idProof}
                    onChange={handleChange}
                    placeholder="Enter ID proof number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Emergency Contact Number
                  </label>
                  <input
                    type="number"
                    name="emergencyContactNumber"
                    value={formdata.emergencyContactNumber}
                    onChange={handleChange}
                    placeholder="Enter emergency contact number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>

                {/* Room Number */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Room Number
                  </label>
                  <input
                    type="text"
                    name="roomNumber"
                    value={formdata.roomNumber}
                    onChange={handleChange}
                    placeholder="Enter room number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div> <select
                  name="branch"
                  id="branch"
                  value={formdata.branch}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                >
                  <option value="">Select Branch</option>
                  {alldata?.allbranch?.map((branch) => (
                    <option key={branch._id} value={branch._id}>
                      {branch.address}
                    </option>
                  ))}
                </select>


                {/* Document Upload */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Documents / Photo
                  </label>
                  <input
                    type="file"
                    name="documentsPhoto"
                    onChange={(e) =>
                      setformdata({ ...formdata, documentsPhoto: e.target.files[0] })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTenant}
                  className="flex-1 px-6 py-3 bg-[#ff6b35] text-white rounded-xl hover:bg-[#e55a2b] transition-colors"
                >
                  Save Tenant
                </button>
              </div>
            </div>
          </div>
        )
      }



      {/* Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {tenant?.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">Room {t.roomNumber}</p>
              </div>
            </div>

            {/* Info List */}
            <div className="space-y-2 text-sm">
              <p className="flex justify-between">
                <span className="text-gray-500">Contact:</span>
                <span className="font-medium">{t.contactNumber}</span>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500">Emergency:</span>
                <span className="font-medium">{t.emergencyContactNumber}</span>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500">Rent:</span>
                <span className="font-semibold text-gray-800">
                  ₹{t.Rent.toLocaleString()}
                </span>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500">Security Deposit:</span>
                <span className="font-medium">₹{t.securitydeposit}</span>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500">Dues:</span>
                <span
                  className={`font-bold ${t.dues > 0 ? "text-red-600" : "text-green-600"
                    }`}
                >
                  ₹{t.dues}
                </span>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500">ID Proof:</span>
                <span className="font-medium">
                  {t.idProofType}: {t.idProof}
                </span>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${t.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                    }`}
                >
                  {t.status}
                </span>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500">Payment:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${t.paymentstatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {t.paymentstatus}
                </span>
              </p>

              {/* Check-in / Check-out */}
              <p className="text-sm mt-3 text-gray-500">Check-In:</p>
              <p className="text-gray-900">
                {new Date(t.checkInDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              {t.checkedoutdate && (
                <>
                  <p className="text-sm text-gray-500 mt-2">Check-Out:</p>
                  <p className="text-red-600 font-medium">
                    {new Date(t.checkedoutdate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={() => DetailofTenant(t._id)}
                className="flex-1 py-2 text-center bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
              >
                View Details
              </button>

              {t.status === "Active" ? (
                <button
                  onClick={() => handleCheckoutTenant(t._id)}
                  className="flex-1 py-2 text-center bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
                >
                  Check-Out
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 py-2 text-center bg-gray-300 text-gray-600 rounded-xl shadow"
                >
                  Inactive
                </button>
              )}
            </div>
          </div>
        ))}
      </div>



      {/* Tenant Details Modal */}

    </div>
  );
}
