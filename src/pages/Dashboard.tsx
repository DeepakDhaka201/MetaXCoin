import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardContent from "../components/dashboard/DashboardContent";
import AnimatedBackground from "../components/AnimatedBackground";
import CryptoPriceTicker from "../components/CryptoPriceTicker";
import { useSidebar } from "../hooks/useSidebar";

const Dashboard = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

  return (
    <div className="h-screen bg-metax-black text-metax-text-light relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Header */}
      <DashboardHeader
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main Content */}
      <main
        className={`${isSidebarOpen ? "lg:ml-80" : "lg:ml-0"} h-full overflow-y-auto relative z-10 transition-all duration-300`}
        style={{ paddingTop: "88px" }}
      >
        {/* Crypto Price Ticker - Only on main dashboard */}
        <CryptoPriceTicker />

        <DashboardContent />
      </main>
    </div>
  );
};

export default Dashboard;
