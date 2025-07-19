interface IconProps {
  className?: string;
  size?: number;
}

export const DashboardIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

export const NotificationIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

export const InvestmentIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  </svg>
);

export const WalletIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.11.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

export const BankIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M11.5 1L2 6v2h20V6l-9.5-5zM4 8v11h3v-2h2v2h2v-2h2v2h2v-2h2v2h3V8H4zm8 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
);

export const CoinIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.58 4.18 3.91 0 1.82-1.33 2.96-3.12 3.16z" />
  </svg>
);

export const LightningIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
);

export const UsersIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63c-.34-.99-1.24-1.65-2.26-1.65-.8 0-1.54.37-2.01.99l-1.54 2.02c-.33.44-.77.74-1.23.82L9 10.98V13h4.5v8H16zM8.5 12.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S7 10.17 7 11s.67 1.5 1.5 1.5z" />
  </svg>
);

export const TrophyIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M7 4V2c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h4v2h-1l-.64 7.11c-.07.78-.69 1.39-1.47 1.39H16v4c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2v-4H5.11c-.78 0-1.4-.61-1.47-1.39L3 6H2V4h5zm2 0h6V2H9v2zm7 2H8l.54 6H15.46L16 6z" />
  </svg>
);

export const DiamondIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M6 2l-1.5 6L12 22l7.5-14L18 2H6zm2.38 4h7.24l-.9 3.6L12 18.5 9.28 9.6L8.38 6z" />
  </svg>
);

export const ChartIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
  </svg>
);

export const TrendUpIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  </svg>
);

export const TrendDownIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z" />
  </svg>
);

export const UserIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export const StarIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const CalendarIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
);

export const PhoneIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

export const GlobeIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
  </svg>
);

export const ArrowRightIcon = ({ className = "w-4 h-4", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
  </svg>
);

export const LogoutIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);

export const AddIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

export const WithdrawIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zm0 4.24L9.47 8.63 7 8.95l2.5 2.43-.59 3.44L12 13.77l3.09 1.05-.59-3.44L17 8.95l-2.47-.32L12 6.24z" />
  </svg>
);



export const DepositIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zm0 4.24L9.47 8.63 7 8.95l2.5 2.43-.59 3.44L12 13.77l3.09 1.05-.59-3.44L17 8.95l-2.47-.32L12 6.24z" />
  </svg>
);

export const PendingIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
  </svg>
);

export const CompleteIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

export const TotalIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);
