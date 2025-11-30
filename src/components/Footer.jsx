
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
} from "lucide-react";


import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate=useNavigate()
  return (
    <footer className="bg-gradient-to-b from-[#2c1a12] to-[#c62828] text-white pt-16 pb-10 px-4 sm:px-10 md:px-20">

      {/* ======== GRID SECTION ======== */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* ABOUT */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">About</h2>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg opacity-90">
            <li>About Us</li>
            <li onClick={()=>navigate("/shippingpolicy")}>Shipping Policy</li>
            <li onClick={()=>navigate("/termsandcondition")}>Terms & Conditions</li>
            <li onClick={()=>navigate("/privacypolicy")}>Privacy Policy</li>
            <li onClick={()=>navigate("/contactus")}>Contact Us</li>
            <li onClick={()=>navigate("/CancellationPolicy")}>Cancellation & RefundPolicy</li>
          </ul>
        </div>

        {/* BUY PROPERTIES */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Buy Properties</h2>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg opacity-90">
            <li>Showrooms In Mumbai</li>
            <li>PG In Delhi</li>
            <li>Offices In Mumbai</li>
            <li>Offices In Delhi</li>
          </ul>
        </div>

        {/* RENT PROPERTIES */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Rent Properties</h2>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg opacity-90">
            <li>Plots In Delhi</li>
            <li>Flats In Mumbai</li>
            <li>Showrooms In Delhi</li>
            <li>Villa In Delhi</li>
          </ul>
        </div>

        {/* APP DOWNLOAD */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Get Our App</h2>

          <div className="flex flex-col gap-3 sm:gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              className="h-12 sm:h-14 cursor-pointer"
              alt="Google Play"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              className="h-12 sm:h-14 cursor-pointer"
              alt="App Store"
            />
          </div>
        </div>
      </div>

      {/* ======== SOCIAL ICONS ======== */}
      <div className="mt-10 sm:mt-14 text-center">
        <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-5">Connect with us</h2>

        <div className="flex justify-center gap-5 sm:gap-6 text-white">
          <a href="https://www.facebook.com/share/17Pg2nzg3s/" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-6 h-6 text-blue-600" />
          </a>
          <a href="https://www.instagram.com/roomgi_officials?igsh=amhsMW4wZjU1bTdl" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:opacity-80" /></a>
          <a href="https://youtube.com/@goroomgi?si=i8VSKi-E-Xoxk9zA" target="_blank" rel="noopener noreferrer">
            <Youtube className="h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:opacity-80" /></a>
          <a href="https://www.linkedin.com/company/roomgi/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:opacity-80" /></a>
          <a href="https://x.com/teamroomgi" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:opacity-80" /></a>
        </div>
      </div>
    </footer>
  );
}
