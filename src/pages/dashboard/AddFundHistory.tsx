import { useState } from "react";

const AddFundHistory = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const depositHistory = [
    {
      id: "DEP001",
      date: "2024-01-20",
      amount: "100.00",
      method: "Bitcoin",
      status: "Pending",
      txHash: "abc123...def456",
      confirmations: "2/3",
      networkFee: "0.0005 BTC",
    },
    {
      id: "DEP002",
      date: "2024-01-18",
      amount: "250.00",
      method: "Bank Transfer",
      status: "Completed",
      txHash: "wire789...xyz012",
      confirmations: "Confirmed",
      networkFee: "$5.00",
    },
    {
      id: "DEP003",
      date: "2024-01-15",
      amount: "75.00",
      method: "Credit Card",
      status: "Completed",
      txHash: "card345...uvw678",
      confirmations: "Confirmed",
      networkFee: "$2.63",
    },
    {
      id: "DEP004",
      date: "2024-01-12",
      amount: "500.00",
      method: "Ethereum",
      status: "Failed",
      txHash: "eth901...stu234",
      confirmations: "Failed",
      networkFee: "0.01 ETH",
    },
    {
      id: "DEP005",
      date: "2024-01-10",
      amount: "150.00",
      method: "USDT",
      status: "Completed",
      txHash: "usdt567...mno890",
      confirmations: "Confirmed",
      networkFee: "1 USDT",
    },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" },
  ];

  const periodOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-900/30 text-green-400";
      case "pending":
        return "bg-yellow-900/30 text-yellow-400";
      case "failed":
        return "bg-red-900/30 text-red-400";
      default:
        return "bg-gray-900/30 text-gray-400";
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "bitcoin":
        return "₿";
      case "ethereum":
        return "Ξ";
      case "usdt":
        return "₮";
      case "bank transfer":
        return "🏦";
      case "credit card":
        return "💳";
      default:
        return "💰";
    }
  };

  const filteredHistory = depositHistory.filter((deposit) => {
    const statusMatch =
      selectedStatus === "all" ||
      deposit.status.toLowerCase() === selectedStatus;
    // Add period filtering logic here if needed
    return statusMatch;
  });

  const totalDeposited = depositHistory
    .filter((d) => d.status === "Completed")
    .reduce((sum, d) => sum + parseFloat(d.amount), 0);

  const pendingAmount = depositHistory
    .filter((d) => d.status === "Pending")
    .reduce((sum, d) => sum + parseFloat(d.amount), 0);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
        <h1 className="text-white text-2xl font-bold mb-2">
          Add Fund Request History
        </h1>
        <p className="text-metax-text-muted mb-6">
          Track all your deposit requests and their status
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-metax-text-muted text-sm mb-1">
                  Total Deposited
                </h4>
                <div className="text-metax-gold text-2xl font-bold">
                  ${totalDeposited.toFixed(2)}
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
                  Pending Amount
                </h4>
                <div className="text-yellow-400 text-2xl font-bold">
                  ${pendingAmount.toFixed(2)}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                <span className="text-white text-xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-metax-text-muted text-sm mb-1">
                  Total Requests
                </h4>
                <div className="text-white text-2xl font-bold">
                  {depositHistory.length}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-white font-medium mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-white font-medium mb-2">Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-2 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white"
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-2 rounded-lg font-medium transition-all duration-200">
              Export CSV
            </button>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-metax-dark-section/60">
                <tr>
                  <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                    Method
                  </th>
                  <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                    Network Fee
                  </th>
                  <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                    Confirmations
                  </th>
                  <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((deposit) => (
                  <tr
                    key={deposit.id}
                    className="border-t border-metax-border-gold/20"
                  >
                    <td className="px-4 py-3 text-white text-sm font-medium">
                      {deposit.id}
                    </td>
                    <td className="px-4 py-3 text-white text-sm">
                      {deposit.date}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">
                          {getMethodIcon(deposit.method)}
                        </span>
                        <span className="text-white text-sm">
                          {deposit.method}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-metax-gold font-medium">
                      ${deposit.amount}
                    </td>
                    <td className="px-4 py-3 text-metax-text-muted text-sm">
                      {deposit.networkFee}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(deposit.status)}`}
                      >
                        {deposit.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white text-sm">
                      {deposit.confirmations}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">
                          View
                        </button>
                        {deposit.status === "Failed" && (
                          <button className="text-metax-gold hover:text-metax-gold-dark text-sm">
                            Retry
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => (window.location.href = "/dashboard/add-fund")}
            className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Make New Deposit
          </button>
          <button className="bg-metax-dark-section hover:bg-metax-dark-section/80 text-white px-6 py-3 rounded-lg font-medium border border-metax-border-gold/30 transition-all duration-200">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFundHistory;
