import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Phone, Loader2, Navigation, Share2, Star, BadgeCheck, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import { useGetPgByIdQuery } from "../Bothfeatures/features/api/allpg.js";
import { useRazorpayPaymentVerifyMutation, useRazorpayPaymentMutation } from "../Bothfeatures/features2/api/paymentapi";


const api=process.env.REACT_APP_API_URL;

// ------------------ RAZORPAY PAYMENT FUNCTION ------------------
async function startPayment(amount, razorpayPayment, razorpayPaymentVerify) {
  try {
    // 1️⃣ Create Order via RTK Query
    const { data: orderData, error } = await razorpayPayment({ amount: amount * 100 });

    if (error || !orderData?.order) {
      toast.error("Failed to create order");
      return;
    }

    const order = orderData.order;
    console.log("Order:", order);

    // 2️⃣ Razorpay Payment Options
    const options = {
      key: "",
      amount: order.amount,
      currency: order.currency,
      name: "Roomgi.com",
      description: "PG/hotel/rental room Booking Payment",
      order_id: order.id,

      handler: async function (response) {
        // 3️⃣ Verify Payment
        const { data: verifyData, error: verifyError } = await razorpayPaymentVerify(response);

        if (verifyError || !verifyData?.success) {
          if (verifyError) {
            console.log("verifyError", verifyError)
          }
           if (!verifyData?.success) {
            console.log("!verifyData?.success", !verifyData?.success)
          }


          toast.error("Payment Verification Failed ❌");
        } else {
          toast.success("Payment Successful ✔");
        }
      },

      prefill: {
        name: "Guest User",
        email: "guest@example.com",
      },

      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.log(err);
    toast.error("Payment Error!");
  }
}


export default function PGDetailsPage() {
  const navigate = useNavigate();

  const [razorpayPayment, { isLoading: razorpaypaymentloading }] = useRazorpayPaymentMutation();
  const [razorpayPaymentVerify] = useRazorpayPaymentVerifyMutation();
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

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => toast.warning("Enable location to get directions")
      );
    }
  }, []);

  const handleBook = (amount) => {
    // if (!isAuthenticated) return setIsAuthModalOpen(true);
    startPayment(amount, razorpayPayment, razorpayPaymentVerify)
  };

  const handleGetDirections = () => {
    if (!isAuthenticated) return setIsAuthModalOpen(true);
    const [lng, lat] = pg?.branch?.location?.coordinates || [];
    if (!lat || !lng) return toast.error("PG location missing");
    if (!userLocation.lat) return toast.error("User location not available");

    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}&travelmode=driving`,
      "_blank"
    );
  };

  const sharePG = () => {
    if (!isAuthenticated) return setIsAuthModalOpen(true);
    if (navigator.share) {
      navigator.share({
        title: `Check out ${pg.branch.name}`,
        text: "I found an amazing PG!",
        url: window.location.href,
      });
    } else {
      toast.info("Browser does not support sharing");
    }
  };

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


      {/* IMAGE SLIDER */}
      <div className="max-w-6xl mx-auto mt-8 relative h-96 rounded-xl overflow-hidden shadow-lg">
        <img src={allImages[imageIndex]} alt="PG" className="w-full h-full object-cover transition-transform duration-500" />
        <button
          onClick={() => setImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100"
        >
          ‹
        </button>
        <button
          onClick={() => setImageIndex((prev) => (prev + 1) % allImages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100"
        >
          ›
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE — INFORMATION */}
        <div className="lg:col-span-2 space-y-8">

          {/* BASIC INFORMATION */}
          <InfoBlock title="Basic Information">
            <div className="space-y-4">

              <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                {pg.branch.name}
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4" /> Verified
                </span>
              </h2>

              <div className="flex items-center gap-4 mt-2">
                <Star className="w-6 h-6 text-yellow-500" />
                <span className="font-semibold text-gray-800 text-lg">{pg.branch.Rating || 0}</span>
              </div>

              <div className="border-t pt-4 space-y-2 text-gray-700">
                <p className="text-base"><strong>Address:</strong> {pg.branch.address}</p>
                <p className="text-base"><strong>City:</strong> {pg.city}</p>
                <p className="text-base"><strong>Room Type:</strong> {pg.type}</p>
                <p className="text-base"><strong>Furnished:</strong> {pg.furnishedType}</p>

                <p className="text-base font-semibold">
                  <strong>Availability: </strong>
                  <span className={`${pg.availabilityStatus === "Available" ? "text-green-600" : "text-red-600"}`}>
                    {pg.availabilityStatus}
                  </span>
                </p>
              </div>

            </div>
          </InfoBlock>

          {/* DESCRIPTION */}
          {pg.description && (
            <InfoBlock title="Description">
              <p className="text-gray-700 leading-relaxed text-[15px]">{pg.description}</p>
            </InfoBlock>
          )}\

          {pg.allowedFor && (
            <InfoBlock title="Allowed For">
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-blue-600 font-bold text-xl">✔</span>
                <span className="text-gray-800 font-semibold text-lg">
                  {pg.allowedFor}
                </span>
              </div>
            </InfoBlock>
          )}


          {/* RULES */}
          {pg.rules?.length > 0 && (
            <InfoBlock title="Rules">
              <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-700">
                {pg.rules.map((rule, i) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul>
            </InfoBlock>
          )}

          {/* NOT ALLOWED */}
          {pg.notAllowed?.length > 0 && (
            <InfoBlock title="Not Allowed">
              <ul className="list-disc list-inside space-y-2 text-[15px] text-gray-700">
                {pg.notAllowed.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </InfoBlock>
          )}

          {/* FACILITIES */}
          {pg.facilities?.length > 0 && (
            <InfoBlock title="Facilities">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {pg.facilities.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-100 shadow-sm border border-gray-200 p-3 rounded-lg">
                    <span className="text-green-600 text-xl font-bold">✔</span>
                    <span className="font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </InfoBlock>
          )}

        </div>

        {/* RIGHT SIDE — RENT & ACTIONS */}
        <div className="space-y-8">
          {
            pg.category === "Pg" ? (
              <>
                {/* PG RENT CARD */}
                <InfoBlock title="Rent Details">
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">Rent per Month</p>
                    <h3 className="text-4xl font-bold text-gray-900 mt-1">₹{pg.price}</h3>
                  </div>
                  <div className="w-full">
                    {razorpaypaymentloading ? (
                      <button
                        disabled
                        className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg cursor-not-allowed
                 hover:bg-blue-600 transition transform"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Payment...</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBook(pg.price)}
                        className="flex flex-col items-center justify-center gap-2 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg 
                 hover:bg-blue-700 transition transform hover:-translate-y-1 hover:scale-105"
                      >
                        <span className="text-lg">Monthly Booking</span>
                        <span className="text-sm">₹{pg.price} / month</span>
                      </button>
                    )}
                  </div>



                </InfoBlock>

              </>
            ) : (
              <>
                {/* NOT PG → SHOW PER DAY / PER NIGHT / PER HOUR */}
                <InfoBlock title="Choose Booking Type">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <button
                      onClick={() => handleBook(pg.price)}
                      className="flex flex-col items-center justify-center gap-2 w-full bg-green-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition transform hover:-translate-y-1 hover:scale-105"
                    >
                      <span className="text-lg">Per Day</span>
                      <span className="text-sm">₹{pg.price} / day</span>
                    </button>


                    <button
                      onClick={() => handleBook("monthly")}
                      className="flex flex-col items-center justify-center gap-2 w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1 hover:scale-105"
                    >
                      <span className="text-lg">Per Night</span>
                      <span className="text-sm">₹{pg.rentperNight} / night</span>
                    </button>

                    <button
                      onClick={() => handleBook("monthly")}
                      className="flex flex-col items-center justify-center gap-2 w-full bg-orange-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-orange-700 transition transform hover:-translate-y-1 hover:scale-105"
                    >
                      <span className="text-lg">Per Hour</span>
                      <span className="text-sm">₹{Math.ceil(pg.rentperhour)} / hour</span>
                    </button>

                  </div>
                </InfoBlock>

              </>
            )
          }


          {/* RENT CARD */}


          {/* ACTION BUTTONS */}
          <InfoBlock title="Actions">


            <div className="flex flex-col mt-5 space-y-4">

              <Action
                icon={<Phone />}
                label="Contact Owner"
                whatsappNumber="+919693915693"
                isAuthenticated={isAuthenticated}
                onAuthOpen={() => setIsAuthModalOpen(true)}
              />

              <Action
                icon={<Navigation />}
                label="Get Directions"
                onClick={handleGetDirections}
                isAuthenticated={isAuthenticated}
                onAuthOpen={() => setIsAuthModalOpen(true)}
              />

              <Action
                icon={<Share2 />}
                label="Share PG"
                onClick={sharePG}
                isAuthenticated={isAuthenticated}
                onAuthOpen={() => setIsAuthModalOpen(true)}
              />

            </div>
          </InfoBlock>

        </div>
      </div>

      {isAuthModalOpen && <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />}

    </div>
  );
}

// REUSABLE INFO BLOCK COMPONENT
function InfoBlock({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      {children}
    </div>
  );
}

// PRICE COMPONENT
function Price({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">₹{value}</span>
    </div>
  );
}

// ACTION BUTTON COMPONENT
function Action({ icon, label, onClick, whatsappNumber, isAuthenticated, onAuthOpen }) {
  const handleClick = () => {
    if (!isAuthenticated) return onAuthOpen();
    if (whatsappNumber) {
      const msg = encodeURIComponent("Hello, I'm interested in your PG");
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
      return;
    }
    if (onClick) onClick();
  };

  return (
    <button onClick={handleClick} className="flex items-center gap-3 p-3 border rounded-xl shadow-sm transition hover:bg-gray-100">
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}
