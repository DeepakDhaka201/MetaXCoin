import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboardService';
import { cryptoService } from '@/services/cryptoService';
import { TransferRequest } from '@/types/api';
import { toast } from '@/hooks/use-toast';

// Dashboard data hooks
export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: dashboardService.getSummary,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useWalletSummary = () => {
  return useQuery({
    queryKey: ['dashboard', 'wallet-summary'],
    queryFn: dashboardService.getWalletSummary,
    refetchInterval: 15000, // Refetch every 15 seconds
  });
};

// Legacy useWalletBalances removed - use useWalletSummary instead

export const useMXCPrice = () => {
  return useQuery({
    queryKey: ['dashboard', 'mxc-price'],
    queryFn: dashboardService.getMXCPrice,
    refetchInterval: 10000, // Refetch every 10 seconds
  });
};

export const useMXCChart = (timeframe: '1h' | '4h' | '24h' | '7d' = '24h') => {
  return useQuery({
    queryKey: ['dashboard', 'mxc-chart', timeframe],
    queryFn: () => dashboardService.getMXCChart(timeframe),
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useWalletDetails = (walletType: string) => {
  return useQuery({
    queryKey: ['dashboard', 'wallet', walletType],
    queryFn: () => dashboardService.getWalletDetails(walletType),
    enabled: !!walletType,
  });
};

// useDashboardStatistics removed - use useTransactionStatistics instead

// Crypto price hooks
export const useCryptoPrices = () => {
  return useQuery({
    queryKey: ['crypto', 'prices'],
    queryFn: cryptoService.getPrices,
    refetchInterval: 60000, // Refetch every minute
  });
};

// Transfer mutation
export const useTransferFunds = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (transferData: TransferRequest) => 
      dashboardService.transferFunds(transferData),
    onSuccess: (data) => {
      // Invalidate and refetch balance data
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'balances'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
      
      toast({
        title: "Transfer Successful",
        description: `Successfully transferred ${data.amount} from ${data.from_wallet} to ${data.to_wallet}`,
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Transfer failed. Please try again.';
      toast({
        title: "Transfer Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
