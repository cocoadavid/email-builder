import type { Email, EmailUpdateInput } from '@/types/email.type';
import { useState, useEffect } from 'react';
import type { EmailType } from '@/types/email.type';
import Button3D from '@/components/appComponents/Button3D';

type EmailUpdateEditorProps = {
  email: Email;
  onSave: (updated: EmailUpdateInput) => void;
};

const typeOptions: EmailType[] = ['eloqua', 'oft', 'highspot', 'thirdparty'];

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
    <div className="mb-4 p-4 border bg-white shadow-lg rounded-2xl border border-sky-100 text-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm">Subject line:</label>
          <input
            type="text"
            value={subjectLine}
            onChange={e => setSubjectLine(e.target.value)}
            className="flex-1 border rounded px-3 py-1"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm">Preview text:</label>
          <input
            type="text"
            value={previewText}
            onChange={e => setPreviewText(e.target.value)}
            className="flex-1 border rounded px-3 py-1"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm">Type:</label>
          <select
            value={type}
            onChange={e => setType(e.target.value as EmailType)}
            className="flex-1 border rounded px-3 py-1"
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
    </div>
  );
};

export default EmailUpdateEditor;
