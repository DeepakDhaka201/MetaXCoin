import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import EnhancedAnimations from "../components/EnhancedAnimations";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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
    // Handle login logic here
    console.log("Login attempt:", formData);
  };

  return (
    <div className="min-h-screen bg-metax-black flex items-center justify-center relative overflow-hidden">
      {/* Background Animations */}
      <AnimatedBackground />
      <EnhancedAnimations />

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-gradient-to-br from-metax-dark-section/50 to-metax-black/30 backdrop-blur-sm rounded-2xl border border-metax-border-gold/30 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-metax-gold mb-2">
              Welcome Back
            </h1>
            <p className="text-metax-text-muted">
              Sign in to your MetaX Coin account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Password Field */}
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
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-metax-gold border-metax-border-gold rounded focus:ring-metax-gold"
                />
                <span className="ml-2 text-sm text-metax-text-muted">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-metax-gold hover:text-metax-gold-dark transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-metax-text-muted">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-metax-gold hover:text-metax-gold-dark transition-colors font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-metax-border-gold/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-metax-dark-section text-metax-text-muted">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button className="w-10 h-10 bg-metax-gold hover:bg-metax-gold-dark rounded-full flex items-center justify-center transition-colors">
                <span className="text-metax-black text-lg">G</span>
              </button>
              <button className="w-10 h-10 bg-metax-gold hover:bg-metax-gold-dark rounded-full flex items-center justify-center transition-colors">
                <span className="text-metax-black text-lg">F</span>
              </button>
              <button className="w-10 h-10 bg-metax-gold hover:bg-metax-gold-dark rounded-full flex items-center justify-center transition-colors">
                <span className="text-metax-black text-lg">T</span>
              </button>
            </div>
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

export default Login;
