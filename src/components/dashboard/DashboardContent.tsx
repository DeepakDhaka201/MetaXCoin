const DashboardContent = () => {
  const metaxCoinData = {
    name: "MetaX Coin",
    symbol: "MXC",
    price: "$0.0006",
    change: "+2.45%",
    changeAmount: "+0.000015",
    isPositive: true,
    marketCap: "$15.6M",
    volume24h: "$234.5K",
    totalSupply: "26,000,000,000",
    circulatingSupply: "13,520,000,000",
    rank: "#1247",
    holders: "12,847",
    contract: "0x742d35Cc6634C0532925a3b8D0b8EFd17d1F3456",
    network: "BSC (BEP-20)",
  };

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
      {/* MetaX Coin Dashboard */}
      <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Price Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                <span className="font-bold text-xl text-white">M</span>
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">MetaX Coin</h3>
                <p className="text-metax-text-muted text-sm">MXC</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-metax-gold text-3xl font-bold">
                  {metaxCoinData.price}
                </div>
                <div
                  className={`text-lg flex items-center ${metaxCoinData.isPositive ? "text-green-400" : "text-red-400"}`}
                >
                  <span className="mr-1">
                    {metaxCoinData.isPositive ? "↗" : "↘"}
                  </span>
                  <span>
                    {metaxCoinData.changeAmount} ({metaxCoinData.change})
                  </span>
                </div>
                <div className="text-metax-text-muted text-sm">24h Change</div>
              </div>
            </div>
          </div>

          {/* Price Graph */}
          <div className="lg:col-span-1">
            <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4 h-full">
              <h4 className="text-white font-medium mb-3">Price Chart (24h)</h4>
              <div className="relative h-32">
                {/* Simple SVG Graph */}
                <svg viewBox="0 0 300 100" className="w-full h-full">
                  <defs>
                    <linearGradient
                      id="priceGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                      <stop
                        offset="100%"
                        stopColor="#D4AF37"
                        stopOpacity="0.05"
                      />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    points="0,80 30,75 60,85 90,70 120,65 150,70 180,60 210,55 240,60 270,50 300,45"
                  />
                  <polyline
                    fill="url(#priceGradient)"
                    points="0,80 30,75 60,85 90,70 120,65 150,70 180,60 210,55 240,60 270,50 300,45 300,100 0,100"
                  />
                </svg>
              </div>
              <div className="flex justify-between text-xs text-metax-text-muted mt-2">
                <span>00:00</span>
                <span>12:00</span>
                <span>24:00</span>
              </div>
            </div>
          </div>

          {/* Key Metadata */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Key Statistics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-metax-text-muted text-sm">
                    Market Cap
                  </span>
                  <span className="text-white font-medium">
                    {metaxCoinData.marketCap}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-metax-text-muted text-sm">
                    24h Volume
                  </span>
                  <span className="text-white font-medium">
                    {metaxCoinData.volume24h}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-metax-text-muted text-sm">
                    Token Holders
                  </span>
                  <span className="text-white font-medium">
                    {metaxCoinData.holders}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Supply Info</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-metax-text-muted text-sm">
                    Total Supply
                  </span>
                  <span className="text-white font-medium">
                    {metaxCoinData.totalSupply}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-metax-text-muted text-sm">
                    Circulating
                  </span>
                  <span className="text-metax-gold font-medium">
                    {metaxCoinData.circulatingSupply}
                  </span>
                </div>
                <div className="w-full bg-metax-black/50 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-amber-900 to-metax-gold-dark h-1.5 rounded-full"
                    style={{ width: "52%" }}
                  ></div>
                </div>
                <div className="text-metax-text-muted text-xs">
                  52% in circulation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
