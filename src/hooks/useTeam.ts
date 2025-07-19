import { useQuery } from '@tanstack/react-query';
import { teamService } from '@/services/teamService';
import { PaginationParams } from '@/types/api';

// Referral configuration hook
export const useReferralConfig = () => {
  return useQuery({
    queryKey: ['team', 'referral-config'],
    queryFn: teamService.getReferralConfig,
    staleTime: 600000, // 10 minutes
  });
};

// Team statistics hook
export const useTeamStats = () => {
  return useQuery({
    queryKey: ['team', 'stats'],
    queryFn: teamService.getStats,
    refetchInterval: 60000, // Refetch every minute
  });
};

// Team members hook
export const useTeamMembers = (params?: {
  status?: 'active' | 'inactive' | 'all';
  level?: string; // Dynamic level based on referral config
} & PaginationParams) => {
  return useQuery({
    queryKey: ['team', 'members', params],
    queryFn: () => teamService.getMembers(params),
    keepPreviousData: true,
  });
};

// Team tree hook
export const useTeamTree = (maxLevels: number = 5) => {
  return useQuery({
    queryKey: ['team', 'tree', maxLevels],
    queryFn: () => teamService.getTree(maxLevels),
    staleTime: 300000, // 5 minutes
  });
};

// Referral link hook
export const useReferralLink = () => {
  return useQuery({
    queryKey: ['team', 'referral-link'],
    queryFn: teamService.getReferralLink,
    staleTime: 600000, // 10 minutes
  });
};

// Team performance hook
export const useTeamPerformance = (period: '7d' | '30d' | '90d' | '1y' = '30d') => {
  return useQuery({
    queryKey: ['team', 'performance', period],
    queryFn: () => teamService.getPerformance(period),
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};
