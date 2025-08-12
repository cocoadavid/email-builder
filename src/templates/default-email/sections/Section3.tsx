import * as Email from '@/components/emailComponents';
import { variables } from '../variables';

const EmailSection = () => {
  return (
    <Email.Section className="text-center" bgColor="#e0f2fe">
      <Email.Table>
        <tr>
          <Email.Td>But I also created React Components like Table and Td.</Email.Td>
        </tr>
        <tr>
          <Email.Td padding="12px 0px 12px 0px">
            Or{' '}
            <Email.Link
              text="this link"
              href="https://reallygoodemails.com/"
              color="#4c1d95"
              className="underlined"
            />{' '}
            and the Image below.
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
