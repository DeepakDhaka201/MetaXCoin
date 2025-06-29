import { useState } from "react";

const Income = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const incomeStats = {
    totalIncome: 2456.78,
    thisMonth: 345.67,
    directReferral: 1234.56,
    levelBonus: 456.78,
    stakingRewards: 345.67,
    tradingBonus: 234.56,
    lifetimeReward: 185.55,
  };

  const incomeHistory = [
    {
      date: "2024-01-20",
      type: "Direct Referral",
      description: "Commission from alex_crypto investment",
      amount: 25.5,
      from: "alex_crypto",
      status: "Completed",
    },
    {
      date: "2024-01-19",
      type: "Level Bonus",
      description: "Level 2 bonus from jenny_coins team",
      amount: 15.75,
      from: "jenny_coins",
      status: "Completed",
    },
    {
      date: "2024-01-18",
      type: "Staking Reward",
      description: "MXC staking reward for 30 days",
      amount: 45.0,
      from: "System",
      status: "Completed",
    },
    {
      date: "2024-01-17",
      type: "Trading Bonus",
      description: "Trading volume bonus",
      amount: 12.25,
      from: "System",
      status: "Completed",
    },
    {
      date: "2024-01-16",
      type: "Direct Referral",
      description: "Commission from sarah_trader investment",
      amount: 20.0,
      from: "sarah_trader",
      status: "Pending",
    },
  ];

  const monthlyIncome = [
    {
      month: "Jan 2024",
      directReferral: 156.75,
      levelBonus: 89.5,
      staking: 120.0,
      trading: 45.25,
      total: 411.5,
    },
    {
      month: "Dec 2023",
      directReferral: 234.5,
      levelBonus: 125.75,
      staking: 135.0,
      trading: 67.8,
      total: 563.05,
    },
    {
      month: "Nov 2023",
      directReferral: 189.25,
      levelBonus: 98.3,
      staking: 115.0,
      trading: 34.15,
      total: 436.7,
    },
    {
      month: "Oct 2023",
      directReferral: 278.9,
      levelBonus: 167.45,
      staking: 140.0,
      trading: 89.75,
      total: 676.1,
    },
  ];

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "history", name: "Income History", icon: "📋" },
    { id: "monthly", name: "Monthly Report", icon: "📅" },
    { id: "withdrawals", name: "Withdrawals", icon: "💸" },
  ];

  const periodOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ];

  const getIncomeTypeColor = (type: string) => {
    const colors = {
      "Direct Referral": "bg-blue-900/30 text-blue-400",
      "Level Bonus": "bg-purple-900/30 text-purple-400",
      "Staking Reward": "bg-green-900/30 text-green-400",
      "Trading Bonus": "bg-orange-900/30 text-orange-400",
      "Lifetime Reward": "bg-yellow-900/30 text-yellow-400",
    };
    return (
      colors[type as keyof typeof colors] || "bg-gray-900/30 text-gray-400"
    );
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
        <h1 className="text-white text-2xl font-bold mb-2">Income Area</h1>
        <p className="text-metax-text-muted mb-6">
          Track all your earnings and income sources
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
            {/* Income Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-metax-text-muted text-sm mb-1">
                      Total Income
                    </h4>
                    <div className="text-metax-gold text-2xl font-bold">
                      ${incomeStats.totalIncome}
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
                      This Month
                    </h4>
                    <div className="text-green-400 text-2xl font-bold">
                      ${incomeStats.thisMonth}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">📅</span>
                  </div>
                </div>
              </div>

              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-metax-text-muted text-sm mb-1">
                      Direct Referral
                    </h4>
                    <div className="text-blue-400 text-2xl font-bold">
                      ${incomeStats.directReferral}
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
                      Level Bonus
                    </h4>
                    <div className="text-purple-400 text-2xl font-bold">
                      ${incomeStats.levelBonus}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">📈</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Income Sources */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-metax-text-muted text-sm mb-1">
                      Staking Rewards
                    </h4>
                    <div className="text-green-400 text-xl font-bold">
                      ${incomeStats.stakingRewards}
                    </div>
                  </div>
                  <span className="text-2xl">⚡</span>
                </div>
              </div>

              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-metax-text-muted text-sm mb-1">
                      Trading Bonus
                    </h4>
                    <div className="text-orange-400 text-xl font-bold">
                      ${incomeStats.tradingBonus}
                    </div>
                  </div>
                  <span className="text-2xl">📊</span>
                </div>
              </div>

              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-metax-text-muted text-sm mb-1">
                      Lifetime Reward
                    </h4>
                    <div className="text-yellow-400 text-xl font-bold">
                      ${incomeStats.lifetimeReward}
                    </div>
                  </div>
                  <span className="text-2xl">🏆</span>
                </div>
              </div>
            </div>

            {/* Income Breakdown Chart */}
            <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                Income Breakdown
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-400 rounded mr-3"></div>
                    <span className="text-white">Direct Referral (50.2%)</span>
                  </div>
                  <span className="text-metax-gold font-medium">
                    ${incomeStats.directReferral}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple-400 rounded mr-3"></div>
                    <span className="text-white">Level Bonus (18.6%)</span>
                  </div>
                  <span className="text-metax-gold font-medium">
                    ${incomeStats.levelBonus}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-400 rounded mr-3"></div>
                    <span className="text-white">Staking Rewards (14.1%)</span>
                  </div>
                  <span className="text-metax-gold font-medium">
                    ${incomeStats.stakingRewards}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-400 rounded mr-3"></div>
                    <span className="text-white">Trading Bonus (9.5%)</span>
                  </div>
                  <span className="text-metax-gold font-medium">
                    ${incomeStats.tradingBonus}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded mr-3"></div>
                    <span className="text-white">Lifetime Reward (7.6%)</span>
                  </div>
                  <span className="text-metax-gold font-medium">
                    ${incomeStats.lifetimeReward}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Income History Tab */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-white text-lg font-semibold">
                  Income History
                </h3>
                <p className="text-metax-text-muted text-sm">
                  View all your income transactions
                </p>
              </div>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white"
              >
                {periodOptions.map((option) => (
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
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        From
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeHistory.map((income, index) => (
                      <tr
                        key={index}
                        className="border-t border-metax-border-gold/20"
                      >
                        <td className="px-4 py-3 text-white text-sm">
                          {income.date}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getIncomeTypeColor(income.type)}`}
                          >
                            {income.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-metax-text-muted text-sm">
                          {income.description}
                        </td>
                        <td className="px-4 py-3 text-white text-sm">
                          {income.from}
                        </td>
                        <td className="px-4 py-3 text-metax-gold font-medium">
                          ${income.amount}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              income.status === "Completed"
                                ? "bg-green-900/30 text-green-400"
                                : "bg-yellow-900/30 text-yellow-400"
                            }`}
                          >
                            {income.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Monthly Report Tab */}
        {activeTab === "monthly" && (
          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold">
              Monthly Income Report
            </h3>

            <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-metax-dark-section/60">
                    <tr>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Month
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Direct Referral
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Level Bonus
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Staking
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Trading
                      </th>
                      <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyIncome.map((month, index) => (
                      <tr
                        key={index}
                        className="border-t border-metax-border-gold/20"
                      >
                        <td className="px-4 py-3 text-white font-medium">
                          {month.month}
                        </td>
                        <td className="px-4 py-3 text-blue-400">
                          ${month.directReferral}
                        </td>
                        <td className="px-4 py-3 text-purple-400">
                          ${month.levelBonus}
                        </td>
                        <td className="px-4 py-3 text-green-400">
                          ${month.staking}
                        </td>
                        <td className="px-4 py-3 text-orange-400">
                          ${month.trading}
                        </td>
                        <td className="px-4 py-3 text-metax-gold font-bold">
                          ${month.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Withdrawals Tab */}
        {activeTab === "withdrawals" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-white text-lg font-semibold">
                  Income Withdrawals
                </h3>
                <p className="text-metax-text-muted text-sm">
                  Request withdrawal of your earned income
                </p>
              </div>
              <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-2 rounded-lg font-medium transition-all duration-200">
                Request Withdrawal
              </button>
            </div>

            {/* Available Balance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <h4 className="text-metax-text-muted text-sm mb-1">
                  Available for Withdrawal
                </h4>
                <div className="text-metax-gold text-2xl font-bold">
                  ${incomeStats.totalIncome}
                </div>
              </div>
              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <h4 className="text-metax-text-muted text-sm mb-1">
                  Pending Withdrawals
                </h4>
                <div className="text-yellow-400 text-2xl font-bold">$0.00</div>
              </div>
              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <h4 className="text-metax-text-muted text-sm mb-1">
                  Total Withdrawn
                </h4>
                <div className="text-green-400 text-2xl font-bold">$0.00</div>
              </div>
            </div>

            {/* Withdrawal History */}
            <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-6">
              <h4 className="text-white font-medium mb-4">
                Withdrawal History
              </h4>
              <div className="text-center py-8">
                <div className="text-metax-text-muted text-lg mb-2">💸</div>
                <div className="text-metax-text-muted">
                  No withdrawal requests found
                </div>
                <div className="text-metax-text-muted text-sm">
                  Your withdrawal history will appear here
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Income;
