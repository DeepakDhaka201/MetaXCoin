import SectionHeading from "./SectionHeading";

const RoadmapSection = () => {
  const roadmapItems = [
    {
      date: "April 2025",
      title: "Crypto ICO Platform",
      description: "Launch of our innovative ICO platform",
    },
    {
      date: "August 2025",
      title: "Project Audits",
      description: "Comprehensive security audits",
    },
    {
      date: "December 2025",
      title: "Exchange Listings",
      description: "Major exchange listings",
    },
    {
      date: "April 2026",
      title: "DeFi Integration",
      description: "DeFi protocol integration",
    },
    {
      date: "August 2026",
      title: "Mobile Application",
      description: "iOS and Android app launch",
    },
    {
      date: "December 2026",
      title: "Staking Platform",
      description: "Staking rewards system",
    },
    {
      date: "April 2027",
      title: "Global Expansion",
      description: "Worldwide market expansion",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-3">
        <SectionHeading>Roadmap</SectionHeading>

        <div className="relative mt-16">
          {/* Timeline line */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-6xl h-0.5 bg-gradient-to-r from-transparent via-metax-gold to-transparent"></div>

          {/* Roadmap items */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Roadmap dot with animation */}
                <div className="w-6 h-6 bg-gradient-to-r from-amber-900 to-metax-gold-dark rounded-full mb-4 relative z-10 shadow-lg border-2 border-metax-gold group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-metax-gold rounded-full animate-pulse opacity-50"></div>
                </div>

                {/* Card */}
                <div className="bg-gradient-to-b from-metax-dark-section/50 to-metax-black/30 p-6 rounded-lg border border-metax-border-gold/30 hover:border-metax-gold/60 transition-all duration-300 backdrop-blur-sm group-hover:transform group-hover:scale-105">
                  {/* Date */}
                  <h3 className="text-base font-semibold text-metax-gold mb-2">
                    {item.date}
                  </h3>

                  {/* Title */}
                  <h4 className="text-metax-text-light font-medium mb-2 text-sm">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-metax-text-muted text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
