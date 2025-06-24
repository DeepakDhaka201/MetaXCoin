import { useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardContent from "../components/dashboard/DashboardContent";
import AnimatedBackground from "../components/AnimatedBackground";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-metax-black text-metax-text-light relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Dashboard Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <DashboardSidebar isOpen={isSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <DashboardHeader
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* Content */}
          <DashboardContent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
