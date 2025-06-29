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

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      active: true,
      icon: "📊",
    },
    {
      name: "Notification",
      href: "/dashboard/notification",
      icon: "🔔",
    },
    {
      name: "Investment Area",
      href: "/dashboard/investment",
      icon: "💼",
    },
    {
      name: "My Investment",
      href: "/dashboard/my-investment",
      icon: "📈",
    },
    {
      name: "Add Fund",
      expandable: true,
      icon: "💰",
      subItems: [
        { name: "Send Request", href: "/dashboard/deposit" },
        { name: "Request History", href: "/dashboard/deposit-history" },
      ],
    },
    {
      name: "Crypto Withdraw",
      expandable: true,
      icon: "💳",
      subItems: [
        { name: "Send Request", href: "/dashboard/withdraw" },
        { name: "Request History", href: "/dashboard/withdraw-history" },
      ],
    },
    {
      name: "My Team",
      expandable: true,
      icon: "👥",
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
      icon: "💎",
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
      icon: "🎫",
      subItems: [
        { name: "Generate Ticket", href: "/dashboard/tickets/generate" },
        { name: "Support", href: "/dashboard/tickets/support" },
      ],
    },
    {
      name: "Logout",
      href: "/",
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
                          <button
                            onClick={() => handleNavigation(subItem.href)}
                            className="block transition-colors duration-500 relative w-full text-left hover:text-white"
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
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center transition-colors duration-500 relative rounded-xl w-full text-left ${
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
