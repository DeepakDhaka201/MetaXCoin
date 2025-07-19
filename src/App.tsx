import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notification from "./pages/dashboard/Notification";
import Investment from "./pages/dashboard/Investment";
import MyInvestment from "./pages/dashboard/MyInvestment";
import Profile from "./pages/dashboard/Profile";
import AddFund from "./pages/dashboard/AddFund";
import AddFundHistory from "./pages/dashboard/AddFundHistory";
import Options from "./pages/dashboard/Options";
import CryptoWithdraw from "./pages/dashboard/CryptoWithdraw";
import CryptoWithdrawHistory from "./pages/dashboard/CryptoWithdrawHistory";
import MyTeam from "./pages/dashboard/MyTeam";
import MyTeamActive from "./pages/dashboard/MyTeamActive";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/notification" element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/investment" element={
              <ProtectedRoute>
                <Investment />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/my-investment" element={
              <ProtectedRoute>
                <MyInvestment />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/add-fund" element={
              <ProtectedRoute>
                <AddFund />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/add-fund/history" element={
              <ProtectedRoute>
                <AddFundHistory />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/options" element={
              <ProtectedRoute>
                <Options />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/crypto-withdraw" element={
              <ProtectedRoute>
                <CryptoWithdraw />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/crypto-withdraw/history" element={
              <ProtectedRoute>
                <CryptoWithdrawHistory />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/my-team" element={
              <ProtectedRoute>
                <MyTeam />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/my-team/active" element={
              <ProtectedRoute>
                <MyTeamActive />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/my-team/inactive" element={
              <ProtectedRoute>
                <MyTeamActive />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/my-team/direct" element={
              <ProtectedRoute>
                <MyTeamActive />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/my-team/all" element={
              <ProtectedRoute>
                <MyTeamActive />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/my-team/tree" element={
              <ProtectedRoute>
                <MyTeamActive />
              </ProtectedRoute>
            } />


            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
