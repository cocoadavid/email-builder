import './email.css';
import Wrapper from '@/components/emailComponents/Wrapper';
import EmailHeader from '@/components/emailComponents/EmailHeader';
import EmailIntro from '@/components/emailComponents/EmailIntro';

const Email = () => {
  return (
    <Wrapper>
      <EmailHeader imgUrl={''} />
      <EmailIntro>
        Hello David, <br/><br/>
        Welcome to this new email builder! This is Highspot.
      </EmailIntro>
      <EmailIntro>
        Hello David, <br/><br/>
        Welcome to this new email builder! This is Highspot.
      </EmailIntro>
      <EmailIntro>
        Hello David, <br/><br/>
        Welcome to this new email builder! This is Highspot.
      </EmailIntro>
    </Wrapper>
  );
};

export default Email;
