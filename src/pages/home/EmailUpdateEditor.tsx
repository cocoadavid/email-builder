import type { Email, EmailUpdateInput } from '@/types/email.type';
import { useState, useEffect } from 'react';
import type { EmailType } from '@/types/email.type';
import Button3D from '@/components/appComponents/Button3D';
import Card from '@/components/appComponents/Card';

type EmailUpdateEditorProps = {
  email: Email;
  onSave: (updated: EmailUpdateInput) => void;
};

const typeOptions: EmailType[] = ['eloqua', 'oft', 'highspot', 'thirdparty'];
const inputClassName = `flex-1 px-2 py-1 border border-vsGrayLight focus:outline-solid focus:ring-1 focus:ring-vsGrayDark bg-vsWhite/25`;
const selectClassName = `flex-1 px-1 py-1 border border-vsGrayLight focus:outline-solid focus:ring-1 focus:ring-vsGrayDark bg-vsWhite/25`;

const EmailUpdateEditor = ({ email, onSave }: EmailUpdateEditorProps) => {
  const [type, setType] = useState<EmailType>(email.type);
  const [subjectLine, setSubjectLine] = useState(email.subjectLine);
  const [previewText, setPreviewText] = useState(email.previewText);
  const [isDirty, setIsDirty] = useState(false);

  const checkIsDirty = () =>
    type !== email.type || subjectLine !== email.subjectLine || previewText !== email.previewText;

  useEffect(() => {
    setType(email.type);
    setSubjectLine(email.subjectLine);
    setPreviewText(email.previewText);
    setIsDirty(false);
  }, [email]);

  useEffect(() => {
    setIsDirty(checkIsDirty());
  }, [type, subjectLine, previewText, email]);

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label className="w-20 text-sm">Subject line:</label>
          <input
            type="text"
            value={subjectLine}
            onChange={e => setSubjectLine(e.target.value)}
            className={`${inputClassName}`}
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-20 text-sm">Preview text:</label>
          <input
            type="text"
            value={previewText}
            onChange={e => setPreviewText(e.target.value)}
            className={`${inputClassName}`}
          />
        </div>

        <div className="flex items-center gap-4 mb-1">
          <label className="w-20 text-sm">Type:</label>
          <select
            value={type}
            onChange={e => setType(e.target.value as EmailType)}
            className={`${selectClassName}`}
          >
            {typeOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <Button3D onClick={() => onSave({ type, subjectLine, previewText })} disabled={!isDirty}>
          Update email
        </Button3D>
      </div>
    </Card>
  );
};

export default EmailUpdateEditor;
