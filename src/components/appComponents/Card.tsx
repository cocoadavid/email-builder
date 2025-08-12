type CardProps = {
  children: React.ReactNode;
  className?: string;
};
const Card = ({ children, className = '' }: CardProps) => {
  return <div className={`p-4 bg-white shadow-lg ${className}`}>{children}</div>;
};

export default Card;
