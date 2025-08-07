const emailHeaderImage = '/emailheader.jpg';

type EmailHeaderProps = {
  imgUrl: string;
  imgUrlMobile?: string;
  altText?: string;
};

const EmailHeader = ({ imgUrl, altText, imgUrlMobile }: EmailHeaderProps) => {
  return (
    <table width="100%" cellPadding={0} cellSpacing={0} border={0} role="banner">
      <tbody>
        <tr>
          <td align="center" className="p-reset text-0" valign="top">
            <img
              className="hide-on-mobile"
              src={imgUrl || emailHeaderImage}
              alt={altText || 'Email Header Image'}
              width="600"
              style={{
                display: 'block',
                width: '100%',
                maxWidth: '600px',
                height: 'auto',
                lineHeight: 0,
                fontSize: 0,
                border: 0,
              }}
            />
            <div dangerouslySetInnerHTML={{ __html: '<!--[if !mso]><!-->' }}></div>
            <img
              className="show-on-mobile responsive"
              src={imgUrlMobile || imgUrl || emailHeaderImage}
              alt={altText || 'Email Header Image'}
              style={{
                display: 'block',
                width: '100%',
                maxWidth: '600px',
                height: 'auto',
                lineHeight: 0,
                fontSize: 0,
                border: 0,
              }}
            />
            <div dangerouslySetInnerHTML={{ __html: '<!--<![endif]-->' }}></div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EmailHeader;
