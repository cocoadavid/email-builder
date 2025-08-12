import * as Email from '@/components/emailComponents';
import { variables } from '../variables';

const EmailSection = () => {
  return (
    <Email.Section className="text-center">
      <Email.Table>
        <tr>
          <Email.Td>But I also created React Components like this for the table and td.</Email.Td>
        </tr>
        <tr>
          <Email.Td padding="12px 0px 12px 0px">
            For example this Link, or the Image below.
            <Email.Link
              text="This is a link"
              href="https://reallygoodemails.com/"
              color="#4c1d95"
              className="underlined"
            />
          </Email.Td>
        </tr>
        <tr>
          <Email.Td>
            <Email.Image
              width={130}
              src={variables.images.example}
              alt="logo"
              sameOnMobile
              center
            />
          </Email.Td>
        </tr>
      </Email.Table>
    </Email.Section>
  );
};

export default EmailSection;
