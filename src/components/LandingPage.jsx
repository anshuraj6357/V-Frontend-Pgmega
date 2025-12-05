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
    console.log(pgApiData?.allrooms)
    if (pgApiData?.allrooms) {
      setPgData(pgApiData.allrooms);
    }
    if (wishlistData?.data) {
      const pgIds = wishlistData.data.map(item => item.pgId);
      setWishlistIds(pgIds);
    }
  }, [pgApiData, wishlistData]);

  const handleFindPG = () => {
    setSearchError('');
    if (!searchQuery.trim()) {
      setSearchError('Please enter a PG name or location');
      return;
    }
    navigate(`/search/${searchQuery}`);
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
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 px-2 sm:px-4">

      {/* HERO */}
      <div
        className="relative bg-cover bg-center h-[400px] sm:h-[500px] md:h-[550px] rounded-b-3xl shadow-xl"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.65)), url(https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260)'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight animate-fadeIn">
            Find Your Perfect Stay
          </h2>
          <p className="text-base sm:text-lg md:text-2xl mt-2 sm:mt-3 text-white/90 font-medium animate-fadeIn delay-150">
            Safe • Comfortable • Affordable — Just Like Home
          </p>

          {/* SEARCH BAR */}
          <div className="w-full max-w-3xl mt-8 sm:mt-12 animate-slideUp">
            <div
              className="bg-white/25 backdrop-blur-xl shadow-2xl rounded-full p-3 border border-white/20 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Search by location, landmark, or property name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFindPG()}
                className="flex-1 bg-transparent text-white placeholder-white/70 px-4 py-2 sm:py-3 text-base sm:text-lg focus:outline-none"
              />
              <button
                onClick={handleFindPG}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base sm:text-lg font-semibold"
              >
                Search
              </button>
            </div>
            {searchError && (
              <p className="text-red-300 text-sm mt-2 sm:mt-3 text-center">{searchError}</p>
            )}
          </div>
        </div>
      </div>

      {/* PG LIST */}
      <div className="max-w-7xl mx-auto py-10 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Available Rooms & PGs</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {pgData.length > 0 ? pgData.map((pg) => (
              <div
                key={pg._id}
                onClick={() => navigate(`/pg/${pg._id}`)}
                className="cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={pg?.roomImages?.[0]}
                    alt={pg?.branch?.name}
                    className="h-48 sm:h-56 w-full object-cover"
                  />
                  {/* Heart Icon */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3"
                  >
                    <WishlistButton pg={pg} onAuthOpen={() => setIsAuthModalOpen(true)} />
                  </div>
                  {/* Category Tag */}
                  <span
                    className={`absolute bottom-3 left-3 px-3 py-1 text-xs rounded-full shadow font-medium 
                      ${pg?.category === "Pg" ? "bg-blue-100 text-blue-700" : ""}
                      ${pg?.category === "Room" ? "bg-green-100 text-green-700" : ""}
                      ${pg?.category === "Hotel" ? "bg-purple-100 text-purple-700" : ""}`}
                  >
                    {pg?.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {pg?.branch?.name} – Room {pg?.roomNumber}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1 leading-relaxed">
                    📍 {pg?.branch?.address || pg?.branch?.location?.address}
                  </p>

                  {/* Feature Chips */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
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
                          className={`text-xs sm:text-sm px-2 py-1 rounded-full shadow-sm font-medium ${colors[idx % colors.length]}`}
                        >
                          {f}
                        </span>
                      );
                    })}
                    {pg?.facilities?.length > 3 && (
                      <span className="text-xs sm:text-sm text-gray-400 font-medium">+ {pg.facilities.length - 3} more</span>
                    )}
                  </div>

                  <p className={`text-xs sm:text-sm font-semibold mt-1 ${pg.verified ? "text-green-600" : "text-red-500"}`}>
                    {pg.verified ? "✔ Verified Host" : "⛔ Not Verified"}
                  </p>

                  <div className="mt-3 sm:mt-4 flex justify-between items-center">
                    <p className="text-lg sm:text-xl font-bold text-gray-900">
                      {pg?.category === "Pg"||pg.category === "Rented-Room"
                        ? `₹${pg?.price}/month`
                        : `₹${pg?.rentperNight}/night`}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      {pg?.occupied}/{pg?.count} occupied
                    </p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-12 text-gray-500 text-lg">
                No Rooms Available
              </div>
            )}
          </div>
        )}
      </div>

      {/* POPULAR CITIES */}
      <section className="w-full py-12 sm:py-16 bg-gradient-to-b from-white/70 via-white/60 to-white/50 backdrop-blur-sm text-center rounded-3xl shadow-lg px-2 sm:px-6 mx-auto max-w-7xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Rooms in Popular Cities</h2>
        <p className="text-gray-600 mb-8 sm:mb-10">Choose your city and discover the best rooms near you.</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-6xl mx-auto">
          {["Delhi","Noida","Gurgaon","Bangalore","Chennai","Hyderabad","Pune","Mumbai"].map((city) => (
            <button
              key={city}
              onClick={() => toast.success(`We are coming soon in ${city}`)}
              className="bg-white shadow-md rounded-xl p-3 sm:p-5 text-sm sm:text-base font-semibold cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              {city}
            </button>
          ))}
        </div>
      </section>

      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </div>
  );
}
