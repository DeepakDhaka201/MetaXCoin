import { useState } from "react";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
}

const DashboardHeader = ({ onToggleSidebar }: DashboardHeaderProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-metax-black h-22 flex items-center px-6"
      style={{ paddingLeft: "345px" }}
    >
      <div className="flex items-center justify-between w-full h-full px-20">
        {/* Dashboard Title */}
        <div className="flex items-center h-full">
          <h1 className="text-white text-3xl font-semibold leading-11">
            Dashboard
          </h1>
        </div>

        {/* Right Side - Notification & Profile */}
        <div className="flex items-center h-full">
          {/* Notification */}
          <div className="flex items-center h-full relative mr-5">
            <a
              href="https://metaxcoin.cloud/Notification"
              className="bg-metax-dark-section border border-gray-600 rounded-xl px-4 py-4 text-white text-lg transition-colors duration-150 relative"
            >
              <i className="text-2xl">🔔</i>
              {/* Notification Badge */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-300 border-4 border-metax-dark-section rounded-full"></div>
            </a>
          </div>

          {/* Profile Dropdown */}
          <div className="flex items-center h-full pl-5 relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center border-l border-gray-600 text-white text-lg transition-colors duration-150 ml-4 pl-8"
            >
              <img
                src="https://metaxcoin.cloud/public/newpanel/images/profile/pic1.jpg"
                alt="Profile"
                className="w-14 h-14 rounded-xl mr-5"
              />
              <div className="text-left">
                <div className="font-semibold">John99272</div>
                <small className="text-gray-400 text-sm">John</small>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute top-full right-0 mt-2 w-50 bg-metax-dark-section rounded-xl border border-gray-500 py-4 z-10">
                <a
                  href="https://metaxcoin.cloud/My-Profile"
                  className="flex items-center px-6 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Profile
                </a>
                <a
                  href="https://metaxcoin.cloud/Logout"
                  className="flex items-center px-6 py-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                    />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
