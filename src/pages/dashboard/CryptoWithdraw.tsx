import { useState } from "react";
import { useCreateWithdrawal, useTransactionLimits } from "@/hooks/useTransactions";
import { useWalletSummary } from "@/hooks/useDashboard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";
import { useSidebar } from "../../hooks/useSidebar";

const CryptoWithdraw = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletType, setWalletType] = useState("available_fund");

  // API hooks
  const createWithdrawal = useCreateWithdrawal();
  const { data: limits } = useTransactionLimits();
  const { data: walletSummary } = useWalletSummary();

  // Get current wallet balance
  const currentBalance = walletSummary?.wallet_summary?.available_fund || 0;
  const minWithdraw = limits?.min_withdrawal || 5;
  const maxWithdraw = limits?.max_withdrawal || 50000;
  const networkFee = 2; // Default network fee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !walletAddress) {
      alert("Please fill in all required fields");
      return;
    }

    const withdrawAmount = parseFloat(amount);

    if (withdrawAmount < minWithdraw) {
      alert(`Minimum withdrawal amount is $${minWithdraw.toFixed(2)}`);
      return;
    }

    if (withdrawAmount > maxWithdraw) {
      alert(`Maximum withdrawal amount is $${maxWithdraw.toFixed(2)}`);
      return;
    }

    if (withdrawAmount > currentBalance) {
      alert("Insufficient balance");
      return;
    }

    try {
      await createWithdrawal.mutateAsync({
        amount: withdrawAmount,
        wallet_address: walletAddress,
        wallet_type: walletType,
        description: `Withdrawal to ${walletAddress}`,
      });

      // Reset form on success
      setAmount("");
      setWalletAddress("");
    } catch (error) {
      // Error is handled by the mutation
      console.error('Withdrawal error:', error);
    }
  };

  const handleMaxAmount = () => {
    const maxWithdrawable = Math.max(0, currentBalance - networkFee);
    setAmount(maxWithdrawable.toString());
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
        <div className="p-4 max-w-md mx-auto lg:max-w-2xl">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">
              Withdraw USDT
            </h1>
            <p className="text-metax-text-muted text-sm">
              Send USDT to your external wallet
            </p>
          </div>

          {/* Balance Card */}
          <div className="bg-metax-dark-section rounded-lg border border-metax-border-gold/30 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xl font-bold">₮</span>
                </div>
                <div>
                  <h3 className="text-white font-bold">USDT</h3>
                  <p className="text-metax-text-muted text-xs">TRC-20</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-metax-gold text-xl font-bold">
                  {currentBalance.toLocaleString()}
                </div>
                <div className="text-metax-text-muted text-xs">
                  Available
                </div>
              </div>
            </div>
          </div>

          {/* Simple Withdrawal Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount Input */}
            <div>
              <label className="block text-white font-medium mb-2">
                Amount (USDT)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Min: ${minWithdraw} USDT`}
                  step="0.01"
                  min={minWithdraw}
                  max={currentBalance}
                  className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white placeholder-metax-text-muted focus:border-metax-gold focus:outline-none text-lg"
                  required
                />
                <button
                  type="button"
                  onClick={handleMaxAmount}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-metax-gold text-sm hover:text-metax-gold-dark font-medium"
                >
                  MAX
                </button>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-metax-text-muted">
                  Available: {currentBalance.toLocaleString()} USDT
                </span>
                <span className="text-metax-text-muted">
                  Fee: {networkFee} USDT
                </span>
              </div>
            </div>

            {/* Wallet Address Input */}
            <div>
              <label className="block text-white font-medium mb-2">
                TRON Wallet Address
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter TRC-20 address"
                className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white placeholder-metax-text-muted focus:border-metax-gold focus:outline-none font-mono text-sm"
                required
              />
              <p className="text-metax-text-muted text-xs mt-1">
                Only TRC-20 compatible addresses
              </p>
            </div>

            {/* Summary */}
            {amount && walletAddress && (
              <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-metax-text-muted">Amount:</span>
                    <span className="text-white">{amount} USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-metax-text-muted">Fee:</span>
                    <span className="text-red-400">-{networkFee} USDT</span>
                  </div>
                  <div className="flex justify-between border-t border-metax-border-gold/20 pt-2">
                    <span className="text-white font-medium">You receive:</span>
                    <span className="text-metax-gold font-bold">
                      {(parseFloat(amount || "0") - networkFee).toFixed(2)} USDT
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 text-lg"
            >
              Withdraw USDT
            </button>

            {/* Clear Button */}
            <button
              type="button"
              onClick={() => {
                setAmount("");
                setWalletAddress("");
              }}
              className="w-full bg-metax-dark-section hover:bg-metax-dark-section/80 text-white py-3 px-6 rounded-lg font-medium border border-metax-border-gold/30 transition-all duration-200"
            >
              Clear Form
            </button>
          </form>

          {/* Simple Info */}
          <div className="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-medium mb-2 flex items-center">
              💡 Important Info
            </h4>
            <ul className="space-y-1 text-metax-text-muted text-sm">
              <li>• Minimum: {minWithdraw} USDT</li>
              <li>• Network fee: {networkFee} USDT</li>
              <li>• Processing: 24 hours</li>
              <li>• Only TRC-20 addresses</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CryptoWithdraw;
