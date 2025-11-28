import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import pgData from '../data/pgData.json';
import {
  useAppliedAllFilteredMutation,
  useGetAllFilteredQuery,
  useGetAllListedPgQuery,
  useGetPgByIdQuery,
} from "../components/features/api/allpg.js";
export default function LandingPage() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [placeSearch, setPlaceSearch] = useState('');

  const {data}=useGetAllListedPgQuery();

  useEffect(()=>{
    if(data){
      console.log(data)
    }
  },[data])

  const [filters, setFilters] = useState({
    type: 'All',
    distance: 5,
    place: 'All',
    rentMin: 0,
    rentMax: 20000,
    rating: 'All',
    facilities: [],
  });

  const [openDropdowns, setOpenDropdowns] = useState({
    facilities: false,
    place: false,
  });

  // ⭐ AUTO LOG ALL SELECTED FILTERS
  useEffect(() => {
    console.log("===== SELECTED FILTERS =====");
    console.log("Type:", filters.type);
    console.log("Place:", filters.place);
    console.log("Rating:", filters.rating);
    console.log("Distance:", filters.distance);
    console.log("Rent:", filters.rentMin, "-", filters.rentMax);
    console.log("Facilities:", filters.facilities.length === 0 ? "None" : filters.facilities);
    console.log("================================");
  }, [filters]);

  const uniquePlaces = Array.from(new Set(pgData.map((pg) => pg.place))).sort();
  const ratingOptions = ['All', '4+', '4.5+'];
  const facilityOptions = ['AC Room', 'Food', 'Wi-Fi', 'Laundry', 'Fan/Cooler Room', 'Attached Washroom'];

  const handlePlaceSearch = (e) => setPlaceSearch(e.target.value);

  const selectPlace = (place) => {
    setFilters({ ...filters, place });
    setPlaceSearch('');
    setOpenDropdowns({ ...openDropdowns, place: false });
  };

  const filteredPlaces = placeSearch
    ? uniquePlaces.filter((p) => p.toLowerCase().includes(placeSearch.toLowerCase()))
    : uniquePlaces;

  const toggleFacility = (facility) => {
    const updated = filters.facilities.includes(facility)
      ? filters.facilities.filter((f) => f !== facility)
      : [...filters.facilities, facility];

    setFilters({ ...filters, facilities: updated });
  };

  const handleFindPG = () => {
    setSearchError('');

    if (!searchQuery.trim()) {
      setSearchError('Please enter a PG name');
      return;
    }

    const found = pgData.find(
      (pg) => pg.name.toLowerCase() === searchQuery.toLowerCase().trim()
    );

    if (found) navigate(`/pg/${found.id}`);
    else setSearchError('PG not found');
  };

  // Apply filters
  const filteredPGs = pgData.filter((pg) => {
    const matchesType = filters.type === 'All' || pg.type === filters.type;
    const matchesDistance = pg.distance <= filters.distance;
    const matchesPlace = filters.place === 'All' || pg.place === filters.place;
    const matchesRent = pg.rent >= filters.rentMin && pg.rent <= filters.rentMax;

    const matchesRating =
      filters.rating === 'All' ||
      (filters.rating === '4+' && pg.rating >= 4) ||
      (filters.rating === '4.5+' && pg.rating >= 4.5);

    const matchesFacilities =
      filters.facilities.length === 0 ||
      filters.facilities.every((facility) => {
        if (facility === 'AC Room') return pg.facilities.acRoom;
        if (facility === 'Food') return pg.facilities.food;
        if (facility === 'Wi-Fi') return pg.facilities.wifi;
        if (facility === 'Laundry') return pg.facilities.laundry;
        if (facility === 'Fan/Cooler Room') return pg.facilities.fanRoom;
        if (facility === 'Attached Washroom') return pg.facilities.attachedWashroom;
        return false;
      });

    return (
      matchesType &&
      matchesDistance &&
      matchesPlace &&
      matchesRent &&
      matchesRating &&
      matchesFacilities
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />

      {/* HERO */}
      <div
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260)',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect PG Near You</h2>
          <p className="text-xl mb-8">Safe, Comfortable & Affordable Accommodation</p>

          <div className="w-full max-w-2xl">
            <div className="relative flex gap-2">
              <input
                type="text"
                placeholder="Search your PG by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFindPG()}
                className="flex-1 px-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              />

              <button
                onClick={handleFindPG}
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition font-medium"
              >
                Find
              </button>
            </div>

            {searchError && (
              <p className="text-red-300 text-sm mt-2 text-center">{searchError}</p>
            )}
          </div>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>All</option>
                <option>Boys</option>
                <option>Girls</option>
              </select>
            </div>

            {/* Place */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Place</label>
              <button
                onClick={() =>
                  setOpenDropdowns({ ...openDropdowns, place: !openDropdowns.place })
                }
                className="w-full px-3 py-2 border rounded-lg bg-white flex justify-between items-center"
              >
                <span>{filters.place === 'All' ? 'Select Place' : filters.place}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {openDropdowns.place && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
                  <input
                    type="text"
                    placeholder="Search place..."
                    value={placeSearch}
                    onChange={handlePlaceSearch}
                    className="w-full px-3 py-2 border-b"
                  />

                  <div className="max-h-48 overflow-y-auto">
                    <button
                      onClick={() => selectPlace('All')}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${filters.place === 'All' ? 'bg-blue-50 text-blue-600 font-medium' : ''
                        }`}
                    >
                      All
                    </button>

                    {filteredPlaces.map((place) => (
                      <button
                        key={place}
                        onClick={() => selectPlace(place)}
                        className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${filters.place === place ? 'bg-blue-50 text-blue-600 font-medium' : ''
                          }`}
                      >
                        {place}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {ratingOptions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Facilities */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Facility</label>
              <button
                onClick={() =>
                  setOpenDropdowns({
                    ...openDropdowns,
                    facilities: !openDropdowns.facilities,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg bg-white flex justify-between items-center"
              >
                <span>
                  {filters.facilities.length === 0
                    ? 'Select Facilities'
                    : `${filters.facilities.length} selected`}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {openDropdowns.facilities && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-10">
                  {facilityOptions.map((f) => (
                    <label key={f} className="flex items-center p-2 hover:bg-gray-100 rounded">
                      <input
                        type="checkbox"
                        checked={filters.facilities.includes(f)}
                        onChange={() => toggleFacility(f)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm">{f}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Distance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance (km): {filters.distance}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.25"
                value={filters.distance}
                onChange={(e) =>
                  setFilters({ ...filters, distance: parseFloat(e.target.value) })
                }
                className="w-full"
              />
            </div>

            {/* Rent */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rent: ₹{filters.rentMin} - ₹{filters.rentMax}
              </label>
              <input
                type="range"
                min="0"
                max="20000"
                step="1000"
                value={filters.rentMax}
                onChange={(e) =>
                  setFilters({ ...filters, rentMax: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>
          </div>
        </div>


        {/* PG CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPGs.length > 0 ? (
            filteredPGs.map((pg) => (
              <div
                key={pg.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Image */}
                <img
                  src={pg.image}
                  alt={pg.name}
                  className="h-40 w-full object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{pg.name}</h3>
                  <p className="text-sm text-gray-500">{pg.type}</p>

                  {/* Place */}
                  <p className="mt-2 text-gray-700 font-medium">
                    📍 {pg.place}
                  </p>

                  {/* Rent */}
                  <p className="mt-1 font-semibold text-blue-700">
                    ₹{pg.rent.toLocaleString()}
                  </p>

                  {/* Facilities */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {pg.facilities.acRoom && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">AC</span>
                    )}
                    {pg.facilities.wifi && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Wi-Fi</span>
                    )}
                    {pg.facilities.food && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Food</span>
                    )}
                    {pg.facilities.laundry && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Laundry</span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mt-3">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-gray-700">{pg.rating}</span>
                  </div>

                  {/* Visit Button */}
                  <button
                    onClick={() => navigate(`/pg/${pg.id}`)}
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Visit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500 text-lg">
              No PGs found matching your criteria
            </div>
          )}
        </div>

      </div>

      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
