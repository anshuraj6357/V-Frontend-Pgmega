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
  <div className="space-y-8">

    {/* -------------------------------- HEADER -------------------------------- */}
    <div className="animate-fadeIn">
      <h1 className="text-[#1e3a5f] text-4xl font-bold mb-1 tracking-tight">
        Payment Management
      </h1>
      <p className="text-gray-600 text-lg">
        Track rent collection, expenses, and financial performance
      </p>
    </div>

    {/* ----------------------------- FINANCIAL SUMMARY ----------------------------- */}
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {/* Card */}
      <div className="dashboard-card">
        <div className="flex justify-between items-center mb-2">
          <p className="card-label">Total Income</p>
          <TrendingUp className="text-green-500" size={22} />
        </div>
        <p className="card-value">₹{data?.Income}</p>
      </div>

      <div className="dashboard-card">
        <div className="flex justify-between items-center mb-2">
          <p className="card-label">Total Expenses</p>
          <TrendingDown className="text-red-500" size={22} />
        </div>
        <p className="card-value">₹{data?.expense}</p>
      </div>

      <div className="dashboard-card">
        <div className="flex justify-between items-center mb-2">
          <p className="card-label">Net Profit</p>
          <TrendingUp className="text-[#ff6b35]" size={22} />
        </div>
        <p className="card-value text-[#ff6b35]">₹{data?.totalrevenue}</p>
        <p className="card-sub">Current month</p>
      </div>

      <div
        onClick={() => handleseerest(data?.notpaid)}
        className="dashboard-card cursor-pointer hover:shadow-lg"
      >
        <div className="flex justify-between items-center mb-2">
          <p className="card-label">Not Paid (Month)</p>
          <TrendingDown className="text-red-500" size={22} />
        </div>
        <p className="card-value">{data?.notpaid?.length}</p>
      </div>

      <div className="dashboard-card">
        <div className="flex justify-between items-center mb-2">
          <p className="card-label">Total Advance</p>
          <TrendingUp className="text-green-500" size={22} />
        </div>
        <p className="card-value">₹{alladv(data?.tenantpayments)}</p>
      </div>
    </div>

    {/* ----------------------------- TITLE + BUTTON + FILTER ----------------------------- */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* Left Title Block */}
      <div>
        <h1 className="text-[#1e3a5f] text-3xl font-semibold">Payment Management</h1>
        <p className="text-gray-600 mt-1">
          Manage tenant rent, advances, and dues efficiently
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">

        {/* Add Payment Button */}
        <button
          onClick={() => changepage()}
          className="btn-primary"
        >
          <Plus size={18} />
          Add Payment
        </button>

        {/* Month */}
        <select
          value={dateAndYear.month}
          onChange={(e) =>
            setDateAndYear((prev) => ({ ...prev, month: Number(e.target.value) }))
          }
          className="input-select"
        >
          {[
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
          ].map((m, i) => (
            <option key={i} value={i + 1}>{m}</option>
          ))}
        </select>

        {/* Year */}
        <select
          value={dateAndYear.year}
          onChange={(e) =>
            setDateAndYear((prev) => ({ ...prev, year: Number(e.target.value) }))
          }
          className="input-select"
        >
          {Array.from({ length: 5 }, (_, i) => 2023 + i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>

    {/* -------------------------------- TABS -------------------------------- */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      <div className="flex border-b border-gray-200">
        {["collection", "expenses", "reminders"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`tab-btn ${activeTab === tab ? "active-tab" : ""}`}
          >
            {tab === "collection"
              ? "Rent Collection"
              : tab === "expenses"
              ? "Expenses"
              : "Reminders"}
          </button>
        ))}
      </div>

      {/* ----------------------------- RENT COLLECTION TABLE ----------------------------- */}
      {activeTab === "collection" && (
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Showing payments for {new Date().toLocaleDateString("en-IN")}
          </p>

          <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100">
            <table className="w-full">
              <thead className="table-head">
                <tr>
                  <th>Tenant</th>
                  <th>Property / Room</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Advance</th>
                  <th>Dues</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {data?.allpayment?.map((payment) => (
                  <tr
                    key={payment._id}
                    className="table-row"
                    onClick={() => handleshowtenantlldetails()}
                  >
                    <td className="text-[#1e3a5f] font-medium">{payment?.tenantId?.name}</td>
                    <td>
                      <p>{payment.property}</p>
                      <p className="text-sm text-gray-500">Room {payment.roomNo}</p>
                    </td>
                    <td className="font-semibold text-[#1e3a5f]">₹{payment?.amountpaid}</td>
                    <td>
                      <span className={`status-badge ${payment?.tilldatestatus}`}>
                        {payment?.tilldatestatus}
                      </span>
                    </td>
                    <td className="text-gray-700">
                      {payment?.createdAt
                        ? new Date(payment.createdAt).toLocaleDateString("en-IN")
                        : new Date(payment.dueDate).toLocaleDateString("en-IN")}
                    </td>
                    <td className="text-green-600 font-bold">
                      {payment?.tilldateAdvance}
                    </td>
                    <td className="text-red-600 font-bold">
                      {payment?.tilldatedues * -1}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------------------- EXPENSES TAB ----------------------------- */}
      {activeTab === "expenses" && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Showing expenses for {new Date().toLocaleDateString("en-IN")}
            </p>

            <button
              onClick={handleAddExpense}
              className="btn-orange"
            >
              <Plus size={16} /> Add Expense
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100">
            <table className="w-full">
              <thead className="table-head">
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Created</th>
                  <th>Property</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {data?.allExpense?.map((exp) => (
                  <tr key={exp.id} className="table-row">
                    <td className="text-[#1e3a5f] font-medium">{exp.category}</td>
                    <td className="text-red-500 font-semibold">₹{exp.amount}</td>
                    <td>{new Date(exp.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="text-gray-700">{exp.branchId?.address}</td>
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
