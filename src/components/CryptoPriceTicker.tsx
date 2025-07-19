import { useCryptoPrices } from "@/hooks/useDashboard";

const CryptoPriceTicker = () => {
  const { data: cryptoResponse, isLoading: loading, error } = useCryptoPrices();
  const cryptoData = cryptoResponse?.data || [];

  // Real crypto symbols mapping
  const cryptoSymbols: { [key: string]: string } = {
    'bitcoin': '₿',
    'ethereum': 'Ξ',
    'tether': '₮',
    'binancecoin': 'BNB',
    'solana': '◎',
    'usd-coin': 'USDC',
    'xrp': 'XRP',
    'dogecoin': 'Ð',
    'cardano': '₳',
    'avalanche-2': 'AVAX',
    'chainlink': 'LINK',
    'polygon': 'MATIC',
    'litecoin': 'Ł',
    'bitcoin-cash': 'BCH',
    'stellar': 'XLM',
    'uniswap': 'UNI',
    'ethereum-classic': 'ETC',
    'monero': 'ɱ',
    'algorand': 'ALGO',
    'cosmos': 'ATOM'
  };

  const getCryptoSymbol = (id: string, symbol: string) => {
    return cryptoSymbols[id] || symbol.charAt(0).toUpperCase();
  };



  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(6)}`;
    } else if (price < 100) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toLocaleString()}`;
    }
  };

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? "+" : "";
    return `${sign}${percentage.toFixed(2)}%`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-metax-dark-section/60 via-metax-dark-section/40 to-metax-dark-section/60 border-b border-metax-border-gold/30 py-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-metax-gold border-t-transparent"></div>
          <span className="text-metax-text-muted text-sm font-medium">Loading live crypto prices...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-metax-dark-section/60 via-metax-dark-section/40 to-metax-dark-section/60 border-b border-metax-border-gold/30 py-4">
        <div className="flex items-center justify-center space-x-3">
          <span className="text-red-400 text-sm font-medium">⚠️ Failed to load crypto prices</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-metax-dark-section/60 via-metax-dark-section/40 to-metax-dark-section/60 border-b border-metax-border-gold/30 py-4 overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-metax-gold/5 to-transparent"></div>

      <div className="relative">
        {/* Scrolling ticker with reduced spacing */}
        <div className="flex animate-scroll space-x-6 whitespace-nowrap">
          {/* First set of data */}
          {cryptoData.map((crypto) => (
            <div key={`first-${crypto.id}`} className="flex items-center space-x-2 text-sm bg-metax-black/20 rounded-lg px-3 py-2 border border-metax-border-gold/10 backdrop-blur-sm">
              <div className="flex items-center space-x-1">
                <div className="w-6 h-6 bg-gradient-to-r from-metax-gold to-metax-gold-dark rounded-full flex items-center justify-center">
                  <span className="text-metax-black text-xs font-bold">
                    {getCryptoSymbol(crypto.id, crypto.symbol)}
                  </span>
                </div>
                <span className="text-metax-gold font-semibold text-xs">
                  {crypto.symbol.toUpperCase()}
                </span>
              </div>
              <span className="text-white font-mono font-medium text-xs">
                {formatPrice(crypto.current_price)}
              </span>
              <span
                className={`font-mono text-xs px-1 py-0.5 rounded ${
                  crypto.price_change_percentage_24h >= 0
                    ? "text-green-400 bg-green-400/10"
                    : "text-red-400 bg-red-400/10"
                }`}
              >
                {formatPercentage(crypto.price_change_percentage_24h)}
              </span>
            </div>
          ))}

          {/* Duplicate set for seamless scrolling */}
          {cryptoData.map((crypto) => (
            <div key={`second-${crypto.id}`} className="flex items-center space-x-2 text-sm bg-metax-black/20 rounded-lg px-3 py-2 border border-metax-border-gold/10 backdrop-blur-sm">
              <div className="flex items-center space-x-1">
                <div className="w-6 h-6 bg-gradient-to-r from-metax-gold to-metax-gold-dark rounded-full flex items-center justify-center">
                  <span className="text-metax-black text-xs font-bold">
                    {getCryptoSymbol(crypto.id, crypto.symbol)}
                  </span>
                </div>
                <span className="text-metax-gold font-semibold text-xs">
                  {crypto.symbol.toUpperCase()}
                </span>
              </div>
              <span className="text-white font-mono font-medium text-xs">
                {formatPrice(crypto.current_price)}
              </span>
              <span
                className={`font-mono text-xs px-1 py-0.5 rounded ${
                  crypto.price_change_percentage_24h >= 0
                    ? "text-green-400 bg-green-400/10"
                    : "text-red-400 bg-red-400/10"
                }`}
              >
                {formatPercentage(crypto.price_change_percentage_24h)}
              </span>
            </div>
          ))}
        </div>

        {/* Enhanced gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-metax-dark-section/60 via-metax-dark-section/40 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-metax-dark-section/60 via-metax-dark-section/40 to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
};

export default CryptoPriceTicker;
