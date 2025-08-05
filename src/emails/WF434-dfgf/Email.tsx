import './email.css';
import Wrapper from '@/components/emailComponents/Wrapper';
import EmailHeader from '@/components/emailComponents/EmailHeader';
import EmailIntro from '@/components/emailComponents/EmailIntro';
import type { Email } from '@/types/email.type';

type EmailProps = {
  email: Email;
};

const Email = ({email}: EmailProps) => {
  return (
    <Wrapper>
      <EmailHeader imgUrl={''} />
      <EmailIntro>
        Hello David, <br/><br/>
        Welcome to this new email builder!<br/>
        SL: {email.subjectLine}<br/>
        PT: {email.previewText}
      </EmailIntro>
    </Wrapper>
  );
};

export default Email;
