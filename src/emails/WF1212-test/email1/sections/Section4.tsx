import * as Email from '@/components/emailComponents';
import { variables } from '../variables';

const EmailSection = () => {
  return (
    <Email.SectionWithBgImg
      bgImgSrc={variables.images.backgroundImg}
      bgColor="#e60000"
      height={240}
      desktopContent={
        <Email.Table>
          <tr>
            <Email.Td
              className="text-20 c-white bold text-center"
              padding="24px 24px 24px 24px"
              valign="middle"
            >
              This is an
              <br />
              <br /> E X A M P L E<br />
              <br /> SectionWithBgImg
            </Email.Td>
          </tr>
        </Email.Table>
      }
      mobileContent={
        <Email.Table>
          <tr>
            <Email.Td
              className="text-20 bold text-center"
              padding="24px 12px 24px 12px"
              valign="middle"
              style={{ color: '#FECB00' }}
            >
              This is a<br />
              <br /> M O B I L E<br />
              <br /> SectionWithBgImg
            </Email.Td>
          </tr>
        </Email.Table>
      }
    />
  );
};

export default EmailSection;
