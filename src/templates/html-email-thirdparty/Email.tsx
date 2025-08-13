import './email.css';
import type { Email } from '@/types/email.type';
import { Wrapper, HeaderImage, Section } from '@/components/emailComponents/';
import { variables } from './variables';
import sections from './sections';

type EmailProps = {
  email: Email;
};

const Email = ({ email }: EmailProps) => {
  return (
    <Wrapper>
      <HeaderImage
        src={variables.images.header}
        srcMobile={variables.images.headerMobile}
        altText="banner image"
      />
      <Section html={sections.section1} variables={variables} bgColor="#f2f2f2" />
      <Section html={sections.section2} variables={variables} />
    </Wrapper>
  );
};

export default Email;
