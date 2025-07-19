import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DashboardIcon,
  NotificationIcon,
  InvestmentIcon,
  ChartIcon,
  AddIcon,
  WithdrawIcon,
  UsersIcon,
  LogoutIcon,
  ArrowRightIcon,
} from "../icons/DashboardIcons";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const DashboardSidebar = ({ isOpen, onClose }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleNavigation = (href: string) => {
    // Close sidebar when menu item is clicked
    if (onClose) {
      onClose();
    }

    if (href.startsWith("/")) {
      navigate(href);
    } else {
      window.location.href = href;
    }
  };

  // Function to check if a menu item is active
  const isMenuItemActive = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(href);
  };

  // Function to check if any submenu item is active (for expandable menus)
  const isSubmenuActive = (subItems: { href: string }[]) => {
    return subItems.some(subItem => location.pathname.startsWith(subItem.href));
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      dashboard: <DashboardIcon />,
      notification: <NotificationIcon />,
      investment: <InvestmentIcon />,
      myInvestment: <ChartIcon />,
      addFund: <AddIcon />,
      withdraw: <WithdrawIcon />,
      team: <UsersIcon />,
      logout: <LogoutIcon />,
      arrow: <ArrowRightIcon />,
    };
    return icons[iconName] || icons.dashboard;
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      name: "Notification",
      href: "/dashboard/notification",
      icon: "notification",
    },
    {
      name: "Investment Area",
      href: "/dashboard/investment",
      icon: "investment",
    },
    {
      name: "My Investment",
      href: "/dashboard/my-investment",
      icon: "myInvestment",
    },
    {
      name: "Add Fund",
      expandable: true,
      icon: "addFund",
      subItems: [
        { name: "Send Request", href: "/dashboard/add-fund" },
        { name: "Request History", href: "/dashboard/add-fund/history" },
      ],
    },
    {
      name: "Crypto Withdraw",
      expandable: true,
      icon: "withdraw",
      subItems: [
        { name: "Send Request", href: "/dashboard/crypto-withdraw" },
        { name: "Request History", href: "/dashboard/crypto-withdraw/history" },
      ],
    },
    {
      name: "My Team",
      expandable: true,
      icon: "team",
      subItems: [
        { name: "Direct Active", href: "/dashboard/my-team/active" },
        { name: "Direct In-Active", href: "/dashboard/my-team/inactive" },
        { name: "Direct Team", href: "/dashboard/my-team/direct" },
        { name: "All Team", href: "/dashboard/my-team/all" },
        { name: "Tree View", href: "/dashboard/my-team/tree" },
      ],
    },

    {
      name: "Logout",
      href: "/",
      icon: "logout",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 bg-metax-black/95 backdrop-blur-md z-[70] transition-transform duration-300 border-r border-metax-border-gold/20 shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          top: "88px",
          height: "calc(100vh - 88px)",
          width: "320px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar Content */}
        <nav className="h-full overflow-y-auto">
          <ul className="flex flex-col bg-metax-black py-4">
            {menuItems.map((item, index) => (
              <li key={index} className="flex flex-col relative">
                {item.expandable ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`flex items-center justify-between text-left w-full transition-all duration-300 py-4 px-6 mx-4 rounded-xl border ${
                        item.subItems && isSubmenuActive(item.subItems)
                          ? "bg-gradient-to-r from-metax-gold via-metax-gold-dark to-amber-900 text-metax-black font-bold shadow-xl border-metax-gold/50"
                          : "text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-metax-dark-section/40 hover:to-metax-dark-section/20 border-transparent hover:border-metax-gold/20 hover:shadow-lg"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="mr-4">{getIcon(item.icon)}</div>
                        <span className={item.subItems && isSubmenuActive(item.subItems) ? "font-semibold" : ""}>
                          {item.name}
                        </span>
                      </div>
                      <div
                        className={`transform transition-transform duration-200 ${expandedMenus[item.name] ? "rotate-90" : ""}`}
                      >
                        {getIcon("arrow")}
                      </div>
                    </button>
                    {expandedMenus[item.name] && (
                      <ul className="py-2 space-y-1">
                        {item.subItems?.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <button
                              onClick={() => handleNavigation(subItem.href)}
                              className={`block w-full text-left py-2 px-12 text-sm transition-colors duration-200 rounded-lg mx-4 ${
                                isMenuItemActive(subItem.href)
                                  ? "text-metax-gold font-semibold bg-metax-gold/10"
                                  : "text-gray-400 hover:text-white hover:bg-metax-dark-section/20"
                              }`}
                            >
                              {subItem.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`flex items-center transition-all duration-300 rounded-xl w-full text-left py-4 px-6 mx-4 border ${
                      item.name === "Logout"
                        ? "text-red-400 hover:text-white hover:bg-gradient-to-r hover:from-red-900/40 hover:to-red-800/20 border-transparent hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/20"
                        : isMenuItemActive(item.href)
                        ? "bg-gradient-to-r from-metax-gold via-metax-gold-dark to-amber-900 text-metax-black font-bold shadow-xl border-metax-gold/50"
                        : "text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-metax-dark-section/40 hover:to-metax-dark-section/20 border-transparent hover:border-metax-gold/20 hover:shadow-lg"
                    }`}
                  >
                    <div className="mr-4">{getIcon(item.icon)}</div>
                    <span className={
                      item.name === "Logout"
                        ? ""
                        : isMenuItemActive(item.href)
                        ? "font-semibold"
                        : ""
                    }>
                      {item.name}
                    </span>
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center border-t border-gray-800">
            <div className="text-gray-500 text-sm">
              Meta X Coin Dashboard
              <br />© 2025 All Rights Reserved
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default DashboardSidebar;
