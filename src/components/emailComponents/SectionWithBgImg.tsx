type SectionWithBgImgProps = {
  bgImgSrc: string;
  bgImgSrcMobile?: string;
  width?: number;
  height: number;
  bgColor: string; // fallback if the bgImg does not render
  desktopContent: React.ReactNode;
  mobileContent: React.ReactNode;
  valign?: 'top' | 'middle' | 'bottom';
};

const exampleImg = 'https://i.imgur.com/6AjemMV.png';

const SectionWithBgImg = ({
  bgImgSrc = exampleImg,
  bgImgSrcMobile,
  width = 600,
  height,
  bgColor,
  valign = 'middle',
  desktopContent,
  mobileContent,
}: SectionWithBgImgProps) => {
  const widthInPt = `${width * 0.75}pt`;
  const heightInPt = `${height * 0.75}pt`;

  return (
    <section style={{ margin: 0, padding: 0, width: '100%', minWidth: '100%', maxWidth: '100%' }}>
      <table
        width="100%"
        className="w-full hide-on-mobile"
        cellPadding={0}
        cellSpacing="0"
        border={0}
        role="presentation"
        bgcolor={bgColor}
        align="center"
        style={{ backgroundColor: bgColor, width: '100%', minWidth: '100%', maxWidth: '100%' }}
      >
        <tbody>
          <tr>
            <td className="text-0" valign="middle" align="center">
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                            <!--[if gte mso 9]>
<v:image xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style=" border: 0;display: inline-block; width: ${widthInPt}; height: ${heightInPt}; padding: 0; margin: 0;" src="${bgImgSrc}"/>
<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style=" border: 0;display: inline-block;position: absolute; width: ${widthInPt}; height: ${heightInPt}; font-size: 0px; line-height: 0px; padding: 0; margin: 0;">
<v:fill opacity="0%" color="${bgColor}" style="margin: 0; padding: 0; font-size: 0; font-height: 0; mso-margin-left: 0; mso-margin-right: 0; mso-margin-bottom: 0; mso-margin-top: 0;" />
<v:textbox inset="0,0,0,0" v-text-anchor="middle">
<![endif]-->`,
                }}
              ></div>
              <table
                width="100%"
                className="w-full"
                cellPadding="0"
                cellSpacing="0"
                border={0}
                align="center"
                {...({ background: bgImgSrc } as any)}
                style={{
                  width: '100%',
                  minWidth: '100%',
                  maxWidth: '100%',
                  backgroundImage: `url(${bgImgSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  height: `${height}px`,
                  minHeight: `${height}px`,
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{ height: `${height}px`, minHeight: `${height}px` }}
                      className="text-0"
                      valign={valign}
                      align="center"
                    >
                      {desktopContent}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                dangerouslySetInnerHTML={{
                  __html: `<!--[if gte mso 9]>
</v:textbox>
</v:fill>
</v:rect>
</v:image>
<![endif]-->`,
                }}
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
      <div dangerouslySetInnerHTML={{ __html: '<!--[if !mso]><!-->' }}></div>
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        border={0}
        className="bg-mobile"
        bgcolor={bgColor}
        style={{ backgroundColor: bgColor, display: 'none' }}
      >
        <tbody>
          <tr>
            <td className="text-0">
              <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                border={0}
                className="w-full"
                bgcolor={bgColor}
                {...({ background: bgImgSrc } as any)}
                style={{
                  width: '100%',
                  minWidth: '100%',
                  maxHeight: '100%',
                  backgroundImage: `url(${bgImgSrcMobile || bgImgSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <tbody>
                  <tr>
                    <td className="text-0">{mobileContent}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <div dangerouslySetInnerHTML={{ __html: '<!--<![endif]-->' }}></div>
    </section>
  );
};

export default SectionWithBgImg;
