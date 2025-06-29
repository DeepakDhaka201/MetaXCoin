import { useState } from "react";

const MyTeam = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const teamStats = {
    totalTeam: 47,
    directReferrals: 12,
    activeMembers: 23,
    totalVolume: 125000,
    thisMonthVolume: 15000,
    commissionEarned: 2456.78,
  };

  const referrals = [
    {
      id: 1,
      username: "alex_crypto",
      name: "Alex Johnson",
      joinDate: "2024-01-15",
      level: 1,
      status: "Active",
      investment: 5000,
      earnings: 125.5,
      teamSize: 8,
      isOnline: true,
    },
    {
      id: 2,
      username: "sarah_trader",
      name: "Sarah Williams",
      joinDate: "2024-01-10",
      level: 1,
      status: "Active",
      investment: 2500,
      earnings: 67.25,
      teamSize: 5,
      isOnline: false,
    },
    {
      id: 3,
      username: "mike_investor",
      name: "Mike Brown",
      joinDate: "2024-01-08",
      level: 1,
      status: "Inactive",
      investment: 1000,
      earnings: 15.0,
      teamSize: 2,
      isOnline: false,
    },
    {
      id: 4,
      username: "jenny_coins",
      name: "Jennifer Davis",
      joinDate: "2024-01-20",
      level: 2,
      status: "Active",
      investment: 3000,
      earnings: 89.75,
      teamSize: 12,
      isOnline: true,
    },
  ];

  const commissionHistory = [
    {
      date: "2024-01-20",
      from: "alex_crypto",
      type: "Direct Referral",
      amount: 25.5,
      level: 1,
    },
    {
      date: "2024-01-19",
      from: "jenny_coins",
      type: "Level Bonus",
      amount: 15.75,
      level: 2,
    },
    {
      date: "2024-01-18",
      from: "sarah_trader",
      type: "Direct Referral",
      amount: 12.25,
      level: 1,
    },
  ];

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "referrals", name: "My Referrals", icon: "👥" },
    { id: "commissions", name: "Commissions", icon: "💰" },
    { id: "genealogy", name: "Genealogy", icon: "🌳" },
  ];

  const levelOptions = [
    { value: "all", label: "All Levels" },
    { value: "1", label: "Level 1" },
    { value: "2", label: "Level 2" },
    { value: "3", label: "Level 3" },
    { value: "4", label: "Level 4" },
    { value: "5", label: "Level 5" },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
        <h1 className="text-white text-2xl font-bold mb-2">My Team</h1>
        <p className="text-metax-text-muted mb-6">
          Manage your referral network and track team performance
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-metax-border-gold/30 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-metax-gold border-b-2 border-metax-gold"
                  : "text-metax-text-muted hover:text-white"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Team Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-metax-text-muted text-sm mb-1">
                      Total Team Size
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
                      Total Volume
                    </h4>
                    <div className="text-metax-gold text-2xl font-bold">
                      ${teamStats.totalVolume.toLocaleString()}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">📈</span>
                  </div>
                </div>
              </div>

              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-metax-text-muted text-sm mb-1">
                      This Month Volume
                    </h4>
                    <div className="text-metax-gold text-2xl font-bold">
                      ${teamStats.thisMonthVolume.toLocaleString()}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">📊</span>
                  </div>
                </div>
              </div>

              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-metax-text-muted text-sm mb-1">
                      Commission Earned
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
            <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                Your Referral Link
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value="https://metaxcoin.cloud/Register/John99272"
                  readOnly
                  className="flex-1 px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://metaxcoin.cloud/Register/John99272",
                    );
                    alert("Link copied to clipboard!");
                  }}
                  className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Referrals Tab */}
        {activeTab === "referrals" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-white text-lg font-semibold">
                  Team Members
                </h3>
                <p className="text-metax-text-muted text-sm">
                  Manage and track your referrals
                </p>
              </div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white"
              >
                {levelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-metax-dark-section/60">
                    <tr>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Member
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Level
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Investment
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Earnings
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Team Size
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Join Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((referral) => (
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
                              <div className="text-white font-medium">
                                {referral.name}
                              </div>
                              <div className="text-metax-text-muted text-sm">
                                @{referral.username}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-metax-gold/20 text-metax-gold text-xs rounded-full">
                            Level {referral.level}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-metax-gold font-medium">
                          ${referral.investment.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-green-400 font-medium">
                          ${referral.earnings}
                        </td>
                        <td className="px-4 py-3 text-white">
                          {referral.teamSize}
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
                        <td className="px-4 py-3 text-metax-text-muted text-sm">
                          {referral.joinDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Commissions Tab */}
        {activeTab === "commissions" && (
          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold">
              Commission History
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
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Level
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionHistory.map((commission, index) => (
                      <tr
                        key={index}
                        className="border-t border-metax-border-gold/20"
                      >
                        <td className="px-4 py-3 text-white text-sm">
                          {commission.date}
                        </td>
                        <td className="px-4 py-3 text-white">
                          @{commission.from}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">
                            {commission.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-metax-gold">
                          Level {commission.level}
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
        )}

        {/* Genealogy Tab */}
        {activeTab === "genealogy" && (
          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold">Team Structure</h3>

            <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-6">
              <div className="text-center">
                {/* Root User */}
                <div className="inline-block">
                  <div className="bg-metax-gold/20 border-2 border-metax-gold rounded-lg p-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white text-xl font-bold">J</span>
                    </div>
                    <div className="text-white font-medium">John99272</div>
                    <div className="text-metax-text-muted text-sm">You</div>
                  </div>
                </div>

                {/* Level 1 */}
                <div className="flex justify-center gap-8 mb-6">
                  {referrals
                    .filter((r) => r.level === 1)
                    .slice(0, 3)
                    .map((ref) => (
                      <div key={ref.id} className="text-center">
                        <div className="bg-metax-dark-section/60 border border-metax-border-gold/30 rounded-lg p-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white text-sm font-bold">
                              {ref.name.charAt(0)}
                            </span>
                          </div>
                          <div className="text-white text-sm font-medium">
                            {ref.username}
                          </div>
                          <div className="text-metax-text-muted text-xs">
                            Level 1
                          </div>
                          <div className="text-metax-gold text-xs">
                            ${ref.investment}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Level 2 */}
                <div className="flex justify-center gap-4">
                  {referrals
                    .filter((r) => r.level === 2)
                    .slice(0, 6)
                    .map((ref) => (
                      <div key={ref.id} className="text-center">
                        <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mx-auto mb-1">
                            <span className="text-white text-xs font-bold">
                              {ref.name.charAt(0)}
                            </span>
                          </div>
                          <div className="text-white text-xs">
                            {ref.username}
                          </div>
                          <div className="text-metax-text-muted text-xs">
                            L2
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="mt-6 text-metax-text-muted text-sm">
                  Showing top levels of your genealogy tree
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTeam;
