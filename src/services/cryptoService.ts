import { api } from '@/lib/api';
import { CryptoPrice } from '@/types/api';

export const cryptoService = {
  // Get cryptocurrency prices
  async getPrices(): Promise<{
    data: CryptoPrice[];
    cached: boolean;
    cache_timestamp: string;
  }> {
    const response = await api.get('/api/crypto/prices');
    return response.data; // Backend returns data directly
  },

  // Get specific coin details
  async getCoin(coinId: string): Promise<{
    id: string;
    symbol: string;
    name: string;
    description: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    volume_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    ath: number;
    ath_date: string;
    atl: number;
    atl_date: string;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    last_updated: string;
  }> {
    const response = await api.get(`/api/crypto/coin/${coinId}`);
    return response.data; // Backend returns data directly
  },

  // Get trending cryptocurrencies
  async getTrending(): Promise<{
    trending_coins: Array<{
      id: string;
      name: string;
      symbol: string;
      market_cap_rank: number;
      price_btc: number;
    }>;
    trending_categories: string[];
    last_updated: string;
  }> {
    const response = await api.get('/api/crypto/trending');
    return response.data; // Backend returns data directly
  },

  // Search cryptocurrencies
  async search(query: string): Promise<{
    coins: Array<{
      id: string;
      name: string;
      symbol: string;
      market_cap_rank: number;
      thumb: string;
    }>;
    exchanges: Array<{
      id: string;
      name: string;
      market_type: string;
      thumb: string;
    }>;
    categories: Array<{
      id: number;
      name: string;
    }>;
    query: string;
    timestamp: string;
  }> {
    const response = await api.get('/api/crypto/search', { query });
    return response.data; // Backend returns data directly
  },
};
