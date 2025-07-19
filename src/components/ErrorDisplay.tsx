import React from 'react';

interface ErrorDisplayProps {
  error: any;
  onRetry?: () => void;
  title?: string;
  description?: string;
  className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  title = "Something went wrong",
  description,
  className = ""
}) => {
  const getErrorMessage = () => {
    if (typeof error === 'string') return error;
    if (error?.response?.data?.error) return error.response.data.error;
    if (error?.message) return error.message;
    return "An unexpected error occurred. Please try again.";
  };

  const getErrorDescription = () => {
    if (description) return description;
    
    if (error?.response?.status === 401) {
      return "Your session has expired. Please log in again.";
    }
    if (error?.response?.status === 403) {
      return "You don't have permission to access this resource.";
    }
    if (error?.response?.status === 404) {
      return "The requested resource was not found.";
    }
    if (error?.response?.status >= 500) {
      return "Server error. Please try again later.";
    }
    if (error?.code === 'NETWORK_ERROR') {
      return "Network error. Please check your internet connection.";
    }
    
    return "Please try again or contact support if the problem persists.";
  };

  return (
    <div className={`text-center p-6 ${className}`}>
      <div className="text-red-400 text-4xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-metax-text-muted mb-2">{getErrorMessage()}</p>
      <p className="text-metax-text-muted text-sm mb-6">{getErrorDescription()}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
