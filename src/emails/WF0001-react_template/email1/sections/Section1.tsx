import * as Email from '@/components/emailComponents';

const EmailSection = () => {
  return (
    <Email.Section className="text-14 text-center">
      <Email.Salutation />
      <br />
      <br />
      You can create a section just like this. Could be useful for an intro.
    </Email.Section>
  );
};

export default EmailSection;
