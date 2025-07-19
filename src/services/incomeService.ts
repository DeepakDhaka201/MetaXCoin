import { api } from '@/lib/api';
import { Income, ApiListResponse, PaginationParams } from '@/types/api';

export const incomeService = {
  // Get income history
  async getHistory(params?: {
    type?: string;
    start_date?: string;
    end_date?: string;
  } & PaginationParams): Promise<ApiListResponse<Income>> {
    const response = await api.get('/api/income/history', params);
    return response.data; // Backend returns data directly
  },

  // Get income summary
  async getSummary(params?: {
    start_date?: string;
    end_date?: string;
  }): Promise<{
    total_income: number;
    income_by_type: Record<string, number>;
    monthly_breakdown: Record<string, {
      total_income: number;
      income_count: number;
    }>;
    recent_incomes: Array<{
      income_type: string;
      amount: number;
      from_user: string;
      created_at: string;
    }>;
    statistics: {
      average_daily_income: number;
      highest_single_income: number;
      total_income_count: number;
      active_income_sources: number;
    };
  }> {
    const response = await api.get('/api/income/summary', params);
    return response.data; // Backend returns data directly
  },

  // Get income types
  async getTypes(): Promise<{
    income_types: Record<string, {
      value: string;
      description: string;
    }>;
    categories: {
      referral: string[];
      investment: string[];
      rewards: string[];
    };
  }> {
    const response = await api.get('/api/income/types');
    return response.data; // Backend returns data directly
  },

  // Get income analytics
  async getAnalytics(period: '7d' | '30d' | '90d' | '1y' = '30d'): Promise<{
    period: string;
    total_income: number;
    income_trend: Array<{
      date: string;
      total_income: number;
      income_count: number;
    }>;
    income_distribution: Record<string, number>;
    growth_metrics: {
      income_growth_percentage: number;
      average_daily_income: number;
      projected_monthly_income: number;
    };
    top_income_sources: Array<{
      source: string;
      total_income: number;
      income_count: number;
    }>;
  }> {
    const response = await api.get('/api/income/analytics', { period });
    return response.data; // Backend returns data directly
  },
};
