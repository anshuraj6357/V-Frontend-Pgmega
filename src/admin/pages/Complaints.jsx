import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  UserCog,
} from "lucide-react";
import {
  useGetAllComplainQuery,
  useGetComplainByStatusQuery,
  useAssignComplainMutation

} from "../../Bothfeatures/features2/api/complainapi";

import {
  useGetAllStaffQuery
} from "../../Bothfeatures/features2/api/staffapi";

//  assignComplain({complaint._id})
export default function Complaints() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [assignComplain, { data: assigncomplaindata }] = useAssignComplainMutation()
  const { data: allstaff } = useGetAllStaffQuery()

  const { data: statsData, isLoading: loadingStats } = useGetAllComplainQuery();
  const { data: statusCompData, isLoading: loadingStatus } = useGetComplainByStatusQuery(filterStatus);

  const [complaints, setComplaints] = useState([]);
  const [staff, setstaff] = useState(allstaff)
  console.log(statsData)
  useEffect(() => {
    if (statusCompData?.data) {

      setComplaints(statusCompData.data);
    }
    if (allstaff) {
      console.log(allstaff?.AllStaff)
      setstaff(allstaff?.AllStaff)
    }
  }, [statusCompData, allstaff]);



  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <AlertTriangle size={20} className="text-yellow-500" />;
      case "in-progress":
        return <Clock size={20} className="text-blue-500" />;
      case "resolved":
        return <CheckCircle size={20} className="text-green-500" />;
      default:
        return null;
    }
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const handleAssignClick = (complaint) => {
    console.log(complaint)

    setSelectedComplaint(complaint);
  };

  const handleAssignStaff = async (member) => {
    alert(`Assigned ${member.name} to ticket: ${selectedComplaint?._id}`);
    await assignComplain({ assignedTo: member?._id, complaintId: selectedComplaint?._id })
    setSelectedComplaint(null);
  };

  const handleCancelAssign = () => setSelectedComplaint(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#1e3a5f] text-3xl mb-2">
            Complaints & Maintenance
          </h1>
          <p className="text-gray-600">
            Track and manage tenant complaints and maintenance requests
          </p>
        </div>
      
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-yellow-500" size={24} />
            <p className="text-gray-600">Pending</p>
          </div>
          <p className="text-3xl text-[#1e3a5f]">
            {statsData?.pending}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-blue-500" size={24} />
            <p className="text-gray-600">In Progress</p>
          </div>
          <p className="text-3xl text-[#1e3a5f]">
            {statsData?.InProgress}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="text-green-500" size={24} />
            <p className="text-gray-600">Resolved</p>
          </div>
          <p className="text-3xl text-[#1e3a5f]">
            {statsData?.Resolved}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
        <div className="flex gap-2 overflow-x-auto">
          {["all", "pending", "In-progress", "resolved"].map((status) => (
            <button
              key={status}
              onClick={() => handleFilter(status)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${filterStatus === status
                ? "bg-[#1e3a5f] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {status === "all"
                ? "All"
                : status
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {statusCompData?.data.length > 0 && statusCompData?.data.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(complaint?.status)}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg text-[#1e3a5f]">
                          {complaint?.title}
                        </h3>

                      </div>
                      <p className="text-sm text-gray-500">
                        Ticket #{(complaint._id).toString(8)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Tenant</p>
                    <p className="text-[#1e3a5f]">{complaint?.tenantId?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Property & Room</p>
                    <p className="text-[#1e3a5f]">
                      {complaint.property} - Room {complaint.roomNo}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reported</p>
                    <p className="text-gray-700">
                      {new Date(complaint.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Description</p>
                  <p className="text-gray-700">{complaint.description}</p>
                </div>

                {complaint.assignedTo && (
                  <div className="flex items-center gap-2 text-sm">
                    <UserCog size={16} className="text-gray-500" />
                    <span className="text-gray-600">Assigned to:e3</span>
                    <span className="text-[#1e3a5f]">
                      ec{complaint.assignedTo}
                    </span>
                  </div>
                )}

                {/* {complaint.status === "pending" && complaint.resolvedAt && (
                  <div className="mt-2 p-3 bg-green-50 rounded-xl">
                    <p className="text-sm text-green-600">
                      ✓ Resolved on{" "}
                      {new Date(complaint.resolvedAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                )} */}
              </div>

              <div className="flex flex-col gap-2 lg:min-w-[200px]">
                {complaint.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleAssignClick(complaint)}
                      className="px-4 py-2 bg-[#1e3a5f] text-white rounded-xl hover:bg-[#152b47] transition-colors"
                    >
                      Assign Staff
                    </button>
                    <button
                      onClick={() => handleMarkInProgress(complaint.ticketNo)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      Mark In Progress
                    </button>
                  </>
                )}
                {complaint.status === "In-Progress" && (
                  <>
                    <button
                      onClick={() => handleMarkResolved(complaint._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                    >
                      Mark Resolved
                    </button>
                    <button
                      onClick={() => handleAssignClick(complaint)}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
                    >
                      Re-assign
                    </button>

                  </>

                )}
                <button
                  onClick={() => handleViewDetails(complaint.ticketNo)}
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Staff Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl text-[#1e3a5f]">
                Assign Maintenance Staff
              </h2>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Select a staff member to assign to this complaint:
              </p>
              <div className="space-y-2">
                {staff.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => handleAssignStaff(member)}
                    className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <UserCog size={20} className="text-gray-600" />
                    <div>
                      <p className="text-[#1e3a5f]">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={handleCancelAssign}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Assigned staff confirmed");
                  setSelectedComplaint(null);
                }}
                className="flex-1 px-6 py-3 bg-[#ff6b35] text-white rounded-xl hover:bg-[#e55a2b] transition-colors"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}