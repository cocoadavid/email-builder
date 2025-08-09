import * as Email from '@/components/emailComponents';

const EmailSection = () => {
  return (
    <Email.Section className="text-center" bgColor="#e0f2fe">
      <table
        className="w-full"
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        border={0}
        role="presentation"
      >
        <tbody>
        <tr>
          <td className="text-18">The order of the sections...</td>
          <td className="text-16" style={{ padding: '12px 0px 0px 0px' }}>
            is determined by...
          </td>
          <td className="text-14" style={{ padding: '24px 0px 0px 0px' }}>
            ...the name of the section
          </td>
        </tr>
        </tbody>
      </table>
    </Email.Section>
  );
};

export default EmailSection;
