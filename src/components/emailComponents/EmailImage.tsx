import { useEmailType } from '@/context/EmailTypeContext';

type EmailImageProps = {
  src: string;
  srcMobile?: string;
  sameOnMobile: boolean;
  alt: string;
  width: number;
  center?: boolean;
};

const EmailImage = ({
  src,
  srcMobile,
  sameOnMobile = false,
  alt = '',
  center = false,
  width,
}: EmailImageProps) => {
  const { emailType } = useEmailType();
  const desktopClassName = [srcMobile ? 'hide-on-mobile' : null, center ? 'center' : null]
    .filter(Boolean)
    .join(' ');
  if (srcMobile) {
    sameOnMobile = false;
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        width={width}
        style={{
          display: 'block',
          width: `${width}px`,
          maxWidth: '100%',
          height: `auto`,
        }}
        className={desktopClassName}
      />
      {!!srcMobile &&
        (emailType ?? '') !== 'highspot' &&
        (emailType ?? '') !== 'oft' &&
        !sameOnMobile && (
          <>
            <div dangerouslySetInnerHTML={{ __html: '<!--[if !mso]><!-->' }}></div>
            <img
              src={srcMobile}
              alt={alt}
              style={{
                display: 'none',
                width: '100%',
                maxWidth: '100%',
                height: 'auto',
              }}
              className="show-on-mobile"
            />
            <div dangerouslySetInnerHTML={{ __html: '<!--<![endif]-->' }}></div>
          </>
        )}
    </>
  );
};

export default EmailImage;
