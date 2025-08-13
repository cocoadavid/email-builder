type LinkProps = {
  text: string;
  href: string;
  className?: string;
  color?: string;
  removeSpace?: boolean;
  removeSpaceBefore?: boolean;
  removeSpaceAfter?: boolean;
};

const Link = ({
  text,
  href,
  className,
  color,
  removeSpace = false,
  removeSpaceBefore = false,
  removeSpaceAfter = false,
}: LinkProps) => {
  return (
    <>
      {!removeSpace && !removeSpaceBefore && ' '}
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
      {!removeSpace && !removeSpaceAfter && ' '}
    </>
  );
};

export default Link;
