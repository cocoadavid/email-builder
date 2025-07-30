const fs = require('fs');
const path = require('path');

const emailsPath = path.join(__dirname, '../data/emails.json');
const emailsData = JSON.parse(fs.readFileSync(emailsPath, 'utf-8'));
const emails = emailsData.emails;

const outputBaseDir = path.join(__dirname, '../src/emails');

emails.forEach((email) => {
  const emailDir = path.join(outputBaseDir, `${email.wfNumber}-${email.projectName.replace(/\s+/g, '_')}`);
  const emailFilePath = path.join(emailDir, 'Email.tsx');

  if (!fs.existsSync(emailFilePath)) {
    fs.mkdirSync(emailDir, { recursive: true });

    const componentCode = `import React from 'react';

const Email = () => {
  return (
    <div>
      <h1>${email.subjectLine}</h1>
      <p>${email.previewText}</p>
      <p><strong>WF Number:</strong> ${email.wfNumber}</p>
    </div>
  );
};

export default Email;
`;

    fs.writeFileSync(emailFilePath, componentCode);
    console.log(`✅ Generated: ${emailFilePath}`);
  } else {
    console.log(`⏭️ Skipped (already exists): ${emailFilePath}`);
  }
});
