const fs = require('fs');
const path = require('path');

const emailsPath = path.join(__dirname, '../data/emails.json');
const emailsData = JSON.parse(fs.readFileSync(emailsPath, 'utf-8'));
const emails = emailsData.emails;

const outputBaseDir = path.join(__dirname, '../src/emails');

emails.forEach((email) => {
  const emailDir = path.join(outputBaseDir, `${email.id}`);
  const templateDir = path.join(__dirname, '../src/templates', email.templateId || 'default-email');

  // If 'sourceId' exists and the target does not yet exist, copy
  if (email.sourceId && !fs.existsSync(emailDir)) {
    const sourceDir = path.join(outputBaseDir, email.sourceId);

    if (fs.existsSync(sourceDir)) {
      fs.cpSync(sourceDir, emailDir, { recursive: true });
      console.log(`📁 Duplicated "${email.sourceId}" to "${email.id}"`);
    } else {
      console.warn(`❌ Source "${email.sourceId}" does not exist.`);
    }
  } else if (!fs.existsSync(emailDir)) {
    fs.cpSync(templateDir, emailDir, { recursive: true });
    console.log(`✨ Generated from base-template: ${email.id}`);
  } else {
    console.log(`⏭️ Skipped (folder already exists): ${email.id}`);
  }

  // If the type is 'thirdparty', create an image folder under public
  if (email.type === 'thirdparty') {
    console.log("third");
    const publicImageDir = path.join(__dirname, `../public/emails/${email.id}/images`);
    if (!fs.existsSync(publicImageDir)) {
      fs.mkdirSync(publicImageDir, { recursive: true });
      console.log(`🖼️ Created image folder for thirdparty: ${publicImageDir}`);
    } else {
      console.log(`⏭️ Skipped image folder (already exists): ${publicImageDir}`);
    }
  }
});
