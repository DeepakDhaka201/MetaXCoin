import { useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardContent from "../components/dashboard/DashboardContent";
import AnimatedBackground from "../components/AnimatedBackground";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-metax-black text-metax-text-light relative">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Dashboard Layout */}
      <div className="relative z-10">
        {/* Sidebar */}
        <DashboardSidebar isOpen={isSidebarOpen} />

        {/* Header */}
        <DashboardHeader
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Content */}
        <div className="pl-80" style={{ paddingTop: "88px" }}>
          <DashboardContent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
