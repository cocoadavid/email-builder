import './email.css';
import Wrapper from '@/components/emailComponents/Wrapper';
import EmailHeader from '@/components/emailComponents/EmailHeader';
import EmailIntro from '@/components/emailComponents/EmailIntro';

const Email = () => {
  return (
    <Wrapper>
      <EmailHeader imgUrl={''} />
      <EmailIntro bgColor='#f0f0f0'>
        Hello David,<br/><br/>
        Welcome to this new email builder!
      </EmailIntro>
      <EmailIntro bgColor='#eef'>
        Hello David!<br/><br/>
        Welcome to this new email builder!
      </EmailIntro>
      <EmailIntro bgColor='#f0f0f0'>
        Hello David!<br/><br/>
        Welcome to this new email builder!
      </EmailIntro>
    </Wrapper>
  );
};

export default Email;
