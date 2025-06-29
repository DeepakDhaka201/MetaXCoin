import { useState } from "react";

const MyTeamActive = () => {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const activeMembers = [
    {
      id: 1,
      username: "alex_crypto",
      name: "Alex Johnson",
      email: "alex@example.com",
      joinDate: "2024-01-15",
      level: 1,
      investment: 5000,
      totalEarnings: 125.5,
      teamSize: 8,
      lastActive: "2024-01-20",
      isOnline: true,
      country: "USA",
      referralLink: "https://metaxcoin.cloud/Register/alex_crypto",
    },
    {
      id: 2,
      username: "sarah_trader",
      name: "Sarah Williams",
      email: "sarah@example.com",
      joinDate: "2024-01-10",
      level: 1,
      investment: 2500,
      totalEarnings: 67.25,
      teamSize: 5,
      lastActive: "2024-01-19",
      isOnline: false,
      country: "Canada",
      referralLink: "https://metaxcoin.cloud/Register/sarah_trader",
    },
    {
      id: 3,
      username: "jenny_coins",
      name: "Jennifer Davis",
      email: "jenny@example.com",
      joinDate: "2024-01-20",
      level: 2,
      investment: 3000,
      totalEarnings: 89.75,
      teamSize: 12,
      lastActive: "2024-01-20",
      isOnline: true,
      country: "UK",
      referralLink: "https://metaxcoin.cloud/Register/jenny_coins",
    },
    {
      id: 4,
      username: "crypto_king",
      name: "Michael Chen",
      email: "michael@example.com",
      joinDate: "2024-01-08",
      level: 1,
      investment: 7500,
      totalEarnings: 234.75,
      teamSize: 15,
      lastActive: "2024-01-20",
      isOnline: true,
      country: "Singapore",
      referralLink: "https://metaxcoin.cloud/Register/crypto_king",
    },
    {
      id: 5,
      username: "emma_invest",
      name: "Emma Rodriguez",
      email: "emma@example.com",
      joinDate: "2024-01-12",
      level: 3,
      investment: 1500,
      totalEarnings: 45.25,
      teamSize: 3,
      lastActive: "2024-01-19",
      isOnline: false,
      country: "Spain",
      referralLink: "https://metaxcoin.cloud/Register/emma_invest",
    },
  ];

  const levelOptions = [
    { value: "all", label: "All Levels" },
    { value: "1", label: "Level 1" },
    { value: "2", label: "Level 2" },
    { value: "3", label: "Level 3" },
    { value: "4", label: "Level 4" },
    { value: "5", label: "Level 5" },
  ];

  const filteredMembers = activeMembers.filter((member) => {
    const levelMatch =
      selectedLevel === "all" || member.level.toString() === selectedLevel;
    const searchMatch =
      searchTerm === "" ||
      member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    return levelMatch && searchMatch;
  });

  const totalInvestment = activeMembers.reduce(
    (sum, member) => sum + member.investment,
    0,
  );
  const totalEarnings = activeMembers.reduce(
    (sum, member) => sum + member.totalEarnings,
    0,
  );
  const totalTeamSize = activeMembers.reduce(
    (sum, member) => sum + member.teamSize,
    0,
  );

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
        <h1 className="text-white text-2xl font-bold mb-2">
          Direct Active Members
        </h1>
        <p className="text-metax-text-muted mb-6">
          Manage your active team members who are currently investing and
          earning
        </p>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-metax-text-muted text-sm mb-1">
                  Active Members
                </h4>
                <div className="text-metax-gold text-2xl font-bold">
                  {activeMembers.length}
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
                  Total Investment
                </h4>
                <div className="text-green-400 text-2xl font-bold">
                  ${totalInvestment.toLocaleString()}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                <span className="text-white text-xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-metax-text-muted text-sm mb-1">
                  Total Earnings
                </h4>
                <div className="text-purple-400 text-2xl font-bold">
                  ${totalEarnings.toFixed(2)}
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
                  Team Network
                </h4>
                <div className="text-blue-400 text-2xl font-bold">
                  {totalTeamSize}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🌐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-white font-medium mb-2">
              Search Members
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by username, name, or email"
              className="w-full px-4 py-2 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white placeholder-metax-text-muted focus:border-metax-gold focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-white font-medium mb-2">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-2 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white"
            >
              {levelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-2 rounded-lg font-medium transition-all duration-200">
              Export List
            </button>
          </div>
        </div>

        {/* Members Table */}
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
                    Last Active
                  </th>
                  <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                    Country
                  </th>
                  <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-t border-metax-border-gold/20"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="flex items-center mr-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-2">
                            <span className="text-white text-xs font-bold">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          {member.isOnline && (
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {member.name}
                          </div>
                          <div className="text-metax-text-muted text-sm">
                            @{member.username}
                          </div>
                          <div className="text-metax-text-muted text-xs">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-metax-gold/20 text-metax-gold text-xs rounded-full">
                        Level {member.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-metax-gold font-medium">
                      ${member.investment.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-green-400 font-medium">
                      ${member.totalEarnings}
                    </td>
                    <td className="px-4 py-3 text-white">{member.teamSize}</td>
                    <td className="px-4 py-3 text-metax-text-muted text-sm">
                      {member.lastActive}
                    </td>
                    <td className="px-4 py-3 text-white text-sm">
                      {member.country}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">
                          View
                        </button>
                        <button className="text-metax-gold hover:text-metax-gold-dark text-sm">
                          Message
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Member Details Cards (Alternative View) */}
        <div className="mt-6">
          <h3 className="text-white text-lg font-semibold mb-4">
            Member Cards View
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.slice(0, 6).map((member) => (
              <div
                key={member.id}
                className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4 hover:border-metax-gold/40 transition-all duration-300"
              >
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="text-white font-medium">{member.name}</h4>
                      {member.isOnline && (
                        <div className="w-2 h-2 bg-green-400 rounded-full ml-2"></div>
                      )}
                    </div>
                    <p className="text-metax-text-muted text-sm">
                      @{member.username}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-metax-text-muted">Investment:</span>
                    <span className="text-metax-gold font-medium">
                      ${member.investment.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-metax-text-muted">Earnings:</span>
                    <span className="text-green-400 font-medium">
                      ${member.totalEarnings}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-metax-text-muted">Team:</span>
                    <span className="text-white">
                      {member.teamSize} members
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-metax-text-muted">Level:</span>
                    <span className="text-metax-gold">
                      Level {member.level}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-metax-gold/20 hover:bg-metax-gold/30 text-metax-gold py-2 rounded text-sm font-medium transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 bg-blue-900/20 hover:bg-blue-900/30 text-blue-400 py-2 rounded text-sm font-medium transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
            Send Bulk Message
          </button>
          <button className="bg-metax-dark-section hover:bg-metax-dark-section/80 text-white px-6 py-3 rounded-lg font-medium border border-metax-border-gold/30 transition-all duration-200">
            Download Report
          </button>
          <button
            onClick={() => (window.location.href = "/dashboard/my-team")}
            className="bg-metax-dark-section hover:bg-metax-dark-section/80 text-white px-6 py-3 rounded-lg font-medium border border-metax-border-gold/30 transition-all duration-200"
          >
            Back to Team Overview
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyTeamActive;
