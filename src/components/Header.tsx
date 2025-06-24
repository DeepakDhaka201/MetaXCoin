import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Platform", href: "#platform" },
    { name: "Tokens", href: "#tokens" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between py-5">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <a href="/" className="text-metax-gold text-2xl font-bold">
              MetaX Coin
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Navigation Menu */}
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-metax-text-light hover:text-metax-gold transition-colors duration-200 text-base font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-4 ml-8">
              <a
                href="/login"
                className="border border-metax-border-gold text-metax-gold hover:bg-metax-gold hover:text-metax-black px-5 py-2 rounded-md transition-all duration-200 font-medium inline-block"
              >
                Login
              </a>
              <a
                href="/register"
                className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-5 py-2 rounded-md transition-all duration-200 font-medium inline-block"
              >
                Sign Up
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-metax-text-light"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-metax-black/95 backdrop-blur-sm border-t border-metax-border-gold/30">
            <div className="px-3 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavClick(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-metax-text-light hover:text-metax-gold transition-colors duration-200 text-base font-medium py-2 text-left w-full"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <a
                  href="/login"
                  className="border border-metax-border-gold text-metax-gold hover:bg-metax-gold hover:text-metax-black px-5 py-2 rounded-md transition-all duration-200 font-medium text-center"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-5 py-2 rounded-md transition-all duration-200 font-medium text-center"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
