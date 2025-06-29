import { useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";

const Investment = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const investmentPlans = [
    {
      id: 1,
      name: "Starter Plan",
      minAmount: 100,
      maxAmount: 999,
      dailyReturn: "2.5%",
      totalReturn: "125%",
      duration: "30 days",
      recommended: false,
    },
    {
      id: 2,
      name: "Silver Plan",
      minAmount: 1000,
      maxAmount: 4999,
      dailyReturn: "3.0%",
      totalReturn: "150%",
      duration: "45 days",
      recommended: true,
    },
    {
      id: 3,
      name: "Gold Plan",
      minAmount: 5000,
      maxAmount: 9999,
      dailyReturn: "3.5%",
      totalReturn: "175%",
      duration: "60 days",
      recommended: false,
    },
    {
      id: 4,
      name: "Platinum Plan",
      minAmount: 10000,
      maxAmount: 50000,
      dailyReturn: "4.0%",
      totalReturn: "200%",
      duration: "90 days",
      recommended: false,
    },
  ];

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
              Investment Area
            </h1>
            <p className="text-metax-text-muted">
              Choose your investment plan and start earning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {investmentPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border p-6 relative ${
                  plan.recommended
                    ? "border-metax-gold shadow-lg shadow-metax-gold/20"
                    : "border-metax-border-gold/30"
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-900 to-metax-gold-dark text-white px-4 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>

                  <div className="mb-4">
                    <div className="text-3xl font-bold text-metax-gold mb-1">
                      {plan.dailyReturn}
                    </div>
                    <div className="text-metax-text-muted text-sm">
                      Daily Return
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-metax-text-muted">Min Amount:</span>
                      <span className="text-white font-medium">
                        ${plan.minAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-metax-text-muted">Max Amount:</span>
                      <span className="text-white font-medium">
                        ${plan.maxAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-metax-text-muted">
                        Total Return:
                      </span>
                      <span className="text-metax-gold font-medium">
                        {plan.totalReturn}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-metax-text-muted">Duration:</span>
                      <span className="text-white font-medium">
                        {plan.duration}
                      </span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                      plan.recommended
                        ? "bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white"
                        : "border border-metax-border-gold text-metax-gold hover:bg-metax-gold hover:text-metax-black"
                    }`}
                  >
                    Invest Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Investment Calculator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-metax-text-muted mb-2">
                  Investment Amount ($)
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="block text-metax-text-muted mb-2">
                  Select Plan
                </label>
                <select className="w-full bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white">
                  <option>Choose plan</option>
                  {investmentPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white py-3 rounded-lg font-medium transition-all duration-200">
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Investment;
