import { useState } from "react";
import { useTeamStats, useTeamMembers, useReferralLink } from "@/hooks/useTeam";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";
import { useSidebar } from "../../hooks/useSidebar";

const MyTeam = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  // Fetch real team data
  const { data: teamStatsData, isLoading: statsLoading } = useTeamStats();
  const { data: teamMembersData, isLoading: membersLoading } = useTeamMembers({
    status: 'all',
    limit,
    offset: currentPage * limit,
  });
  const { data: referralData } = useReferralLink();

  const teamStats = {
    totalTeam: teamStatsData?.total_team || 0,
    directReferrals: teamStatsData?.direct_referrals || 0,
    activeMembers: teamStatsData?.active_members || 0,
    commissionEarned: teamStatsData?.commission_earned || 0,
  };

  const referrals = teamMembersData?.data || [];

  // Fallback data for development/testing
  const fallbackReferrals = [
    {
      id: 1,
      username: "alex_crypto",
      name: "Alex Johnson",
      joinDate: "2024-01-15",
      status: "Active",
      investment: 5000,
      earnings: 125.5,
      isOnline: true,
    },
    {
      id: 2,
      username: "sarah_trader",
      name: "Sarah Williams",
      joinDate: "2024-01-10",
      status: "Active",
      investment: 2500,
      earnings: 67.25,
      isOnline: false,
    },
    {
      id: 3,
      username: "mike_investor",
      name: "Mike Brown",
      joinDate: "2024-01-08",
      status: "Inactive",
      investment: 1000,
      earnings: 15.0,
      isOnline: false,
    },
    {
      id: 4,
      username: "jenny_coins",
      name: "Jennifer Davis",
      joinDate: "2024-01-20",
      status: "Active",
      investment: 3000,
      earnings: 89.75,
      isOnline: true,
    },
  ];

  // Use real data if available, otherwise use fallback
  const displayReferrals = referrals.length > 0 ? referrals : fallbackReferrals;

  const recentCommissions = [
    {
      date: "2024-01-20",
      from: "alex_crypto",
      amount: 25.5,
    },
    {
      date: "2024-01-19",
      from: "jenny_coins",
      amount: 15.75,
    },
    {
      date: "2024-01-18",
      from: "sarah_trader",
      amount: 12.25,
    },
  ];

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
              My Team
            </h1>
            <p className="text-metax-text-muted">
              Manage your referral network and track team performance
            </p>
          </div>

          <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">

            {/* Team Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-metax-text-muted text-sm mb-1">
                      Total Team
                    </h4>
                    <div className="text-metax-gold text-2xl font-bold">
                      {teamStats.totalTeam}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">👥</span>
                  </div>
                </div>
              </div>

              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-metax-text-muted text-sm mb-1">
                      Direct Referrals
                    </h4>
                    <div className="text-metax-gold text-2xl font-bold">
                      {teamStats.directReferrals}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">👤</span>
                  </div>
                </div>
              </div>

              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-metax-text-muted text-sm mb-1">
                      Active Members
                    </h4>
                    <div className="text-metax-gold text-2xl font-bold">
                      {teamStats.activeMembers}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">✅</span>
                  </div>
                </div>
              </div>

              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-metax-text-muted text-sm mb-1">
                      Total Commissions
                    </h4>
                    <div className="text-metax-gold text-2xl font-bold">
                      ${teamStats.commissionEarned}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">💰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Referral Link */}
            <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-6 mb-8">
              <h3 className="text-white text-lg font-semibold mb-4">
                Your Referral Link
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={referralData?.referral_link || "Loading..."}
                  readOnly
                  className="flex-1 px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white"
                />
                <button
                  onClick={() => {
                    const link = referralData?.referral_link;
                    if (link) {
                      navigator.clipboard.writeText(link);
                      alert("Link copied to clipboard!");
                    } else {
                      alert("Referral link not available yet. Please try again later.");
                    }
                  }}
                  className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  Copy Link
                </button>
              </div>
            </div>

            {/* Team Members */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Direct Referrals */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">
                  Direct Referrals
                </h3>
                <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-metax-dark-section/60">
                        <tr>
                          <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                            Member
                          </th>
                          <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                            Investment
                          </th>
                          <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayReferrals.slice(0, 5).map((referral) => (
                          <tr
                            key={referral.id}
                            className="border-t border-metax-border-gold/20"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div className="flex items-center mr-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-2">
                                    <span className="text-white text-xs font-bold">
                                      {referral.name.charAt(0)}
                                    </span>
                                  </div>
                                  {referral.isOnline && (
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                  )}
                                </div>
                                <div>
                                  <div className="text-white font-medium text-sm">
                                    {referral.name}
                                  </div>
                                  <div className="text-metax-text-muted text-xs">
                                    @{referral.username}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-metax-gold font-medium">
                              ${referral.investment.toLocaleString()}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  referral.status === "Active"
                                    ? "bg-green-900/30 text-green-400"
                                    : "bg-red-900/30 text-red-400"
                                }`}
                              >
                                {referral.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Recent Commissions */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">
                  Recent Commissions
                </h3>
                <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-metax-dark-section/60">
                        <tr>
                          <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                            From
                          </th>
                          <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentCommissions.map((commission, index) => (
                          <tr
                            key={index}
                            className="border-t border-metax-border-gold/20"
                          >
                            <td className="px-4 py-3 text-white text-sm">
                              {commission.date}
                            </td>
                            <td className="px-4 py-3 text-white text-sm">
                              @{commission.from}
                            </td>
                            <td className="px-4 py-3 text-green-400 font-medium">
                              ${commission.amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => window.location.href = "/dashboard/my-team/active"}
                className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                View Active Members
              </button>
              <button
                onClick={() => window.location.href = "/dashboard/my-team/inactive"}
                className="bg-metax-dark-section hover:bg-metax-dark-section/80 text-white px-6 py-3 rounded-lg font-medium border border-metax-border-gold/30 transition-all duration-200"
              >
                View Inactive Members
              </button>
              <button
                onClick={() => window.location.href = "/dashboard/my-team/tree"}
                className="bg-metax-dark-section hover:bg-metax-dark-section/80 text-white px-6 py-3 rounded-lg font-medium border border-metax-border-gold/30 transition-all duration-200"
              >
                Team Tree View
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyTeam;
