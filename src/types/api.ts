// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone?: string;
  date_of_birth?: string;
  referral_code: string;
  referral_link: string;
  is_active: boolean;
  is_verified: boolean;
  is_admin: boolean;
  rank: string;
  total_investment: number;
  total_earnings: number;
  kyc_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  last_login?: string;
  sponsor_info?: {
    sponsor_id: number;
    sponsor_username: string;
    sponsor_name: string;
    sponsor_referral_code: string;
    referred_by: string;
  };
  referred_by?: string;
}

// Authentication Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  sponsor_code?: string;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  refresh_token?: string;
  user: User;
}

// Wallet Types
export interface WalletBalance {
  balance: number;
  wallet_type: string;
}

export interface WalletBalances {
  available_fund: WalletBalance;
  total_gain: WalletBalance;
  level_bonus: WalletBalance;
  total_referral: WalletBalance;
  total_income: WalletBalance;
}

// Transaction Types
export interface Transaction {
  transaction_id: string;
  transaction_type: 'deposit' | 'withdrawal' | 'transfer' | 'credit' | 'debit' | 'commission' | 'staking_reward' | 'bonus';
  amount: number;
  wallet_type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'rejected';
  payment_method?: string;
  wallet_address?: string;
  description?: string;
  created_at: string;
  processed_at?: string;
  admin_notes?: string;
  transaction_hash?: string;
  fees?: {
    transaction_fee: number;
    network_fee: number;
  };
}

export interface TransactionRequest {
  amount: number;
  wallet_type: string;
  description?: string;
}

export interface DepositRequest extends TransactionRequest {
  payment_method: string;
}

export interface WithdrawalRequest extends TransactionRequest {
  wallet_address: string;
}

export interface TransferRequest {
  amount: number;
  from_wallet: string;
  to_wallet: string;
  description?: string;
}

// Team Types
export interface TeamMember {
  user_id: number;
  username: string;
  full_name: string;
  email: string;
  level: number;
  is_active: boolean;
  total_investment: number;
  total_earnings: number;
  rank: string;
  joined_at: string;
  commission_earned: number;
  last_commission_at: string | null;
}

export interface TeamStats {
  total_team: number;
  direct_referrals: number;
  active_members: number;
  commission_earned: number;
  team_investment: number;
  level_breakdown: {
    level_1: number;
    level_2: number;
    level_3: number;
    level_4: number;
    level_5: number;
  };
}

// Income Types
export interface Income {
  id: number;
  income_type: string;
  amount: number;
  description: string;
  from_user?: string;
  level?: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  processed_at?: string;
}

// Crypto Types
export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  volume_24h: number;
  last_updated: string;
}

// Investment System Types
export interface WalletSummary {
  available_fund: number;
  total_investment: number;
  total_gain: number;
  total_referral: number;
  level_bonus: number;
  total_income: number;
}

export interface InvestmentDetails {
  active_investments: number;
  total_returns_earned: number;
  roi_percentage: number;
}

export interface WithdrawalInfo {
  withdrawable_amount: number;
  withdrawable_wallets: string[];
  locked_amount: number;
}

export interface WalletSummaryResponse {
  success: boolean;
  wallet_summary: WalletSummary;
  investment_details: InvestmentDetails;
  withdrawal_info: WithdrawalInfo;
  last_updated: string;
}

export interface InvestmentPackage {
  id: number;
  name: string;
  description: string;
  min_amount: number;
  max_amount: number;
  total_return_percentage: number;
  duration_days: number;
  daily_return_rate: number;
  end_date: string;
  status: 'draft' | 'active' | 'launched' | 'completed' | 'cancelled';
  is_featured: boolean;
  is_available: boolean;
  total_invested: number;
  total_investors: number;
  created_at: string;
}

export interface InvestmentPackagesResponse {
  success: boolean;
  packages: InvestmentPackage[];
  total: number;
}

export interface UserInvestment {
  id: number;
  package_id: number;
  amount_invested: number;
  investment_date: string;
  returns_start_date: string;
  maturity_date: string;
  total_returns_paid: number;
  last_return_date?: string;
  status: 'pending' | 'active' | 'matured' | 'cancelled';
  days_since_investment: number;
  days_since_returns_started: number;
  expected_total_return: number;
  expected_daily_return: number;
  returns_remaining: number;
  package: {
    name: string;
    total_return_percentage: number;
    duration_days: number;
  };
}

export interface InvestmentPagination {
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}

export interface InvestmentSummary {
  total_invested: number;
  total_returns: number;
  active_investments: number;
  total_investments: number;
}

export interface UserInvestmentsResponse {
  success: boolean;
  investments: UserInvestment[];
  summary: InvestmentSummary;
}

export interface PurchaseInvestmentRequest {
  package_id: number;
  amount: number;
}

export interface PurchaseInvestmentResponse {
  success: boolean;
  message: string;
  investment?: {
    id: number;
    package_id: number;
    amount_invested: number;
    investment_date: string;
    returns_start_date: string;
    maturity_date: string;
    status: string;
    expected_total_return: number;
    expected_daily_return: number;
    package: {
      name: string;
      total_return_percentage: number;
      duration_days: number;
    };
  };
  new_available_balance?: number;
  new_investment_balance?: number;
  new_total_investment?: number;
}



export interface InvestmentReturn {
  id: number;
  return_date: string;
  return_amount: number;
  days_since_start: number;
  status: 'paid' | 'pending';
  processed_at?: string;
}

export interface InvestmentDetailsResponse {
  success: boolean;
  investment: UserInvestment & {
    return_history: InvestmentReturn[];
  };
}

export interface MXCPrice {
  price: number;
  market_cap: number;
  volume_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  rank: string;
  holders: number;
  transactions_24h: number;
  high_24h?: number;
  low_24h?: number;
  volume_change_24h?: number;
  last_updated: string;
  currency: string;
}

export interface MXCChartData {
  timeframe: string;
  data_points: Array<{
    timestamp: string;
    price: number;
    volume: number;
  }>;
  total_points: number;
  price_range: {
    min: number;
    max: number;
  };
}

// Dashboard Types
export interface DashboardSummary {
  user_info: {
    username: string;
    full_name: string;
    is_verified: boolean;
  };
  team_summary: {
    total_team_size: number;
    total_commission: number;
  };
  last_updated: string;
}

// Pagination Types
export interface PaginationParams {
  limit?: number;
  offset?: number;
  page?: number;
}

export interface PaginationResponse {
  total_count: number;
  limit: number;
  offset: number;
  has_more: boolean;
  current_page?: number;
  total_pages?: number;
}

// API Response wrapper
export interface ApiListResponse<T> {
  data: T[];
  pagination: PaginationResponse;
  filters_applied?: Record<string, any>;
}
