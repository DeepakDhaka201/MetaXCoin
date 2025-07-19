import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";
import { toast } from "@/hooks/use-toast";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";
import { useSidebar } from "../../hooks/useSidebar";

const Profile = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState("profile");
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
  });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const { user, refreshUser } = useAuth();

  // Initialize profile data from user
  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        date_of_birth: user.date_of_birth || "",
      });
    }
  }, [user]);

  const tabs = [
    { id: "profile", name: "Profile Info", icon: "👤" },
    { id: "security", name: "Security", icon: "🔒" },
  ];

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await authService.updateProfile(profileData);
      await refreshUser();
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to update profile. Please try again.';
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.new_password !== passwordData.confirm_password) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);

    try {
      await authService.changePassword(passwordData);
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
      toast({
        title: "Password Changed",
        description: "Your password has been changed successfully.",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to change password. Please try again.';
      toast({
        title: "Password Change Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="h-screen bg-metax-black text-metax-text-light relative overflow-hidden">
      <AnimatedBackground />

      <DashboardHeader
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

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
                  <div className="w-20 h-20 bg-gradient-to-br from-metax-gold via-metax-gold-dark to-amber-900 rounded-full flex items-center justify-center mr-6 shadow-xl border border-metax-gold/30">
                    <span className="text-metax-black font-bold text-2xl">
                      {user?.first_name?.charAt(0)?.toUpperCase() || user?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-semibold">
                      {user?.first_name && user?.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : user?.username || 'User'
                      }
                    </h3>
                    <p className="text-metax-text-muted">
                      @{user?.username || 'username'}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-metax-text-muted mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={profileData.first_name}
                        onChange={handleProfileInputChange}
                        className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white focus:border-metax-gold focus:outline-none"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-metax-text-muted mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={profileData.last_name}
                        onChange={handleProfileInputChange}
                        className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white focus:border-metax-gold focus:outline-none"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <label className="block text-metax-text-muted mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value={user?.username || ''}
                        className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-metax-text-muted cursor-not-allowed"
                        disabled
                        placeholder="Username cannot be changed"
                      />
                    </div>
                    <div>
                      <label className="block text-metax-text-muted mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-metax-text-muted cursor-not-allowed"
                        disabled
                        placeholder="Email cannot be changed"
                      />
                    </div>
                    <div>
                      <label className="block text-metax-text-muted mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileInputChange}
                        className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white focus:border-metax-gold focus:outline-none"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-metax-text-muted mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={profileData.date_of_birth}
                        onChange={handleProfileInputChange}
                        className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white focus:border-metax-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
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

                <form onSubmit={handlePasswordChange}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-metax-text-muted mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="current_password"
                        value={passwordData.current_password}
                        onChange={handlePasswordInputChange}
                        className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white focus:border-metax-gold focus:outline-none"
                        placeholder="Enter your current password"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-metax-text-muted mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="new_password"
                        value={passwordData.new_password}
                        onChange={handlePasswordInputChange}
                        className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white focus:border-metax-gold focus:outline-none"
                        placeholder="Enter your new password"
                        required
                        minLength={8}
                      />
                      <p className="text-metax-text-muted text-sm mt-1">
                        Password must be at least 8 characters long
                      </p>
                    </div>
                    <div>
                      <label className="block text-metax-text-muted mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirm_password"
                        value={passwordData.confirm_password}
                        onChange={handlePasswordInputChange}
                        className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white focus:border-metax-gold focus:outline-none"
                        placeholder="Confirm your new password"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              </div>


            </div>
          )}


        </div>
      </main>
    </div>
  );
};

export default Profile;
