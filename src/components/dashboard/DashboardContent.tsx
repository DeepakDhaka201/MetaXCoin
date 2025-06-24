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
    <main className="min-h-screen overflow-y-auto p-6">
      <div className="max-w-full space-y-6">
        {/* Current Rate Section */}
        <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">MXC</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-metax-gold text-lg font-semibold">
              Current Rate : 0.0006 $
            </div>
          </div>
          <div className="bg-metax-gold-dark/20 px-4 py-2 rounded-lg inline-block">
            <span className="text-metax-text-light">1 USDT = 1563.98 MTX</span>
          </div>
        </div>

        {/* Referral Link Section */}
        <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
          <h3 className="text-white text-lg font-semibold mb-4 text-center">
            Invite your Friends and Earn Rewards Commission
          </h3>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value="https://metaxcoin.cloud/Register/John99272"
              readOnly
              className="flex-1 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white"
            />
            <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
              Copy Link
            </button>
          </div>
        </div>

        {/* Balance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
          <h3 className="text-white text-lg font-semibold mb-6">
            Profile Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-metax-text-muted">Name</span>
                <span className="text-metax-gold">👤 John</span>
              </div>
              <div className="flex justify-between">
                <span className="text-metax-text-muted">UserName</span>
                <span className="text-metax-gold">👤 John99272</span>
              </div>
              <div className="flex justify-between">
                <span className="text-metax-text-muted">My Sponsor</span>
                <span className="text-metax-gold">🌟 Abhi29</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-metax-text-muted">ID Status</span>
                <span className="text-red-400">🔴 In-Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-metax-text-muted">Joining Date</span>
                <span className="text-blue-400">📅 2025-05-31</span>
              </div>
              <div className="flex justify-between">
                <span className="text-metax-text-muted">Joining Link</span>
                <span className="text-red-400 cursor-pointer">Copy</span>
              </div>
            </div>
          </div>

          {/* Social Support */}
          <div className="mt-8 text-center">
            <div className="text-metax-text-muted mb-4">
              📱 For Technical Support message on WhatsApp
            </div>
            <div className="flex justify-center space-x-4">
              <div className="w-10 h-10 bg-metax-gold rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-metax-black">📘</span>
              </div>
              <div className="w-10 h-10 bg-metax-gold rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-metax-black">🔍</span>
              </div>
              <div className="w-10 h-10 bg-metax-gold rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-metax-black">📷</span>
              </div>
              <div className="w-10 h-10 bg-metax-gold rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-metax-black">🐦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
