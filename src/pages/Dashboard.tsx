import { useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardContent from "../components/dashboard/DashboardContent";
import AnimatedBackground from "../components/AnimatedBackground";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen bg-metax-black text-metax-text-light relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} />

      {/* Header */}
      <DashboardHeader
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <main className="ml-80 pt-22 h-full overflow-y-auto relative z-10">
        <DashboardContent />
      </main>
    </div>
  );
};

export default Dashboard;
