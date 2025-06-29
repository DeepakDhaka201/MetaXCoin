import { useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", name: "Profile Info", icon: "👤" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "preferences", name: "Preferences", icon: "⚙️" },
  ];

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
              Profile Settings
            </h1>
            <p className="text-metax-text-muted">
              Manage your account information and preferences
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-metax-dark-section/30 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-amber-900 to-metax-gold-dark text-white"
                      : "text-metax-text-muted hover:text-white"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Profile Info Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Personal Information
                </h2>

                <div className="flex items-center mb-6">
                  <img
                    src="https://metaxcoin.cloud/public/newpanel/images/profile/pic1.jpg"
                    alt="Profile"
                    className="w-20 h-20 rounded-full mr-6"
                  />
                  <div>
                    <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 mr-3">
                      Change Photo
                    </button>
                    <button className="border border-metax-border-gold text-metax-gold hover:bg-metax-gold hover:text-metax-black px-4 py-2 rounded-lg font-medium transition-all duration-200">
                      Remove
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-metax-text-muted mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-metax-text-muted mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-metax-text-muted mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      defaultValue="John99272"
                      className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-metax-text-muted mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-metax-text-muted mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 234 567 8900"
                      className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-metax-text-muted mb-2">
                      Country
                    </label>
                    <select className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Change Password
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-metax-text-muted mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-metax-text-muted mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-metax-text-muted mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Two-Factor Authentication
                </h2>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Enable 2FA</h3>
                    <p className="text-metax-text-muted text-sm">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">
                        Email Notifications
                      </h3>
                      <p className="text-metax-text-muted text-sm">
                        Receive updates via email
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">
                        SMS Notifications
                      </h3>
                      <p className="text-metax-text-muted text-sm">
                        Receive updates via SMS
                      </p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">
                        Investment Alerts
                      </h3>
                      <p className="text-metax-text-muted text-sm">
                        Get notified about investment opportunities
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-6">
                  <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
