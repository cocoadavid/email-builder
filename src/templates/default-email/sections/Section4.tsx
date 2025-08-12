import * as Email from '@/components/emailComponents';

const EmailSection = () => {
  return (
    <Email.Section className="text-center">
      <Email.Table>
        <tr>
          <Email.Td padding="0px 0px 24px 0px">
            Sections are imported dynamically, ordered by their name.
          </Email.Td>
        </tr>
        <tr>
          <Email.Td>
            <Email.CTA
              text="I am a CTA"
              href="https://reallygoodemails.com"
              bgColor="#0c4a6e"
              color="#FFF"
              borderRadius={6}
              width={132}
            />
          </Email.Td>
        </tr>
      </Email.Table>
    </Email.Section>
  );
};

export default EmailSection;
