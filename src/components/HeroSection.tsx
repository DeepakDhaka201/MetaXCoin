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
            <p className="text-base md:text-lg text-metax-text-muted leading-relaxed max-w-2xl mb-8">
              Meta X Coin where earning money from the comfort of your home is
              made simple and risk-free. Join thousands of investors who have
              already discovered the power of decentralized finance and
              blockchain technology.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/register"
                className="bg-gradient-to-r from-amber-900 to-metax-gold-dark hover:from-metax-gold-dark hover:to-metax-gold text-white px-8 py-4 rounded-md transition-all duration-200 font-semibold text-lg text-center"
              >
                Get Started
              </a>
              <button className="border border-metax-border-gold text-metax-gold hover:bg-metax-gold hover:text-metax-black px-8 py-4 rounded-md transition-all duration-200 font-semibold text-lg">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column - Crypto Image */}
          <div className="flex justify-center items-center pt-12 lg:pt-37">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg"
                alt="Meta X Coin - Cryptocurrency Trading"
                className="w-full max-w-md h-80 object-cover rounded-lg shadow-2xl border border-metax-border-gold/30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-metax-black/60 via-transparent to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="text-metax-gold text-2xl font-bold mb-2">
                  MXC
                </div>
                <div className="text-metax-text-light text-sm">Meta X Coin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
