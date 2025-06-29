import { useState } from "react";

const CryptoWithdraw = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");

  const cryptoOptions = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      balance: "0.0234",
      usdValue: "$2,514.36",
      minWithdraw: "0.001",
      fee: "0.0005",
      network: "Bitcoin",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: "1.2456",
      usdValue: "$3,038.12",
      minWithdraw: "0.01",
      fee: "0.005",
      network: "Ethereum",
    },
    {
      symbol: "USDT",
      name: "Tether",
      balance: "1,250.00",
      usdValue: "$1,250.00",
      minWithdraw: "10",
      fee: "1",
      network: "ERC-20",
    },
    {
      symbol: "MXC",
      name: "MetaX Coin",
      balance: "15,000.00",
      usdValue: "$9.00",
      minWithdraw: "1000",
      fee: "100",
      network: "BSC",
    },
  ];

  const recentWithdrawals = [
    {
      date: "2024-01-15",
      crypto: "BTC",
      amount: "0.01",
      usdValue: "$1,074.00",
      address: "bc1qxy2...wlh",
      status: "Completed",
      txHash: "abc123...def456",
    },
    {
      date: "2024-01-12",
      crypto: "ETH",
      amount: "0.5",
      usdValue: "$1,219.85",
      address: "0x742d...3456",
      status: "Pending",
      txHash: "-",
    },
  ];

  const selectedCryptoData = cryptoOptions.find(
    (crypto) => crypto.symbol === selectedCrypto,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !walletAddress) {
      alert("Please fill in all required fields");
      return;
    }
    if (
      parseFloat(amount) < parseFloat(selectedCryptoData?.minWithdraw || "0")
    ) {
      alert(
        `Minimum withdrawal amount is ${selectedCryptoData?.minWithdraw} ${selectedCrypto}`,
      );
      return;
    }
    if (!twoFactorCode) {
      alert("Two-factor authentication code is required for withdrawals");
      return;
    }
    alert(`Withdrawal request submitted for ${amount} ${selectedCrypto}`);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
        <h1 className="text-white text-2xl font-bold mb-2">Crypto Withdraw</h1>
        <p className="text-metax-text-muted mb-6">
          Withdraw your cryptocurrency to an external wallet
        </p>

        {/* Available Balances */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cryptoOptions.map((crypto) => (
            <div
              key={crypto.symbol}
              onClick={() => setSelectedCrypto(crypto.symbol)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                selectedCrypto === crypto.symbol
                  ? "border-metax-gold bg-metax-gold/10"
                  : "border-metax-border-gold/30 hover:border-metax-gold/50"
              }`}
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">
                    {crypto.symbol}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{crypto.name}</h3>
                  <span className="text-metax-text-muted text-sm">
                    {crypto.network}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-metax-gold text-lg font-bold">
                  {crypto.balance} {crypto.symbol}
                </div>
                <div className="text-metax-text-muted text-sm">
                  {crypto.usdValue}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Withdrawal Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Security Warning */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <h4 className="text-red-400 font-medium mb-2">
              🔒 Security Notice
            </h4>
            <ul className="text-metax-text-muted text-sm space-y-1">
              <li>• Always verify the destination wallet address</li>
              <li>• Cryptocurrency transactions are irreversible</li>
              <li>• Network fees will be deducted from your withdrawal</li>
              <li>
                • Minimum withdrawal: {selectedCryptoData?.minWithdraw}{" "}
                {selectedCrypto}
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">
                Withdrawal Amount ({selectedCrypto})
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Enter amount (min: ${selectedCryptoData?.minWithdraw})`}
                  step="0.00000001"
                  min={selectedCryptoData?.minWithdraw}
                  max={selectedCryptoData?.balance}
                  className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white placeholder-metax-text-muted focus:border-metax-gold focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setAmount(selectedCryptoData?.balance || "")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-metax-gold text-sm hover:text-metax-gold-dark"
                >
                  Max
                </button>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-metax-text-muted">
                  Available: {selectedCryptoData?.balance} {selectedCrypto}
                </span>
                <span className="text-metax-text-muted">
                  Fee: {selectedCryptoData?.fee} {selectedCrypto}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Destination Wallet Address
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder={`Enter ${selectedCrypto} wallet address`}
                className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white placeholder-metax-text-muted focus:border-metax-gold focus:outline-none"
                required
              />
              <p className="text-metax-text-muted text-sm mt-1">
                Make sure this address supports {selectedCryptoData?.network}{" "}
                network
              </p>
            </div>
          </div>

          {/* Withdrawal Summary */}
          {amount && walletAddress && (
            <div className="bg-metax-dark-section/40 border border-metax-border-gold/20 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">
                Withdrawal Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-metax-text-muted">Amount:</span>
                  <span className="text-white">
                    {amount} {selectedCrypto}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-metax-text-muted">Network Fee:</span>
                  <span className="text-red-400">
                    -{selectedCryptoData?.fee} {selectedCrypto}
                  </span>
                </div>
                <div className="flex justify-between border-t border-metax-border-gold/20 pt-2">
                  <span className="text-white font-medium">
                    You will receive:
                  </span>
                  <span className="text-metax-gold font-medium">
                    {(
                      parseFloat(amount || "0") -
                      parseFloat(selectedCryptoData?.fee || "0")
                    ).toFixed(8)}{" "}
                    {selectedCrypto}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 2FA Code */}
          <div>
            <label className="block text-white font-medium mb-2">
              Two-Factor Authentication Code *
            </label>
            <input
              type="text"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="w-full md:w-1/3 px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-white placeholder-metax-text-muted focus:border-metax-gold focus:outline-none"
              required
            />
            <p className="text-metax-text-muted text-sm mt-1">
              Enter the code from your authenticator app
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
            >
              Submit Withdrawal
            </button>
            <button
              type="button"
              onClick={() => {
                setAmount("");
                setWalletAddress("");
                setTwoFactorCode("");
              }}
              className="flex-1 bg-metax-dark-section hover:bg-metax-dark-section/80 text-white py-3 px-6 rounded-lg font-medium border border-metax-border-gold/30 transition-all duration-200"
            >
              Clear Form
            </button>
          </div>
        </form>

        {/* Recent Withdrawals */}
        <div className="mt-8">
          <h3 className="text-white text-lg font-semibold mb-4">
            Recent Withdrawals
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
                      Asset
                    </th>
                    <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                      Address
                    </th>
                    <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-metax-text-muted text-sm font-medium">
                      Tx Hash
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentWithdrawals.map((withdrawal, index) => (
                    <tr
                      key={index}
                      className="border-t border-metax-border-gold/20"
                    >
                      <td className="px-4 py-3 text-white text-sm">
                        {withdrawal.date}
                      </td>
                      <td className="px-4 py-3 text-white text-sm">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full flex items-center justify-center mr-2">
                            <span className="text-white text-xs font-bold">
                              {withdrawal.crypto}
                            </span>
                          </div>
                          {withdrawal.crypto}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-metax-gold font-medium">
                          {withdrawal.amount} {withdrawal.crypto}
                        </div>
                        <div className="text-metax-text-muted text-xs">
                          {withdrawal.usdValue}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-metax-text-muted text-sm font-mono">
                        {withdrawal.address}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            withdrawal.status === "Completed"
                              ? "bg-green-900/30 text-green-400"
                              : "bg-yellow-900/30 text-yellow-400"
                          }`}
                        >
                          {withdrawal.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-metax-text-muted text-sm font-mono">
                        {withdrawal.txHash}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoWithdraw;
