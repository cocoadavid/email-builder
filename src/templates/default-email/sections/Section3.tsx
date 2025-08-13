import * as Email from '@/components/emailComponents';
import { variables } from '../variables';

const EmailSection = () => {
  return (
    <Email.Section className="text-center">
      <Email.Table>
        <tr>
          <Email.Td padding="0px 0px 8px 0px" colspan={2}>
            But I also created React Components like Table, Td and
            <Email.Link
              text="this link"
              href="https://reallygoodemails.com/"
              color="#4c1d95"
              className="underlined"
            />
            . They come with prebuilt useful stuff. If you hover an element in the code editor, you
            can see the attributes that can be set. Below you can see and Image and a CTA component.
          </Email.Td>
        </tr>
        <tr>
          <Email.Td className="w-half">
            <Email.Image
              width={130}
              src={variables.images.example}
              alt="logo"
              sameOnMobile
              center
            />
          </Email.Td>
          <Email.Td className="w-half">
            <Email.CTA
              text="I am a CTA"
              href="https://reallygoodemails.com"
              bgColor="#e60000"
              color="#FFFFFF"
              width={132}
              borderRadius={6}
            />
          </Email.Td>
        </tr>
      </Email.Table>
    </Email.Section>
  );
};

export default EmailSection;
