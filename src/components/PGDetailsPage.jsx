import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Phone,
  Navigation,
  Share2,
  Star,
  BadgeCheck,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";

import { useGetPgByIdQuery } from "../components/features/api/allpg.js";

export default function PGDetailsPage() {
  const { id } = useParams();

  // ✅ All hooks must be placed at the top level
  const { data, isLoading, isError } = useGetPgByIdQuery(id);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (data) console.log("Fetched Data:", data);
  }, [data]);

  // ❌ Don't return early BEFORE all hooks
  // So we use conditional variables instead

  const pg = data?.room;

  const allImages = useMemo(() => {
    if (!pg) return [];
    const branchImages = pg.branch?.Propertyphoto || [];
    const roomImages = pg.roomImages || [];
    return [...branchImages, ...roomImages];
  }, [pg]);

  // Now we safely return UI conditions below

  if (isLoading) {
    return <p className="text-center p-6">Loading PG Details...</p>;
  }

  if (isError || !pg) {
    return <p className="text-center p-6">Error fetching PG details!</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} showHome />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* IMAGE CAROUSEL */}
        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg mb-8">
          <img
            src={allImages[imageIndex]}
            alt="Property"
            className="w-full h-full object-cover"
          />

          <button
            onClick={() =>
              setImageIndex((prev) =>
                prev === 0 ? allImages.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
          >
            ‹
          </button>

          <button
            onClick={() =>
              setImageIndex((prev) => (prev + 1) % allImages.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* BASIC INFO */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h1 className="text-3xl font-bold text-gray-900">
                {pg.branch.name}
              </h1>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="ml-1 font-semibold">{pg.rating || 0}</span>
                </div>

                <div className="flex items-center text-green-600">
                  <BadgeCheck className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              </div>

              <p className="text-gray-600 mt-4">{pg.branch.address}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <Info label="City" value={pg.city} />
                <Info label="State" value={pg.branch.state} />
                <Info label="Category" value={pg.category} />
                <Info label="Gender" value={pg.gender} />
                <Info label="Room Number" value={pg.roomNumber} />
              </div>
            </div>

            {/* FACILITIES */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">Facilities</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(pg.facilities || []).map((item, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <span className="text-green-600">✔</span>
                    <span>{item}</span>
                  </div>
                ))}

                {pg.facilities?.length === 0 && (
                  <p className="text-gray-500">No facilities available</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white p-6 rounded-xl shadow sticky top-24 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Rent Breakdown
            </h2>

            {pg.category === "Pg" ? (
              <Price label="Rent per Month" value={pg.price} />
            ) : (
              <>
                <Price label="Rent per Day" value={pg.rentperday} />
                <Price label="Rent per Hour" value={pg.rentperhour} />
                <Price label="Rent per Night" value={pg.rentperNight} />
              </>
            )}

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 text-lg font-medium"
            >
              Book Now
            </button>

            <div className="flex flex-col mt-6 space-y-3">
              <Action icon={<Phone />} label="Call Owner" />
              <Action icon={<Navigation />} label="Get Directions" />
              <Action icon={<Share2 />} label="Share PG" />
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-medium text-gray-900">{value || "N/A"}</p>
    </div>
  );
}

function Price({ label, value }) {
  return (
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600">{label}:</span>
      <span className="font-semibold">₹{value}</span>
    </div>
  );
}

function Action({ icon, label }) {
  return (
    <button className="flex items-center gap-3 p-3 border rounded-lg">
      {icon}
      <span>{label}</span>
    </button>
  );
}
