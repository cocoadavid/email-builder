const fallbackImage = '/assets/example/email-header-600x250.PNG';
import { useEmailType } from '@/context/EmailTypeContext';

type HeaderImageProps = {
  src: string;
  srcMobile?: string;
  altText?: string;
};

const HeaderImage = ({ src, altText, srcMobile }: HeaderImageProps) => {
  const { emailType } = useEmailType();

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackImage;
  };

  return (
    <table className="w-full" width="100%" cellPadding={0} cellSpacing={0} border={0} role="banner">
      <tbody>
        <tr>
          <td align="center" className="p-reset text-0" valign="top">
            <img
              className={['highspot', 'oft'].includes(emailType ?? '') ? '' : 'hide-on-mobile'}
              src={src}
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
              onError={handleError}
            />
            {(emailType ?? '') !== 'highspot' && (emailType ?? '') !== 'oft' && (
              <>
                <div dangerouslySetInnerHTML={{ __html: '<!--[if !mso]><!-->' }}></div>
                <img
                  className="show-on-mobile responsive"
                  src={srcMobile || src}
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
              </>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default HeaderImage;
