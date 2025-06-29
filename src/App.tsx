import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notification from "./pages/dashboard/Notification";
import Investment from "./pages/dashboard/Investment";
import MyInvestment from "./pages/dashboard/MyInvestment";
import Profile from "./pages/dashboard/Profile";
import AddFund from "./pages/dashboard/AddFund";
import Options from "./pages/dashboard/Options";
import CryptoWithdraw from "./pages/dashboard/CryptoWithdraw";
import MyTeam from "./pages/dashboard/MyTeam";
import Income from "./pages/dashboard/Income";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/notification" element={<Notification />} />
          <Route path="/dashboard/investment" element={<Investment />} />
          <Route path="/dashboard/my-investment" element={<MyInvestment />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/add-fund" element={<AddFund />} />
          <Route path="/dashboard/options" element={<Options />} />
          <Route
            path="/dashboard/crypto-withdraw"
            element={<CryptoWithdraw />}
          />
          <Route path="/dashboard/my-team" element={<MyTeam />} />
          <Route path="/dashboard/income" element={<Income />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
