import { Button } from "./ui/button";

const Header = () => {
  const navItems = [
    "Home",
    "About",
    "Platform",
    "Tokens",
    "Roadmap",
    "Contact",
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between py-5">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <a href="/" className="text-metax-gold text-xl font-bold">
              MetaX Coin
            </a>
          </div>

          {/* Navigation Section */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Navigation Menu */}
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-metax-text-light hover:text-metax-gold transition-colors duration-200 text-base"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-4 ml-8">
              <Button
                variant="outline"
                className="bg-gradient-to-r from-amber-900 to-metax-gold-dark border-metax-border-gold text-white hover:from-metax-gold-dark hover:to-metax-gold px-5 py-2 rounded-md"
              >
                Login
              </Button>
              <Button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-5 py-2 rounded-md">
                Sign Up
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-metax-text-light">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
