type LinkProps = {
  text: string;
  url: string;
  classes?: string;
};
const Link = ({ text, url, classes }: LinkProps) => {
  return (
    <a href={url || 'https://reallygoodemails.com/'} target="_blank" className={classes}>
      <span className={classes}>{text || 'placeholder'}</span>
    </a>
  );
};

export default Link;
