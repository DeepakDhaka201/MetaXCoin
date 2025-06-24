import SectionHeading from "./SectionHeading";

const RoadmapSection = () => {
  const roadmapItems = [
    {
      date: "April 2025",
      title: "Crypto ICO Platform",
      description:
        "Launch of our innovative ICO platform with advanced security features",
    },
    {
      date: "August 2025",
      title: "Project Audits",
      description:
        "Comprehensive security audits by leading blockchain security firms",
    },
    {
      date: "December 2025",
      title: "Exchange Listings",
      description: "Major cryptocurrency exchange listings and partnerships",
    },
    {
      date: "April 2026",
      title: "DeFi Integration",
      description:
        "Integration with major DeFi protocols and yield farming opportunities",
    },
    {
      date: "August 2026",
      title: "Mobile App Launch",
      description: "Official MetaX mobile application for iOS and Android",
    },
    {
      date: "December 2026",
      title: "Staking Platform",
      description: "Launch of staking platform with competitive rewards",
    },
    {
      date: "April 2027",
      title: "Global Expansion",
      description: "Worldwide expansion and regulatory compliance achievements",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-3">
        <SectionHeading>Roadmap</SectionHeading>

        <div className="relative">
          {/* Horizontal scrolling container */}
          <div className="overflow-x-auto pb-6">
            <div className="flex space-x-8 min-w-max">
              {roadmapItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center min-w-[280px]"
                >
                  {/* Roadmap dot */}
                  <div className="w-4 h-4 bg-metax-gold rounded-full mb-4 relative">
                    {/* Connect line */}
                    {index < roadmapItems.length - 1 && (
                      <div className="absolute top-2 left-8 w-64 h-0.5 bg-metax-gold-dark"></div>
                    )}
                  </div>

                  {/* Date */}
                  <h3 className="text-lg md:text-xl font-semibold text-metax-gold mb-2">
                    {item.date}
                  </h3>

                  {/* Title */}
                  <h4 className="text-metax-text-light font-medium mb-2 text-center">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-metax-text-muted text-sm text-center leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
