import { useState } from "react";
import { Camera, Users, Plus, Download } from "lucide-react";

export default function Security() {
  const [activeTab, setActiveTab] = useState("cctv");
  const [showVisitorModal, setShowVisitorModal] = useState(false);

  const cctvFeeds = [
    { id: 1, property: "PG Elite", location: "Main Entrance", status: "online" },
    { id: 2, property: "PG Elite", location: "Parking Area", status: "online" },
    { id: 3, property: "PG Elite", location: "Common Area - Floor 1", status: "online" },
    { id: 4, property: "Comfort Stay", location: "Main Entrance", status: "offline" },
    { id: 5, property: "Comfort Stay", location: "Corridor - Floor 2", status: "online" },
    { id: 6, property: "Urban Nest", location: "Main Gate", status: "online" },
  ];

  const visitors = [
    {
      id: 1,
      name: "Rajesh Gupta",
      phone: "+91 98765 43210",
      visitingTenant: "Rahul Kumar",
      property: "PG Elite",
      roomNo: "101",
      purpose: "Personal Visit",
      checkIn: "2024-11-08T14:30:00",
      checkOut: "2024-11-08T16:15:00",
    },
    {
      id: 2,
      name: "Anita Sharma",
      phone: "+91 87654 32109",
      visitingTenant: "Priya Singh",
      property: "Comfort Stay",
      roomNo: "205",
      purpose: "Family Member",
      checkIn: "2024-11-08T10:00:00",
      checkOut: null, // still inside
    },
    {
      id: 3,
      name: "Delivery Person",
      phone: "+91 98111 22333",
      visitingTenant: "Amit Sharma",
      property: "Urban Nest",
      roomNo: "302",
      purpose: "Package Delivery",
      checkIn: "2024-11-08T12:45:00",
      checkOut: "2024-11-08T12:50:00",
    },
  ];

  // --- LOGGERS ---
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log(`[TAB SWITCH] Switched to "${tab}" tab`);
  };

  const handleExport = () => {
    console.log("[EXPORT] Exporting visitor log data...");
    console.table(visitors);
  };

  const handleCheckOut = (visitor) => {
    console.log("[CHECK OUT] Visitor exiting:", visitor);
  };

  const handleLogVisitor = () => {
    console.log("[VISITOR ENTRY] Logging new visitor...");
    // Here you’ll connect: fetch("/api/visitors", { method: "POST", body: formData })
    setShowVisitorModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#1e3a5f] text-3xl mb-2">Security & Surveillance</h1>
          <p className="text-gray-600">Monitor CCTV feeds and track visitor entries</p>
        </div>
        <button
          onClick={() => {
            console.log("[MODAL] Open visitor entry modal");
            setShowVisitorModal(true);
          }}
          className="flex items-center gap-2 bg-[#ff6b35] text-white px-6 py-3 rounded-xl hover:bg-[#e55a2b] transition-colors"
        >
          <Plus size={20} />
          Log Visitor
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Camera className="text-green-500" size={24} />
            <p className="text-gray-600">Active Cameras</p>
          </div>
          <p className="text-3xl text-[#1e3a5f]">
            {cctvFeeds.filter((c) => c.status === "online").length}/{cctvFeeds.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-blue-500" size={24} />
            <p className="text-gray-600">Visitors Today</p>
          </div>
          <p className="text-3xl text-[#1e3a5f]">{visitors.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-orange-500" size={24} />
            <p className="text-gray-600">Currently Inside</p>
          </div>
          <p className="text-3xl text-[#ff6b35]">
            {visitors.filter((v) => !v.checkOut).length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => handleTabChange("cctv")}
            className={`flex-1 px-6 py-4 text-center transition-colors ${
              activeTab === "cctv"
                ? "text-[#1e3a5f] border-b-2 border-[#1e3a5f]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            CCTV Feeds
          </button>
          <button
            onClick={() => handleTabChange("visitors")}
            className={`flex-1 px-6 py-4 text-center transition-colors ${
              activeTab === "visitors"
                ? "text-[#1e3a5f] border-b-2 border-[#1e3a5f]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Visitor Logbook
          </button>
        </div>

        {/* CCTV Tab */}
        {activeTab === "cctv" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cctvFeeds.map((feed) => (
                <div
                  key={feed.id}
                  className="bg-gray-100 rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => console.log("[CCTV CLICK] Feed clicked:", feed)}
                >
                  <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
                    <Camera size={48} className="text-gray-600" />
                    {feed.status === "online" ? (
                      <div className="absolute top-3 right-3 flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        LIVE
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        OFFLINE
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-[#1e3a5f] mb-1">{feed.location}</h3>
                    <p className="text-sm text-gray-600">{feed.property}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-600">
                💡 <strong>Note:</strong> This is a demo interface. In production, CCTV
                feeds will be connected using live streaming API.
              </p>
            </div>
          </div>
        )}

        {/* Visitor Tab */}
        {activeTab === "visitors" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">Showing today's visitors</p>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-xl hover:bg-[#152b47] transition-colors"
              >
                <Download size={16} />
                Export
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Visitor Name</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Contact</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Visiting</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Purpose</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Check-In</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Check-Out</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visitors.map((visitor) => (
                    <tr key={visitor.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-[#1e3a5f]">{visitor.name}</td>
                      <td className="px-4 py-4 text-gray-700">{visitor.phone}</td>
                      <td className="px-4 py-4">
                        <p className="text-[#1e3a5f]">{visitor.visitingTenant}</p>
                        <p className="text-sm text-gray-500">
                          {visitor.property} - Room {visitor.roomNo}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-gray-700">{visitor.purpose}</td>
                      <td className="px-4 py-4 text-gray-700">
                        {new Date(visitor.checkIn).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-4">
                        {visitor.checkOut ? (
                          <p className="text-gray-700">
                            {new Date(visitor.checkOut).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        ) : (
                          <button
                            onClick={() => handleCheckOut(visitor)}
                            className="text-sm px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            Check Out
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm ${
                            visitor.checkOut
                              ? "bg-gray-100 text-gray-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {visitor.checkOut ? "Exited" : "Inside"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Visitor Modal */}
      {showVisitorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl text-[#1e3a5f]">Log Visitor Entry</h2>
            </div>

            <div className="p-6 space-y-4">
              <input type="text" placeholder="Visitor Name" className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
              <input type="tel" placeholder="Contact Number" className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
              <input type="text" placeholder="Visiting Tenant" className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
              <input type="text" placeholder="Purpose of Visit" className="w-full px-4 py-2 border border-gray-300 rounded-xl" />
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  console.log("[MODAL CLOSED] Cancel visitor log");
                  setShowVisitorModal(false);
                }}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogVisitor}
                className="flex-1 px-6 py-3 bg-[#ff6b35] text-white rounded-xl hover:bg-[#e55a2b] transition-colors"
              >
                Log Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
