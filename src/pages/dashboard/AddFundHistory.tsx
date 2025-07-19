import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactionHistory } from "@/hooks/useTransactions";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";
import { useSidebar } from "../../hooks/useSidebar";

const AddFundHistory = () => {
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  // Fetch deposit history from API
  const { data: transactionData, isLoading, error } = useTransactionHistory({
    type: 'deposit',
    limit,
    offset: currentPage * limit,
  });

  const depositHistory = transactionData?.transactions || [];
  const totalCount = transactionData?.pagination?.total_count || 0;
  const hasMore = transactionData?.pagination?.has_more || false;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalDeposited = depositHistory
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + d.amount, 0);

  const pendingAmount = depositHistory
    .filter((d) => d.status === "pending")
    .reduce((sum, d) => sum + d.amount, 0);

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
        <div className="p-4 max-w-md mx-auto lg:max-w-4xl">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Deposit History
                </h1>
                <p className="text-metax-text-muted text-sm">
                  Your USDT deposit transactions
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white hover:border-metax-gold/50 transition-colors text-sm"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4">
              <div className="text-center">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-6 bg-metax-border-gold/20 rounded mb-2"></div>
                    <div className="h-4 bg-metax-border-gold/20 rounded"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-metax-gold text-xl font-bold">
                      ${totalDeposited.toFixed(2)}
                    </div>
                    <div className="text-metax-text-muted text-xs">
                      Total Deposited
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4">
              <div className="text-center">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-6 bg-metax-border-gold/20 rounded mb-2"></div>
                    <div className="h-4 bg-metax-border-gold/20 rounded"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-yellow-400 text-xl font-bold">
                      ${pendingAmount.toFixed(2)}
                    </div>
                    <div className="text-metax-text-muted text-xs">
                      Pending
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4 col-span-2 lg:col-span-1">
              <div className="text-center">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-6 bg-metax-border-gold/20 rounded mb-2"></div>
                    <div className="h-4 bg-metax-border-gold/20 rounded"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-white text-xl font-bold">
                      {totalCount}
                    </div>
                    <div className="text-metax-text-muted text-xs">
                      Total Requests
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Transaction List */}
          <div className="space-y-3">
            {isLoading ? (
              <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-metax-gold mx-auto mb-2"></div>
                <div className="text-metax-text-muted">Loading deposit history...</div>
              </div>
            ) : error ? (
              <div className="bg-metax-dark-section rounded-lg border border-red-500/30 p-6 text-center">
                <div className="text-red-400 mb-2">Failed to load deposit history</div>
                <div className="text-metax-text-muted text-sm">Please try refreshing the page</div>
              </div>
            ) : depositHistory.length === 0 ? (
              <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-6 text-center">
                <div className="text-metax-text-muted">
                  No deposit history found
                </div>
              </div>
            ) : (
              depositHistory.map((deposit) => (
                <div
                  key={deposit.transaction_id}
                  className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4"
                >
                  <div className="flex items-center justify-between">
                    {/* Left side - Icon and Transaction Info */}
                    <div className="flex items-center flex-1">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-4">
                        <span className="text-white text-sm font-bold">₮</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">
                          {deposit.transaction_id.length > 8
                            ? `${deposit.transaction_id.substring(0, 8)}...`
                            : deposit.transaction_id}
                        </div>
                        <div className="text-metax-text-muted text-xs">
                          {new Date(deposit.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right side - Amount and Status */}
                    <div className="text-right">
                      <div className="text-metax-gold font-bold text-lg mb-1">{deposit.amount.toFixed(2)} USDT</div>
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(deposit.status)}`}
                      >
                        {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {!isLoading && !error && totalCount > limit && (
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="px-4 py-2 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-metax-gold/50 transition-colors"
              >
                Previous
              </button>

              <div className="text-metax-text-muted text-sm">
                Page {currentPage + 1} of {Math.ceil(totalCount / limit)}
                ({totalCount} total transactions)
              </div>

              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!hasMore}
                className="px-4 py-2 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-metax-gold/50 transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* New Deposit Button */}
          <div className="mt-6">
            <button
              onClick={() => navigate("/dashboard/add-fund")}
              className="w-full bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 text-lg"
            >
              New Deposit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddFundHistory;
