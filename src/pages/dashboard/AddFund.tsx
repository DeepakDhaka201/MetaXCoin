import { useState, useEffect } from "react";
import { useDepositRequest, useDepositStatus, useTransactionLimits, useCancelDepositAssignment } from "@/hooks/useTransactions";
import { useWalletSummary } from "@/hooks/useDashboard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AnimatedBackground from "../../components/AnimatedBackground";
import { toast } from "@/hooks/use-toast";
import { useSidebar } from "../../hooks/useSidebar";

const AddFund = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [amount, setAmount] = useState("");
  const [depositAssignment, setDepositAssignment] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPolling, setIsPolling] = useState(false);

  // API hooks
  const depositRequest = useDepositRequest();
  const { data: depositStatus, refetch: refetchStatus } = useDepositStatus();
  const { data: limits } = useTransactionLimits();
  const { data: walletSummary, refetch: refetchWallet } = useWalletSummary();
  const cancelDepositAssignment = useCancelDepositAssignment();

  // Check for existing deposit on component mount
  useEffect(() => {
    if (depositStatus?.has_active_deposit && depositStatus.assignment) {
      setDepositAssignment(depositStatus.assignment);

      // Use time_remaining_minutes from API if available, otherwise calculate
      if (depositStatus.time_remaining_minutes !== undefined) {
        const remainingSeconds = depositStatus.time_remaining_minutes * 60;
        setTimeRemaining(remainingSeconds);
      } else {
        calculateTimeRemaining(depositStatus.assignment.expires_at);
      }

      startStatusPolling();
    }
  }, [depositStatus]);

  // Timer for deposit expiration
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev > 0) {
          const newTime = prev - 1;
          if (newTime <= 0) {
            if (depositAssignment) {
              handleDepositExpired();
            }
            return 0;
          }
          return newTime;
        }
        return prev;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Status polling effect
  useEffect(() => {
    let pollInterval: NodeJS.Timeout;
    if (isPolling && depositAssignment) {
      pollInterval = setInterval(async () => {
        try {
          const status = await refetchStatus();
          if (!status.data?.has_active_deposit) {
            handleDepositComplete();
          } else if (status.data?.is_expired) {
            handleDepositExpired();
          } else if (status.data?.time_remaining_minutes !== undefined) {
            const remainingSeconds = status.data.time_remaining_minutes * 60;
            setTimeRemaining(remainingSeconds);
          }
        } catch (error) {
          // Silently handle polling errors
        }
      }, 30000); // Poll every 30 seconds
    }
    return () => clearInterval(pollInterval);
  }, [isPolling, depositAssignment]);

  const calculateTimeRemaining = (expiresAt: string) => {
    if (!expiresAt) {
      setTimeRemaining(0);
      return;
    }

    const now = new Date();
    let expiryDate: Date;

    if (expiresAt.endsWith('Z') || expiresAt.includes('+') || expiresAt.includes('-')) {
      expiryDate = new Date(expiresAt);
    } else {
      expiryDate = new Date(expiresAt);
      if (expiryDate.getTime() < now.getTime()) {
        expiryDate = new Date(expiresAt + 'Z');
      }
    }

    const remaining = Math.max(0, Math.floor((expiryDate.getTime() - now.getTime()) / 1000));
    setTimeRemaining(remaining);
  };

  const startStatusPolling = () => {
    setIsPolling(true);
  };

  const stopStatusPolling = () => {
    setIsPolling(false);
  };

  const handleDepositComplete = () => {
    stopStatusPolling();
    setDepositAssignment(null);
    setAmount("");
    refetchWallet();
    toast({
      title: "Deposit Completed",
      description: "Your deposit has been successfully processed!",
    });
  };

  const handleDepositExpired = () => {
    stopStatusPolling();
    setDepositAssignment(null);
    toast({
      title: "Deposit Expired",
      description: "Your deposit request has expired. Please create a new one.",
      variant: "destructive",
    });
  };

  const formatTime = (seconds: number) => {
    if (!seconds || seconds <= 0) {
      return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const generateQRCode = (text: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    const minAmount = limits?.min_deposit || 10;
    const maxAmount = limits?.max_deposit || 10000;

    if (parseFloat(amount) < minAmount) {
      toast({
        title: "Amount Too Low",
        description: `Minimum deposit amount is ${minAmount} USDT`,
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(amount) > maxAmount) {
      toast({
        title: "Amount Too High",
        description: `Maximum deposit amount is ${maxAmount} USDT`,
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await depositRequest.mutateAsync({
        amount: parseFloat(amount),
      });

      if (response.assignment) {
        setDepositAssignment(response.assignment);

        // Use time_remaining_minutes from instructions if available
        if (response.instructions?.time_remaining_minutes !== undefined) {
          const remainingSeconds = response.instructions.time_remaining_minutes * 60;
          setTimeRemaining(remainingSeconds);
        } else {
          calculateTimeRemaining(response.assignment.expires_at);
        }

        startStatusPolling();
        toast({
          title: "Deposit Request Created",
          description: "Please send USDT to the provided address",
        });
      }
    } catch (error: any) {
      if (error.response?.data?.existing_assignment) {
        setDepositAssignment(error.response.data.existing_assignment);
        calculateTimeRemaining(error.response.data.existing_assignment.expires_at);
        startStatusPolling();
        toast({
          title: "Active Deposit Found",
          description: "You already have an active deposit request",
        });
      } else {
        toast({
          title: "Deposit Error",
          description: error.response?.data?.error || "Failed to create deposit request",
          variant: "destructive",
        });
      }
    }
  };

  const handleCopyAddress = () => {
    if (depositAssignment?.wallet?.address) {
      navigator.clipboard.writeText(depositAssignment.wallet.address);
      toast({
        title: "Address Copied",
        description: "USDT TRC-20 address copied to clipboard!",
      });
    }
  };

  const handleNewDeposit = () => {
    stopStatusPolling();
    setDepositAssignment(null);
    setAmount("");
    setTimeRemaining(0);
  };

  const handleCancelDeposit = async () => {
    try {
      await cancelDepositAssignment.mutateAsync();
      stopStatusPolling();
      setDepositAssignment(null);
      setAmount("");
      setTimeRemaining(0);
      toast({
        title: "Deposit Cancelled",
        description: "Your deposit request has been cancelled successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Cancel Failed",
        description: error.response?.data?.error || "Failed to cancel deposit request",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen bg-metax-black text-metax-text-light relative overflow-hidden">
      <AnimatedBackground />

      <DashboardHeader
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <main
        className={`${isSidebarOpen ? "lg:ml-80" : "lg:ml-0"} h-full overflow-y-auto relative z-10 transition-all duration-300`}
        style={{ paddingTop: "88px" }}
      >
        <div className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Add Fund
            </h1>
            <p className="text-metax-text-muted">
              Deposit USDT using TRC-20 network
            </p>
          </div>

          <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
            {!depositAssignment ? (
              // Amount Input Form
              <div className="max-w-md mx-auto">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">₮</span>
                  </div>
                  <h2 className="text-white text-xl font-bold mb-2">USDT TRC-20 Deposit</h2>
                  <p className="text-metax-text-muted text-sm">
                    Enter the amount you want to deposit
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Deposit Amount (USDT)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-metax-text-muted">
                        ₮
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter USDT amount"
                        min={limits?.min_deposit || 10}
                        step="0.01"
                        className="w-full pl-8 pr-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white placeholder-metax-text-muted focus:border-metax-gold focus:outline-none"
                        required
                      />
                    </div>
                    <p className="text-metax-text-muted text-sm mt-1">
                      Minimum deposit: {limits?.min_deposit || 10} USDT
                    </p>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="text-blue-400 font-medium mb-2">
                      Important Information
                    </h4>
                    <ul className="space-y-1 text-metax-text-muted text-sm">
                      <li>• Only send USDT via TRC-20 network</li>
                      <li>• Minimum deposit: {limits?.min_deposit || 10} USDT</li>
                      <li>• Maximum deposit: {limits?.max_deposit || 10000} USDT</li>
                      <li>• Deposits will be credited after 1 confirmation</li>
                      <li>• Do not send any other cryptocurrency</li>
                      <li>• Deposit address expires in 30 minutes</li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    disabled={depositRequest.isPending}
                    className="w-full bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {depositRequest.isPending ? "Creating Request..." : "Generate Deposit Address"}
                  </button>
                </form>
              </div>
            ) : (

              // Deposit Instructions Display
              <div className="max-w-lg mx-auto text-center">
                <div className="mb-6">
                  <h2 className="text-white text-xl font-bold mb-2">
                    Deposit {depositAssignment.expected_amount} USDT
                  </h2>
                  <p className="text-metax-text-muted text-sm">
                    Send exactly {depositAssignment.expected_amount} USDT to the address below
                  </p>
                </div>

                {/* Timer */}
                <div className="mb-6">
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-medium mb-2">
                      ⏰ Time Remaining
                    </h4>
                    <div className="text-2xl font-bold text-red-400">
                      {formatTime(timeRemaining)}
                    </div>
                    <p className="text-metax-text-muted text-sm mt-1">
                      This address will expire after the timer ends
                    </p>
                    {depositAssignment?.expires_at && (
                      <p className="text-metax-text-muted text-xs mt-2">
                        Expires at: {new Date(depositAssignment.expires_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* QR Code */}
                <div className="mb-6">
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <img
                      src={generateQRCode(depositAssignment.wallet.address)}
                      alt="USDT TRC-20 Address QR Code"
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">
                    USDT TRC-20 Address
                  </label>
                  <div className="bg-metax-dark-section border border-metax-border-gold/30 rounded-lg p-3">
                    <code className="text-metax-gold text-sm break-all">
                      {depositAssignment.wallet.address}
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="mt-2 w-full py-2 bg-metax-gold/20 hover:bg-metax-gold/30 text-metax-gold rounded text-sm font-medium transition-colors"
                  >
                    Copy Address
                  </button>
                </div>

                {/* Instructions */}
                <div className="mb-6">
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                    <h4 className="text-yellow-400 font-medium mb-2">
                      ⚠️ Important Instructions
                    </h4>
                    <ul className="space-y-1 text-metax-text-muted text-sm text-left">
                      <li>• Send exactly <strong className="text-white">{depositAssignment.expected_amount} USDT</strong></li>
                      <li>• Use only TRC-20 network (TRON)</li>
                      <li>• Do not send any other cryptocurrency</li>
                      <li>• Minimum confirmations: 1</li>
                      <li>• Funds will be credited automatically</li>
                      <li>• Address expires in {formatTime(timeRemaining)}</li>
                    </ul>
                  </div>
                </div>

                {/* Cancel Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleCancelDeposit}
                    disabled={cancelDepositAssignment.isPending}
                    className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cancelDepositAssignment.isPending ? "Cancelling..." : "Cancel Deposit"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddFund;
