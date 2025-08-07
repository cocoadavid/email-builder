import './email.css';
import Wrapper from '@/components/emailComponents/Wrapper';
import EmailHeader from '@/components/emailComponents/EmailHeader';
import type { Email } from '@/types/email.type';
import Section from '@/components/emailComponents/Section';
import section0 from './section0.html?raw';

type EmailProps = {
  email: Email;
};

const Email = ({email}: EmailProps) => {
  return (
    <Wrapper>
      <EmailHeader imgUrl={''} />
      <Section classes='text-14'>
        Hello David!, <br/><br/>
        <span className='pink'>Welcomerrr to this neww email builder!</span><br/>
        SL: {email.subjectLine}<br/>
        PT: {email.previewText}
      </Section>
      <Section html={section0} bgColor='#e60000' classes='p-reset' />
      <Section bgColor='yellow' classes='text-20'>
        React tsx chill
      </Section>
    </Wrapper>
  );
};

export default Email;
