import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllFilteredQuery,
  useAppliedAllFilteredMutation
} from "../Bothfeatures/features/api/allpg";
import { Loader2, Filter } from "lucide-react";

export default function Searched() {
  const navigate = useNavigate();
  const { city } = useParams();

  const { data, isLoading } = useGetAllFilteredQuery(city);
  const [applyFilters, { data: pgdata, isLoading: pgisLoading }] =
    useAppliedAllFilteredMutation();

  const [pgData, setPgData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  // FILTER STATES
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(999999);
  const [category, setCategory] = useState("any");
  const [type, setType] = useState("any");
  const [facilities, setFacilities] = useState([]);

  // Search by category
  const handleFindPG = () => {
    if (!searchQuery.trim()) {
      setSearchError("Please enter PG name.");
      return;
    }

    setSearchError("");

    const filtered = data?.data?.filter((pg) =>
      pg.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setPgData(filtered || []);
  };

  // Toggle facility
  const toggleFacility = (facility) => {
    setFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  // Apply filters
  const handleApplyFilters = async () => {
    const filterBody = {
      city,
      min,
      max,
      category,
      type,
      facilities
    };

    await applyFilters(filterBody).unwrap();
    setIsFilterOpen(false);
  };

  // SET DATA
  useEffect(() => {
    if (data?.data) setPgData(data.data);
    if (pgdata) setPgData(pgdata?.data);
  }, [data, pgdata]);

  if (pgisLoading) return <p>Loading filtered stays...</p>;

  return (
    <>
      {/* Search Bar */}
      <div className="w-full max-w-2xl mx-auto mt-8 px-4">
        <div className="flex gap-3 w-full">
          <input
            type="text"
            placeholder="Search PG Hotel, Hostel and Room..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!e.target.value.trim()) setPgData(data?.data || []);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleFindPG()}
            className="flex-1 px-4 py-3 border rounded-full"
          />

          <button
            onClick={handleFindPG}
            className="bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            Find
          </button>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="bg-gray-200 px-4 py-3 rounded-full"
          >
            <Filter className="w-6 h-6" />
          </button>
        </div>

        {searchError && (
          <p className="text-red-500 text-center mt-2">{searchError}</p>
        )}
      </div>

      {/* FILTER MODAL */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Apply Filters</h2>

            {/* Price Range */}
            <div className="mb-3">
              <label>Price Range</label>
              <div className="flex justify-between mt-2">
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(Number(e.target.value))}
                  className="w-24 px-2 py-1 border rounded"
                />

                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(Number(e.target.value))}
                  className="w-24 px-2 py-1 border rounded"
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-3">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded mt-2 px-3 py-2"
              >
                <option value="any">Any</option>
                <option value="Single Room">Single Room</option>
                <option value="Double Sharing">Double Sharing</option>
                <option value="Triple Sharing">Triple Sharing</option>
              </select>
            </div>

            {/* Type */}
            <div className="mb-3">
              <label>Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded mt-2 px-3 py-2"
              >
                <option value="any">Any</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Co-ed">Co-ed</option>
              </select>
            </div>

            {/* Facilities */}
            <div className="mb-4">
              <label>Facilities</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Wifi", "AC", "Food", "Parking", "Laundry"].map((item) => (
                  <label key={item} className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={facilities.includes(item)}
                      onChange={() => toggleFacility(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 bg-blue-600 rounded text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOADER */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin w-12 h-12" />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-xl font-semibold mb-6">
            PG Hotel, Hostel and Rooms Available in {city}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pgData?.length > 0 ? (
              pgData.map((pg) => (
                <div
                  key={pg._id}
                  onClick={() => navigate(`/pg/${pg._id}`)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={pg.roomImages?.[0]}
                      alt={pg.category}
                      className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Price Tag */}
                    <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                      ₹{pg.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-lg text-gray-900 truncate">
                      {pg.category}
                    </h3>

                    <p className="text-gray-600 text-sm flex items-center gap-1">
                      📍 {pg.city}
                    </p>

                    <p className="text-xs font-medium text-green-600">
                      {pg.type === "any" ? "Available for All" : pg.type}
                    </p>

                    {/* Facilities */}
                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-700">
                      {pg.facilities?.slice(0, 4).map((f, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 px-2 py-1 rounded-full border text-gray-600"
                        >
                          {f}
                        </span>
                      ))}

                      {pg.facilities?.length > 4 && (
                        <span className="text-blue-600 font-medium text-xs">
                          +{pg.facilities.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <button className="w-full mt-3 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No PGs found.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
