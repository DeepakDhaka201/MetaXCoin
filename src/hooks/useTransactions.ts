import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '@/services/transactionService';
import { DepositRequest, WithdrawalRequest, TransferRequest, PaginationParams } from '@/types/api';
import { toast } from '@/hooks/use-toast';

// Transaction history hook
export const useTransactionHistory = (params?: {
  type?: 'deposit' | 'withdrawal' | 'transfer' | 'all';
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'all';
  wallet_type?: string;
} & PaginationParams) => {
  return useQuery({
    queryKey: ['transactions', 'history', params],
    queryFn: () => transactionService.getHistory(params),
    keepPreviousData: true,
  });
};

// Transaction details hook
export const useTransaction = (transactionId: string) => {
  return useQuery({
    queryKey: ['transactions', transactionId],
    queryFn: () => transactionService.getTransaction(transactionId),
    enabled: !!transactionId,
  });
};

// Transaction limits hook
export const useTransactionLimits = () => {
  return useQuery({
    queryKey: ['transactions', 'limits'],
    queryFn: transactionService.getLimits,
    staleTime: 300000, // 5 minutes
  });
};

// Transaction statistics hook
export const useTransactionStatistics = () => {
  return useQuery({
    queryKey: ['transactions', 'statistics'],
    queryFn: transactionService.getStatistics,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

// Deposit mutation
// New deposit request mutation (using new API)
export const useDepositRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { amount: number }) =>
      transactionService.createDepositRequest(data),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['transactions', 'deposit-status'] });
      queryClient.invalidateQueries({ queryKey: ['transactions', 'history'] });
    },
    onError: (error: any) => {
      // Don't show toast here, let component handle it
      throw error;
    },
  });
};

// Check deposit status
export const useDepositStatus = () => {
  return useQuery({
    queryKey: ['transactions', 'deposit-status'],
    queryFn: transactionService.getDepositStatus,
    refetchInterval: false, // Manual refetch only
  });
};

// Cancel deposit assignment
export const useCancelDepositAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transactionService.cancelDepositAssignment,
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['transactions', 'deposit-status'] });
      queryClient.invalidateQueries({ queryKey: ['transactions', 'history'] });
    },
    onError: (error: any) => {
      // Don't show toast here, let component handle it
      throw error;
    },
  });
};

// Legacy deposit mutation removed - use useDepositRequest instead

// Withdrawal mutation
export const useCreateWithdrawal = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (withdrawalData: WithdrawalRequest) => 
      transactionService.createWithdrawal(withdrawalData),
    onSuccess: (data) => {
      // Invalidate transaction history and dashboard data
      queryClient.invalidateQueries({ queryKey: ['transactions', 'history'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'balances'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
      
      toast({
        title: "Withdrawal Request Created",
        description: `Your withdrawal request for $${data.transaction.amount} has been submitted and is pending approval.`,
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Withdrawal request failed. Please try again.';
      toast({
        title: "Withdrawal Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

// Transfer mutation
export const useCreateTransfer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (transferData: TransferRequest) => 
      transactionService.createTransfer(transferData),
    onSuccess: (data) => {
      // Invalidate transaction history and dashboard data
      queryClient.invalidateQueries({ queryKey: ['transactions', 'history'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'balances'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
      
      toast({
        title: "Transfer Successful",
        description: `Successfully transferred $${data.transaction.amount} from ${data.transaction.wallet_type} to another wallet.`,
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
