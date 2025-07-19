import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { investmentService } from '@/services/investmentService';
import { PurchaseInvestmentRequest } from '@/types/api';
import { toast } from '@/hooks/use-toast';

// Get all available investment packages
export const useInvestmentPackages = () => {
  return useQuery({
    queryKey: ['investments', 'packages'],
    queryFn: investmentService.getPackages,
    refetchInterval: 60000, // Refetch every minute
  });
};

// Get specific package details
export const usePackageDetails = (packageId: number) => {
  return useQuery({
    queryKey: ['investments', 'packages', packageId],
    queryFn: () => investmentService.getPackageDetails(packageId),
    enabled: !!packageId,
  });
};

// Get current user's investments
export const useMyInvestments = (params?: {
  status?: string;
  package_id?: number;
}) => {
  return useQuery({
    queryKey: ['investments', 'my-investments', params],
    queryFn: () => investmentService.getMyInvestments(params),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

// Get specific investment details
export const useInvestmentDetails = (investmentId: number) => {
  return useQuery({
    queryKey: ['investments', 'details', investmentId],
    queryFn: () => investmentService.getInvestmentDetails(investmentId),
    enabled: !!investmentId,
  });
};



// Purchase investment mutation
export const usePurchaseInvestment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PurchaseInvestmentRequest) => 
      investmentService.purchaseInvestment(data),
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Investment Successful",
          description: data.message,
        });
        
        // Invalidate and refetch related queries
        queryClient.invalidateQueries({ queryKey: ['investments'] });
        queryClient.invalidateQueries({ queryKey: ['dashboard', 'wallet-summary'] });
        queryClient.invalidateQueries({ queryKey: ['dashboard', 'balances'] });
      } else {
        toast({
          title: "Investment Failed",
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to process investment';
      toast({
        title: "Investment Error",
        description: message,
        variant: "destructive",
      });
    },
  });
};
