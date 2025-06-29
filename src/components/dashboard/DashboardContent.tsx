const DashboardContent = () => {
  const balanceCards = [
    { title: "Available Fund", value: "0.00", icon: "💰" },
    { title: "Main Balance", value: "0.00", icon: "🏦" },
    { title: "Self Coin Bonus", value: "0.00", icon: "🪙" },
    { title: "Staking Bonus", value: "0.00", icon: "⚡" },
    { title: "Direct Referral", value: "0.00", icon: "👥" },
    { title: "Level Bonus", value: "0.00", icon: "📈" },
    { title: "Lifetime Reward", value: "0.00", icon: "🏆" },
    { title: "Total Income", value: "0.00", icon: "💎" },
    { title: "My Investment", value: "0.00", icon: "📊" },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Referral Link Section */}
      <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-4 lg:p-6">
        <h3 className="text-white text-base lg:text-lg font-semibold mb-4 text-center">
          Invite your Friends and Earn Rewards Commission
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value="https://metaxcoin.cloud/Register/John99272"
            readOnly
            className="flex-1 w-full sm:w-auto bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-white text-sm lg:text-base"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                "https://metaxcoin.cloud/Register/John99272",
              );
              alert("Link copied to clipboard!");
            }}
            className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
          >
            Copy Link
          </button>
        </div>
      </div>

      {/* Balance Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {balanceCards.map((card, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6 hover:border-metax-gold/60 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-metax-text-muted text-sm mb-2">
                  {card.title}
                </h4>
                <div className="text-metax-gold text-2xl font-bold">
                  $ {card.value}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
                <span className="text-white text-xl">{card.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overview Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Deposit Overview */}
        <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
          <h3 className="text-white text-lg font-semibold mb-6">
            Deposit Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">MXC</span>
                </div>
                <div>
                  <div className="text-white font-medium">$ 100.00</div>
                  <div className="text-metax-text-muted text-sm">
                    Pending Deposit
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">MXC</span>
                </div>
                <div>
                  <div className="text-white font-medium">$ 0.00</div>
                  <div className="text-metax-text-muted text-sm">
                    Complete Deposit
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">MXC</span>
                </div>
                <div>
                  <div className="text-white font-medium">$ 100.00</div>
                  <div className="text-metax-text-muted text-sm">
                    Total Deposit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Withdraw Overview */}
        <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
          <h3 className="text-white text-lg font-semibold mb-6">
            Withdraw Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">MXC</span>
                </div>
                <div>
                  <div className="text-white font-medium">$ 0.00</div>
                  <div className="text-metax-text-muted text-sm">
                    Pending Withdraw
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">MXC</span>
                </div>
                <div>
                  <div className="text-white font-medium">$ 0.00</div>
                  <div className="text-metax-text-muted text-sm">
                    Complete Withdraw
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">MXC</span>
                </div>
                <div>
                  <div className="text-white font-medium">$ 0.00</div>
                  <div className="text-metax-text-muted text-sm">
                    Total Withdraw
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Overview */}
        <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
          <h3 className="text-white text-lg font-semibold mb-6">
            Team Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">👥</span>
                </div>
                <div>
                  <div className="text-white font-medium">0</div>
                  <div className="text-metax-text-muted text-sm">
                    Total Team
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">👤</span>
                </div>
                <div>
                  <div className="text-white font-medium">0</div>
                  <div className="text-metax-text-muted text-sm">
                    My Referrals
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">💰</span>
                </div>
                <div>
                  <div className="text-white font-medium">$ 0.00</div>
                  <div className="text-metax-text-muted text-sm">
                    Total Direct Volume
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">📊</span>
                </div>
                <div>
                  <div className="text-white font-medium">$ 0.00</div>
                  <div className="text-metax-text-muted text-sm">
                    Total Team Volume
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
        <h3 className="text-white text-lg font-semibold mb-6">Profile Info</h3>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-metax-text-muted">Name</span>
              <span className="text-green-400 flex items-center">
                <span className="mr-2">👤</span>
                John
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-metax-text-muted">UserName</span>
              <span className="text-green-400 flex items-center">
                <span className="mr-2">👤</span>
                John99272
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-metax-text-muted">My Sponsor</span>
              <span className="text-green-400 flex items-center">
                <span className="mr-2">🌟</span>
                Abhi29
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-metax-text-muted">ID Status</span>
              <span className="text-red-400 flex items-center">
                <span className="mr-2">🔴</span>
                In-Active
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-metax-text-muted">Joining Date</span>
              <span className="text-blue-400 flex items-center">
                <span className="mr-2">📅</span>
                2025-05-31
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-metax-text-muted">Joining Link</span>
              <span className="text-red-400 cursor-pointer hover:text-red-300 transition-colors">
                Copy
              </span>
            </div>
          </div>
        </div>

        {/* Social Support */}
        <div className="mt-8 text-center">
          <div className="text-metax-text-muted mb-4">
            📱 For Technical Support message on WhatsApp
          </div>
          <div className="flex justify-center space-x-3">
            <button className="w-10 h-10 bg-metax-gold hover:bg-metax-gold-dark rounded-full flex items-center justify-center cursor-pointer transition-colors">
              <span className="text-metax-black font-bold">f</span>
            </button>
            <button className="w-10 h-10 bg-metax-gold hover:bg-metax-gold-dark rounded-full flex items-center justify-center cursor-pointer transition-colors">
              <span className="text-metax-black font-bold">G</span>
            </button>
            <button className="w-10 h-10 bg-metax-gold hover:bg-metax-gold-dark rounded-full flex items-center justify-center cursor-pointer transition-colors">
              <span className="text-metax-black font-bold">📷</span>
            </button>
            <button className="w-10 h-10 bg-metax-gold hover:bg-metax-gold-dark rounded-full flex items-center justify-center cursor-pointer transition-colors">
              <span className="text-metax-black font-bold">🐦</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
