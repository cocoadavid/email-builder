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
      <EmailHeader imgUrl={images.header} />
      <Section classes="text-14">
        Hello Developer,
        <br />
        <br />
        You can easaly create a <span className="bold">Section</span> like this inside this{' '}
        <span className="bold">.tsx</span> file. This could be ideal for a simple intro section.
        <br />
        <br />
        In the EmailHeader component above you can see how to use an image inside a tsx file.
      </Section>
      <Section html={sections.section1} bgColor="#EEEEEE" />
      <Section html={sections.section4} images={images} classes="p-reset" />
    </Wrapper>
  );
};

export default Email;
