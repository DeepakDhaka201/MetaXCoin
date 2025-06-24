interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeading = ({ children, className = "" }: SectionHeadingProps) => {
  return (
    <h2
      className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-metax-gold mb-10 -mt-12 ${className}`}
    >
      {children}
    </h2>
  );
};

export default SectionHeading;
