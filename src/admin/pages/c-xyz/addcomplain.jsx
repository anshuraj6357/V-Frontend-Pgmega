import React, { useState } from "react";

export default function AddComplain({ onClose }) {
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    category: "",
    branchId: "",
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint submitted:", formdata);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl text-[#1e3a5f] font-semibold">
            Submit a Complaint
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Share your concern — our team will resolve it quickly ✨
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Complaint Title
            </label>
            <input
              type="text"
              name="title"
              value={formdata.title}
              onChange={handleChange}
              placeholder="Enter complaint title"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f] outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formdata.description}
              onChange={handleChange}
              placeholder="Describe your issue clearly..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f] outline-none resize-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formdata.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f] outline-none"
              required
            >
              <option value="">Select Category</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Billing">Billing</option>
              <option value="Service">Service</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Branch ID */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Branch ID
            </label>
            <input
              type="text"
              name="branchId"
              value={formdata.branchId}
              onChange={handleChange}
              placeholder="Enter branch ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1e3a5f] outline-none"
              required
            />
          </div>
        </form>

        {/* Footer Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-[#ff6b35] text-white rounded-xl hover:bg-[#e55a2b] transition-colors"
          >
            Submit Complaint
          </button>
        </div>
      </div>
    </div>
  );
}
