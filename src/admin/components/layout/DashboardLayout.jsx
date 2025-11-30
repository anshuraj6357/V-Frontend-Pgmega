import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Bell, Menu, X, Building2 } from "lucide-react";
import { menuIcons } from "../../../constants/menuIcon.jsx";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "properties", label: "Properties", path: "/admin/properties" },
    { id: "tenants", label: "Tenants", path: "/admin/tenants" },
    { id: "payments", label: "Payments", path: "/admin/payments" },
    { id: "hotelRoom", label: "Hotel Room", path: "/admin/AddHotelRoom" },
    { id: "rooms", label: "Rooms", path: "/admin/ShowRooms" },
    { id: "staff", label: "Staff & Utilities", path: "/admin/staff" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-md border-b shadow-sm z-40 flex items-center justify-between px-4">

        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-200 rounded-lg transition"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block p-2 hover:bg-gray-200 rounded-lg transition"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center shadow-md">
              <Building2 className="text-white" size={18} />
            </div>
            <h1 className="font-semibold text-xl text-blue-900">PG Admin</h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-200 rounded-lg">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="hidden sm:inline text-sm font-medium text-gray-700">
              Admin
            </span>
          </div>
        </div>
      </header>

      {/* Sidebar Desktop */}
      <aside
        className={`hidden lg:block fixed top-16 left-0 bottom-0 bg-white border-r shadow-sm backdrop-blur-md transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive(item.path)
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {menuIcons[item.id]}
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
