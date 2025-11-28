import { useState, useEffect } from "react";

import {

  TrendingUp,
  TrendingDown,
  Plus,
} from "lucide-react";
import {

  useGetRevenueDetailsQuery,
} from "../../Bothfeatures/features2/api/paymentapi.js"

import { useDispatch } from "react-redux";
import { setAlltenants } from "../../Bothfeatures/notpaidtenantslice";
import {useNavigate} from "react-router-dom"


export default function Payments() {
 
  const dispatch = useDispatch();
  // const { data:paymentdata } = useGetAllPaymentsQuery();
  const navigate = useNavigate()
  const [dateAndYear, setDateAndYear] = useState({
    month: 11,
    year: 2025,
  });
  const [activeTab, setActiveTab] = useState("collection");
  const [payments, setpayments] = useState(null)



  const { data } = useGetRevenueDetailsQuery(dateAndYear)
  useEffect(() => { if (data) { setpayments(data?.allpayment), console.log(data) } }, [data])





  const handleTabChange = (tab) => {
    console.log(`Switched to tab: ${tab}`);
    setActiveTab(tab);
  };
  const handleseerest = (notpaiddata) => {

    console.log("notpaiddata", notpaiddata)

    dispatch(setAlltenants(notpaiddata))

    navigate("/all-notpaid-tenant")
  };


  const handleshowtenantlldetails = () => {
    alert("here all tenat details will have to show")
  };
  const alladv = (tenantpayments = {}) =>
    Object.values(tenantpayments).reduce((sum, t) => sum + (t.toatadvance || 0), 0);


  const handleAddExpense = () => {
    console.log("Adding new expense → POST /api/expenses/new");
  };


  const changepage = () => {
    navigate("/add-payment")
  };

  const handleRemindTenant = (tenant) => {
    console.log(`Sending rent reminder → POST /api/reminder to ${tenant}`);
  };

  const handleViewExpense = (id) => {
    console.log(`View expense details → GET /api/expenses/${id}`);
  };

  const handleSaveReminders = () => {
    console.log("Saving reminder settings → PUT /api/reminders/settings");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#1e3a5f] text-3xl mb-2">Payment Management</h1>
        <p className="text-gray-600">
          Track rent collection, expenses, and financial performance
        </p>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Income</p>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <p className="text-3xl text-[#1e3a5f] mb-1">
            ₹{data?.Income}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Expenses</p>
            <TrendingDown className="text-red-500" size={20} />
          </div>
          <p className="text-3xl text-[#1e3a5f] mb-1">
            ₹{data?.expense}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Net Profit</p>
            <TrendingUp className="text-[#ff6b35]" size={20} />
          </div>
          <p className="text-3xl text-[#ff6b35] mb-1">
            ₹{data?.totalrevenue}
          </p>
          <p className="text-sm text-gray-500">Current month</p>
        </div>
        <div
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
          onClick={() => handleseerest(data?.notpaid)}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Not Paid This Month</p>
            <TrendingDown className="text-red-500" size={20} />
          </div>
          <p className="text-3xl text-[#1e3a5f] mb-1">
            ₹{data?.notpaid?.length}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total advance</p>
            <TrendingDown className="text-red-500" size={20} />
          </div>
          <p className="text-3xl text-[#1e3a5f] mb-1">
            ₹{alladv(data?.tenantpayments)}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* LEFT SIDE: Title and Description */}
        <div>
          <h1 className="text-[#1e3a5f] text-3xl font-semibold mb-1">
            Payment Management
          </h1>
          <p className="text-gray-600 mb-3">
            Track rent collection, expenses, and financial performance
          </p>

          {/* Optional Subtitle or Info */}
          <div className="text-sm text-gray-500">
            Manage tenant rent, advances, and dues efficiently
          </div>
        </div>

        {/* RIGHT SIDE: Add Payment Button + Filter */}
        <div className="flex items-center gap-3">
          {/* Dropdown or Filter */}


          {/* Add Payment Button */}
          <button
            onClick={() => changepage()} // (Example handler)
            className="bg-[#1e3a5f] hover:bg-[#2a4a7b] text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Payment
          </button>
        </div>


        {/* Month and Year Selector */}
        <div className="flex items-center gap-3">
          <select
            value={dateAndYear.month}
            onChange={(e) =>
              setDateAndYear((prev) => ({ ...prev, month: Number(e.target.value) }))
            }
            className="border border-gray-300 rounded-xl px-3 py-2 text-gray-700 focus:ring-[#1e3a5f] focus:border-[#1e3a5f]"
          >
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December",
            ].map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={dateAndYear.year}
            onChange={(e) =>
              setDateAndYear((prev) => ({ ...prev, year: Number(e.target.value) }))
            }
            className="border border-gray-300 rounded-xl px-3 py-2 text-gray-700 focus:ring-[#1e3a5f] focus:border-[#1e3a5f]"
          >
            {Array.from({ length: 5 }, (_, i) => 2023 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>



      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200">
          {["collection", "expenses", "reminders"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 px-6 py-4 text-center transition-colors ${activeTab === tab
                ? "text-[#1e3a5f] border-b-2 border-[#1e3a5f]"
                : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {tab === "collection"
                ? "Rent Collection"
                : tab === "expenses"
                  ? "Expenses"
                  : "Reminders"}
            </button>
          ))}
        </div>

        {/* Rent Collection Tab */}
        {activeTab === "collection" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">Showing payments for November 2024</p>

            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Tenant</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Property & Room</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Amount</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Status</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Date</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Advance</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Dues</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.allpayment?.length > 0 && data?.allpayment?.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50" onClick={(() => handleshowtenantlldetails())}>
                      <td className="px-4 py-4 text-[#1e3a5f]">{payment?.tenantId?.name}</td>
                      <td className="px-4 py-4">
                        <p className="text-gray-700">{payment.property}</p>
                        <p className="text-sm text-gray-500">Room {payment.roomNo}</p>
                      </td>
                      <td className="px-4 py-4 text-[#1e3a5f]">
                        ₹{payment?.amountpaid}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm ${payment?.tilldatestatus === "paid"
                            ? "bg-green-100 text-green-600"
                            : payment?.tilldatestatus === "dues"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                            }`}
                        >
                          {payment?.tilldatestatus}
                        </span>
                      </td>
                      <td className=" py-4 text-gray-700">
                        {payment?.createdAt
                          ? `Paid: ${new Date(payment?.createdAt).toLocaleDateString("en-IN")}`
                          : `Due: ${new Date(payment.dueDate).toLocaleDateString("en-IN")}`}
                      </td>
                      <td className=" ml-4 py-4 text-green-600 font-semibold">
                        {payment?.tilldateAdvance}
                      </td>
                      <td className=" py-4 text-red-600 font-semibold">
                        {-1 * payment?.tilldatedues}
                      </td>


                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === "expenses" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">Showing expenses for October 2024</p>
              <button
                onClick={handleAddExpense}
                className="flex items-center gap-2 px-4 py-2 bg-[#ff6b35] text-white rounded-xl hover:bg-[#e55a2b] transition-colors"
              >
                <Plus size={16} /> Add Expense
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Category</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Amount</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Month</th>
                    <th className="text-left px-4 py-3 text-sm text-gray-600">Property</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.allExpense?.length > 0 && data?.allExpense?.map((expense) => (
                    <tr key={expense.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-[#1e3a5f]">{expense?.category}</td>
                      <td className="px-4 py-4 text-red-500">
                        ₹{expense?.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-gray-700">`{new Date(expense?.createdAt).toLocaleDateString("en-IN")}`</td>
                      <td className="px-4 py-4 text-gray-700">{expense?.branchId?.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


      </div>
    </div >
  );
}
