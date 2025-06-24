import { useState } from "react";
import SectionHeading from "./SectionHeading";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      question: "What is cryptocurrency?",
      answer:
        "Cryptocurrency refers to a digital or virtual currency that uses cryptography for security and operates independently of a central bank. It's built on blockchain technology, ensuring transparency and decentralization.",
    },
    {
      question: "What are the best cryptocurrency to buy?",
      answer:
        "The best cryptocurrencies depend on your investment goals and risk tolerance. MetaX Coin offers unique advantages with our innovative platform and strong roadmap for growth.",
    },
    {
      question: "How to buy cryptocurrency?",
      answer:
        "You can buy cryptocurrency through various exchanges, wallets, or directly through our platform. Simply create an account, verify your identity, and start investing in MetaX Coin.",
    },
    {
      question: "How to sell cryptocurrency?",
      answer:
        "Selling cryptocurrency is as easy as buying. You can sell your MetaX Coins through our platform or any supported exchange by placing a sell order at your desired price.",
    },
    {
      question: "What is DeFi?",
      answer:
        "DeFi stands for Decentralized Finance. It's a blockchain-based form of finance that doesn't rely on central financial intermediaries and offers various financial instruments through smart contracts.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-metax-dark-section">
      <div className="container mx-auto px-3">
        <SectionHeading>Frequently Asked Questions</SectionHeading>

        <div className="max-w-4xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 bg-gradient-to-r from-amber-900/20 to-metax-gold-dark/20 border border-metax-border-gold rounded-lg hover:from-metax-gold-dark/30 hover:to-metax-gold/30 transition-all duration-200"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-metax-text-light font-medium text-lg">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-metax-gold transform transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 bg-gradient-to-r from-amber-900/20 to-metax-gold-dark/20 border-x border-b border-metax-border-gold rounded-b-lg -mt-1">
                  <p className="text-metax-text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
