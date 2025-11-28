// import React, { useState, useEffect } from "react";
// import {
//   useGetPropertyPerformanceQuery,
//   useGetPaymentStatusDistributionQuery,
//   useGetTenantActivitySummaryQuery,
//   useGetPropertyComparisonQuery,
//   useGetOccupancyRateTrendQuery,
//   useGetTenantActivityQuery,
//   useGetPaymentReportQuery,useGetOccupancySummaryQuery
// } from '../features/api/analysisapi'

// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from "recharts";
// import { TrendingUp, Download } from "lucide-react";

// export default function Analytics() {
//     const[propertyPerformance,setpropertyPerformance]=useState(null)
//   const { data: occupancySummarydata } = useGetOccupancySummaryQuery()

//   const { data: performancedata } = useGetPropertyPerformanceQuery()
//   const { data: paymentStatusdata } = useGetPaymentStatusDistributionQuery()
//   const { data: tenentactivitydata } = useGetTenantActivitySummaryQuery()
//   const { data: propertycomparisondata } = useGetPropertyComparisonQuery()
//   const { data: occupancydata } = useGetOccupancyRateTrendQuery()
//   const { data: tenentactivityquerydata } = useGetTenantActivityQuery()
//   const { data: paymentreportdata } = useGetPaymentReportQuery()

//   const [tenantactivity, settenantactivity] = useState(null)
//   useEffect(() => {
//     if (performancedata) {
//       console.log(performancedata)
//     }
//     if (paymentStatusdata) {
//       console.log(paymentStatusdata)
//     } if (tenentactivitydata) {
//       settenantactivity(tenentactivitydata)

//     } if (propertycomparisondata) {
//        setpropertyPerformance(propertycomparisondata?.allbranch)
//       console.log(propertycomparisondata)
//     } if (occupancydata) {
//       console.log(occupancydata)
//     } if (tenentactivityquerydata) {
//       console.log(tenentactivityquerydata)
//     } if (paymentreportdata) {
//       console.log(paymentreportdata)
//     }if (occupancySummarydata) {
//       console.log(occupancySummarydata)
//     }

//   }, [performancedata,
//     paymentStatusdata, occupancydata, tenentactivityquerydata,
//     paymentreportdata,

//     tenentactivitydata, propertycomparisondata
//   ])
//   // ====================== DATA ===========================
//   const monthlyOccupancy = [
//     { month: "Jan", rate: 80, tenants: 45 },
//     { month: "Feb", rate: 82, tenants: 48 },
//     { month: "Mar", rate: 85, tenants: 50 },
//     { month: "Apr", rate: 88, tenants: 54 },
//     { month: "May", rate: 90, tenants: 56 },
//     { month: "Jun", rate: 92, tenants: 58 },
//     { month: "Jul", rate: 93, tenants: 60 },
//     { month: "Aug", rate: 91, tenants: 59 },
//     { month: "Sep", rate: 89, tenants: 57 },
//     { month: "Oct", rate: 87, tenants: 55 },
//     { month: "Nov", rate: 86, tenants: 53 },
//   ];

//   const revenueData = [
//     { month: "Jan", revenue: 8.2, expense: 4.2, profit: 4.0 },
//     { month: "Feb", revenue: 8.5, expense: 4.3, profit: 4.2 },
//     { month: "Mar", revenue: 8.8, expense: 4.5, profit: 4.3 },
//     { month: "Apr", revenue: 9.1, expense: 4.6, profit: 4.5 },
//     { month: "May", revenue: 9.3, expense: 4.8, profit: 4.5 },
//     { month: "Jun", revenue: 9.6, expense: 5.0, profit: 4.6 },
//   ];
 

//   const tenantActivity = [
//     { type: "Check-ins", count: 120, color: "#1e3a5f" },
//     { type: "Check-outs", count: 90, color: "#ff6b35" },
//     { type: "Active Tenants", count: 480, color: "#10b981" },
//     { type: "Notice Period", count: 35, color: "#f59e0b" },
//   ];

//   const paymentStats = [
//     { category: "Paid on Time", value: 70, color: "#10b981" },
//     { category: "Pending", value: 20, color: "#f59e0b" },
//     { category: "Overdue", value: 10, color: "#ef4444" },
//   ];

//   // ====================== CONSOLE LOGGING ===========================
//   useEffect(() => {
//     console.group("📊 ANALYTICS DASHBOARD LOGS");
//     console.table(monthlyOccupancy);
//     console.table(revenueData);
//     console.table(propertyPerformance);
//     console.table(tenantActivity);
//     console.table(paymentStats);
//     console.groupEnd();


//   }, []);
//   useEffect(() => {
//     if (tenantactivity) {
//       console.log("Updated tenant activity state:", tenantactivity?.active);
//     }
//   }, [tenantactivity]);


//   // ====================== RENDER UI ===========================
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-[#1e3a5f] text-3xl font-semibold mb-2">
//             Analytics & Reports
//           </h1>
//           <p className="text-gray-600">
//             Comprehensive insights into your PG business performance
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <select className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]">
//             <option>Last 6 Months</option>
//             <option>Last Year</option>
//             <option>All Time</option>
//           </select>
//           <button
//             className="flex items-center gap-2 bg-[#ff6b35] text-white px-6 py-3 rounded-xl hover:bg-[#e55a2b] transition-colors"
//             onClick={() => {
//               console.log("📤 Export triggered!");
//               console.table({ monthlyOccupancy, revenueData, propertyPerformance, tenantActivity, paymentStats });
//             }}
//           >
//             <Download size={20} />
//             Export
//           </button>
//         </div>
//       </div>

