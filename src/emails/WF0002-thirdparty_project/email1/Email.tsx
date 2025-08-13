import './email.css';
import type { Email } from '@/types/email.type';
import { Wrapper, HeaderImage } from '@/components/emailComponents/';
import { variables } from './variables.ts';
import sections from './sections';
import Top from '@/components/emailComponents/Top.tsx';

type EmailProps = {
  email: Email;
};

const Email = ({ email }: EmailProps) => {

  return (
    <Wrapper>
      <Top />
      <HeaderImage src={variables.images.header} srcMobile={variables.images.headerMobile} altText="banner image" />
      {variables.dynamicSections &&
        Object.entries(sections).map(([name, Section], i) => <Section key={`${name}-${i}`} />)}
    </Wrapper>
  );
};

export default Email;
