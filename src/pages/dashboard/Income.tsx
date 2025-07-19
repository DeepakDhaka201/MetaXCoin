import { useState } from "react";
import { useIncomeHistory, useIncomeSummary, useIncomeAnalytics } from "@/hooks/useIncome";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";
import { useSidebar } from "../../hooks/useSidebar";

const Income = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  // Get page type from URL
  const currentPath = window.location.pathname;
  const getPageInfo = () => {
    if (currentPath.includes('/self-coin')) {
      return {
        title: 'Self Coin Income',
        description: 'Income from your own investments and activities',
        type: 'self-coin'
      };
    } else if (currentPath.includes('/staking')) {
      return {
        title: 'Staking Income',
        description: 'Rewards from staking your MXC tokens',
        type: 'staking'
      };
    } else if (currentPath.includes('/referral')) {
      return {
        title: 'Referral Income',
        description: 'Commissions from direct referrals',
        type: 'referral'
      };
    } else if (currentPath.includes('/level')) {
      return {
        title: 'Level Income',
        description: 'Multi-level bonus from your team',
        type: 'level'
      };
    } else if (currentPath.includes('/lifetime')) {
      return {
        title: 'Lifetime Income',
        description: 'Lifetime achievement rewards',
        type: 'lifetime'
      };
    }
    return {
      title: 'Income Overview',
      description: 'Track all your earnings and income sources',
      type: 'overview'
    };
  };

  const pageInfo = getPageInfo();

  // Determine income type filter based on page
  const incomeTypeFilter = pageInfo.type === 'overview' ? undefined : pageInfo.type;

  // Fetch real income data
  const { data: incomeHistoryData, isLoading: historyLoading } = useIncomeHistory({
    type: incomeTypeFilter,
    limit,
    offset: currentPage * limit,
  });

  const { data: incomeSummaryData, isLoading: summaryLoading } = useIncomeSummary();
  const { data: incomeAnalyticsData } = useIncomeAnalytics('30d');

  const incomeStats = {
    totalIncome: incomeSummaryData?.total_income || 0,
    thisMonth: incomeAnalyticsData?.total_income || 0,
    directReferral: incomeSummaryData?.income_by_type?.['direct_referral'] || 0,
    levelBonus: incomeSummaryData?.income_by_type?.['level_bonus'] || 0,
    stakingRewards: incomeSummaryData?.income_by_type?.['staking_reward'] || 0,
    tradingBonus: incomeSummaryData?.income_by_type?.['trading_bonus'] || 0,
    lifetimeReward: incomeSummaryData?.income_by_type?.['lifetime_reward'] || 0,
  };

  const allIncomeHistory = [
    {
      date: "2024-01-20",
      type: "Direct Referral",
      description: "Commission from alex_crypto investment",
      amount: 25.5,
      from: "alex_crypto",
      status: "Completed",
      category: "referral"
    },
    {
      date: "2024-01-19",
      type: "Level Bonus",
      description: "Level 2 bonus from jenny_coins team",
      amount: 15.75,
      from: "jenny_coins",
      status: "Completed",
      category: "level"
    },
    {
      date: "2024-01-18",
      type: "Staking Reward",
      description: "MXC staking reward for 30 days",
      amount: 45.0,
      from: "System",
      status: "Completed",
      category: "staking"
    },
    {
      date: "2024-01-17",
      type: "Self Investment",
      description: "Personal investment return",
      amount: 35.25,
      from: "System",
      status: "Completed",
      category: "self-coin"
    },
    {
      date: "2024-01-16",
      type: "Lifetime Reward",
      description: "Achievement milestone bonus",
      amount: 50.0,
      from: "System",
      status: "Completed",
      category: "lifetime"
    },
    {
      date: "2024-01-15",
      type: "Direct Referral",
      description: "Commission from sarah_trader investment",
      amount: 20.0,
      from: "sarah_trader",
      status: "Pending",
      category: "referral"
    },
  ];

  // Filter income history based on page type
  const getFilteredHistory = () => {
    if (pageInfo.type === 'overview') {
      return allIncomeHistory;
    }
    return allIncomeHistory.filter(item => item.category === pageInfo.type);
  };

  const incomeHistory = getFilteredHistory();



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
        <div className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              {pageInfo.title}
            </h1>
            <p className="text-metax-text-muted">
              {pageInfo.description}
            </p>
          </div>

          {/* Income Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4">
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

            <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4">
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

            <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4">
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

            <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4">
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

          {/* Income History Table */}
          <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-metax-black/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-metax-text-muted uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-metax-text-muted uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-metax-text-muted uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-metax-text-muted uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-metax-text-muted uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-metax-text-muted uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-metax-border-gold/20">
                  {incomeHistory.map((income, index) => (
                    <tr key={index} className="hover:bg-metax-black/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-metax-text-light">
                        {income.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getIncomeTypeColor(income.type)}`}
                        >
                          {income.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-metax-text-muted">
                        {income.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-metax-text-light">
                        {income.from}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-metax-gold font-medium">
                        ${income.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            income.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
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
      </main>
    </div>
  );
};

export default Income;
