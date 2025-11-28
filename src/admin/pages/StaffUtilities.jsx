import { useState, useEffect } from 'react';
import { Plus, User, Zap, Droplet, Wifi, Sparkles, TrendingUp } from 'lucide-react';
import { useNavigate } from "react-router-dom"
import {
  useAddStaffMutation,
  useGetAllStaffQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} from "../../Bothfeatures/features2/api/staffapi";





export default function StaffUtilities() {
  const { data: AllStaffdata } = useGetAllStaffQuery();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('staff');
  const [staff, setstaff] = useState(null);

  // 🔹 Backend: Fetch staff list from API
  console.log("Fetch staff data from backend here");






  const handleAddStaff = () => {
    navigate('/addstaff')

  };

  const handleEditStaff = (id) => {
    navigate(`/edit/${id}`)
    console.log("Edit staff:", id);
  };

  const handlePayBill = (id) => {
    // 🔹 Backend: Update bill status to 'paid'
    console.log("Pay bill API call for bill id:", id);
  };

  const handleApplyRent = () => {


    console.log("Apply AI rent update API call");
  };

  const handleNewAnalysis = () => {

    console.log("Run new rent analysis request");
  };
  useEffect(() => {

    if (AllStaffdata) {
      setstaff(AllStaffdata?.AllStaff.flat())
      console.log(AllStaffdata)
    }
  }, [AllStaffdata]);


  console.log(staff)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#1e3a5f] text-3xl mb-2">Staff & Utilities Management</h1>
          <p className="text-gray-600">Manage staff</p>
        </div>
        <button
          onClick={handleAddStaff}
          className="flex items-center gap-2 bg-[#ff6b35] text-white px-6 py-3 rounded-xl hover:bg-[#e55a2b] transition-colors"
        >
          <Plus size={20} />
          Add Staff
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
        
        </div>

        {/* Staff Tab */}
        {activeTab === 'staff' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm text-gray-600">Name</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-600">Role</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-600">Contact</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-600">Property</th>
                    {/* <th className="px-4 py-3 text-left text-sm text-gray-600">Salary</th> */}
                    <th className="px-4 py-3 text-left text-sm text-gray-600">Status</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {staff && staff.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white">
                          <User size={20} />
                        </div>
                        <p className="text-[#1e3a5f]">{s.name}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">{s.role}</span>
                      </td>
                      <td className="px-4 py-4 text-gray-700">{s.contact}</td>
                      <td className="px-4 py-4 text-gray-700">{s.branch?.[0].address}</td>
                      {/* <td className="px-4 py-4 text-[#1e3a5f]">₹{s.salary.toLocaleString()}</td> */}
                      <td className="px-4 py-4">
                        {
                          s.status === "Active" ? <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                            {s.status}
                          </span> : <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                            {s.status}
                          </span>
                        }

                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleEditStaff(s._id)}
                          className="border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-50 text-sm"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
