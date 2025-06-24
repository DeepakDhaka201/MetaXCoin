const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Content */}
          <div className="pt-12 lg:pt-50">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-metax-gold leading-tight mb-8">
              The Next Evolution in Crypto: Meta X Coin
            </h1>
            <p className="text-base md:text-lg text-metax-text-muted leading-relaxed max-w-2xl">
              Meta X Coin where earning money from the comfort of your home is
              made simple and risk-free. Join thousands of investors who have
              already discovered the power of decentralized finance and
              blockchain technology.
            </p>
          </div>

          {/* Right Column - Visual Space */}
          <div className="flex justify-center items-center pt-12 lg:pt-37">
            <div className="w-full max-w-md h-64 bg-gradient-to-r from-amber-900/10 to-metax-gold-dark/10 rounded-lg border border-metax-border-gold/30 flex items-center justify-center">
              <div className="text-metax-gold text-4xl font-bold">MXC</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
