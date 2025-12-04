import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WishlistButton from "../components/wishlist.jsx";

import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import { toast } from "react-toastify";
import { useGetAllListedPgQuery } from "../Bothfeatures/features/api/allpg.js";
import { useGetWishlistQuery } from "../Bothfeatures/features/api/authapi";

export default function LandingPage() {
  const navigate = useNavigate();
  const { data: wishlistData } = useGetWishlistQuery();
  const { data: pgApiData, isLoading } = useGetAllListedPgQuery();

  const [pgData, setPgData] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState({
    type: '',
    rating: '',
    place: '',
    distance: 10,
    rentMin: 0,
    rentMax: 20000,
    facilities: [],
  });

  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    if (pgApiData?.foundBranch) {
      setPgData(pgApiData.foundBranch);
    }

    if (wishlistData?.data) {
      const pgIds = wishlistData.data.map(item => item.pgId);
      setWishlistIds(pgIds);
    }
  }, [pgApiData, wishlistData]);

  const handleFindPG = () => {
    setSearchError('');
    navigate(`/search/${searchQuery}`)
    if (!searchQuery.trim()) {
      setSearchError('Please enter a PG name');
      return;
    }
  };

  const updateFilter = (key, value) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
  };

  const toggleFacility = (facility) => {
    setFilterValues(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const applyFilters = () => {
    console.log("Selected Filters:", filterValues);
    setShowFilters(false);
  };

  function Loader() {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div
        className="relative bg-cover bg-center h-[360px] md:h-[400px]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260)'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-white px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">Find Your Perfect Stay Near You</h2>
          <p className="text-xl mb-6">Safe, Comfortable & Affordable Accommodation</p>

          <div
            className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-xl rounded-full p-2 border border-white/30
             absolute left-1/2 -translate-x-1/2 -bottom-8"
          >
            <div className="relative flex gap-2 w-full">
              <input
                type="text"
                placeholder="Search by neareast location / name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFindPG()}
                className="flex-1 px-4 py-4 rounded-full text-gray-900 text-base bg-transparent focus:outline-none mt-0"
              />
              <button
                onClick={handleFindPG}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition font-medium text-base pb-1"
              >
                Find
              </button>
            </div>

            {searchError && (
              <p className="text-red-500 text-sm mt-2 text-center">{searchError}</p>
            )}
          </div>



        </div>
      </div>

      {/* PG LIST */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pgData.length > 0 ? (
              pgData.map((pg) => (
                <div
                  key={pg._id}
                  onClick={() => navigate(`/pg/${pg._id}`)}
                  className="cursor-pointer rounded-2xl overflow-hidden border border-gray-200 bg-white 
          hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={pg?.roomImages?.[0]}
                      alt={pg?.branch?.name}
                      className="h-56 w-full object-cover"
                    />

                    {/* Heart Icon */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-4 right-4"
                    >
                      <WishlistButton pg={pg} onAuthOpen={() => setIsAuthModalOpen(true)} />
                    </div>

                    {/* Category Tag */}
                    <span
                      className={`
    absolute bottom-3 left-3 px-3 py-1 text-xs rounded-full shadow font-medium 
    ${pg?.category === "Pg" ? "bg-blue-100 text-blue-700" : ""}
    ${pg?.category === "Room" ? "bg-green-100 text-green-700" : ""}
    ${pg?.category === "Hotel" ? "bg-purple-100 text-purple-700" : ""}
  `}
                    >
                      {pg?.category}
                    </span>

                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {pg?.branch?.name} – Room {pg?.roomNumber}
                    </h3>

                    {/* Address */}
                    <p className="text-gray-500 text-sm flex items-center gap-1 leading-relaxed">
                      📍 {pg?.branch?.address || pg?.branch?.location?.address}
                    </p>

                    {/* Feature Chips (colorful) */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {pg?.facilities?.slice(0, 3).map((f, idx) => {
                        const colors = [
                          "bg-blue-100 text-blue-700",
                          "bg-green-100 text-green-700",
                          "bg-purple-100 text-purple-700",
                          "bg-pink-100 text-pink-700",
                          "bg-yellow-100 text-yellow-700",
                        ];
                        return (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded-full shadow-sm font-medium ${colors[idx % colors.length]}`}
                          >
                            {f}
                          </span>
                        );
                      })}

                      {pg?.facilities?.length > 3 && (
                        <span className="text-xs text-gray-400 font-medium">+ {pg.facilities.length - 3} more</span>
                      )}
                    </div>

                    {/* Verified Status */}
                    <p
                      className={`text-xs font-semibold mt-1 ${pg.verified ? "text-green-600" : "text-red-500"
                        }`}
                    >
                      {pg.verified ? "✔ Verified Host" : "⛔ Not Verified"}
                    </p>

                    {/* Price & Occupancy */}
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-xl font-bold text-gray-900">
                        {pg?.category === "Pg"
                          ? `₹${pg?.price}/month`
                          : `₹${pg?.rentperNight}/night`}
                      </p>

                      <p className="text-xs text-gray-500 font-medium">
                        {pg?.occupied}/{pg?.count} occupied
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500 text-lg">
                No Rooms Available
              </div>
            )}
          </div>
        </div>

      )}





      {/* POPULAR CITIES */}
      <section className="w-full py-14 bg-gray-100 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Rooms Available in Popular Cities</h2>
        <p className="text-gray-600 mb-10">Choose your city and discover the best rooms near you.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-11/12 mx-auto max-w-6xl">
          {[
            "Delhi",
            "Noida",
            "Gurgaon",
            "Bangalore",
            "Chennai",
            "Hyderabad",
            "Pune",
            "Mumbai",
          ].map((city) => (
            <button
              key={city}
              onClick={() => toast.success(`We are coming soon in ${city}`)}
              className="bg-white shadow-md rounded-xl p-4 md:p-6 text-base md:text-lg font-semibold cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              {city}
            </button>
          ))}
        </div>
      </section>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg mt-5">

          {/* TYPE */}
          <div className="mb-4">
            <label className="font-semibold">Type</label>
            <select
              value={filterValues.type}
              onChange={(e) => updateFilter("type", e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
            >
              <option value="">Select Type</option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
              <option value="Co-ed">Unisex</option>
            </select>
          </div>

          {/* RATING */}
          <div className="mb-4">
            <label className="font-semibold">Rating</label>
            <select
              value={filterValues.rating}
              onChange={(e) => updateFilter("rating", e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
            >
              <option value="">Select Rating</option>
              <option value="4+">4+</option>
              <option value="3+">3+</option>
              <option value="2+">2+</option>
            </select>
          </div>

          {/* PLACE */}
          <div className="mb-4">
            <label className="font-semibold">Place</label>
            <input
              type="text"
              value={filterValues.place}
              onChange={(e) => updateFilter("place", e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="Search place..."
            />
          </div>

          {/* DISTANCE */}
          <div className="mb-4">
            <label className="font-semibold">Distance (km)</label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={filterValues.distance}
              onChange={(e) => updateFilter("distance", e.target.value)}
              className="w-full"
            />
            <p>{filterValues.distance} km</p>
          </div>

          {/* RENT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rent: ₹{filterValues.rentMin} - ₹{filterValues.rentMax}
            </label>
            <input
              type="range"
              min="0"
              max="20000"
              step="500"
              value={filterValues.rentMax}
              onChange={(e) =>
                setFilterValues({ ...filterValues, rentMax: parseInt(e.target.value) })
              }
              className="w-full"
            />
          </div>

          {/* FACILITIES */}
          <div className="mb-4">
            <label className="font-semibold">Facilities</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["AC",
                "Non-AC",
                "Bathroom",
                "WiFi",
                "Power Backup",
                "Laundry",
                "CCTV",
                "Parking",
                "Refrigerator",
                "24x7 Electricity"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filterValues.facilities.includes(item)}
                      onChange={() => toggleFacility(item)}
                    />
                    {item}
                  </label>
                ))}
            </div>
          </div>

          <button
            onClick={applyFilters}
            className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
        </div>
      )}

    </div>
  );
}
