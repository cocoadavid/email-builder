import './email.css';
import type { Email } from '@/types/email.type';
import { Wrapper, HeaderImage, Section } from '@/components/emailComponents/'
import { variables } from './variables.ts';
import sections from './sections';

type EmailProps = {
  email: Email;
};

const Email = ({ email }: EmailProps) => {
  let images = email.type === 'thirdparty' ? variables.thirdpartyImages : variables.images;

  return (
    <Wrapper>
      <HeaderImage src={images.header} srcMobile={images.headerMobile} />
      <Section classes="text-14 text-center">
        You can create a section just like this. Could be useful for an intro.
      </Section>
      {variables.dynamicSections &&
        Object.entries(sections).map(([name, Section], i) => <Section key={`${name}-${i}`} />)}
    </Wrapper>
  );
};

export default Email;
