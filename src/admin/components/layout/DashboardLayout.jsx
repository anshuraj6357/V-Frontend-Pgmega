import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Wrench,
  Camera,
  BarChart3,
  Bell,
  UtensilsCrossed,
  UserCog,
  Settings,
  Menu,
  X
} from 'lucide-react';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
   // { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} />, path: '/overview' },
    { id: 'properties', label: 'Properties', icon: <Building2 size={20} />, path: '/admin/properties' },
    { id: 'tenants', label: 'Tenants', icon: <Users size={20} />, path: '/admin/tenants' },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={20} />, path: '/admin/payments' },
    //{ id: 'complaints', label: 'Complaints', icon: <Wrench size={20} />, path: '/complaints' },
     { id: 'hotel room ', label: 'hotel room', icon: <Camera size={20} />, path: '/admin/AddHotelRoom' },
    
    // { id: 'communication', label: 'Communication', icon: <Bell size={20} />, path: '/communication' },
    { id: 'Rooms', label: 'Rooms', icon: <UtensilsCrossed size={20} />, path: '/admin/ShowRooms' },
    { id: 'staff', label: 'Staff & Utilities', icon: <UserCog size={20} />, path: '/admin/staff' },
   // { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop sidebar toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
                <Building2 className="text-white" size={20} />
              </div>
              <span className="text-xl text-[#1e3a5f] font-semibold">PG Admin</span>
            </div>
          </div>

          {/* Right side header */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff6b35] rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#ff6b35] rounded-full flex items-center justify-center text-white">
                A
              </div>
              <span className="hidden sm:inline text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:block fixed top-16 left-0 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-30 ${
          isSidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive(item.path)
                  ? 'bg-[#1e3a5f] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Sidebar - Mobile */}
      {isMobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-16"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <aside className="lg:hidden fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50 overflow-y-auto">
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive(item.path)
                      ? 'bg-[#1e3a5f] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
        }`}
      >
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
