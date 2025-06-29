import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardSidebarProps {
  isOpen: boolean;
}

const DashboardSidebar = ({ isOpen }: DashboardSidebarProps) => {
  const navigate = useNavigate();
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
    if (href.startsWith("/")) {
      navigate(href);
    } else {
      window.location.href = href;
    }
  };

  const getIcon = (iconName: string) => {
    const iconProps = "w-5 h-5";
    const icons: { [key: string]: JSX.Element } = {
      dashboard: (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      ),
      notification: (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
      ),
      investment: (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
      myInvestment: (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
        </svg>
      ),
      addFund: (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 14H5l-.5 2H19l.5-2zM17.21 9l.94-2H5.85l.94 2H17.21zM12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      withdraw: (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 2H7L6 3v11h5v4l7-3V3l-1-1zm-2 9H9V9h6v2zm0-3H9V6h6v2z" />
        </svg>
      ),
      team: (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63c-.34-.99-1.24-1.65-2.26-1.65-.8 0-1.54.37-2.01.99l-1.54 2.02c-.33.44-.77.74-1.23.82L9 10.98V13h4.5v8H16zM8.5 12.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S7 10.17 7 11s.67 1.5 1.5 1.5z" />
        </svg>
      ),
      income: (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
        </svg>
      ),
      ticket: (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2z" />
        </svg>
      ),
      logout: (
        <svg className={iconProps} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
        </svg>
      ),
      arrow: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      ),
    };
    return icons[iconName] || icons.dashboard;
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      active: true,
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
      name: "Income Area",
      expandable: true,
      icon: "income",
      subItems: [
        { name: "Self Coin Bonus", href: "/dashboard/income/self-coin" },
        { name: "Staking Bonus", href: "/dashboard/income/staking" },
        { name: "Direct Referral", href: "/dashboard/income/referral" },
        { name: "Level Bonus", href: "/dashboard/income/level" },
        { name: "Lifetime Reward", href: "/dashboard/income/lifetime" },
      ],
    },
    {
      name: "Ticket Area",
      expandable: true,
      icon: "ticket",
      subItems: [
        { name: "Generate Ticket", href: "/dashboard/tickets/generate" },
        { name: "Support", href: "/dashboard/tickets/support" },
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
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => {}}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 bg-metax-black z-40 transition-transform duration-300 border-r border-gray-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          top: "88px",
          height: "calc(100vh - 88px)",
          width: "320px",
        }}
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
                      className="flex items-center justify-between text-left w-full transition-colors duration-300 text-gray-400 hover:text-white hover:bg-metax-dark-section/30 py-3 px-6 mx-4 rounded-xl"
                    >
                      <div className="flex items-center">
                        <div className="mr-4">{getIcon(item.icon)}</div>
                        <span>{item.name}</span>
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
                              className="block w-full text-left py-2 px-12 text-sm text-gray-400 hover:text-white hover:bg-metax-dark-section/20 transition-colors duration-200 rounded-lg mx-4"
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
                    className={`flex items-center transition-colors duration-300 rounded-xl w-full text-left py-3 px-6 mx-4 ${
                      item.active
                        ? "bg-gradient-to-r from-amber-900 to-metax-gold-dark text-white font-semibold"
                        : "text-gray-400 hover:text-white hover:bg-metax-dark-section/30"
                    }`}
                  >
                    <div className="mr-4">{getIcon(item.icon)}</div>
                    <span className={item.active ? "font-semibold" : ""}>
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
