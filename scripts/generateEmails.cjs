// generateEmails.cjs
const fs = require('fs');
const path = require('path');

const emailsPath = path.join(__dirname, '../data/emails.json');
const emailsData = JSON.parse(fs.readFileSync(emailsPath, 'utf-8'));
const emails = emailsData.emails;

const outputBaseDir = path.join(__dirname, '../src/emails');

const defaultCssContent = `/* === additional css here === */
@media screen and (max-width: 600px) {}`;

emails.forEach((email) => {
  const emailDir = path.join(outputBaseDir, `${email.id}`);
  const emailFilePath = path.join(emailDir, 'Email.tsx');
  const cssFilePath = path.join(emailDir, 'email.css');

  // 1. Ha van 'source' mező, és a target még nem létezik, másolás
  if (email.sourceId && !fs.existsSync(emailDir)) {
    const sourceDir = path.join(outputBaseDir, email.sourceId);

    if (fs.existsSync(sourceDir)) {
      fs.cpSync(sourceDir, emailDir, { recursive: true });
      console.log(`📁 Duplicated "${email.sourceId}" to "${email.id}"`);
      return; // Kilép, nem futtatja le az alábbi generálást
    } else {
      console.warn(`❌ Source "${email.sourceId}" does not exist.`);
      // Ilyenkor továbbmegy, mintha nem lenne source
    }
  }

  // 2. Ha nincs 'source', vagy a fenti feltételek nem teljesültek, default generálás
  if (!fs.existsSync(emailFilePath)) {
    fs.mkdirSync(emailDir, { recursive: true });

    const componentCode = `import './email.css';
import Wrapper from '@/components/emailComponents/Wrapper';
import EmailHeader from '@/components/emailComponents/EmailHeader';
import EmailIntro from '@/components/emailComponents/EmailIntro';
import type { Email } from '@/types/email.type';

type EmailProps = {
  selectedEmailObj: Email;
};

const Email = ({selectedEmailObj}: EmailProps) => {
  return (
    <Wrapper>
      <EmailHeader imgUrl={''} />
      <EmailIntro>
        Hello David, <br/><br/>
        Welcome to this new email builder!<br/>
        SL: {selectedEmailObj.subjectLine}<br/>
        PT: {selectedEmailObj.previewText}
      </EmailIntro>
    </Wrapper>
  );
};

export default Email;
`;

    fs.writeFileSync(emailFilePath, componentCode);
    console.log(`✅ Generated: ${emailFilePath}`);
  } else {
    console.log(`⏭️ Skipped (already exists): ${emailFilePath}`);
  }

  if (!fs.existsSync(cssFilePath)) {
    fs.writeFileSync(cssFilePath, defaultCssContent);
    console.log(`🎨 Generated: ${cssFilePath}`);
  } else {
    console.log(`⏭️ Skipped (already exists): ${cssFilePath}`);
  }

    // 3. Ha a típus thirdparty, hozzon létre image mappát a public alatt
  if (email.type === 'thirdparty') {
    const publicImageDir = path.join(__dirname, `../public/emails/${email.id}/images`);
    if (!fs.existsSync(publicImageDir)) {
      fs.mkdirSync(publicImageDir, { recursive: true });
      console.log(`🖼️ Created image folder for thirdparty: ${publicImageDir}`);
    } else {
      console.log(`⏭️ Skipped image folder (already exists): ${publicImageDir}`);
    }
  }


});
