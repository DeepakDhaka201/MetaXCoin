import { useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";
import { useWalletSummary } from "@/hooks/useDashboard";
import { useInvestmentPackages, usePurchaseInvestment } from "@/hooks/useInvestment";
import { InvestmentPackage } from "@/types/api";
import { toast } from "@/hooks/use-toast";
import { useSidebar } from "../../hooks/useSidebar";

const Investment = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [selectedPackage, setSelectedPackage] = useState<InvestmentPackage | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Fetch data from APIs
  const { data: walletSummary, isLoading: walletLoading } = useWalletSummary();
  const { data: packagesData, isLoading: packagesLoading } = useInvestmentPackages();
  const purchaseInvestmentMutation = usePurchaseInvestment();

  // Get available balance from wallet summary
  const availableBalance = walletSummary?.wallet_summary?.available_fund || 0;

  const handleInvestNow = (pkg: InvestmentPackage) => {
    setSelectedPackage(pkg);
    setInvestmentAmount(pkg.min_amount.toString());
    setShowPurchaseModal(true);
  };

  const handlePurchaseInvestment = async () => {
    if (!selectedPackage) return;

    const amount = parseFloat(investmentAmount);

    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid investment amount",
        variant: "destructive",
      });
      return;
    }

    if (amount < selectedPackage.min_amount) {
      toast({
        title: "Amount Too Low",
        description: `Minimum investment amount is $${selectedPackage.min_amount}`,
        variant: "destructive",
      });
      return;
    }

    if (amount > selectedPackage.max_amount) {
      toast({
        title: "Amount Too High",
        description: `Maximum investment amount is $${selectedPackage.max_amount}`,
        variant: "destructive",
      });
      return;
    }

    if (amount > availableBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough available funds for this investment",
        variant: "destructive",
      });
      return;
    }

    try {
      await purchaseInvestmentMutation.mutateAsync({
        package_id: selectedPackage.id,
        amount: amount,
      });

      setShowPurchaseModal(false);
      setSelectedPackage(null);
      setInvestmentAmount("");
    } catch (error) {
      // Error handling is done in the mutation
    }
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
              Investment Packages
            </h1>
            <p className="text-metax-text-muted">
              Choose from our available investment packages and start earning daily returns
            </p>
          </div>

          {/* Available Balance */}
          <div className="mb-8 text-center">
            <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6 max-w-md mx-auto">
              <h3 className="text-metax-text-muted text-sm mb-2">Available Balance</h3>
              <div className="text-3xl font-bold text-metax-gold">
                ${availableBalance.toFixed(2)}
              </div>
              <p className="text-metax-text-muted text-sm mt-2">Ready to invest</p>
            </div>
          </div>

          {/* Loading State */}
          {(walletLoading || packagesLoading) && (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metax-gold mx-auto mb-4"></div>
                <p className="text-metax-text-light">Loading investment packages...</p>
              </div>
            </div>
          )}

          {/* Investment Packages */}
          {!walletLoading && !packagesLoading && packagesData?.packages && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {packagesData.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border p-6 transition-all duration-300 hover:shadow-xl ${
                    pkg.is_featured
                      ? 'border-metax-gold/50 hover:border-metax-gold'
                      : 'border-metax-border-gold/30 hover:border-metax-gold/50'
                  }`}
                >
                  {pkg.is_featured && (
                    <div className="bg-gradient-to-r from-metax-gold to-metax-gold-dark text-metax-black text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
                      FEATURED
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-metax-text-muted text-sm mb-4 line-clamp-2">{pkg.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-metax-text-muted">Total Return:</span>
                      <span className="text-metax-gold font-semibold">{pkg.total_return_percentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-metax-text-muted">Duration:</span>
                      <span className="text-white">{pkg.duration_days} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-metax-text-muted">Daily Return:</span>
                      <span className="text-green-400">{pkg.daily_return_rate.toFixed(3)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-metax-text-muted">Min Amount:</span>
                      <span className="text-white">${pkg.min_amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-metax-text-muted">Max Amount:</span>
                      <span className="text-white">${pkg.max_amount.toLocaleString()}</span>
                    </div>
                  </div>



                  <button
                    onClick={() => handleInvestNow(pkg)}
                    disabled={!pkg.is_available || pkg.status !== 'active'}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      pkg.is_available && pkg.status === 'active'
                        ? 'bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {pkg.is_available && pkg.status === 'active' ? 'Invest Now' : 'Not Available'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* No Packages Available */}
          {!walletLoading && !packagesLoading && (!packagesData?.packages || packagesData.packages.length === 0) && (
            <div className="text-center py-12">
              <div className="text-metax-text-muted text-lg mb-4">No investment packages available at the moment</div>
              <p className="text-metax-text-muted">Please check back later for new investment opportunities</p>
            </div>
          )}

          {/* Purchase Modal */}
          {showPurchaseModal && selectedPackage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-metax-dark-section rounded-xl border border-metax-border-gold/30 p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-white mb-4">
                  Invest in {selectedPackage.name}
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="bg-metax-black/30 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-metax-text-muted">Package:</span>
                      <span className="text-white">{selectedPackage.name}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-metax-text-muted">Total Return:</span>
                      <span className="text-metax-gold">{selectedPackage.total_return_percentage}%</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-metax-text-muted">Duration:</span>
                      <span className="text-white">{selectedPackage.duration_days} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-metax-text-muted">Daily Return:</span>
                      <span className="text-green-400">{selectedPackage.daily_return_rate.toFixed(3)}%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">Investment Amount ($)</label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      min={selectedPackage.min_amount}
                      max={Math.min(selectedPackage.max_amount, availableBalance)}
                      step="0.01"
                      className="w-full bg-metax-black border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white focus:border-metax-gold focus:outline-none"
                      placeholder={`Min: $${selectedPackage.min_amount}`}
                    />
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-metax-text-muted">
                        Min: ${selectedPackage.min_amount}
                      </span>
                      <span className="text-metax-text-muted">
                        Max: ${Math.min(selectedPackage.max_amount, availableBalance).toLocaleString()}
                        {availableBalance === 0 && (
                          <span className="text-red-400 ml-2">(No funds available)</span>
                        )}
                      </span>
                    </div>
                    {availableBalance === 0 && (
                      <div className="text-red-400 text-sm mt-2">
                        You need to add funds to your Available Fund wallet before making an investment.
                      </div>
                    )}
                  </div>

                  {investmentAmount && !isNaN(parseFloat(investmentAmount)) && (
                    <div className="bg-metax-black/30 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-metax-text-muted">Investment:</span>
                        <span className="text-white">${parseFloat(investmentAmount).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-metax-text-muted">Expected Total Return:</span>
                        <span className="text-metax-gold">
                          ${(parseFloat(investmentAmount) * selectedPackage.total_return_percentage / 100).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-metax-text-muted">Expected Daily Return:</span>
                        <span className="text-green-400">
                          ${(parseFloat(investmentAmount) * selectedPackage.daily_return_rate / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setShowPurchaseModal(false);
                      setSelectedPackage(null);
                      setInvestmentAmount("");
                    }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePurchaseInvestment}
                    disabled={purchaseInvestmentMutation.isPending || availableBalance === 0}
                    className="flex-1 bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {purchaseInvestmentMutation.isPending ? 'Processing...' :
                     availableBalance === 0 ? 'Insufficient Funds' : 'Confirm Investment'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Investment;
