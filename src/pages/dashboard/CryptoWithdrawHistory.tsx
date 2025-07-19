import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";
import { useSidebar } from "../../hooks/useSidebar";
import { useTransactionHistory } from "../../hooks/useTransactions";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";

const CryptoWithdrawHistory = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const navigate = useNavigate();

  // Fetch withdrawal history from API
  const {
    data: transactionData,
    isLoading,
    error,
    refetch
  } = useTransactionHistory({
    type: 'withdrawal',
    limit: 50
  });

  // Extract withdrawal transactions
  const withdrawHistory = transactionData?.transactions || [];
  const pagination = transactionData?.pagination;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "failed":
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalWithdrawn = withdrawHistory
    .filter((w) => w.status?.toLowerCase() === "completed")
    .reduce((sum, w) => sum + (w.amount || 0), 0);

  const pendingAmount = withdrawHistory
    .filter((w) => w.status?.toLowerCase() === "pending")
    .reduce((sum, w) => sum + (w.amount || 0), 0);

  const processingAmount = withdrawHistory
    .filter((w) => w.status?.toLowerCase() === "processing")
    .reduce((sum, w) => sum + (w.amount || 0), 0);

  // Handle loading state
  if (isLoading) {
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
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner />
          </div>
        </main>
      </div>
    );
  }

  // Handle error state
  if (error) {
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
            <ErrorDisplay
              error={error}
              onRetry={refetch}
              title="Failed to load withdrawal history"
            />
          </div>
        </main>
      </div>
    );
  }

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
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">
              Withdrawal History
            </h1>
            <p className="text-metax-text-muted text-sm">
              Your USDT withdrawal transactions
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4">
              <div className="text-center">
                <div className="text-metax-gold text-xl font-bold">
                  ${totalWithdrawn.toFixed(2)}
                </div>
                <div className="text-metax-text-muted text-xs">
                  Total Withdrawn
                </div>
              </div>
            </div>

            <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4">
              <div className="text-center">
                <div className="text-yellow-400 text-xl font-bold">
                  ${pendingAmount.toFixed(2)}
                </div>
                <div className="text-metax-text-muted text-xs">
                  Pending
                </div>
              </div>
            </div>

            <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4">
              <div className="text-center">
                <div className="text-blue-400 text-xl font-bold">
                  ${processingAmount.toFixed(2)}
                </div>
                <div className="text-metax-text-muted text-xs">
                  Processing
                </div>
              </div>
            </div>

            <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4">
              <div className="text-center">
                <div className="text-white text-xl font-bold">
                  {withdrawHistory.length}
                </div>
                <div className="text-metax-text-muted text-xs">
                  Total Requests
                </div>
              </div>
            </div>
          </div>

          {/* Transaction List */}
          <div className="space-y-3">
            {withdrawHistory.length === 0 ? (
              <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-6 text-center">
                <div className="text-metax-text-muted">
                  No withdrawal history found
                </div>
              </div>
            ) : (
              withdrawHistory.map((withdrawal) => (
                <div
                  key={withdrawal.transaction_id || withdrawal.id}
                  className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">₮</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {withdrawal.transaction_id || `WD${withdrawal.id}`}
                        </div>
                        <div className="text-metax-text-muted text-xs">
                          {new Date(withdrawal.created_at || withdrawal.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(withdrawal.status)}`}
                    >
                      {withdrawal.status?.charAt(0).toUpperCase() + withdrawal.status?.slice(1) || 'Unknown'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-metax-text-muted text-xs">Amount Requested</div>
                      <div className="text-metax-gold font-medium">
                        ${withdrawal.amount?.toFixed(2) || '0.00'}
                      </div>
                    </div>
                    <div>
                      <div className="text-metax-text-muted text-xs">Wallet Address</div>
                      <div className="text-green-400 font-medium text-xs">
                        {withdrawal.wallet_address ?
                          `${withdrawal.wallet_address.slice(0, 8)}...${withdrawal.wallet_address.slice(-6)}` :
                          'N/A'
                        }
                      </div>
                    </div>
                  </div>

                  {withdrawal.description && (
                    <div className="mt-2 pt-2 border-t border-metax-border-gold/20">
                      <div className="text-metax-text-muted text-xs">Description</div>
                      <div className="text-white text-sm">{withdrawal.description}</div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* New Withdrawal Button */}
          <div className="mt-6">
            <button
              onClick={() => navigate("/dashboard/crypto-withdraw")}
              className="w-full bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 text-lg"
            >
              New Withdrawal
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CryptoWithdrawHistory;
