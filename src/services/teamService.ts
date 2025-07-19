import { api } from '@/lib/api';
import { TeamMember, TeamStats, ApiListResponse, PaginationParams } from '@/types/api';

export const teamService = {
  // Get referral configuration
  async getReferralConfig(): Promise<{
    commission_structure: {
      levels: Array<{
        level: number;
        rate: number;
        color: string;
      }>;
      max_levels: number;
      total_commission: number;
    };
  }> {
    const response = await api.get('/api/config/referral');
    return response.data; // Backend returns data directly
  },

  // Get team statistics
  async getStats(): Promise<TeamStats & {
    recent_activity: Array<{
      user: string;
      action: string;
      level: number;
      timestamp: string;
    }>;
  }> {
    const response = await api.get('/api/team/stats');
    return response.data; // Backend returns data directly
  },

  // Get team members
  async getMembers(params?: {
    status?: 'active' | 'inactive' | 'all';
    level?: '1' | '2' | '3' | '4' | '5' | 'all';
  } & PaginationParams): Promise<ApiListResponse<TeamMember>> {
    const response = await api.get('/api/team/members', params);
    // Backend returns { members, pagination, filters_applied }
    // Map to expected format { data, pagination, filters_applied }
    return {
      data: response.data.members || [],
      pagination: response.data.pagination,
      filters_applied: response.data.filters_applied
    };
  },

  // Get team tree structure
  async getTree(maxLevels: number = 5): Promise<{
    tree: {
      user: {
        id: number;
        username: string;
        full_name: string;
        level: number;
      };
      children: any[];
    };
    max_levels: number;
    total_nodes: number;
  }> {
    const response = await api.get('/api/team/tree', { max_levels: maxLevels });
    return response.data; // Backend returns data directly
  },

  // Get referral link
  async getReferralLink(): Promise<{
    referral_code: string;
    referral_link: string;
    total_referrals: number;
    successful_registrations: number;
    conversion_rate: number;
  }> {
    const response = await api.get('/api/team/referral-link');
    return response.data; // Backend returns data directly
  },

  // Get team performance
  async getPerformance(period: '7d' | '30d' | '90d' | '1y' = '30d'): Promise<{
    period: string;
    performance_metrics: {
      new_referrals: number;
      total_commissions: number;
      team_investment: number;
      referral_growth_percent: number;
    };
    commission_breakdown: {
      direct_referral: number;
      level_bonus: number;
    };
    top_performers: Array<{
      username: string;
      commission_generated: number;
      new_referrals: number;
    }>;
  }> {
    const response = await api.get('/api/team/performance', { period });
    return response.data; // Backend returns data directly
  },
};
