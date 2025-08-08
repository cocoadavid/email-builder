import './email.css';
import type { Email } from '@/types/email.type';
import Wrapper from '@/components/emailComponents/Wrapper';
import EmailHeader from '@/components/emailComponents/EmailHeader';
import Section from '@/components/emailComponents/Section';
import { variables } from './variables';
import sections from './sections';

type EmailProps = {
  email: Email;
};

const Email = ({ email }: EmailProps) => {
  let images = email.type === 'thirdparty' ? variables.thirdpartyImages : variables.images;

  return (
    <Wrapper>
      <EmailHeader src={images.header} srcMobile={images.headerMobile} />
      <Section html={sections.section1} variables={variables} bgColor="#bae6fd" />
      <Section html={sections.section2} variables={variables} />
    </Wrapper>
  );
};

export default Email;
