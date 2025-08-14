import * as Email from '@/components/emailComponents';

const EmailSection = () => {
  return (
    <Email.Section className="text-14 text-center" bgColor="#f2f2f2">
      <table width="100%" cellPadding={0} cellSpacing={0} border={0} role="presentation">
        <tbody>
          <tr>
            <td
              className="text-14 w-half"
              style={{ padding: '4px 12px 4px 12px', borderRight: '2px solid #e60000' }}
            >
              Here you can see how to write more traditional table and td elements.
            </td>
            <td className="text-14 w-half" style={{ padding: '4px 12px 4px 12px' }}>
              Please note: if you write code like this, tbody is a must have.
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ padding: '24px 0px 0px 0px' }}>
              Sections are imported <span className="bold c-vfred">dynamically</span>, ordered by
              their name.
            </td>
          </tr>
        </tbody>
      </table>
    </Email.Section>
  );
};

export default EmailSection;
