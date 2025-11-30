import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from "lucide-react";

import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

import {
  useGetAllListedPgQuery,
} from "../Bothfeatures/features/api/allpg.js";


export default function LandingPage() {
  const navigate = useNavigate();
  const [pgData, setpgData] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  // 🔥 NEW: Filter panel toggle
  const [showFilters, setShowFilters] = useState(false);

  // 🔥 NEW: Filter values state
  const [filterValues, setFilterValues] = useState({
    type: '',
    rating: '',
    place: '',
    distance: 10,
    rentMin: 0,
    rentMax: 20000,
    facilities: [],
  });

  const { data, isLoading } = useGetAllListedPgQuery();

  useEffect(() => {
    if (data) {
      setpgData(data?.foundBranch);
    }
  }, [data]);

  const handleFindPG = () => {
    setSearchError('');
    if (!searchQuery.trim()) {
      setSearchError('Please enter a PG name');
      return;
    }
  };

  // 🔥 NEW: Update filters
  const updateFilter = (key, value) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
  };

  // 🔥 NEW: Facilities toggle
  const toggleFacility = (facility) => {
    setFilterValues(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  // 🔥 NEW: Apply filter click
  const applyFilters = () => {
    console.log("SELECTED FILTERS:", filterValues);

    // Close filter panel
    setShowFilters(false);
  };

  // Favourate heart
  const [favorite, setFavorite] = useState({});


  function Loader() {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />

      {/* HERO SECTION */}
      <div
        className="relative bg-cover bg-center h-[550px]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260)',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect PG Near You</h2>
          <p className="text-xl mb-8">Safe, Comfortable & Affordable Accommodation</p>

          {/* SEARCH BAR */}
          <div className="w-full max-w-2xl">
            <div className="relative flex gap-2 w-full">
              <input
                type="text"
                placeholder="Search your PG by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFindPG()}
                className="
                  flex-1 px-3 py-3 rounded-full text-gray-900 text-base 
                  focus:outline-none focus:ring-4 focus:ring-blue-300
                  sm:px-6 sm:py-4
                "
              />

              <button
                onClick={handleFindPG}
                className="
                  bg-blue-600 text-white px-4 py-3 rounded-full 
                  hover:bg-blue-700 transition font-medium text-sm
                  sm:px-8 sm:py-4 sm:text-base
                "
              >
                Find
              </button>
            </div>

            {searchError && (
              <p className="text-red-300 text-sm mt-2 text-center">{searchError}</p>
            )}
          </div>

          {/* 🔥 FILTER BUTTON */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-4 px-6 py-2 bg-blue-600 text-black rounded-full text-lg text-white shadow-md hover:bg-blue-700"
          >
            Filters
          </button>
        </div>
      </div>

      {/* 🔥 FILTER PANEL (SHOW ONLY WHEN TOGGLED) */}
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
              step="0.10"
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
              {["WiFi", "Parking", "Food", "AC", "Laundry", "Power Backup"].map((item) => (
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

          {/* 🔥 APPLY FILTER BUTTON */}
          <button
            onClick={applyFilters}
            className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* PG LIST SECTION */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pgData?.length > 0 ? (
              pgData.map((pg) => (
                <div
                  onClick={() => navigate(`/pg/${pg?._id}`)}
                  key={pg.id}
                  className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                {/* IMAGE + HEART BUTTON */}
                <div className="relative">
                  <img
                    src={pg?.roomImages?.[0]}
                    alt={pg.name}
                    className="h-40 w-full object-cover"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFavorite((prev) => ({
                        ...prev,
                        [pg._id]: !prev[pg._id]
                    }));
                    console.log("favorite pg =", pg?._id);
                    }}
                    className="absolute top-2 right-2 bg-white/40 backdrop-blur-md p-2 rounded-full shadow-md"
                  >
                  <Heart
                    className={`h-5 w-5 ${
                      favorite[pg._id] ? "fill-red-600 text-red-600" : "text-white"
                    }`}
                  />
                  </button>
                </div>

              {/* CONTENT */}
              <div className="p-3">
                <div className="flex justify-between items-center">
                  <p className="mt-0 font-semibold">{pg?.branch?.name}</p>
                  <p className="text-sm bg-green-500 text-white px-2 py-0.5 rounded-lg">
                    PG
                  </p>
                </div>

                <p className="mt-0 text-gray-500 font-small">📍 {pg?.branch?.address}</p>

                <p className="mt-0 font-semibold text-blue-700">
                  ₹{pg?.price}
                </p>

                <div className="flex flex-wrap gap-2 mt-0">
                  {pg?.facilities?.slice(0, 4).map((item, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
           </div>
         ))

            ) : (
              <div className="col-span-full text-center py-12 text-gray-500 text-lg">
                No PGs available
              </div>
            )}
          </div>
        </div>
      )}

      {/* POPULAR CITIES */}
<section className="w-full py-12 bg-gray-100 text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-4">PGs Available in Popular Cities</h2>
  <p className="text-gray-600 mb-10">Choose your city and discover the best rooms near you.</p>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-11/12 mx-auto max-w-5xl">
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
        className="bg-white shadow-md rounded-xl p-4 md:p-6 text-base md:text-xl font-semibold cursor-pointer hover:shadow-lg transition"
      >
        {city}
      </button>
    ))}
  </div>
</section>


      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
