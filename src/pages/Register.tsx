import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import EnhancedAnimations from "../components/EnhancedAnimations";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    sponsor: "",
    agreeTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration attempt:", formData);
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
                  htmlFor="firstName"
                  className="block text-metax-text-light text-sm font-medium mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-metax-text-light placeholder-metax-text-muted focus:outline-none focus:border-metax-gold focus:ring-1 focus:ring-metax-gold transition-colors"
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-metax-text-light text-sm font-medium mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-metax-text-light placeholder-metax-text-muted focus:outline-none focus:border-metax-gold focus:ring-1 focus:ring-metax-gold transition-colors"
                  placeholder="Last name"
                  required
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
              />
            </div>

            {/* Sponsor Field */}
            <div>
              <label
                htmlFor="sponsor"
                className="block text-metax-text-light text-sm font-medium mb-2"
              >
                Sponsor (Optional)
              </label>
              <input
                type="text"
                id="sponsor"
                name="sponsor"
                value={formData.sponsor}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-metax-dark-section border border-metax-border-gold/30 rounded-lg text-metax-text-light placeholder-metax-text-muted focus:outline-none focus:border-metax-gold focus:ring-1 focus:ring-metax-gold transition-colors"
                placeholder="Sponsor username"
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
              className="w-full bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Create Account
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
