import { useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";
import { useMyInvestments } from "@/hooks/useInvestment";
import { UserInvestment } from "@/types/api";
import { useSidebar } from "../../hooks/useSidebar";

const MyInvestment = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  // Fetch data from API
  const { data: investmentsData, isLoading: investmentsLoading } = useMyInvestments({
    status: selectedStatus || undefined,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'matured':
        return 'text-blue-400';
      case 'cancelled':
        return 'text-gray-400';
      case 'pending':
        return 'text-yellow-400';
      default:
        return 'text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'matured':
        return 'Matured';
      case 'cancelled':
        return 'Completed';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  const getDaysRemaining = (maturityDate: string) => {
    const today = new Date();
    const maturity = new Date(maturityDate);
    const diffTime = maturity.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

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
                    ${(investmentsData?.summary?.total_invested || 0).toLocaleString()}
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
                    ${(investmentsData?.summary?.total_returns || 0).toLocaleString()}
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
                    {investmentsData?.summary?.active_investments || 0}
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

          {/* Filter Section */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStatus('')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedStatus === ''
                    ? 'bg-metax-gold text-metax-black'
                    : 'bg-metax-dark-section text-metax-text-muted hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedStatus('active')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedStatus === 'active'
                    ? 'bg-metax-gold text-metax-black'
                    : 'bg-metax-dark-section text-metax-text-muted hover:text-white'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setSelectedStatus('matured')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedStatus === 'matured'
                    ? 'bg-metax-gold text-metax-black'
                    : 'bg-metax-dark-section text-metax-text-muted hover:text-white'
                }`}
              >
                Matured
              </button>
              <button
                onClick={() => setSelectedStatus('cancelled')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedStatus === 'cancelled'
                    ? 'bg-metax-gold text-metax-black'
                    : 'bg-metax-dark-section text-metax-text-muted hover:text-white'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {/* Loading State */}
          {investmentsLoading && (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-metax-gold mx-auto mb-4"></div>
                <p className="text-metax-text-light">Loading investments...</p>
              </div>
            </div>
          )}

          {/* Investments Table */}
          {!investmentsLoading && (
            <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 overflow-hidden">
              <div className="p-6 border-b border-metax-border-gold/30">
                <h2 className="text-xl font-bold text-white">
                  My Investments
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-metax-dark-section/50">
                    <tr>
                      <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                        Package
                      </th>
                      <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                        Amount
                      </th>
                      <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                        Daily Return
                      </th>
                      <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                        Returns Paid
                      </th>
                      <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                        Investment Date
                      </th>
                      <th className="text-left py-4 px-6 text-metax-text-muted font-medium">
                        Maturity Date
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
                    {investmentsData?.investments && investmentsData.investments.length > 0 ? (
                      investmentsData.investments.map((investment: UserInvestment) => (
                        <tr
                          key={investment.id}
                          className="border-b border-metax-border-gold/10 hover:bg-metax-dark-section/20"
                        >
                          <td className="py-4 px-6 text-white font-medium">
                            {investment.package.name}
                          </td>
                          <td className="py-4 px-6 text-metax-gold font-medium">
                            ${investment.amount_invested.toLocaleString()}
                          </td>
                          <td className="py-4 px-6 text-white">
                            ${investment.expected_daily_return.toFixed(2)}
                          </td>
                          <td className="py-4 px-6 text-green-400 font-medium">
                            ${investment.total_returns_paid.toFixed(2)}
                          </td>
                          <td className="py-4 px-6 text-metax-text-muted">
                            {formatDate(investment.investment_date)}
                          </td>
                          <td className="py-4 px-6 text-metax-text-muted">
                            {formatDate(investment.maturity_date)}
                          </td>
                          <td className="py-4 px-6 text-white">
                            {investment.status === 'active' ? getDaysRemaining(investment.maturity_date) : 0} days
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`${getStatusColor(investment.status)} font-medium`}
                            >
                              {getStatusText(investment.status)}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center text-metax-text-muted py-8">
                          {investmentsLoading ? 'Loading investments...' : 'No investments found'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyInvestment;