//       {/* Key Metrics */}
//      <div className="flex flex-wrap gap-6 justify-between">
//   {occupancySummarydata?.alldata?.length > 0 &&
//     occupancySummarydata.alldata.map((metric, i) => (
//       <div
//         key={i}
//         className="flex-1 min-w-[250px] bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition"
//       >
//         {/* Occupancy Rate */}
//         <p className="text-gray-600 text-sm mb-1">Occupancy Rate</p>
//         <p className="text-3xl text-[#1e3a5f] font-semibold mb-2">
//           {metric.occupancy ? `${metric.occupancy}%` : "0%"}
//         </p>
//         <div className="flex items-center gap-1 text-sm text-green-500">
          
//         </div>

//         {/* Divider */}
//         <hr className="my-4 border-gray-200" />

//         {/* Average Duration */}
//         <p className="text-gray-600 text-sm mb-1">Average Duration</p>
//         <p className="text-2xl text-[#1e3a5f] font-semibold mb-2">
//           {metric.avgduration ? `${metric.avgduration} days` : "N/A"}
//         </p>

//         {/* Divider */}
//         <hr className="my-4 border-gray-200" />

//         {/* Average Rating */}
//         <p className="text-gray-600 text-sm mb-1">Average Rating</p>
//         <p className="text-2xl text-[#1e3a5f] font-semibold flex items-center gap-1">
//           <span className="text-yellow-500">★</span>
//           {metric.avgrating?.toFixed(1) ?? "0.0"}
//         </p>
//       </div>
//     ))}
// </div>


//       {/* Occupancy Trend
//       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//         <h3 className="text-xl text-[#1e3a5f] mb-4">Occupancy Rate Trend</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <AreaChart data={monthlyOccupancy}>
//             <defs>
//               <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.3} />
//                 <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Area
//               type="monotone"
//               dataKey="rate"
//               stroke="#1e3a5f"
//               fillOpacity={1}
//               fill="url(#colorRate)"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div> */}

//       {/* Revenue Analysis */}
//       {/* <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//         <h3 className="text-xl text-[#1e3a5f] mb-4">
//           Revenue vs Expense vs Profit
//         </h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={revenueData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="revenue" fill="#1e3a5f" name="Revenue" />
//             <Bar dataKey="expense" fill="#ff6b35" name="Expense" />
//             <Bar dataKey="profit" fill="#10b981" name="Profit" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div> */}

//       {/* Property Performance + Payment Chart */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//           <h3 className="text-xl text-[#1e3a5f] mb-4">Property Performance</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={propertyPerformance} layout="vertical">
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis type="number" />
//               <YAxis dataKey="name" type="category" />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="occupancy" fill="#1e3a5f" name="Occupancy %" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//           <h3 className="text-xl text-[#1e3a5f] mb-4">
//             Payment Status Distribution
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={paymentStats}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ category, percent }) =>
//                   `${category}: ${(percent * 100).toFixed(0)}%`
//                 }
//                 outerRadius={100}
//                 dataKey="value"
//               >
//                 {paymentStats.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Tenant Activity Summary */}
//       <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
//         <h3 className="text-2xl font-semibold text-[#1e3a5f] mb-5 tracking-wide">
//           Tenant Activity Summary
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           <div className="p-5 rounded-xl border-2 border-gray-200 bg-gray-50 hover:border-blue-500 hover:bg-white text-center transition-all duration-300">
//             <p className="text-gray-500 text-sm mb-1">Check-ins</p>
//             <p className="text-3xl font-bold text-green-500">
//               {tenentactivitydata?.checkin}
//             </p>

//             <p className="text-gray-500 text-sm mt-4 mb-1">Check-outs</p>
//             <p className="text-3xl font-bold text-red-500">
//               {tenentactivitydata?.checkout}
//             </p>

//             <p className="text-gray-500 text-sm mt-4 mb-1">Active Tenants</p>
//             <p className="text-3xl font-bold text-blue-500">
//               {tenentactivitydata?.active}
//             </p>

//             <p className="text-gray-500 text-sm mt-4 mb-1">In-Active</p>
//             <p className="text-3xl font-bold text-yellow-500">
//               {tenentactivitydata?.inactive}
//             </p>
//           </div>
//         </div>
//       </div>



//       {/* Property Comparison Table */}
//       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//         <h3 className="text-xl text-[#1e3a5f] mb-4">Property Comparison</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 {[
//                   "Property Name",
//                   "Occupancy Rate",
//                   "Monthly Revenue",
//                   "Avg Rating",
//                   "Performance",
//                 ].map((header, i) => (
//                   <th key={i} className="px-4 py-3 text-sm text-gray-600">
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {propertycomparisondata?.allbranch?.length > 0 && propertycomparisondata?.allbranch.map((property, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-3 text-[#1e3a5f]">{property.name}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center gap-3">
//                       <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-[#1e3a5f]"
//                           style={{ width: `${property.occupancy}%` }}
//                         ></div>
//                       </div>
//                       <span>{property.occupancy}%</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     ₹{(property.revenue / 1000).toFixed(0)}K
//                   </td>
//                   <td className="px-4 py-3 flex items-center gap-1">
//                     <span className="text-yellow-500">★</span>
//                     {property.rating}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${property.occupancy >= 90
//                         ? "bg-green-100 text-green-600"
//                         : property.occupancy >= 80
//                           ? "bg-yellow-100 text-yellow-600"
//                           : "bg-red-100 text-red-600"
//                         }`}
//                     >
//                       {property.performance}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
