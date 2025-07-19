import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AnimatedBackground from "../components/AnimatedBackground";
import EnhancedAnimations from "../components/EnhancedAnimations";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    sponsor_code: "",
    agreeTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get sponsor code from URL if present
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sponsorCode = urlParams.get('sponsor');
    if (sponsorCode) {
      setFormData(prev => ({ ...prev, sponsor_code: sponsorCode }));
    }
  }, [location]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        sponsor_code: formData.sponsor_code || undefined,
      });

      // Navigation will be handled by the useEffect above
    } catch (error) {
      // Error handling is done in the AuthContext
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-metax-black flex items-center justify-center relative overflow-hidden py-12">
      {/* Background Animations */}
      <AnimatedBackground />
      <EnhancedAnimations />

      {/* Register Form */}
      <div className="relative z-10 w-full max-w-lg p-8">
        <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 backdrop-blur-sm rounded-2xl border border-metax-border-gold/30 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-metax-gold mb-2">
              Join MetaX Coin
            </h1>
            <p className="text-metax-text-muted">
              Create your account and start investing
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-metax-text-light text-sm font-medium mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-metax-text-light placeholder-metax-text-muted focus:outline-none focus:border-metax-gold focus:ring-1 focus:ring-metax-gold transition-colors"
                  placeholder="First name"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-metax-text-light text-sm font-medium mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-metax-text-light placeholder-metax-text-muted focus:outline-none focus:border-metax-gold focus:ring-1 focus:ring-metax-gold transition-colors"
                  placeholder="Last name"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-metax-text-light text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-metax-text-light placeholder-metax-text-muted focus:outline-none focus:border-metax-gold focus:ring-1 focus:ring-metax-gold transition-colors"
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-metax-text-light text-sm font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-metax-text-light placeholder-metax-text-muted focus:outline-none focus:border-metax-gold focus:ring-1 focus:ring-metax-gold transition-colors"
                placeholder="Choose a username"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Sponsor Field */}
            <div>
              <label
                htmlFor="sponsor_code"
                className="block text-metax-text-light text-sm font-medium mb-2"
              >
                Sponsor Code (Optional)
              </label>
              <input
                type="text"
                id="sponsor_code"
                name="sponsor_code"
                value={formData.sponsor_code}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-metax-text-light placeholder-metax-text-muted focus:outline-none focus:border-metax-gold focus:ring-1 focus:ring-metax-gold transition-colors"
                placeholder="Enter sponsor code"
                disabled={isSubmitting}
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-metax-text-light text-sm font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-metax-text-light placeholder-metax-text-muted focus:outline-none focus:border-metax-gold focus:ring-1 focus:ring-metax-gold transition-colors"
                  placeholder="Create password"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-metax-text-light text-sm font-medium mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-metax-text-light placeholder-metax-text-muted focus:outline-none focus:border-metax-gold focus:ring-1 focus:ring-metax-gold transition-colors"
                  placeholder="Confirm password"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="w-4 h-4 text-metax-gold border-metax-border-gold rounded focus:ring-metax-gold mt-1"
                required
                disabled={isSubmitting}
              />
              <label
                htmlFor="agreeTerms"
                className="ml-2 text-sm text-metax-text-muted"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-metax-gold hover:text-metax-gold-dark transition-colors"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-metax-gold hover:text-metax-gold-dark transition-colors"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-metax-text-muted">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-metax-gold hover:text-metax-gold-dark transition-colors font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-metax-text-muted hover:text-metax-gold transition-colors text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
