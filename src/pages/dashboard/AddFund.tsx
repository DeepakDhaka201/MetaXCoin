import { useState } from "react";

const AddFund = () => {
  const [selectedMethod, setSelectedMethod] = useState("crypto");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const depositMethods = [
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: "₿",
      description: "Deposit using Bitcoin, Ethereum, or USDT",
      fees: "Network fees apply",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: "🏦",
      description: "Wire transfer or ACH payment",
      fees: "2-3 business days",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: "💳",
      description: "Instant deposit with Visa/Mastercard",
      fees: "3.5% processing fee",
    },
  ];

  const cryptoOptions = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      address: "0x742d35Cc6634C0532925a3b8D0b8EFd17d1F3456",
    },
    {
      symbol: "USDT",
      name: "Tether (ERC-20)",
      address: "0x742d35Cc6634C0532925a3b8D0b8EFd17d1F3456",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    alert(`Deposit request submitted for $${amount} via ${selectedMethod}`);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
        <h1 className="text-white text-2xl font-bold mb-2">Add Fund</h1>
        <p className="text-metax-text-muted mb-6">
          Choose your preferred deposit method and add funds to your account
        </p>

        {/* Deposit Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {depositMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                selectedMethod === method.id
                  ? "border-metax-gold bg-metax-gold/10"
                  : "border-metax-border-gold/30 hover:border-metax-gold/50"
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{method.icon}</div>
                <h3 className="text-white font-semibold mb-1">{method.name}</h3>
                <p className="text-metax-text-muted text-sm mb-2">
                  {method.description}
                </p>
                <span className="text-metax-gold text-xs">{method.fees}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Deposit Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">
              Deposit Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-metax-text-muted">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min="10"
                step="0.01"
                className="w-full pl-8 pr-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white placeholder-metax-text-muted focus:border-metax-gold focus:outline-none"
                required
              />
            </div>
            <p className="text-metax-text-muted text-sm mt-1">
              Minimum deposit: $10.00
            </p>
          </div>

          {selectedMethod === "crypto" && (
            <div className="space-y-4">
              <label className="block text-white font-medium mb-2">
                Select Cryptocurrency
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cryptoOptions.map((crypto) => (
                  <div
                    key={crypto.symbol}
                    className="p-4 bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">
                          {crypto.symbol}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">
                          {crypto.name}
                        </h4>
                        <span className="text-metax-text-muted text-sm">
                          {crypto.symbol}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-metax-text-muted text-sm">
                        Wallet Address:
                      </p>
                      <div className="bg-metax-black/50 p-2 rounded border border-metax-border-gold/20">
                        <code className="text-metax-gold text-xs break-all">
                          {crypto.address}
                        </code>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(crypto.address);
                          alert("Address copied to clipboard!");
                        }}
                        className="w-full py-2 bg-metax-gold/20 hover:bg-metax-gold/30 text-metax-gold rounded text-sm font-medium transition-colors"
                      >
                        Copy Address
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedMethod === "bank" && (
            <div className="space-y-4">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">
                  Bank Transfer Instructions
                </h4>
                <div className="space-y-2 text-metax-text-muted text-sm">
                  <p>
                    <strong>Bank Name:</strong> MetaX Financial Services
                  </p>
                  <p>
                    <strong>Account Number:</strong> 1234567890
                  </p>
                  <p>
                    <strong>Routing Number:</strong> 987654321
                  </p>
                  <p>
                    <strong>SWIFT Code:</strong> MTXFUS33
                  </p>
                  <p className="text-yellow-400 mt-3">
                    ⚠ Please include your username "John99272" in the transfer
                    reference
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedMethod === "card" && (
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white placeholder-metax-text-muted focus:border-metax-gold focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white placeholder-metax-text-muted focus:border-metax-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white placeholder-metax-text-muted focus:border-metax-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
            >
              Submit Deposit Request
            </button>
            <button
              type="button"
              onClick={() => {
                setAmount("");
                setWalletAddress("");
              }}
              className="flex-1 bg-metax-dark-section hover:bg-metax-dark-section/80 text-white py-3 px-6 rounded-lg font-medium border border-metax-border-gold/30 transition-all duration-200"
            >
              Clear Form
            </button>
          </div>
        </form>

        {/* Recent Deposits */}
        <div className="mt-8">
          <h3 className="text-white text-lg font-semibold mb-4">
            Recent Deposits
          </h3>
          <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-metax-dark-section/60">
                  <tr>
                    <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                      Method
                    </th>
                    <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-metax-border-gold/20">
                    <td className="px-4 py-3 text-white text-sm">2024-01-15</td>
                    <td className="px-4 py-3 text-metax-gold text-sm font-medium">
                      $100.00
                    </td>
                    <td className="px-4 py-3 text-metax-text-muted text-sm">
                      Bitcoin
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 text-xs rounded-full">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-metax-border-gold/20">
                    <td
                      className="px-4 py-3 text-metax-text-muted text-sm text-center"
                      colSpan={4}
                    >
                      No more deposits found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFund;
