import { useState, useEffect } from "react";
import { useDashboardSummary, useWalletSummary, useMXCPrice, useMXCChart } from "@/hooks/useDashboard";
import { useTransactionStatistics } from "@/hooks/useTransactions";
import { useTeamStats, useReferralLink, useReferralConfig } from "@/hooks/useTeam";
import { useAuth } from "@/contexts/AuthContext";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import {
  WalletIcon,
  CoinIcon,
  UsersIcon,
  TrendUpIcon,
  DiamondIcon,
  ChartIcon,
  TrendDownIcon,
  UserIcon,
  StarIcon,
  CalendarIcon,
  PhoneIcon,
  PendingIcon,
  CompleteIcon,
  TotalIcon,
} from "../icons/DashboardIcons";
import { BRAND } from "@/constants/brand";

const DashboardContent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch real data from API - Use only new investment system APIs
  const { data: dashboardSummary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: walletSummaryData, isLoading: walletSummaryLoading } = useWalletSummary();
  // Remove balancesData - using walletSummaryData instead
  const { data: mxcPrice, isLoading: priceLoading } = useMXCPrice();
  const { data: chartData, isLoading: chartLoading } = useMXCChart('24h');
  // Remove dashboardStats - using transactionStats instead
  const { data: transactionStats, isLoading: transactionStatsLoading } = useTransactionStatistics();
  const { data: teamStats, isLoading: teamStatsLoading } = useTeamStats();
  const { data: referralData } = useReferralLink();
  const { data: referralConfig } = useReferralConfig();
  const { user } = useAuth();

  // Update current time
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const metaxCoinData = {
    name: BRAND.COIN_NAME,
    symbol: BRAND.COIN_SYMBOL,
    price: mxcPrice?.price ? `$${mxcPrice.price.toFixed(6)}` : "$0.000000",
    change: mxcPrice?.price_change_percentage_24h !== undefined ? `${mxcPrice.price_change_percentage_24h >= 0 ? '+' : ''}${mxcPrice.price_change_percentage_24h.toFixed(2)}%` : "+0.00%",
    changeAmount: mxcPrice?.price_change_24h !== undefined ? `${mxcPrice.price_change_24h >= 0 ? '+' : ''}${mxcPrice.price_change_24h.toFixed(6)}` : "+0.000000",
    isPositive: mxcPrice?.price_change_percentage_24h !== undefined ? mxcPrice.price_change_percentage_24h >= 0 : true,
    marketCap: mxcPrice?.market_cap ? `$${(mxcPrice.market_cap / 1000000).toFixed(1)}M` : "$0.0M",
    volume24h: mxcPrice?.volume_24h ? `$${(mxcPrice.volume_24h / 1000).toFixed(1)}K` : "$0.0K",
    rank: mxcPrice?.rank || "#1247",
    holders: mxcPrice?.holders ? mxcPrice.holders.toLocaleString() : "12,847",
    transactions24h: mxcPrice?.transactions_24h ? mxcPrice.transactions_24h.toLocaleString() : "1,247",
  };

  // Use new simplified wallet structure (6 wallets) or fallback to legacy (9 wallets)
  const balanceCards = walletSummaryData?.success ? [
    {
      title: "Available Fund",
      value: walletSummaryData.wallet_summary.available_fund?.toFixed(2) || "0.00",
      icon: <WalletIcon className="w-6 h-6" />,
      description: "Withdrawable money"
    },
    {
      title: "Total Investment",
      value: walletSummaryData.wallet_summary.total_investment?.toFixed(2) || "0.00",
      icon: <ChartIcon className="w-6 h-6" />,
      description: "Currently invested amount"
    },
    {
      title: "Total Gain",
      value: walletSummaryData.wallet_summary.total_gain?.toFixed(2) || "0.00",
      icon: <CoinIcon className="w-6 h-6" />,
      description: "Daily investment returns"
    },
    {
      title: "Total Referral",
      value: walletSummaryData.wallet_summary.total_referral?.toFixed(2) || "0.00",
      icon: <UsersIcon className="w-6 h-6" />,
      description: "Direct referral commissions"
    },
    {
      title: "Level Bonus",
      value: walletSummaryData.wallet_summary.level_bonus?.toFixed(2) || "0.00",
      icon: <TrendUpIcon className="w-6 h-6" />,
      description: "Multi-level commissions"
    },
    {
      title: "Total Income",
      value: walletSummaryData.wallet_summary.total_income?.toFixed(2) || "0.00",
      icon: <DiamondIcon className="w-6 h-6" />,
      description: "Gain + Referral + Level Bonus"
    },
  ] : [
    // Fallback when wallet summary is not available
    {
      title: "Available Fund",
      value: "0.00",
      icon: <WalletIcon className="w-6 h-6" />,
      description: "Withdrawable money"
    },
    {
      title: "Total Investment",
      value: "0.00",
      icon: <ChartIcon className="w-6 h-6" />,
      description: "Currently invested amount"
    },
    {
      title: "Total Gain",
      value: "0.00",
      icon: <CoinIcon className="w-6 h-6" />,
      description: "Daily investment returns"
    },
    {
      title: "Total Referral",
      value: "0.00",
      icon: <UsersIcon className="w-6 h-6" />,
      description: "Direct referral commissions"
    },
    {
      title: "Level Bonus",
      value: "0.00",
      icon: <TrendUpIcon className="w-6 h-6" />,
      description: "Multi-level commissions"
    },
    {
      title: "Total Income",
      value: "0.00",
      icon: <DiamondIcon className="w-6 h-6" />,
      description: "Gain + Referral + Level Bonus"
    },
  ];

  // Show loading state while data is being fetched
  if (summaryLoading || walletSummaryLoading || priceLoading || chartLoading || transactionStatsLoading || teamStatsLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-metax-gold mx-auto mb-4"></div>
            <p className="text-metax-text-light">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* MetaX Coin Dashboard */}
      <div className="relative">
        {/* Live indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-xs text-metax-text-muted">LIVE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {/* Price Section */}
          <div className="lg:col-span-1 order-1 lg:order-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3 animate-pulse overflow-hidden">
                  <img
                    src={BRAND.LOGO_URL}
                    alt={BRAND.COIN_NAME}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">{BRAND.COIN_NAME}</h3>
                  <p className="text-metax-text-muted text-sm flex items-center">
                    {BRAND.COIN_SYMBOL}
                    <span className="ml-2 text-xs bg-metax-gold/20 text-metax-gold px-2 py-1 rounded">
                      {metaxCoinData.rank}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-metax-dark-section/60 to-metax-black/40 border border-metax-border-gold/30 rounded-xl p-6 shadow-lg backdrop-blur-sm hover:border-metax-gold/50 transition-all duration-300">
                <div className="text-metax-gold text-4xl font-bold mb-2 font-mono tracking-tight">
                  {metaxCoinData.price}
                </div>
                <div
                  className={`text-lg flex items-center transition-all duration-300 ${metaxCoinData.isPositive ? "text-green-400" : "text-red-400"}`}
                >
                  <span className="mr-2">
                    {metaxCoinData.isPositive ? (
                      <TrendUpIcon className="w-5 h-5" />
                    ) : (
                      <TrendDownIcon className="w-5 h-5" />
                    )}
                  </span>
                  <span className="font-mono">
                    {metaxCoinData.changeAmount} ({metaxCoinData.change})
                  </span>
                </div>
                <div className="text-metax-text-muted text-sm flex items-center justify-between mt-2">
                  <span>24h Change</span>
                  <span className="text-xs">{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 border border-metax-border-gold/25 rounded-xl p-4 hover:border-metax-gold/40 transition-all duration-300 shadow-md">
                  <div className="text-metax-text-muted text-sm font-medium">24h Volume</div>
                  <div className="text-white font-bold text-lg mt-1">{metaxCoinData.volume24h}</div>
                </div>
                <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 border border-metax-border-gold/25 rounded-xl p-4 hover:border-metax-gold/40 transition-all duration-300 shadow-md">
                  <div className="text-metax-text-muted text-sm font-medium">Market Cap</div>
                  <div className="text-white font-bold text-lg mt-1">{metaxCoinData.marketCap}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Price Graph */}
          <div className="lg:col-span-1 order-3 lg:order-2">
            <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4 h-full">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">Price Chart (24h)</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-metax-text-muted">Live</span>
                </div>
              </div>

              <div className="relative h-40 mb-4">
                {chartData && chartData.data_points ? (
                  <ChartContainer
                    config={{
                      price: {
                        label: "Price",
                        color: "#D4AF37",
                      },
                    }}
                    className="h-full w-full"
                  >
                    <AreaChart
                      data={chartData.data_points.map(point => ({
                        time: new Date(point.timestamp).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false
                        }),
                        price: parseFloat(point.price.toString()),
                        volume: point.volume
                      }))}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.4} />
                          <stop offset="50%" stopColor="#D4AF37" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#D4AF37" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#9CA3AF' }}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        domain={['dataMin', 'dataMax']}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#9CA3AF' }}
                        tickFormatter={(value) => `$${value.toFixed(6)}`}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            className="bg-metax-dark-section border-metax-border-gold/30"
                            formatter={(value) => [
                              `$${parseFloat(value.toString()).toFixed(6)}`,
                              'Price'
                            ]}
                            labelFormatter={(label) => `Time: ${label}`}
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#D4AF37"
                        strokeWidth={2}
                        fill="url(#priceGradient)"
                        dot={false}
                        activeDot={{ r: 4, fill: "#FFD700" }}
                      />
                    </AreaChart>
                  </ChartContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-metax-gold mx-auto mb-2"></div>
                      <p className="text-metax-text-muted text-sm">Loading chart data...</p>
                    </div>
                  </div>
                )}

                {/* Price indicators */}
                {chartData && chartData.price_range && (
                  <>
                    <div className="absolute top-2 right-2 text-xs text-metax-text-muted">
                      High: ${chartData.price_range.max.toFixed(6)}
                    </div>
                    <div className="absolute bottom-2 right-2 text-xs text-metax-text-muted">
                      Low: ${chartData.price_range.min.toFixed(6)}
                    </div>
                  </>
                )}
              </div>

              {chartData && chartData.data_points && chartData.data_points.length > 0 && (
                <div className="flex justify-between text-xs text-metax-text-muted">
                  <span>
                    {new Date(chartData.data_points[0].timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </span>
                  <span>
                    {new Date(chartData.data_points[Math.floor(chartData.data_points.length * 0.25)].timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </span>
                  <span>
                    {new Date(chartData.data_points[Math.floor(chartData.data_points.length * 0.5)].timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </span>
                  <span>
                    {new Date(chartData.data_points[Math.floor(chartData.data_points.length * 0.75)].timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </span>
                  <span>
                    {new Date(chartData.data_points[chartData.data_points.length - 1].timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </span>
                </div>
              )}

              {/* Trading volume bar */}
              <div className="mt-3 pt-3 border-t border-metax-border-gold/20">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-metax-text-muted">Volume</span>
                  <span className="text-metax-gold">{metaxCoinData.volume24h}</span>
                </div>
                <div className="w-full bg-metax-black/50 rounded-full h-1 mt-1">
                  <div className="bg-gradient-to-r from-metax-gold to-metax-gold-dark h-1 rounded-full animate-pulse" style={{ width: "68%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Key Statistics */}
          <div className="lg:col-span-1 space-y-6 order-2 lg:order-3">
            <div className="bg-gradient-to-br from-metax-dark-section/60 to-metax-black/40 border border-metax-border-gold/30 rounded-xl p-6 shadow-lg backdrop-blur-sm hover:border-metax-gold/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">Market Data</h4>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-metax-text-muted text-sm flex items-center">
                    <ChartIcon className="w-4 h-4 mr-2" />
                    Market Cap
                  </span>
                  <span className="text-white font-medium font-mono">
                    {metaxCoinData.marketCap}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-metax-text-muted text-sm flex items-center">
                    <TrendUpIcon className="w-4 h-4 mr-2" />
                    24h Volume
                  </span>
                  <span className="text-metax-gold font-medium font-mono">
                    {metaxCoinData.volume24h}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-metax-text-muted text-sm flex items-center">
                    <UsersIcon className="w-4 h-4 mr-2" />
                    Holders
                  </span>
                  <span className="text-green-400 font-medium">
                    {metaxCoinData.holders}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-metax-text-muted text-sm flex items-center">
                    <ChartIcon className="w-4 h-4 mr-2" />
                    24h Transactions
                  </span>
                  <span className="text-blue-400 font-medium">
                    {metaxCoinData.transactions24h}
                  </span>
                </div>
              </div>
            </div>




          </div>
        </div>
      </div>

      {/* Referral Program Banner */}
      <div className="bg-gradient-to-r from-amber-900/20 via-metax-gold/10 to-amber-900/20 rounded-xl border border-metax-gold/40 p-6 lg:p-8 mb-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-metax-gold to-metax-gold-dark rounded-full mb-4">
            <UsersIcon className="w-8 h-8 text-metax-black" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            Earn Up to {referralConfig?.commission_structure?.total_commission || 18}% Commission
          </h2>
          <p className="text-metax-text-muted text-lg">
            Invite friends and earn from their investments across {referralConfig?.commission_structure?.max_levels || 5} levels
          </p>
        </div>

        {/* Commission Structure */}
        <div className={`grid gap-2 lg:gap-4 mb-6 ${referralConfig?.commission_structure?.levels ? `grid-cols-${referralConfig.commission_structure.levels.length}` : 'grid-cols-5'}`}>
          {(referralConfig?.commission_structure?.levels || [
            { level: 1, rate: 7, color: 'from-green-500 to-green-600' },
            { level: 2, rate: 5, color: 'from-blue-500 to-blue-600' },
            { level: 3, rate: 3, color: 'from-purple-500 to-purple-600' },
            { level: 4, rate: 2, color: 'from-orange-500 to-orange-600' },
            { level: 5, rate: 1, color: 'from-red-500 to-red-600' },
          ]).map((item) => (
            <div key={item.level} className="text-center">
              <div className={`bg-gradient-to-r ${item.color} rounded-lg p-3 lg:p-4 mb-2`}>
                <div className="text-white font-bold text-lg lg:text-xl">
                  {item.rate}%
                </div>
              </div>
              <div className="text-metax-text-muted text-xs lg:text-sm">
                Level {item.level}
              </div>
            </div>
          ))}
        </div>

        {/* Referral Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-metax-dark-section/40 rounded-lg p-4 text-center">
            <div className="text-metax-gold text-xl lg:text-2xl font-bold">
              {referralData?.total_referrals || teamStats?.direct_referrals || 0}
            </div>
            <div className="text-metax-text-muted text-sm">Total Referrals</div>
          </div>
          <div className="bg-metax-dark-section/40 rounded-lg p-4 text-center">
            <div className="text-green-400 text-xl lg:text-2xl font-bold">
              {referralData?.successful_registrations || teamStats?.active_members || 0}
            </div>
            <div className="text-metax-text-muted text-sm">Active Members</div>
          </div>
          <div className="bg-metax-dark-section/40 rounded-lg p-4 text-center">
            <div className="text-blue-400 text-xl lg:text-2xl font-bold">
              {referralData?.conversion_rate?.toFixed(1) || '0.0'}%
            </div>
            <div className="text-metax-text-muted text-sm">Conversion Rate</div>
          </div>
          <div className="bg-metax-dark-section/40 rounded-lg p-4 text-center">
            <div className="text-purple-400 text-xl lg:text-2xl font-bold">
              ${teamStats?.commission_earned?.toFixed(2) || '0.00'}
            </div>
            <div className="text-metax-text-muted text-sm">Total Earned</div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-metax-dark-section/60 rounded-lg p-4 lg:p-6">
          <h3 className="text-white text-lg font-semibold mb-4 text-center">
            Your Referral Link
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              value={referralData?.referral_link || user?.referral_link || "Loading..."}
              readOnly
              className="flex-1 w-full bg-metax-black border border-metax-border-gold/30 rounded-lg px-4 py-3 text-white text-sm lg:text-base"
            />
            <button
              onClick={(e) => {
                const link = referralData?.referral_link || user?.referral_link;
                if (link) {
                  navigator.clipboard.writeText(link);
                  // Show success message
                  const button = e.target as HTMLButtonElement;
                  const originalText = button.textContent;
                  button.textContent = 'Copied!';
                  button.classList.add('bg-green-600');
                  setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('bg-green-600');
                  }, 2000);
                } else {
                  alert("Referral link not available yet. Please try again later.");
                }
              }}
              disabled={!referralData?.referral_link && !user?.referral_link}
              className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Copy Link
            </button>
          </div>

          {/* Quick Share Options */}
          <div className="mt-4 text-center">
            <p className="text-metax-text-muted text-sm mb-3">Quick Share:</p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => {
                  const link = referralData?.referral_link || user?.referral_link;
                  if (link) {
                    const text = `Join ${BRAND.COIN_NAME} and start earning! Use my referral link: ${link}`;
                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
                    window.open(whatsappUrl, '_blank');
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                title="Share on WhatsApp"
              >
                <span className="text-sm font-bold">WA</span>
              </button>
              <button
                onClick={() => {
                  const link = referralData?.referral_link || user?.referral_link;
                  if (link) {
                    const text = `Join ${BRAND.COIN_NAME} and start earning! Use my referral link: ${link}`;
                    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
                    window.open(telegramUrl, '_blank');
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                title="Share on Telegram"
              >
                <span className="text-sm font-bold">TG</span>
              </button>
              <button
                onClick={() => {
                  const link = referralData?.referral_link || user?.referral_link;
                  if (link && navigator.share) {
                    navigator.share({
                      title: `Join ${BRAND.COIN_NAME}`,
                      text: `Join ${BRAND.COIN_NAME} and start earning!`,
                      url: link,
                    });
                  } else if (link) {
                    // Fallback for browsers that don't support Web Share API
                    navigator.clipboard.writeText(link);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="bg-metax-gold hover:bg-metax-gold-dark text-metax-black p-2 rounded-lg transition-colors"
                title="Share"
              >
                <span className="text-sm font-bold">📤</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {balanceCards.map((card, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-metax-dark-section/60 via-metax-dark-section/40 to-metax-black/30 rounded-2xl border border-metax-border-gold/40 p-6 hover:border-metax-gold/70 hover:shadow-2xl hover:shadow-metax-gold/10 transition-all duration-500 transform hover:-translate-y-1 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between">
              {/* Content on the left */}
              <div className="flex-1 min-w-0 pr-4">
                <h4 className="text-metax-text-muted text-sm font-medium uppercase tracking-wide leading-tight mb-3">
                  {card.title}
                </h4>
                <div className="text-metax-gold text-2xl font-bold tracking-tight">
                  $ {card.value}
                </div>
                {(card as any).description && (
                  <p className="text-metax-text-muted text-xs mt-2 leading-relaxed">
                    {(card as any).description}
                  </p>
                )}
              </div>

              {/* Icon on the right */}
              <div className="w-12 h-12 bg-gradient-to-br from-metax-gold via-metax-gold-dark to-amber-900 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white">{card.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>



      {/* Overview Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {/* Deposit Overview */}
        <div className="bg-gradient-to-br from-metax-dark-section/60 via-metax-dark-section/40 to-metax-black/30 rounded-2xl border border-metax-border-gold/40 p-8 shadow-xl backdrop-blur-sm hover:border-metax-gold/60 transition-all duration-300">
          <h3 className="text-white text-lg font-semibold mb-6">
            Deposit Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <PendingIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">
                    {transactionStats?.deposit?.pending || 0}
                  </div>
                  <div className="text-metax-text-muted text-sm">
                    Pending Deposit
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <CompleteIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">
                    {transactionStats?.deposit?.completed || 0}
                  </div>
                  <div className="text-metax-text-muted text-sm">
                    Complete Deposit
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <TotalIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">
                    $ {transactionStats?.total_deposits?.toFixed(2) || "0.00"}
                  </div>
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
                  <PendingIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">
                    {transactionStats?.withdrawal?.pending || 0}
                  </div>
                  <div className="text-metax-text-muted text-sm">
                    Pending Withdraw
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <CompleteIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">
                    {transactionStats?.withdrawal?.completed || 0}
                  </div>
                  <div className="text-metax-text-muted text-sm">
                    Complete Withdraw
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <TotalIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">
                    $ {transactionStats?.total_withdrawals?.toFixed(2) || "0.00"}
                  </div>
                  <div className="text-metax-text-muted text-sm">
                    Total Withdraw
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Overview */}
        <div className="bg-gradient-to-br from-metax-dark-section/60 via-metax-dark-section/40 to-metax-black/30 rounded-2xl border border-metax-border-gold/40 p-8 shadow-xl backdrop-blur-sm hover:border-metax-gold/60 transition-all duration-300">
          <h3 className="text-white text-lg font-semibold mb-6">
            Team Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <UsersIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">
                    {teamStats?.total_team || dashboardSummary?.team_summary?.total_team_size || 0}
                  </div>
                  <div className="text-metax-text-muted text-sm">
                    Total Team
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">
                    {teamStats?.direct_referrals || dashboardSummary?.team_summary?.direct_referrals || 0}
                  </div>
                  <div className="text-metax-text-muted text-sm">
                    My Referrals
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <WalletIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">
                    $ {teamStats?.commission_earned?.toFixed(2) || dashboardSummary?.team_summary?.total_commission?.toFixed(2) || "0.00"}
                  </div>
                  <div className="text-metax-text-muted text-sm">
                    Total Direct Volume
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <ChartIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">
                    $ {teamStats?.team_investment?.toFixed(2) || "0.00"}
                  </div>
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
      <div className="bg-gradient-to-br from-metax-dark-section/60 via-metax-dark-section/40 to-metax-black/30 rounded-2xl border border-metax-border-gold/40 p-8 shadow-xl backdrop-blur-sm hover:border-metax-gold/60 transition-all duration-300">
        <h3 className="text-white text-lg font-semibold mb-6">Profile Info</h3>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-metax-text-muted">Name</span>
              <span className="text-green-400 flex items-center">
                <UserIcon className="w-4 h-4 mr-2" />
                {user?.full_name || dashboardSummary?.user_info?.full_name || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-metax-text-muted">UserName</span>
              <span className="text-green-400 flex items-center">
                <UserIcon className="w-4 h-4 mr-2" />
                {user?.username || dashboardSummary?.user_info?.username || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-metax-text-muted">My Sponsor</span>
              <span className="text-green-400 flex items-center">
                <StarIcon className="w-4 h-4 mr-2" />
                {user?.sponsor_info?.sponsor_username || user?.referred_by || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-metax-text-muted">ID Status</span>
              <span className={`flex items-center ${(user?.is_verified || dashboardSummary?.user_info?.is_verified) ? 'text-green-400' : 'text-red-400'}`}>
                <div className={`w-3 h-3 rounded-full mr-2 ${(user?.is_verified || dashboardSummary?.user_info?.is_verified) ? 'bg-green-400' : 'bg-red-400'}`}></div>
                {(user?.is_verified || dashboardSummary?.user_info?.is_verified) ? 'Active' : 'In-Active'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-metax-text-muted">Joining Date</span>
              <span className="text-blue-400 flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-metax-text-muted">Referral Code</span>
              <span className="text-metax-gold font-mono">
                {referralData?.referral_code || user?.username || "Loading..."}
              </span>
            </div>
          </div>
        </div>

        {/* Social Support */}
        <div className="mt-8 text-center">
          <div className="text-metax-text-muted mb-4 flex items-center justify-center">
            <PhoneIcon className="w-4 h-4 mr-2" />
            For Technical Support message on WhatsApp
          </div>
          <div className="flex justify-center space-x-3">
            <button className="w-10 h-10 bg-metax-gold hover:bg-metax-gold-dark rounded-full flex items-center justify-center cursor-pointer transition-colors">
              <span className="text-metax-black font-bold text-sm">f</span>
            </button>
            <button className="w-10 h-10 bg-metax-gold hover:bg-metax-gold-dark rounded-full flex items-center justify-center cursor-pointer transition-colors">
              <span className="text-metax-black font-bold text-sm">G</span>
            </button>
            <button className="w-10 h-10 bg-metax-gold hover:bg-metax-gold-dark rounded-full flex items-center justify-center cursor-pointer transition-colors">
              <span className="text-metax-black font-bold text-sm">IG</span>
            </button>
            <button className="w-10 h-10 bg-metax-gold hover:bg-metax-gold-dark rounded-full flex items-center justify-center cursor-pointer transition-colors">
              <span className="text-metax-black font-bold text-sm">T</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardContent;
