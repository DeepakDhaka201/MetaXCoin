import { useState } from "react";

const Options = () => {
  const [activeTab, setActiveTab] = useState("security");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    tradingAlerts: true,
    marketUpdates: true,
    twoFactorAuth: false,
    loginAlerts: true,
    withdrawalConfirmation: true,
    autoLock: "30",
    theme: "dark",
    language: "en",
    timezone: "UTC",
    currency: "USD",
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: "security", name: "Security", icon: "🔒" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "preferences", name: "Preferences", icon: "⚙️" },
    { id: "api", name: "API Keys", icon: "🔑" },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 rounded-xl border border-metax-border-gold/30 p-6">
        <h1 className="text-white text-2xl font-bold mb-2">Account Options</h1>
        <p className="text-metax-text-muted mb-6">
          Manage your account settings, security preferences, and notifications
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-metax-border-gold/30 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-metax-gold border-b-2 border-metax-gold"
                  : "text-metax-text-muted hover:text-white"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold mb-4">
                  Authentication
                </h3>

                <div className="flex items-center justify-between p-4 bg-metax-dark-section/40 rounded-lg border border-metax-border-gold/20">
                  <div>
                    <h4 className="text-white font-medium">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-metax-text-muted text-sm">
                      Add an extra layer of security
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) =>
                        handleSettingChange("twoFactorAuth", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-metax-gold"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-metax-dark-section/40 rounded-lg border border-metax-border-gold/20">
                  <div>
                    <h4 className="text-white font-medium">Login Alerts</h4>
                    <p className="text-metax-text-muted text-sm">
                      Get notified of new logins
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.loginAlerts}
                      onChange={(e) =>
                        handleSettingChange("loginAlerts", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-metax-gold"></div>
                  </label>
                </div>

                <div className="p-4 bg-metax-dark-section/40 rounded-lg border border-metax-border-gold/20">
                  <h4 className="text-white font-medium mb-3">
                    Auto-Lock Timeout
                  </h4>
                  <select
                    value={settings.autoLock}
                    onChange={(e) =>
                      handleSettingChange("autoLock", e.target.value)
                    }
                    className="w-full p-2 bg-metax-dark-section border border-metax-border-gold/30 rounded text-white"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold mb-4">
                  Password & Recovery
                </h3>

                <button className="w-full p-4 bg-metax-dark-section/40 rounded-lg border border-metax-border-gold/20 text-left hover:border-metax-gold/40 transition-colors">
                  <h4 className="text-white font-medium">Change Password</h4>
                  <p className="text-metax-text-muted text-sm">
                    Update your account password
                  </p>
                </button>

                <button className="w-full p-4 bg-metax-dark-section/40 rounded-lg border border-metax-border-gold/20 text-left hover:border-metax-gold/40 transition-colors">
                  <h4 className="text-white font-medium">Backup Codes</h4>
                  <p className="text-metax-text-muted text-sm">
                    Generate recovery backup codes
                  </p>
                </button>

                <button className="w-full p-4 bg-metax-dark-section/40 rounded-lg border border-metax-border-gold/20 text-left hover:border-metax-gold/40 transition-colors">
                  <h4 className="text-white font-medium">Active Sessions</h4>
                  <p className="text-metax-text-muted text-sm">
                    Manage logged-in devices
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold mb-4">
                  Communication Preferences
                </h3>

                {[
                  {
                    key: "emailNotifications",
                    title: "Email Notifications",
                    desc: "Receive updates via email",
                  },
                  {
                    key: "smsNotifications",
                    title: "SMS Notifications",
                    desc: "Receive updates via text message",
                  },
                  {
                    key: "tradingAlerts",
                    title: "Trading Alerts",
                    desc: "Get notified of trading opportunities",
                  },
                  {
                    key: "marketUpdates",
                    title: "Market Updates",
                    desc: "Receive market news and updates",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 bg-metax-dark-section/40 rounded-lg border border-metax-border-gold/20"
                  >
                    <div>
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <p className="text-metax-text-muted text-sm">
                        {item.desc}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          settings[item.key as keyof typeof settings] as boolean
                        }
                        onChange={(e) =>
                          handleSettingChange(item.key, e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-metax-gold"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold mb-4">
                  Security Notifications
                </h3>

                <div className="flex items-center justify-between p-4 bg-metax-dark-section/40 rounded-lg border border-metax-border-gold/20">
                  <div>
                    <h4 className="text-white font-medium">
                      Withdrawal Confirmation
                    </h4>
                    <p className="text-metax-text-muted text-sm">
                      Confirm withdrawals via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.withdrawalConfirmation}
                      onChange={(e) =>
                        handleSettingChange(
                          "withdrawalConfirmation",
                          e.target.checked,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-metax-gold"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold mb-4">
                  Display Settings
                </h3>

                <div className="p-4 bg-metax-dark-section/40 rounded-lg border border-metax-border-gold/20">
                  <h4 className="text-white font-medium mb-3">Theme</h4>
                  <select
                    value={settings.theme}
                    onChange={(e) =>
                      handleSettingChange("theme", e.target.value)
                    }
                    className="w-full p-2 bg-metax-dark-section border border-metax-border-gold/30 rounded text-white"
                  >
                    <option value="dark">Dark Theme</option>
                    <option value="light">Light Theme</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>

                <div className="p-4 bg-metax-dark-section/40 rounded-lg border border-metax-border-gold/20">
                  <h4 className="text-white font-medium mb-3">Language</h4>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      handleSettingChange("language", e.target.value)
                    }
                    className="w-full p-2 bg-metax-dark-section border border-metax-border-gold/30 rounded text-white"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold mb-4">
                  Regional Settings
                </h3>

                <div className="p-4 bg-metax-dark-section/40 rounded-lg border border-metax-border-gold/20">
                  <h4 className="text-white font-medium mb-3">Timezone</h4>
                  <select
                    value={settings.timezone}
                    onChange={(e) =>
                      handleSettingChange("timezone", e.target.value)
                    }
                    className="w-full p-2 bg-metax-dark-section border border-metax-border-gold/30 rounded text-white"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time</option>
                    <option value="PST">Pacific Time</option>
                    <option value="GMT">GMT</option>
                    <option value="CET">Central European Time</option>
                  </select>
                </div>

                <div className="p-4 bg-metax-dark-section/40 rounded-lg border border-metax-border-gold/20">
                  <h4 className="text-white font-medium mb-3">Currency</h4>
                  <select
                    value={settings.currency}
                    onChange={(e) =>
                      handleSettingChange("currency", e.target.value)
                    }
                    className="w-full p-2 bg-metax-dark-section border border-metax-border-gold/30 rounded text-white"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="BTC">BTC - Bitcoin</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Keys Tab */}
        {activeTab === "api" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold mb-4">
                API Key Management
              </h3>

              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="text-yellow-400 font-medium mb-2">
                  ⚠ Security Warning
                </h4>
                <p className="text-metax-text-muted text-sm">
                  API keys provide direct access to your account. Keep them
                  secure and never share them with anyone.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-metax-dark-section/40 rounded-lg border border-metax-border-gold/20">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-medium">
                        Trading API Key
                      </h4>
                      <p className="text-metax-text-muted text-sm">
                        For automated trading and portfolio management
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="bg-metax-black/50 p-2 rounded border border-metax-border-gold/20 mb-3">
                    <code className="text-metax-gold text-xs">
                      mtx_live_1234567890abcdef...••••••••
                    </code>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-metax-gold/20 hover:bg-metax-gold/30 text-metax-gold rounded text-sm transition-colors">
                      Regenerate
                    </button>
                    <button className="px-3 py-1 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded text-sm transition-colors">
                      Revoke
                    </button>
                  </div>
                </div>

                <button className="w-full p-4 border-2 border-dashed border-metax-border-gold/30 rounded-lg hover:border-metax-gold/50 transition-colors text-center">
                  <div className="text-metax-gold text-2xl mb-2">+</div>
                  <div className="text-white font-medium">
                    Create New API Key
                  </div>
                  <div className="text-metax-text-muted text-sm">
                    Generate a new API key for your applications
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-metax-border-gold/30">
          <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white py-3 px-8 rounded-lg font-medium transition-all duration-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
