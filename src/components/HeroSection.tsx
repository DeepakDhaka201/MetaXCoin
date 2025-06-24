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

          {/* Right Column - Empty for now */}
          <div className="flex justify-center items-center pt-12 lg:pt-37">
            {/* This would be where hero image/graphic would go */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
