import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

import {
  useGetAllListedPgQuery,
} from "../Bothfeatures/features/api/allpg.js";




export default function LandingPage() {
  const navigate = useNavigate();
  const [pgData, setpgData] = useState([])
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  const { data, isLoading } = useGetAllListedPgQuery();




  useEffect(() => {
    if (data) {
      console.log(data?.foundBranch)
      setpgData(data?.foundBranch)
    };
  }, [data]);

  const handleFindPG = () => {
    setSearchError('');
    if (!searchQuery.trim()) {
      setSearchError('Please enter a PG name');
      return;
    }

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
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />

      {/* HERO */}
      <div
        className="relative bg-cover bg-center h-[550px]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260)',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect PG Near You
          </h2>
          <p className="text-xl mb-8">
            Safe, Comfortable & Affordable Accommodation
          </p>

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
      {
        isLoading ? <><div className="min-h-screen bg-gray-50">
          <Loader />
        </div></> : <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pgData?.length > 0 ? (
              pgData.map((pg) => (
                <div
                  key={pg.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={pg?.roomImages?.[0]}
                    alt={pg.name}
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{pg?.branch?.name}</h3>
                    <p className="text-sm text-gray-500">{pg?.gender}</p>

                    <p className="mt-2 text-gray-700 font-medium">📍 {pg?.branch?.address}</p>

                    <p className="mt-1 font-semibold text-blue-700">
                      ₹{pg?.price}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {
                        pg?.facilities?.length > 0 &&
                        pg.facilities.slice(0, 3).map((pgfacility, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {pgfacility}
                          </span>
                        ))
                      }
                    </div>



                    <div className="flex items-center mt-3">
                      {
                        pg?.rating > 0 ? <>null</> : <>⭐ <span className="text-gray-700 ml-1">{pg?.rating}</span></>

                      }

                    </div>

                    <button
                      onClick={() => navigate(`/pg/${pg?._id}`)}
                      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Visit
                    </button>
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
      }

      {/* PG CARDS (NO FILTERS NOW) */}


      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
