import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const DashboardHeader = ({
  onToggleSidebar,
  isSidebarOpen,
}: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    // Clear any authentication data here
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 bg-metax-black z-50 border-b border-gray-800"
      style={{ height: "88px" }}
    >
      <div className="flex items-center justify-between h-full px-6">
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
            <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3 shadow-lg">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h1 className="text-white text-xl lg:text-2xl font-semibold">
              Dashboard
            </h1>
          </div>
        </div>

        {/* Current Rate Section */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-metax-dark-section/30 rounded-lg px-4 py-2 border border-metax-border-gold/20">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">MXC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-metax-gold text-sm font-medium">
                0.0006 $
              </span>
              <span className="text-metax-text-muted text-xs">
                1 USDT = 1563.98 MTX
              </span>
            </div>
          </div>
        </div>

        {/* Crypto Ticker */}
        <div className="hidden xl:flex items-center space-x-4 text-xs lg:text-sm">
          <div className="flex items-center space-x-1 lg:space-x-2">
            <span className="text-blue-400">📈 EUR to USD</span>
            <span className="text-white font-medium">1.17182</span>
            <span className="text-green-400 text-xs">+0.00201 (+0.17%)</span>
          </div>
          <div className="flex items-center space-x-1 lg:space-x-2">
            <span className="text-orange-400">₿ Bitcoin</span>
            <span className="text-white font-medium">107,400</span>
            <span className="text-green-400 text-xs">+61.00 (+0.06%)</span>
          </div>
          <div className="flex items-center space-x-1 lg:space-x-2">
            <span className="text-purple-400">Ξ Ethereum</span>
            <span className="text-white font-medium">2,439.7</span>
            <span className="text-red-400 text-xs">-32.6 (-0.13%)</span>
          </div>
        </div>

        {/* Right Side - Notification & Profile */}
        <ul className="flex items-center h-full">
          {/* Notification */}
          <li className="flex items-center h-full relative">
            <button
              onClick={() => navigate("/dashboard/notification")}
              className="bg-metax-dark-section border border-gray-600 border-solid rounded-xl px-4 py-4 text-white text-lg transition-all duration-150 relative"
              style={{
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
            >
              <i className="text-2xl inline">🔔</i>
              {/* Notification Badge */}
              <div
                className="absolute rounded-full"
                style={{
                  backgroundColor: "rgb(216, 185, 195)",
                  borderBottom: "4px solid rgb(20, 17, 46)",
                  borderLeft: "4px solid rgb(20, 17, 46)",
                  borderRight: "4px solid rgb(20, 17, 46)",
                  borderTop: "4px solid rgb(20, 17, 46)",
                  borderRadius: "56px",
                  height: "24px",
                  right: "-4px",
                  top: "-4px",
                  width: "24px",
                }}
              ></div>
            </button>
          </li>

          {/* Profile Dropdown */}
          <li className="flex items-center h-full pl-5 relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center text-white text-lg transition-all duration-150 ml-4 pl-8"
              style={{
                borderLeft: "1px solid rgb(42, 40, 51)",
              }}
            >
              <img
                src="https://metaxcoin.cloud/public/newpanel/images/profile/pic1.jpg"
                alt="Profile"
                className="rounded-xl mr-3 lg:mr-5 w-10 h-10 lg:w-14 lg:h-14"
              />
              <div className="text-left hidden sm:block lg:pl-2">
                <span className="font-semibold text-white block text-sm lg:text-base">
                  John99272
                </span>
                <small className="text-gray-400 text-xs lg:text-sm block">
                  John
                </small>
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
        </ul>
      </div>
    </header>
  );
};

export default DashboardHeader;
