import './email.css';
import Wrapper from '@/components/emailComponents/Wrapper';
import EmailHeader from '@/components/emailComponents/EmailHeader';
import EmailIntro from '@/components/emailComponents/EmailIntro';

const Email = () => {
  return (
    <Wrapper>
      <EmailHeader imgUrl={''} />
      <EmailIntro />
      <p className='pink'>itt már lehet ékezet</p>
    </Wrapper>
  );
};

export default Email;
