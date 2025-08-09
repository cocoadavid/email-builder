import './email.css';
import type { Email } from '@/types/email.type';
import { Wrapper, HeaderImage, Section } from '@/components/emailComponents/'
import { variables } from './variables';
import sections from './sections';

type EmailProps = {
  email: Email;
};

const Email = ({ email }: EmailProps) => {
  let images = email.type === 'thirdparty' ? variables.thirdpartyImages : variables.images;

  return (
    <Wrapper>
      <HeaderImage src={images.header} srcMobile={images.headerMobile} />
      <Section html={sections.section1} variables={variables} bgColor="#bae6fd" />
      <Section html={sections.section2} variables={variables} />
    </Wrapper>
  );
};

export default Email;
