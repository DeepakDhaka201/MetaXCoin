import { useQuery } from '@tanstack/react-query';
import { incomeService } from '@/services/incomeService';
import { PaginationParams } from '@/types/api';

// Income history hook
export const useIncomeHistory = (params?: {
  type?: string;
  start_date?: string;
  end_date?: string;
} & PaginationParams) => {
  return useQuery({
    queryKey: ['income', 'history', params],
    queryFn: () => incomeService.getHistory(params),
    keepPreviousData: true,
  });
};

// Income summary hook
export const useIncomeSummary = (params?: {
  start_date?: string;
  end_date?: string;
}) => {
  return useQuery({
    queryKey: ['income', 'summary', params],
    queryFn: () => incomeService.getSummary(params),
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

// Income types hook
export const useIncomeTypes = () => {
  return useQuery({
    queryKey: ['income', 'types'],
    queryFn: incomeService.getTypes,
    staleTime: 600000, // 10 minutes
  });
};

// Income analytics hook
export const useIncomeAnalytics = (period: '7d' | '30d' | '90d' | '1y' = '30d') => {
  return useQuery({
    queryKey: ['income', 'analytics', period],
    queryFn: () => incomeService.getAnalytics(period),
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};
