import { useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";

const Notification = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const notifications = [
    {
      id: 1,
      title: "Welcome to MetaX Coin",
      message:
        "Your account has been successfully created. Start investing today!",
      time: "2 hours ago",
      type: "success",
      read: false,
    },
    {
      id: 2,
      title: "Investment Opportunity",
      message:
        "New staking rewards are now available. Check your investment area.",
      time: "1 day ago",
      type: "info",
      read: false,
    },
    {
      id: 3,
      title: "Security Alert",
      message: "Please enable two-factor authentication for better security.",
      time: "3 days ago",
      type: "warning",
      read: true,
    },
    {
      id: 4,
      title: "Maintenance Notice",
      message:
        "Scheduled maintenance on Jan 15, 2025 from 2:00 AM to 4:00 AM UTC.",
      time: "1 week ago",
      type: "info",
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        );
      case "warning":
        return (
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-metax-black text-metax-text-light relative overflow-hidden">
      <AnimatedBackground />

      <DashboardHeader
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <DashboardSidebar isOpen={isSidebarOpen} />

      <main
        className={`${isSidebarOpen ? "lg:ml-80" : "lg:ml-0"} h-full overflow-y-auto relative z-10 transition-all duration-300`}
        style={{ paddingTop: "88px" }}
      >
        <div className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Notifications
            </h1>
            <p className="text-metax-text-muted">
              Stay updated with your latest activities
            </p>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-4 lg:p-6 ${
                  !notification.read ? "border-metax-gold/50" : ""
                }`}
              >
                <div className="flex items-start space-x-4">
                  {getNotificationIcon(notification.type)}

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold text-lg">
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 inline-block w-2 h-2 bg-metax-gold rounded-full"></span>
                        )}
                      </h3>
                      <span className="text-metax-text-muted text-sm">
                        {notification.time}
                      </span>
                    </div>

                    <p className="text-metax-text-muted leading-relaxed">
                      {notification.message}
                    </p>

                    {!notification.read && (
                      <button className="mt-3 text-metax-gold hover:text-metax-gold-dark transition-colors text-sm font-medium">
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
              Mark All as Read
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notification;
