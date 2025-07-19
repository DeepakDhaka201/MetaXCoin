import { api } from '@/lib/api';
import { 
  Transaction, 
  DepositRequest, 
  WithdrawalRequest, 
  TransferRequest,
  ApiListResponse,
  PaginationParams
} from '@/types/api';

export const transactionService = {
  // New deposit request API
  async createDepositRequest(data: { amount: number }): Promise<{
    message: string;
    assignment: {
      id: number;
      user_id: number;
      wallet_id: number;
      expected_amount: number;
      assigned_at: string;
      expires_at: string;
      is_active: boolean;
      is_expired: boolean;
      time_remaining: string;
      wallet: {
        id: number;
        address: string;
        network: string;
        status: string;
      };
    };
    instructions: {
      network: string;
      token: string;
      amount: number;
      wallet_address: string;
      expires_at: string;
      time_remaining_minutes: number;
    };
  }> {
    const response = await api.post('/api/transactions/deposit/request', data);
    return response.data;
  },

  // Get deposit status
  async getDepositStatus(): Promise<{
    has_active_deposit: boolean;
    assignment?: {
      id: number;
      user_id: number;
      wallet_id: number;
      expected_amount: number;
      assigned_at: string;
      expires_at: string;
      is_active: boolean;
      is_expired: boolean;
      time_remaining: string;
      wallet: {
        address: string;
        network: string;
      };
    };
    time_remaining_minutes?: number;
    is_expired?: boolean;
    message?: string;
  }> {
    const response = await api.get('/api/transactions/deposit/status');
    return response.data;
  },

  // Cancel deposit assignment
  async cancelDepositAssignment(): Promise<{
    message: string;
  }> {
    const response = await api.post('/api/transactions/deposit/cancel');
    return response.data;
  },

  // Legacy createDeposit method removed - use createDepositRequest instead

  // Create withdrawal request
  async createWithdrawal(withdrawalData: WithdrawalRequest): Promise<{
    message: string;
    transaction: Transaction;
  }> {
    const response = await api.post('/api/transactions/withdraw', withdrawalData);
    return response.data; // Backend returns data directly
  },

  // Create internal transfer
  async createTransfer(transferData: TransferRequest): Promise<{
    message: string;
    transaction: Transaction;
    updated_balances: Record<string, number>;
  }> {
    const response = await api.post('/api/transactions/transfer', transferData);
    return response.data; // Backend returns data directly
  },

  // Get transaction history
  async getHistory(params?: {
    type?: 'deposit' | 'withdrawal' | 'transfer' | 'all';
    status?: 'pending' | 'processing' | 'completed' | 'failed' | 'all';
    wallet_type?: string;
  } & PaginationParams): Promise<{
    transactions: Transaction[];
    pagination: {
      total_count: number;
      limit: number;
      offset: number;
      has_more: boolean;
    };
  }> {
    const response = await api.get('/api/transactions/history', params);
    return response.data; // Backend returns data directly
  },

  // Get specific transaction details
  async getTransaction(transactionId: string): Promise<{ transaction: Transaction }> {
    const response = await api.get(`/api/transactions/${transactionId}`);
    return response.data; // Backend returns data directly
  },

  // Get transaction limits (updated format)
  async getLimits(): Promise<{
    min_deposit: number;
    max_deposit: number;
    min_withdrawal: number;
    max_withdrawal: number;
    withdrawal_fee: number;
    daily_deposit_limit: number;
    monthly_deposit_limit: number;
  }> {
    const response = await api.get('/api/transactions/limits');
    return response.data;
  },

  // Get transaction statistics
  async getStatistics(): Promise<{
    deposit: Record<string, number>;
    withdrawal: Record<string, number>;
    transfer: Record<string, number>;
    total_deposits: number;
    total_withdrawals: number;
    total_transfers: number;
    average_transaction_amount: number;
    most_used_wallet: string;
    transaction_frequency: {
      daily_average: number;
      weekly_average: number;
      monthly_average: number;
    };
  }> {
    const response = await api.get('/api/transactions/statistics');
    return response.data; // Backend returns data directly
  },
};
