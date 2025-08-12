import Table from './Table';
import { useEmailType } from '@/context/EmailTypeContext';

type TopProperties = {
  bgColor?: string;
};

const Top = ({ bgColor = '#4A4D4E' }: TopProperties) => {
  const { emailType } = useEmailType();
  if (emailType === 'oft') {
    return;
  } else {
    return (
      <Table bgColor={bgColor}>
        {emailType === 'eloqua' ? (
          <tr>
            <td className="text-right text-10" style={{ padding: '4px 24px 4px 24px' }}>
              <a
                className="c-greycc undecorated"
                href="https://app.response.vodafone.com/e/es.aspx?s=~~eloqua..type--emailfield..syntax--siteid..innerText--siteid..encodeFor--url~~&e=~~eloqua..type--emailfield..syntax--elqemailsaveguid..innerText--elqemailsaveguid..encodeFor--url~~"
                role="link"
                tabIndex={0}
                aria-label="Click on this link to view the email in a browser"
              >
                <span className="c-greycc undecorated">View online version</span>
              </a>
            </td>
          </tr>
        ) : (
          <tr>
            <td className="text-right text-10" style={{ padding: '4px 24px 4px 24px' }}>
              <a
                className="c-greycc undecorated"
                href="https://placeholder.com"
                role="link"
                tabIndex={0}
                aria-label="Click on this link to view the email in a browser"
              >
                <span className="c-greycc undecorated">View online version</span>
              </a>
            </td>
          </tr>
        )}
      </Table>
    );
  }
};

export default Top;
