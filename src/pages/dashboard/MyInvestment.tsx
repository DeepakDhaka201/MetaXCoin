import { useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";

const MyInvestment = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const myInvestments = [
    {
      id: 1,
      plan: "Silver Plan",
      amount: 2500,
      dailyReturn: "3.0%",
      totalReturn: 375,
      startDate: "2025-01-01",
      endDate: "2025-02-15",
      status: "Active",
      daysLeft: 31,
    },
    {
      id: 2,
      plan: "Gold Plan",
      amount: 5000,
      dailyReturn: "3.5%",
      totalReturn: 875,
      startDate: "2024-12-15",
      endDate: "2025-02-13",
      status: "Active",
      daysLeft: 29,
    },
    {
      id: 3,
      plan: "Starter Plan",
      amount: 500,
      dailyReturn: "2.5%",
      totalReturn: 125,
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      status: "Completed",
      daysLeft: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-400";
      case "Completed":
        return "text-blue-400";
      case "Pending":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const totalInvested = myInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturns = myInvestments.reduce(
    (sum, inv) => sum + inv.totalReturn,
    0,
  );
  const activeInvestments = myInvestments.filter(
    (inv) => inv.status === "Active",
  ).length;

  return (
    <div className="h-screen bg-metax-black text-metax-text-light relative overflow-hidden">
      <AnimatedBackground />

      <DashboardHeader
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <DashboardSidebar isOpen={isSidebarOpen} />

      <main
        className={`${isSidebarOpen ? "lg:ml-80" : "lg:ml-0"} h-full overflow-y-auto relative z-10 transition-all duration-300`}
        style={{ paddingTop: "88px" }}
      >
        <div className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              My Investments
            </h1>
            <p className="text-metax-text-muted">
              Track your investment portfolio and returns
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-metax-text-muted text-sm mb-2">
                    Total Invested
                  </h3>
                  <div className="text-2xl font-bold text-metax-gold">
                    ${totalInvested.toLocaleString()}
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-metax-text-muted text-sm mb-2">
                    Total Returns
                  </h3>
                  <div className="text-2xl font-bold text-green-400">
                    ${totalReturns.toLocaleString()}
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-metax-text-muted text-sm mb-2">
                    Active Investments
                  </h3>
                  <div className="text-2xl font-bold text-blue-400">
                    {activeInvestments}
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Investments Table */}
          <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 overflow-hidden">
            <div className="p-6 border-b border-metax-border-gold/30">
              <h2 className="text-xl font-bold text-white">
                Investment History
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-metax-dark-section/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                      Plan
                    </th>
                    <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                      Amount
                    </th>
                    <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                      Daily Return
                    </th>
                    <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                      Total Return
                    </th>
                    <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                      Start Date
                    </th>
                    <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                      End Date
                    </th>
                    <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                      Days Left
                    </th>
                    <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {myInvestments.map((investment) => (
                    <tr
                      key={investment.id}
                      className="border-b border-metax-border-gold/10 hover:bg-metax-dark-section/20"
                    >
                      <td className="py-4 px-6 text-white font-medium">
                        {investment.plan}
                      </td>
                      <td className="py-4 px-6 text-metax-gold font-medium">
                        ${investment.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-white">
                        {investment.dailyReturn}
                      </td>
                      <td className="py-4 px-6 text-green-400 font-medium">
                        ${investment.totalReturn.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-metax-text-muted">
                        {investment.startDate}
                      </td>
                      <td className="py-4 px-6 text-metax-text-muted">
                        {investment.endDate}
                      </td>
                      <td className="py-4 px-6 text-white">
                        {investment.daysLeft} days
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`${getStatusColor(investment.status)} font-medium`}
                        >
                          {investment.status}
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

export default MyInvestment;
