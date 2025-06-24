import { useState } from "react";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
}

const DashboardHeader = ({ onToggleSidebar }: DashboardHeaderProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header
      className="fixed top-0 bg-metax-black z-50 transition-all duration-200"
      style={{
        height: "88px",
        paddingLeft: "345px",
        width: "100%",
      }}
    >
      <div className="flex items-center justify-between h-full px-20">
        {/* Dashboard Title */}
        <div className="flex items-center h-full">
          <h1 className="text-white text-3xl font-semibold">Dashboard</h1>
        </div>

        {/* Right Side - Notification & Profile */}
        <ul className="flex items-center h-full">
          {/* Notification */}
          <li className="flex items-center h-full relative">
            <a
              href="https://metaxcoin.cloud/Notification"
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
            </a>
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
                className="rounded-xl mr-5"
                style={{
                  height: "55px",
                  width: "55px",
                  borderRadius: "12px",
                }}
              />
              <div className="text-left pl-5">
                <span className="font-semibold text-white block">
                  John99272
                </span>
                <small className="text-gray-400 text-sm block">John</small>
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
                <a
                  href="https://metaxcoin.cloud/My-Profile"
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
                </a>
                <a
                  href="https://metaxcoin.cloud/Logout"
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
                </a>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default DashboardHeader;
