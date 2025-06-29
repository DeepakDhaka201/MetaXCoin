import { useState } from "react";

const CryptoWithdrawHistory = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCrypto, setSelectedCrypto] = useState("all");

  const withdrawHistory = [
    {
      id: "WD001",
      date: "2024-01-20",
      crypto: "BTC",
      amount: "0.01",
      usdValue: "$1,074.00",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      status: "Completed",
      txHash: "abc123def456ghi789jkl012mno345pqr678stu901vwx234yz",
      networkFee: "0.0005 BTC",
      confirmations: "6/6",
    },
    {
      id: "WD002",
      date: "2024-01-18",
      crypto: "ETH",
      amount: "0.5",
      usdValue: "$1,219.85",
      address: "0x742d35Cc6634C0532925a3b8D0b8EFd17d1F3456",
      status: "Pending",
      txHash: "-",
      networkFee: "0.005 ETH",
      confirmations: "2/12",
    },
    {
      id: "WD003",
      date: "2024-01-15",
      crypto: "USDT",
      amount: "500.00",
      usdValue: "$500.00",
      address: "TQrP4GDPzZuqZzfDgtGNhZVc2KvFdCGF1Q",
      status: "Completed",
      txHash: "def456ghi789jkl012mno345pqr678stu901vwx234yz567abc",
      networkFee: "1 USDT",
      confirmations: "Confirmed",
    },
    {
      id: "WD004",
      date: "2024-01-12",
      crypto: "MXC",
      amount: "10000.00",
      usdValue: "$6.00",
      address: "0x8B4c5bD2cFe4B5F6a9A85F83C1E2D3F4A5B6C7D8E9",
      status: "Failed",
      txHash: "-",
      networkFee: "100 MXC",
      confirmations: "Failed",
    },
    {
      id: "WD005",
      date: "2024-01-10",
      crypto: "BTC",
      amount: "0.005",
      usdValue: "$537.00",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      status: "Completed",
      txHash: "ghi789jkl012mno345pqr678stu901vwx234yz567abcdef123",
      networkFee: "0.0005 BTC",
      confirmations: "6/6",
    },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" },
  ];

  const cryptoOptions = [
    { value: "all", label: "All Cryptocurrencies" },
    { value: "BTC", label: "Bitcoin (BTC)" },
    { value: "ETH", label: "Ethereum (ETH)" },
    { value: "USDT", label: "Tether (USDT)" },
    { value: "MXC", label: "MetaX Coin (MXC)" },
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

  const getCryptoIcon = (crypto: string) => {
    switch (crypto) {
      case "BTC":
        return "₿";
      case "ETH":
        return "Ξ";
      case "USDT":
        return "₮";
      case "MXC":
        return "M";
      default:
        return "🪙";
    }
  };

  const filteredHistory = withdrawHistory.filter((withdrawal) => {
    const statusMatch =
      selectedStatus === "all" ||
      withdrawal.status.toLowerCase() === selectedStatus;
    const cryptoMatch =
      selectedCrypto === "all" || withdrawal.crypto === selectedCrypto;
    return statusMatch && cryptoMatch;
  });

  const totalWithdrawn = withdrawHistory
    .filter((w) => w.status === "Completed")
    .reduce((sum, w) => sum + parseFloat(w.usdValue.replace("$", "")), 0);

  const pendingAmount = withdrawHistory
    .filter((w) => w.status === "Pending")
    .reduce((sum, w) => sum + parseFloat(w.usdValue.replace("$", "")), 0);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
        <h1 className="text-white text-2xl font-bold mb-2">
          Crypto Withdraw History
        </h1>
        <p className="text-metax-text-muted mb-6">
          Track all your cryptocurrency withdrawal requests and transactions
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-metax-text-muted text-sm mb-1">
                  Total Withdrawn
                </h4>
                <div className="text-metax-gold text-2xl font-bold">
                  ${totalWithdrawn.toFixed(2)}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                <span className="text-white text-xl">💸</span>
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
                  {withdrawHistory.length}
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
            <label className="block text-white font-medium mb-2">
              Cryptocurrency
            </label>
            <select
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              className="w-full px-4 py-2 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white"
            >
              {cryptoOptions.map((option) => (
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
                    Asset
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
                {filteredHistory.map((withdrawal) => (
                  <tr
                    key={withdrawal.id}
                    className="border-t border-metax-border-gold/20"
                  >
                    <td className="px-4 py-3 text-white text-sm font-medium">
                      {withdrawal.id}
                    </td>
                    <td className="px-4 py-3 text-white text-sm">
                      {withdrawal.date}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-bold">
                            {getCryptoIcon(withdrawal.crypto)}
                          </span>
                        </div>
                        <span className="text-white text-sm">
                          {withdrawal.crypto}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-metax-gold font-medium">
                        {withdrawal.amount} {withdrawal.crypto}
                      </div>
                      <div className="text-metax-text-muted text-xs">
                        {withdrawal.usdValue}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-metax-text-muted text-sm">
                      {withdrawal.networkFee}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(withdrawal.status)}`}
                      >
                        {withdrawal.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white text-sm">
                      {withdrawal.confirmations}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">
                          View
                        </button>
                        {withdrawal.txHash !== "-" && (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(withdrawal.txHash);
                              alert("Transaction hash copied!");
                            }}
                            className="text-metax-gold hover:text-metax-gold-dark text-sm"
                          >
                            Copy TxHash
                          </button>
                        )}
                        {withdrawal.status === "Failed" && (
                          <button className="text-red-400 hover:text-red-300 text-sm">
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

        {/* Address Details Modal/Section */}
        <div className="mt-6">
          <h3 className="text-white text-lg font-semibold mb-4">
            Transaction Details
          </h3>
          <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
            <p className="text-metax-text-muted text-sm mb-4">
              Click on any transaction to view full details including:
            </p>
            <ul className="text-metax-text-muted text-sm space-y-1">
              <li>• Complete destination wallet address</li>
              <li>• Full transaction hash for blockchain verification</li>
              <li>• Network confirmation progress</li>
              <li>• Estimated completion time</li>
              <li>• Fee breakdown and calculation</li>
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() =>
              (window.location.href = "/dashboard/crypto-withdraw")
            }
            className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            New Withdrawal
          </button>
          <button className="bg-metax-dark-section hover:bg-metax-dark-section/80 text-white px-6 py-3 rounded-lg font-medium border border-metax-border-gold/30 transition-all duration-200">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoWithdrawHistory;
