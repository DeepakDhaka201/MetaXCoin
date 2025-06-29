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
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      window.location.href = href;
    }
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      dashboard: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
      ),
      notification: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
        </svg>
      ),
      investment: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      myInvestment: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      ),
      addFund: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 15h2v-3h3v-2h-3V7h-2v3H8v2h3v3zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
      ),
      withdraw: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 9h2v3h3v2h-3v3h-2v-3H8v-2h3V9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
      ),
      team: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.996 2.996 0 0 0 16.76 6c-.8 0-1.54.37-2.01.99l-1.54 2.02c-.33.44-.77.74-1.23.82L9 10.98V13h4.5v8H16zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5z"/>
        </svg>
      ),
      income: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      ticket: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 12c0-1.1.9-2 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2z"/>
        </svg>
      ),
      logout: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
        </svg>
      ),
      arrow: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
      )
    };
    return icons[iconName] || icons.dashboard;
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      active: true,
      icon: "dashboard"
    },
    {
      name: "Notification",
      href: "/dashboard/notification",
      icon: "notification"
    },
    {
      name: "Investment Area",
      href: "/dashboard/investment",
      icon: "investment"
    },
    {
      name: "My Investment",
      href: "/dashboard/my-investment",
      icon: "myInvestment"
    },
    {
      name: "Add Fund",
      expandable: true,
      icon: "addFund",
      subItems: [
        { name: "Send Request", href: "/dashboard/deposit" },
        { name: "Request History", href: "/dashboard/deposit-history" },
      ],
    },
    {
      name: "Crypto Withdraw",
      expandable: true,
      icon: "withdraw",
      subItems: [
        { name: "Send Request", href: "/dashboard/withdraw" },
        { name: "Request History", href: "/dashboard/withdraw-history" },
      ],
    },
    {
      name: "My Team",
      expandable: true,
      icon: "team",
      subItems: [
        { name: "Direct Active", href: "/dashboard/team/active" },
        { name: "Direct In-Active", href: "/dashboard/team/inactive" },
        { name: "Direct Team", href: "/dashboard/team/direct" },
        { name: "All Team", href: "/dashboard/team/all" },
        { name: "Tree View", href: "/dashboard/team/tree" },
      ],
    },
    {
      name: "Income Area",
      expandable: true,
      icon: "income",
      subItems: [
        { name: "Self Coin Bonus", href: "/dashboard/income/self-coin" },
        { name: "Staking Bonus", href: "/dashboard/income/staking" },
        { name: "Direct Refferal", href: "/dashboard/income/referral" },
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
      icon: "logout"
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setExpanded && setExpanded(false)}
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
          width: "320px"
        }}
      >
      {/* Sidebar Content */}
      <nav className="h-full overflow-y-auto">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-lg">MetaX</span>
              <span className="text-metax-text-muted text-sm">Dashboard</span>
            </div>
          </div>
        </div>

        <ul className="flex flex-col bg-metax-black py-4">
          {menuItems.map((item, index) => (
            <li key={index} className="flex flex-col relative" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
              {item.expandable ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="flex items-center justify-between text-left w-full transition-colors duration-300 rounded-xl text-gray-400 hover:text-white hover:bg-metax-dark-section/30 py-3 px-6 mx-4"
                  >
                    <div className="flex items-center">
                      <div className="mr-4">
                        {getIcon(item.icon)}
                      </div>
                      <span>{item.name}</span>
                    </div>
                    <div className={`transform transition-transform duration-200 ${expandedMenus[item.name] ? 'rotate-90' : ''}`}>
                      {getIcon('arrow')}
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
                  <div className="mr-4">
                    {getIcon(item.icon)}
                  </div>
                  <span className={item.active ? "font-semibold" : ""}>
                    {item.name}
                  </span>
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <div className="text-gray-500 text-sm">
            Meta X Coin Dashboard
            <br />© 2025 All Rights Reserved
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardSidebar;