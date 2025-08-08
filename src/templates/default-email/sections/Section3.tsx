import Section from '@/components/emailComponents/Section';

const EmailSection = () => {
  return (
    <Section classes="text-center" bgColor="#e0f2fe">
      <table width="100%" cellPadding={0} cellSpacing={0} border={0} role="presentation">
        <tr>
          <td className="text-18">The order of the sections...</td>
          <td className="text-16" style={{ padding: '12px 0px 0px 0px' }}>
            is determined by...
          </td>
          <td className="text-14" style={{ padding: '24px 0px 0px 0px' }}>
            ...the name of the section
          </td>
        </tr>
      </table>
    </Section>
  );
};

export default EmailSection;
