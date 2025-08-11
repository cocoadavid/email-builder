import type { CSSProperties } from 'react';
import { useEmailType } from '@/context/EmailTypeContext';

type CTAProps = {
  text: string;
  href: string;
  bgColor?: string;
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  width: number;
  height?: number;
  borderRadius?: number;
};

const CTA = ({
  text,
  href,
  bgColor = '#e60000',
  color = '#FFFFFF',
  fontWeight = 'normal',
  fontSize = 18,
  width,
  height = 50,
  borderRadius = 6,
}: CTAProps) => {
  const { emailType } = useEmailType();

  const ctaStyle: CSSProperties = {
    backgroundColor: bgColor,
    color,
    borderRadius: `${borderRadius}px`,
    width: `${width}px`,
    lineHeight: `${height}px`,
    fontSize: `${fontSize}px`,
    fontWeight,
    fontFamily: 'arial, sans-serif',
    display: 'inline-block',
    textAlign: 'center',
    textDecoration: 'none',
  };
  return (
    <>
      {emailType !== 'oft' && (
        <div
          dangerouslySetInnerHTML={{
            __html: `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
             xmlns:w="urn:schemas-microsoft-com:office:word"
             style="height:${height}px;v-text-anchor:middle;width:${width}px;" arcsize="${borderRadius * 2}"
             stroke="false" fillcolor="${bgColor}">
    <w:anchorlock/>
    <center style="">
<![endif]-->`,
          }}
        ></div>
      )}
      <a href={href} style={ctaStyle} target="_blank" rel="noopener noreferrer">
        <span style={ctaStyle}>{text}</span>
      </a>
      {emailType !== 'oft' && (
        <div
          dangerouslySetInnerHTML={{ __html: `<!--[if mso]></center></v:roundrect><![endif]-->` }}
        ></div>
      )}
    </>
  );
};

export default CTA;
