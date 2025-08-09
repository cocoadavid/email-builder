type LinkProps = {
  text: string;
  url: string;
  className?: string;
  color?: string
};
const Link = ({ text, url, className, color }: LinkProps) => {
  return (
    <a href={url || 'https://reallygoodemails.com/'} target="_blank" className={className} style={{color}}>
      <span className={className} style={{color}}>{text || 'placeholder'}</span>
    </a>
  );
};

export default Link;
