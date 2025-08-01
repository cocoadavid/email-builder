import './email.css';
import Wrapper from '@/components/email/Wrapper';
import EmailHeader from '@/components/email/EmailHeader';
import EmailIntro from '@/components/email/EmailIntro';

const Email = () => {
  return (
    <Wrapper>
      <EmailHeader imgUrl={''} />
      <EmailIntro />
    </Wrapper>
  );
};

export default Email;
