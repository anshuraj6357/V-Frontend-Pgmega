import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Phone, Navigation, Share2, Star, BadgeCheck, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import { useGetPgByIdQuery } from "../Bothfeatures/features/api/allpg.js";

export default function PGDetailsPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPgByIdQuery(id);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  const pg = data?.room;

  const allImages = useMemo(() => {
    if (!pg) return [];
    const branchImages = pg.branch?.Propertyphoto || [];
    const roomImages = pg.roomImages || [];
    return [...branchImages, ...roomImages];
  }, [pg]);

  // GET USER LOCATION
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => toast.warning("Enable location to get directions")
      );
    }
  }, []);

  // BOOKING
  const handleBook = () => {
    if (isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      toast.info("Please Login to book PG");
    }
  };

  // MAP DIRECTIONS
  const handleGetDirections = () => {
    const [lng, lat] = pg?.branch?.location?.coordinates || [];

    if (!lat || !lng) return toast.error("PG location missing");
    if (!userLocation.lat) return toast.error("User location not available");

    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}&travelmode=driving`;

    window.open(url, "_blank");
  };

  // SHARE PG
  const sharePG = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check this PG",
        text: "I found an amazing PG!",
        url: window.location.href,
      });
    } else {
      toast.info("Browser does not support sharing");
    }
  };

  // LOADING UI
  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-3" />
        <p className="text-gray-700 text-lg font-medium">Fetching PG details...</p>
      </div>
    );

  if (isError || !pg)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-red-500 text-lg font-semibold">Error loading PG!</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} showHome />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* IMAGE SLIDER */}
        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg mb-8">
          <img src={allImages[imageIndex]} alt="PG" className="w-full h-full object-cover" />

          {/* left btn */}
          <button
            onClick={() =>
              setImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            ‹
          </button>

          {/* right btn */}
          <button
            onClick={() => setImageIndex((prev) => (prev + 1) % allImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* BASIC INFO */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h1 className="text-3xl font-bold text-gray-900">{pg.branch.name}</h1>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="ml-1 font-semibold">{pg.rating}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <BadgeCheck className="w-5 h-5 mr-1" />
                  <span className="text-sm">Verified</span>
                </div>
              </div>

              <p className="text-gray-600 mt-4">{pg.branch.address}</p>
            </div>

            {/* FACILITIES */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">Facilities</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {pg.facilities?.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-100 p-2 rounded-md">
                    <span className="text-green-600 font-bold">✔</span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 rounded-xl shadow sticky top-24 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Rent Breakdown</h2>

            {pg.category === "Pg" ? (
              <Price label="Rent per Month" value={pg.price} />
            ) : (
              <>
                <Price label="Rent per Day" value={pg.rentperday} />
                <Price label="Rent per Hour" value={pg.rentperhour} />
                <Price label="Rent per Night" value={pg.rentperNight} />
              </>
            )}

            {/* BOOK BUTTON */}
            <button
              onClick={handleBook}
              disabled={!isAuthenticated}
              className={`w-full py-3 rounded-lg mt-4 text-lg font-medium transition 
    ${isAuthenticated
                  ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
  `}
            >
              {isAuthenticated ? "Book Now" : "Login to Book"}
            </button>


            {/* ACTION BUTTONS */}
            <div className="flex flex-col mt-4 space-y-3">
              <Action
                icon={<Phone />}
                label="WhatsApp Owner"
                disabled={!isAuthenticated}
                whatsappNumber={pg.branch.phone}
              />

              {/* {!isAuthenticated && (
                <p className="text-sm text-red-500 text-center">
                  Login to contact owner
                </p>
              )} */}

              <Action icon={<Navigation />}
                label="Get Directions"
                onClick={handleGetDirections}
                disabled={!isAuthenticated}
              />
              <Action icon={<Share2 />}
                label="Share PG"
                onClick={sharePG}
                disabled={!isAuthenticated}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

// PRICE
function Price({ label, value }) {
  return (
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">₹{value}</span>
    </div>
  );
}

// ACTION BUTTON
function Action({ icon, label, onClick, whatsappNumber, disabled }) {
  const handleClick = () => {
    if (disabled) return toast.error("Please login first");

    if (whatsappNumber) {
      const msg = encodeURIComponent("Hello, I'm interested in your PG");
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
      return;
    }

    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-3 p-3 border rounded-lg shadow-sm transition ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}
