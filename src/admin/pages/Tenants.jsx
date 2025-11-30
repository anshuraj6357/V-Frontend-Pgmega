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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-[#1e3a5f] text-3xl font-bold">
            Tenant Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage tenant profiles, documents, and check-ins/outs efficiently
          </p>
        </div>

        {user?.role === "branch-manager" && (
          <button
            onClick={handleAddTenant}
            className="flex items-center gap-2 bg-[#ff6b35] text-white px-8 py-3 rounded-xl 
      font-medium hover:bg-[#e55a2b] shadow-md hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            Add Tenant
          </button>
        )}
      </div>



      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-center">

          {/* Search Bar */}
          <div className="flex-1 relative w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search tenants by name, phone, or room number..."
              value={searchQuery}
              onChange={(e) => {
                console.log("🔍 Search query:", e.target.value);
                setSearchQuery(e.target.value);
              }}
              className="
          w-full pl-12 pr-4 py-3 
          rounded-xl 
          bg-white shadow-sm 
          border border-gray-300 
          focus:outline-none 
          focus:ring-4 
          focus:ring-[#1e3a5f]/20 
          focus:border-[#1e3a5f]
          transition-all duration-300
        "
            />
          </div>

          {/* Filter Dropdown */}
          <div className="w-full lg:w-auto">
            <select
              value={filter}
              onChange={(e) => handleChangestatus(e.target.value)}
              className="
          px-4 py-3 rounded-xl 
          border border-gray-300 
          bg-white shadow-sm
          focus:outline-none 
          focus:ring-4 
          focus:ring-[#1e3a5f]/20 
          focus:border-[#1e3a5f]
          transition-all duration-300
          cursor-pointer
        "
            >
              <option value="all">All Tenants</option>
              <option value="Active">Active</option>
              <option value="In-Active">In-Active</option>
            </select>
          </div>

        </div>
      </div>


      {/* Adding tenant */}
      {adding && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">

          <div className="bg-white/90 shadow-2xl rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-white/40">

            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-8 py-5 rounded-t-2xl shadow-sm">
              <h2 className="text-3xl font-semibold text-[#1e3a5f]">
                Add New Tenant
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Fill all the details correctly before saving
              </p>
            </div>

            {/* Form Content */}
            <div className="px-8 py-6 space-y-5">

              {/* Name */}
              <div>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formdata.name}
                  onChange={handleChange}
                  placeholder="Tenant Name"
                  className="form-input"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="form-label">Contact Number</label>
                <input
                  type="number"
                  name="contactNumber"
                  value={formdata.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  className="form-input"
                />
              </div>

              {/* Rent & Dues */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="form-label">Rent</label>
                  <input
                    type="number"
                    name="Rent"
                    value={formdata.Rent}
                    onChange={handleChange}
                    placeholder="Monthly Rent"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Dues</label>
                  <input
                    type="number"
                    name="dues"
                    value={formdata.dues}
                    onChange={handleChange}
                    placeholder="Pending Dues"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Advance */}
              <div>
                <label className="form-label">Advance Payment</label>
                <input
                  type="number"
                  name="advanced"
                  value={formdata.advanced}
                  onChange={handleChange}
                  placeholder="Advance amount paid"
                  className="form-input"
                />
              </div>

              {/* ID Proof */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="form-label">ID Proof Type</label>
                  <input
                    type="text"
                    name="idProofType"
                    value={formdata.idProofType}
                    onChange={handleChange}
                    placeholder="Aadhaar, PAN, etc."
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">ID Proof Number</label>
                  <input
                    type="text"
                    name="idProof"
                    value={formdata.idProof}
                    onChange={handleChange}
                    placeholder="Enter ID proof number"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="form-label">Emergency Contact Number</label>
                <input
                  type="number"
                  name="emergencyContactNumber"
                  value={formdata.emergencyContactNumber}
                  onChange={handleChange}
                  placeholder="Enter emergency contact number"
                  className="form-input"
                />
              </div>

              {/* Room Number */}
              <div>
                <label className="form-label">Room Number</label>
                <input
                  type="text"
                  name="roomNumber"
                  value={formdata.roomNumber}
                  onChange={handleChange}
                  placeholder="Enter room number"
                  className="form-input"
                />
              </div>

              {/* Branch Select */}
              <div>
                <label className="form-label">Select Branch</label>
                <select
                  name="branch"
                  value={formdata.branch}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select Branch</option>
                  {alldata?.allbranch?.map((branch) => (
                    <option key={branch._id} value={branch._id}>
                      {branch.address}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label className="form-label">Documents / Photo</label>
                <input
                  type="file"
                  name="documentsPhoto"
                  onChange={(e) =>
                    setformdata({ ...formdata, documentsPhoto: e.target.files[0] })
                  }
                  className="form-input"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t px-8 py-5 flex gap-4 shadow-md rounded-b-2xl">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveTenant}
                className="flex-1 py-3 bg-[#ff6b35] text-white rounded-xl hover:bg-[#e25a2d] shadow-md transition"
              >
                Save Tenant
              </button>
            </div>
          </div>
        </div>
      )}




      {/* Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {tenant?.map((t) => (
          <div
            key={t._id}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 p-6
                 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                        flex items-center justify-center text-2xl font-bold shadow-lg">
                {t.name.charAt(0)}
              </div>

              <div>
                <p className="text-xl font-bold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">Room {t.roomNumber}</p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 mb-4" />

            {/* Information */}
            <div className="space-y-3 text-sm">
              <p className="flex justify-between">
                <span className="text-gray-500">Contact:</span>
                <span className="font-semibold">{t.contactNumber}</span>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500">Emergency:</span>
                <span className="font-semibold">{t.emergencyContactNumber}</span>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500">Rent:</span>
                <span className="font-bold text-indigo-700">₹{t.Rent.toLocaleString()}</span>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500">Security Deposit:</span>
                <span className="font-semibold">₹{t.securitydeposit}</span>
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
                <span className="font-semibold">{t.idProofType}: {t.idProof}</span>
              </p>

              <p className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${t.status === "Active"
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
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${t.paymentstatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {t.paymentstatus}
                </span>
              </p>

              {/* Check-in / Check-out */}
              <div className="mt-3">
                <p className="text-gray-500 text-sm">Check-In:</p>
                <p className="font-medium text-gray-900">
                  {new Date(t.checkInDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                {t.checkedoutdate && (
                  <>
                    <p className="text-gray-500 text-sm mt-2">Check-Out:</p>
                    <p className="font-medium text-red-600">
                      {new Date(t.checkedoutdate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => DetailofTenant(t._id)}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 
                     hover:shadow-lg transition-all duration-300"
              >
                View Details
              </button>

              {t.status === "Active" ? (
                <button
                  onClick={() => handleCheckoutTenant(t._id)}
                  className="flex-1 py-2.5 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 
                       hover:shadow-lg transition-all duration-300"
                >
                  Check-Out
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 py-2.5 bg-gray-200 text-gray-500 rounded-xl shadow"
                >
                  Inactive
                </button>
              )}
            </div>
          </div>
        ))}
      </div>




    </div>
  );
}
