import { api } from '@/lib/api';
import {
  InvestmentPackagesResponse,
  UserInvestmentsResponse,
  PurchaseInvestmentRequest,
  PurchaseInvestmentResponse,
  InvestmentDetailsResponse,
  InvestmentPackage
} from '@/types/api';

export const investmentService = {
  // Get all available investment packages
  async getPackages(): Promise<InvestmentPackagesResponse> {
    const response = await api.get('/api/investments/packages');
    return response.data;
  },

  // Get specific package details
  async getPackageDetails(packageId: number): Promise<{
    success: boolean;
    package: InvestmentPackage & {
      user_investments: Array<{
        id: number;
        amount_invested: number;
        status: string;
      }>;
      user_total_invested: number;
    };
  }> {
    const response = await api.get(`/api/investments/packages/${packageId}`);
    return response.data;
  },

  // Purchase an investment package
  async purchaseInvestment(data: PurchaseInvestmentRequest): Promise<PurchaseInvestmentResponse> {
    const response = await api.post('/api/investments/purchase', data);
    return response.data;
  },

  // Get current user's investments
  async getMyInvestments(params?: {
    status?: string;
    package_id?: number;
  }): Promise<UserInvestmentsResponse> {
    const response = await api.get('/api/investments/my-investments', params);
    return response.data;
  },

  // Get specific investment details
  async getInvestmentDetails(investmentId: number): Promise<InvestmentDetailsResponse> {
    const response = await api.get(`/api/investments/my-investments/${investmentId}`);
    return response.data;
  },


};
