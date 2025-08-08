type EmailLinkProps = {
  text: string;
  url: string;
  classes?: string;
};
const EmailLink = ({ text, url, classes }: EmailLinkProps) => {
  return (
    <a href={url || 'https://reallygoodemails.com/'} target="_blank" className={classes}>
      <span className={classes}>{text || 'placeholder'}</span>
    </a>
  );
};

export default EmailLink;
