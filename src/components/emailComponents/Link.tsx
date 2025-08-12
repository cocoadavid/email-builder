type LinkProps = {
  text: string;
  href: string;
  className?: string;
  color?: string;
};
const Link = ({ text, href, className, color }: LinkProps) => {
  return (
    <a
      href={href || 'https://reallygoodemails.com/'}
      target="_blank"
      className={className}
      style={{ color }}
      role="link"
    >
      <span className={className} style={{ color }}>
        {text || 'placeholder'}
      </span>
    </a>
  );
};

export default Link;
