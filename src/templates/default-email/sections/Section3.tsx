import * as Email from '@/components/emailComponents';

const EmailSection = () => {
  return (
    <Email.Section bgColor="#7dd3fc">
      <Email.Table>
        <tr>
          <Email.Td>
            But I also created React Components like this for the table and td.
          </Email.Td>
        </tr>
        <tr>
          <Email.Td padding='12px 0px 12px 0px'>
            It's up to you.
            <Email.Link
              text='This is a link'
              url='https://reallygoodemails.com/'
              color='#4c1d95'
              className='underlined' />
          </Email.Td>
        </tr>
      </Email.Table>
    </Email.Section>
  );
};

export default EmailSection;
