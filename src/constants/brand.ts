// Brand constants for the application
export const BRAND = {
  // Coin Information
  COIN_NAME: 'APED Coin',
  COIN_SYMBOL: 'APD',
  COIN_SHORT_NAME: 'APED',

  // Display Names
  FULL_NAME: 'APED Coin',
  SHORT_NAME: 'APED',
  DISPLAY_NAME: 'APED Coin',

  // URLs and Contact
  SUPPORT_EMAIL: 'support@metaxcoin.cloud',
  WEBSITE_URL: 'https://metaxcoin.cloud',

  // App Information
  APP_TITLE: 'MetaX Coin - Cryptocurrency Trading Platform',
  APP_DESCRIPTION: 'Trade, invest and earn with MetaX Coin - the future of cryptocurrency',

  // Logo and Assets
  LOGO_URL: '/logo.png',
  ICON_URL: '/icon.png',
  FAVICON_URL: '/favicon.png',
} as const;

// Export individual constants for convenience
export const {
  COIN_NAME,
  COIN_SYMBOL,
  COIN_SHORT_NAME,
  FULL_NAME,
  SHORT_NAME,
  DISPLAY_NAME,
  SUPPORT_EMAIL,
  WEBSITE_URL,
  APP_TITLE,
  APP_DESCRIPTION,
  LOGO_URL,
  ICON_URL,
  FAVICON_URL,
} = BRAND;
