import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationIcon, UserIcon } from "../icons/DashboardIcons";
import { BRAND } from "@/constants/brand";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const DashboardHeader = ({
  onToggleSidebar,
  isSidebarOpen,
}: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 bg-metax-black/95 backdrop-blur-md z-50 border-b border-metax-border-gold/20 shadow-lg"
      style={{ height: "88px" }}
    >
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* Left side - Logo and Menu Toggle */}
        <div className="flex items-center h-full">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden text-white p-2 hover:bg-metax-dark-section rounded-lg transition-colors mr-4"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-xl hover:shadow-2xl transition-all duration-300">
              <img
                src={BRAND.LOGO_URL}
                alt={BRAND.COIN_NAME}
                className="w-full h-full object-contain rounded-lg sm:rounded-xl"
              />
            </div>
            <h1 className="text-white text-lg sm:text-xl lg:text-2xl font-bold tracking-tight">
              {BRAND.COIN_NAME}
            </h1>
          </div>
        </div>



        {/* Right Side - Notification & Profile */}
        <ul className="flex items-center h-full space-x-4">
          {/* Profile Dropdown */}
          <li className="flex items-center h-full relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center text-white transition-all duration-300 hover:text-metax-gold"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-metax-gold via-metax-gold-dark to-amber-900 rounded-lg flex items-center justify-center mr-3 shadow-md border border-metax-gold/30">
                <UserIcon className="w-4 h-4 text-metax-black" />
              </div>
              <div className="text-left hidden sm:block">
                <span className="font-semibold text-white block text-sm">
                  {user?.username || 'User'}
                </span>
                <span className="text-metax-text-muted text-xs">
                  {user?.rank || 'Bronze'}
                </span>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div
                className="absolute bg-metax-dark-section rounded-xl border-none overflow-hidden py-4 z-10"
                style={{
                  borderBottomLeftRadius: "12px",
                  borderBottomRightRadius: "12px",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  display: "block",
                  minWidth: "200px",
                  position: "absolute",
                  right: "0px",
                  top: "100%",
                }}
              >
                <button
                  onClick={() => {
                    navigate("/dashboard/profile");
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center px-6 py-2 text-gray-300 hover:text-white transition-colors clear-both text-left whitespace-nowrap w-full"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-blue-600 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="inline ml-2">Profile</span>
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center px-6 py-2 text-red-400 hover:text-red-300 transition-colors clear-both text-left whitespace-nowrap w-full"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-red-500 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span className="inline ml-2">Logout</span>
                </button>
              </div>
            )}
          </li>

          {/* Notification */}
          <li className="flex items-center h-full relative">
            <button
              onClick={() => navigate("/dashboard/notification")}
              className="bg-metax-dark-section/60 border border-metax-border-gold/30 rounded-lg p-2 text-white hover:bg-metax-dark-section hover:border-metax-gold/50 transition-all duration-300 relative backdrop-blur-sm"
            >
              <NotificationIcon className="w-4 h-4" />
              {/* Notification Badge */}
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-metax-black"></div>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default DashboardHeader;
