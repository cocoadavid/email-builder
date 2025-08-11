import * as Email from '@/components/emailComponents';

const EmailSection = () => {
  return (
    <Email.Section className="text-14 text-center" bgColor="#bae6fd">
      <table width="100%" cellPadding={0} cellSpacing={0} border={0} role="presentation">
        <tbody>
          <tr>
            <td className="text-14" style={{ padding: '0px 0px 8px 0px' }}>
              Here you can see how to write more traditional table and td elements.
            </td>
          </tr>
          <tr>
            <td className="text-14" style={{ background: '#FFFFFF', padding: '4px 4px 4px 4px' }}>
              If you write code like this, tbody is a must have, unfortunately.
              <br />
              Otherwise typescript whines.
            </td>
          </tr>
        </tbody>
      </table>
    </Email.Section>
  );
};

export default EmailSection;
