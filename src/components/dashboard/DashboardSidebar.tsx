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
      icon: "📊",
    },
    {
      name: "Notification",
      href: "https://metaxcoin.cloud/Notification",
      icon: "🔔",
    },
    {
      name: "Investment Area",
      href: "https://metaxcoin.cloud/Top-Up-User",
      icon: "💼",
    },
    {
      name: "My Investment",
      href: "https://metaxcoin.cloud/my-contract",
      icon: "📈",
    },
    {
      name: "Add Fund",
      expandable: true,
      icon: "💰",
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
      icon: "💳",
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
      icon: "👥",
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
      icon: "💎",
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
      icon: "🎫",
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
      icon: "🚪",
    },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-metax-black z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      style={{ width: "320px" }}
    >
      {/* Sidebar Content */}
      <nav className="h-full overflow-y-auto">
        <ul
          className="flex flex-col bg-metax-black"
          style={{ paddingTop: "15px" }}
        >
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex flex-col relative"
              style={{ paddingLeft: "30px", paddingRight: "30px" }}
            >
              {item.expandable ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="flex items-center text-left w-full transition-colors duration-500 rounded-xl"
                    style={{
                      borderBottomLeftRadius: "12px",
                      borderBottomRightRadius: "12px",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                      color: "rgb(179, 179, 179)",
                      paddingBottom: "20px",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      paddingTop: "20px",
                      position: "relative",
                      transitionDuration: "0.5s",
                    }}
                  >
                    <i
                      className="inline-block text-2xl font-light relative align-middle"
                      style={{ paddingRight: "16px", top: "0px" }}
                    >
                      {item.icon}
                    </i>
                    <span className="inline">{item.name}</span>
                  </button>
                  {expandedMenus[item.name] && (
                    <ul
                      className="relative transition-all duration-200 ease-in-out"
                      style={{
                        display: "block",
                        paddingBottom: "8px",
                        paddingTop: "8px",
                        zIndex: "1",
                      }}
                    >
                      {item.subItems?.map((subItem, subIndex) => (
                        <li key={subIndex} className="list-item relative">
                          <a
                            href={subItem.href}
                            className="block transition-colors duration-500 relative"
                            style={{
                              color: "rgb(179, 179, 179)",
                              fontSize: "15px",
                              lineHeight: "22.5px",
                              paddingBottom: "8px",
                              paddingLeft: "72px",
                              paddingRight: "30px",
                              paddingTop: "8px",
                              position: "relative",
                              transitionDuration: "0.5s",
                            }}
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
                  className={`flex items-center transition-colors duration-500 relative rounded-xl ${
                    item.active
                      ? "text-white font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                  style={{
                    ...(item.active
                      ? {
                          backgroundImage:
                            "linear-gradient(135deg, rgb(23, 19, 10) 5%, rgb(213, 175, 83) 100%)",
                          borderBottomLeftRadius: "12px",
                          borderBottomRightRadius: "12px",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                          fontWeight: "600",
                        }
                      : {
                          borderBottomLeftRadius: "12px",
                          borderBottomRightRadius: "12px",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                          color: "rgb(179, 179, 179)",
                        }),
                    paddingBottom: "20px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    paddingTop: "20px",
                    position: "relative",
                    transitionDuration: "0.5s",
                  }}
                >
                  <i
                    className="inline-block text-2xl font-light relative align-middle"
                    style={{
                      paddingRight: "16px",
                      top: "0px",
                      fontWeight: item.active ? "300" : "300",
                    }}
                  >
                    {item.icon}
                  </i>
                  <span
                    className={`inline ${item.active ? "font-semibold" : ""}`}
                  >
                    {item.name}
                  </span>
                </a>
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
