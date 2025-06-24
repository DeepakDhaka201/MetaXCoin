import { useState } from "react";

interface DashboardSidebarProps {
  isOpen: boolean;
}

const DashboardSidebar = ({ isOpen }: DashboardSidebarProps) => {
  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "https://metaxcoin.cloud/User-Dashboard",
      active: true,
    },
    {
      name: "Notification",
      href: "https://metaxcoin.cloud/Notification",
    },
    {
      name: "Investment Area",
      href: "https://metaxcoin.cloud/Top-Up-User",
    },
    {
      name: "My Investment",
      href: "https://metaxcoin.cloud/my-contract",
    },
    {
      name: "Add Fund",
      expandable: true,
      subItems: [
        { name: "Send Request", href: "https://metaxcoin.cloud/Deposite" },
        {
          name: "Request History",
          href: "https://metaxcoin.cloud/Deposite-History",
        },
      ],
    },
    {
      name: "Crypto Withdraw",
      expandable: true,
      subItems: [
        {
          name: "Send Request",
          href: "https://metaxcoin.cloud/View-Withdraw-Request-crpto",
        },
        {
          name: "Request History",
          href: "https://metaxcoin.cloud/View-Withdraw-History-crpto",
        },
      ],
    },
    {
      name: "My Team",
      expandable: true,
      subItems: [
        {
          name: "Direct Active",
          href: "https://metaxcoin.cloud/View-Direct-Active",
        },
        {
          name: "Direct In-Active",
          href: "https://metaxcoin.cloud/View-Direct-InActive",
        },
        {
          name: "Direct Team",
          href: "https://metaxcoin.cloud/View-Direct-Team",
        },
        { name: "All Team", href: "https://metaxcoin.cloud/Position-Downline" },
        { name: "Tree View", href: "https://metaxcoin.cloud/folder" },
      ],
    },
    {
      name: "Income Area",
      expandable: true,
      subItems: [
        {
          name: "Self Coin Bonus",
          href: "https://metaxcoin.cloud/Self-Coin-History",
        },
        { name: "Staking Bonus", href: "https://metaxcoin.cloud/ROI-History" },
        {
          name: "Direct Refferal",
          href: "https://metaxcoin.cloud/Direct-Income",
        },
        {
          name: "Level Bonus",
          href: "https://metaxcoin.cloud/Leadership-Income",
        },
        {
          name: "Lifetime Reward",
          href: "https://metaxcoin.cloud/Reward-Income",
        },
      ],
    },
    {
      name: "Ticket Area",
      expandable: true,
      subItems: [
        {
          name: "Generate Ticket",
          href: "https://metaxcoin.cloud/Generate-Ticket",
        },
        { name: "Support", href: "https://metaxcoin.cloud/Support" },
      ],
    },
    {
      name: "Logout",
      href: "https://metaxcoin.cloud/Logout",
    },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full w-80 bg-metax-black z-40 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Sidebar Content */}
      <nav className="h-full overflow-y-auto pt-4">
        <ul className="flex flex-col pt-4">
          {menuItems.map((item, index) => (
            <li key={index} className="flex flex-col px-8 py-0 relative">
              {item.expandable ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="flex items-center text-left w-full text-gray-400 hover:text-white transition-colors duration-500 py-5 px-6 rounded-xl"
                  >
                    <i className="inline-block text-2xl font-light mr-4 relative top-0">
                      📊
                    </i>
                    <span className="inline">{item.name}</span>
                  </button>
                  {expandedMenus[item.name] && (
                    <ul className="py-2">
                      {item.subItems?.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a
                            href={subItem.href}
                            className="block text-gray-400 hover:text-white transition-colors duration-500 py-2 px-18 text-sm"
                          >
                            {subItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className={`flex items-center py-5 px-6 rounded-xl transition-colors duration-500 relative ${
                    item.active
                      ? "bg-gradient-to-r from-amber-900 to-metax-gold-dark text-white font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <i className="inline-block text-2xl font-light mr-4 relative top-0">
                    {item.active ? "🏠" : "📱"}
                  </i>
                  <span className="inline font-semibold">{item.name}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
        <div className="text-gray-500 text-sm">
          Meta X Coin Dashboard
          <br />© 2025 All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
