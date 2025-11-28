// import React, { useEffect } from "react";
// import {
//   Building2,
//   Users,
//   CreditCard,
//   AlertTriangle,
//   TrendingUp,
//   TrendingDown,
// } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// export default function Overview() {
//   const stats = [
//     {
//       title: "Total Properties",
//       value: "12",
//       change: "+2 this month",
//       trend: "up",
//       icon: <Building2 size={24} />,
//       color: "bg-blue-500",
//     },
//     {
//       title: "Total Tenants",
//       value: "248",
//       change: "+12 this month",
//       trend: "up",
//       icon: <Users size={24} />,
//       color: "bg-green-500",
//     },
//     {
//       title: "Monthly Revenue",
//       value: "₹12.4L",
//       change: "+8% from last month",
//       trend: "up",
//       icon: <CreditCard size={24} />,
//       color: "bg-[#ff6b35]",
//     },
//     {
//       title: "Pending Complaints",
//       value: "5",
//       change: "-3 from last week",
//       trend: "down",
//       icon: <AlertTriangle size={24} />,
//       color: "bg-red-500",
//     },
//   ];

//   const revenueData = [
//     { month: "Jan", revenue: 120000, expense: 80000 },
//     { month: "Feb", revenue: 135000, expense: 90000 },
//     { month: "Mar", revenue: 140000, expense: 95000 },
//     { month: "Apr", revenue: 150000, expense: 97000 },
//     { month: "May", revenue: 155000, expense: 98000 },
//     { month: "Jun", revenue: 160000, expense: 100000 },
//   ];

//   const occupancyData = [
//     { name: "Occupied", value: 85, color: "#1e3a5f" },
//     { name: "Vacant", value: 15, color: "#ff6b35" },
//   ];

//   const propertyPerformance = [
//     { name: "PG Elite", occupancy: 92, revenue: 40000 },
//     { name: "Comfort Stay", occupancy: 88, revenue: 35000 },
//     { name: "Urban Nest", occupancy: 80, revenue: 32000 },
//     { name: "City Heights", occupancy: 75, revenue: 30000 },
//     { name: "Green Villa", occupancy: 70, revenue: 28000 },
//   ];

//   const recentActivities = [
//     { type: "check-in", tenant: "Rahul Kumar", property: "PG Elite", time: "2 hours ago" },
//     { type: "payment", tenant: "Priya Singh", amount: "₹8,500", time: "3 hours ago" },
//     { type: "complaint", tenant: "Amit Sharma", issue: "AC not working", time: "5 hours ago" },
//     { type: "check-out", tenant: "Sneha Patel", property: "Comfort Stay", time: "1 day ago" },
//   ];

//   // ✅ Console logs for backend setup
//   useEffect(() => {
//     console.log("📊 Dashboard Overview Loaded");
//     console.log("Stats Data:", stats);
//     console.log("Revenue Data:", revenueData);
//     console.log("Occupancy Data:", occupancyData);
//     console.log("Property Performance Data:", propertyPerformance);
//     console.log("Recent Activities:", recentActivities);

//     // 🧠 API placeholders (for when you connect your backend)
//     console.log("🛠️ API CALL PLACEHOLDERS:");
//     console.log("fetch('/api/overview/stats') → load dashboard stats");
//     console.log("fetch('/api/overview/revenue') → load revenue/expense chart");
//     console.log("fetch('/api/overview/occupancy') → load occupancy data");
//     console.log("fetch('/api/overview/performance') → load property performance data");
//     console.log("fetch('/api/overview/activities') → load recent activities");
//   }, []);

//   const getActivityStyle = (type) => {
//     switch (type) {
//       case "check-in":
//         return "bg-green-100 text-green-600";
//       case "payment":
//         return "bg-blue-100 text-blue-600";
//       case "complaint":
//         return "bg-red-100 text-red-600";
//       case "check-out":
//         return "bg-gray-100 text-gray-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   // ✅ Click logger (you can reuse this later for API POSTs)
//   const handleActivityClick = (activity) => {
//     console.log("🧾 Activity clicked:", activity);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-[#1e3a5f] text-3xl mb-2">Dashboard Overview</h1>
//         <p className="text-gray-600">
//           Welcome back! Here's what's happening with your PG business today.
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition"
//             onClick={() => console.log("📈 Stat clicked:", stat.title, stat.value)}
//           >
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
//                 <p className="text-3xl text-[#1e3a5f] mb-2">{stat.value}</p>
//                 <div className="flex items-center gap-1 text-sm">
//                   {stat.trend === "up" ? (
//                     <TrendingUp size={16} className="text-green-500" />
//                   ) : (
//                     <TrendingDown size={16} className="text-red-500" />
//                   )}
//                   <span
//                     className={
//                       stat.trend === "up" ? "text-green-500" : "text-red-500"
//                     }
//                   >
//                     {stat.change}
//                   </span>
//                 </div>
//               </div>
//               <div className={`${stat.color} p-3 rounded-xl text-white`}>
//                 {stat.icon}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Revenue vs Expense */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//           <h3 className="text-[#1e3a5f] text-xl mb-4">Revenue vs Expense</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={revenueData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="revenue"
//                 stroke="#1e3a5f"
//                 strokeWidth={2}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="expense"
//                 stroke="#ff6b35"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Occupancy Rate */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//           <h3 className="text-[#1e3a5f] text-xl mb-4">Occupancy Rate</h3>
//           <div className="flex items-center justify-center">
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={occupancyData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={100}
//                   fill="#8884d8"
//                   paddingAngle={5}
//                   dataKey="value"
//                   label
//                 >
//                   {occupancyData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="text-center mt-4">
//             <p className="text-3xl text-[#1e3a5f]">84.7%</p>
//             <p className="text-gray-600 text-sm">Average Occupancy</p>
//           </div>
//         </div>
//       </div>

//       {/* Property Performance */}
//       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//         <h3 className="text-[#1e3a5f] text-xl mb-4">Property Performance</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={propertyPerformance}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis yAxisId="left" />
//             <YAxis yAxisId="right" orientation="right" />
//             <Tooltip />
//             <Legend />
//             <Bar
//               yAxisId="left"
//               dataKey="occupancy"
//               fill="#1e3a5f"
//               name="Occupancy %"
//               onClick={(bar) => console.log("🏠 Property Occupancy Clicked:", bar)}
//             />
//             <Bar
//               yAxisId="right"
//               dataKey="revenue"
//               fill="#ff6b35"
//               name="Revenue (₹)"
//               onClick={(bar) => console.log("💰 Property Revenue Clicked:", bar)}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Recent Activities */}
//       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//         <h3 className="text-[#1e3a5f] text-xl mb-4">Recent Activities</h3>
//         <div className="space-y-4">
//           {recentActivities.map((activity, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition"
//               onClick={() => handleActivityClick(activity)}
//             >
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityStyle(
//                   activity.type
//                 )}`}
//               >
//                 {activity.type === "check-in" && "✓"}
//                 {activity.type === "payment" && "₹"}
//                 {activity.type === "complaint" && "!"}
//                 {activity.type === "check-out" && "→"}
//               </div>
//               <div className="flex-1">
//                 <p className="text-[#1e3a5f]">
//                   {activity.type === "check-in" &&
//                     `${activity.tenant} checked in to ${activity.property}`}
//                   {activity.type === "payment" &&
//                     `${activity.tenant} paid ${activity.amount}`}
//                   {activity.type === "complaint" &&
//                     `${activity.tenant} reported: ${activity.issue}`}
//                   {activity.type === "check-out" &&
//                     `${activity.tenant} checked out from ${activity.property}`}
//                 </p>
//                 <p className="text-gray-500 text-sm">{activity.time}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
