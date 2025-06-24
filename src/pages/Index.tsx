import AnimatedBackground from "../components/AnimatedBackground";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import RoadmapSection from "../components/RoadmapSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-metax-black text-metax-text-light relative overflow-x-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <Header />

      {/* Hero Section */}
      <HeroSection />

        {/* About Company Section */}
        <section className="py-20">
          <div className="container mx-auto px-3">
            <SectionHeading>About Company</SectionHeading>
            <div className="mt-10">
              <p className="text-metax-text-muted text-lg leading-relaxed max-w-4xl mb-8">
                MetaX Coin represents the future of decentralized finance,
                offering innovative solutions for cryptocurrency enthusiasts and
                investors worldwide. Our platform combines cutting-edge blockchain
                technology with user-friendly interfaces to make digital asset
                management accessible to everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-md transition-all duration-200 font-medium">
                  Learn More
                </button>
                <button className="border border-metax-border-gold text-metax-gold hover:bg-metax-gold hover:text-metax-black px-6 py-3 rounded-md transition-all duration-200 font-medium">
                  Our Team
                </button>
              </div>
            </div>
          </div>
        </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-metax-black to-metax-dark-section">
        <div className="container mx-auto px-3">
          <SectionHeading>Why Choose Us</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-metax-gold font-semibold mb-2">
                Secure & Safe
              </h3>
              <p className="text-metax-text-muted">
                Advanced security protocols protect your investments
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-metax-gold font-semibold mb-2">
                Fast Transactions
              </h3>
              <p className="text-metax-text-muted">
                Lightning-fast blockchain transactions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-metax-gold font-semibold mb-2">Low Fees</h3>
              <p className="text-metax-text-muted">
                Minimal transaction costs for maximum returns
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* BSCScan Section */}
        <section className="py-20">
          <div className="container mx-auto px-3">
            <SectionHeading>What is BscScan?</SectionHeading>
            <div className="mt-10">
              <p className="text-metax-text-muted text-lg leading-relaxed max-w-4xl mb-8">
                BscScan is the leading Binance Smart Chain explorer that allows
                you to explore and search the Binance Smart Chain for
                transactions, addresses, tokens, prices and other activities. It
                provides complete transparency and verification for all MetaX Coin
                transactions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-6 py-3 rounded-md transition-all duration-200 font-medium inline-block text-center"
                >
                  View on BSCScan
                </a>
                <button className="border border-metax-border-gold text-metax-gold hover:bg-metax-gold hover:text-metax-black px-6 py-3 rounded-md transition-all duration-200 font-medium">
                  Contract Address
                </button>
              </div>
            </div>
          </div>
        </section>

      {/* MXC Section */}
      <section className="py-20 bg-metax-dark-section">
        <div className="container mx-auto px-3">
          <SectionHeading>MXC</SectionHeading>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-metax-gold mb-6">
                MetaX Coin Token
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-metax-border-gold/30">
                  <span className="text-metax-text-muted">Symbol:</span>
                  <span className="text-metax-text-light font-semibold">
                    MXC
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-metax-border-gold/30">
                  <span className="text-metax-text-muted">Total Supply:</span>
                  <span className="text-metax-text-light font-semibold">
                    1,000,000,000 MXC
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-metax-border-gold/30">
                  <span className="text-metax-text-muted">Network:</span>
                  <span className="text-metax-text-light font-semibold">
                    Binance Smart Chain
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-metax-text-muted">Decimals:</span>
                  <span className="text-metax-text-light font-semibold">
                    18
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-block p-8 bg-gradient-to-r from-amber-900/20 to-metax-gold-dark/20 rounded-lg border border-metax-border-gold">
                <div className="text-4xl font-bold text-metax-gold mb-2">
                  MXC
                </div>
                <div className="text-metax-text-muted">MetaX Coin</div>
              </div>
            </div>
            <div className="text-center mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-8 py-4 rounded-md transition-all duration-200 font-semibold text-lg">
                  Join Presale
                </button>
                <button className="border border-metax-border-gold text-metax-gold hover:bg-metax-gold hover:text-metax-black px-8 py-4 rounded-md transition-all duration-200 font-semibold text-lg">
                  Token Calculator
                </button>
              </div>
            </div>
          </div>
        </section>

      {/* Token Sale Section */}
      <section className="py-20">
        <div className="container mx-auto px-3">
          <SectionHeading>Token Sale</SectionHeading>
          <div className="mt-10 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-r from-amber-900/20 to-metax-gold-dark/20 rounded-lg border border-metax-border-gold">
                <div className="text-2xl font-bold text-metax-gold mb-2">
                  Pre-Sale
                </div>
                <div className="text-metax-text-muted text-sm">
                  $0.05 per MXC
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-amber-900/20 to-metax-gold-dark/20 rounded-lg border border-metax-border-gold">
                <div className="text-2xl font-bold text-metax-gold mb-2">
                  Public Sale
                </div>
                <div className="text-metax-text-muted text-sm">
                  $0.10 per MXC
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-amber-900/20 to-metax-gold-dark/20 rounded-lg border border-metax-border-gold">
                <div className="text-2xl font-bold text-metax-gold mb-2">
                  Listing Price
                </div>
                <div className="text-metax-text-muted text-sm">
                  $0.15 per MXC
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-amber-900/20 to-metax-gold-dark/20 rounded-lg border border-metax-border-gold">
                <div className="text-2xl font-bold text-metax-gold mb-2">
                  Hard Cap
                </div>
                <div className="text-metax-text-muted text-sm">$10M USD</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <RoadmapSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-3">
          <SectionHeading>Contact Us</SectionHeading>
          <div className="mt-10 max-w-2xl mx-auto text-center">
            <p className="text-metax-text-muted text-lg leading-relaxed mb-8">
              Have questions about MetaX Coin? We're here to help. Reach out to
              our team for support, partnerships, or general inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@metaxcoin.cloud"
                className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-8 py-3 rounded-md transition-all duration-200 font-medium"
              >
                Email Us
              </a>
              <a
                href="#"
                className="border border-metax-border-gold text-metax-gold hover:bg-metax-gold hover:text-metax-black px-8 py-3 rounded-md transition-all duration-200 font-medium"
              >
                Join Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;