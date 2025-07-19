import { api } from '@/lib/api';
import {
  WalletBalances,
  DashboardSummary,
  MXCPrice,
  MXCChartData,
  TransferRequest,
  Transaction,
  WalletSummaryResponse
} from '@/types/api';

export const dashboardService = {
  // Get simplified wallet summary (new investment system)
  async getWalletSummary(): Promise<WalletSummaryResponse> {
    const response = await api.get('/api/dashboard/wallet-summary');
    return response.data;
  },

  // Legacy getBalances method removed - use getWalletSummary instead

  // Get dashboard summary
  async getSummary(): Promise<DashboardSummary> {
    const response = await api.get('/api/dashboard/summary');
    return response.data; // Backend returns data directly
  },

  // Get MXC price data
  async getMXCPrice(): Promise<MXCPrice> {
    const response = await api.get('/api/dashboard/mxc-price');
    return response.data; // Backend returns data directly
  },

  // Get MXC chart data
  async getMXCChart(timeframe: '1h' | '4h' | '24h' | '7d' = '24h'): Promise<MXCChartData> {
    const response = await api.get('/api/dashboard/mxc-chart', { timeframe });
    return response.data; // Backend returns data directly
  },

  // Get specific wallet details
  async getWalletDetails(walletType: string): Promise<{
    wallet: { wallet_type: string; balance: number; last_updated: string };
    recent_transactions: Transaction[];
    statistics: {
      total_deposits: number;
      total_withdrawals: number;
      transaction_count: number;
    };
  }> {
    const response = await api.get(`/api/dashboard/wallet/${walletType}`);
    return response.data; // Backend returns data directly
  },

  // Transfer funds between wallets
  async transferFunds(transferData: TransferRequest): Promise<{
    message: string;
    transaction_id: string;
    from_wallet: string;
    to_wallet: string;
    amount: number;
    new_balances: Record<string, number>;
  }> {
    const response = await api.post('/api/dashboard/transfer', transferData);
    return response.data; // Backend returns data directly
  },

  // Get user statistics
  async getStatistics(): Promise<{
    monthly_income: Array<{ month: string; total_income: number; income_count: number }>;
    income_by_type: Record<string, number>;
    transaction_stats: { total_deposits: number; total_withdrawals: number };
    team_statistics: Record<string, number>;
    account_age_days: number;
    rank_progression: {
      current_rank: string;
      next_rank: string;
      progress_percentage: number;
      requirements_met: number;
      total_requirements: number;
    };
  }> {
    const response = await api.get('/api/dashboard/statistics');
    return response.data; // Backend returns data directly
  },
};
