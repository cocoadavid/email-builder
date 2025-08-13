import { LoaderCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cleanProjectName } from '@/utils/cleanProjectName';
import Button3D from '@/components/appComponents/Button3D';
import Card from '@/components/appComponents/Card';

const inputClassName = `w-full px-4 py-2 border border-vsGrayLight focus:outline-none focus:ring-2 focus:ring-vsGrayDark bg-vsWhite/50`;
const labelClassName = `block text-sm font-semibold text-vsGrayDark mb-1`;
const selectClassName = `w-full px-4 py-2 border border-vsGrayLight focus:outline-none focus:ring-2 focus:ring-vsGrayDark bg-white`;

const CreatePage = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [wfNumber, setWfNumber] = useState('');
  const [projectName, setProjectName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [subjectLine, setSubjectLine] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [type, setType] = useState('');
  const [templateId, setTemplateId] = useState('default-email');

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (timeoutRef.current) {
      return;
    }
    const cleanedProjectName = cleanProjectName(projectName);
    const cleanedSuffix = cleanProjectName(suffix);
    const createdAt = new Date().toISOString();
    const newId = `WF${wfNumber}-${cleanedProjectName}-${cleanedSuffix}`;

    // Check if ID already exists
    try {
      const res = await fetch('http://localhost:8000/emails');
      if (!res.ok) {
        throw new Error('Failed to fetch emails');
      }
      const existingEmails = await res.json();

      const alreadyExists = existingEmails.some((em: any) => em.id === newId);
      if (alreadyExists) {
        toast.error(
          `Email with ID "${newId}" already exists! Please try with a different project name.`,
          { duration: 4500 },
        );
        return;
      }
    } catch (err) {
      console.error('Error checking existing emails:', err);
      toast.error('Could not check for duplicate ID.', { duration: 4000 });
      return;
    }

    setIsPending(true);

    const emailData = {
      id: newId,
      wfNumber: `WF${wfNumber}`,
      projectName: cleanedProjectName,
      suffix: cleanedSuffix,
      subjectLine,
      previewText,
      type,
      createdAt,
      templateId,
    };

    // Azonnal állítsuk be timeoutRef-et, hogy ne legyen race condition
    timeoutRef.current = setTimeout(() => {
      fetch('http://localhost:8000/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      })
        .then(() => {
          setIsPending(false);
          toast.success('New email created', { id: emailData.id });
          localStorage.setItem('lastSelectedEmailId', emailData.id);
          navigate('/');
          timeoutRef.current = null;
        })
        .catch(err => {
          setIsPending(false);
          console.error('Error creating email:', err);
          toast.error('Something went wrong.', { id: emailData.id });
          timeoutRef.current = null;
        });
    }, 750);
  };

  return (
    <Card className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-vsRed border-b border-vsGray pb-2 mb-4">
        Create New Email
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClassName}>Workfront Number</label>
          <input
            disabled={isPending}
            type="number"
            value={wfNumber}
            onChange={e => setWfNumber(e.target.value)}
            onKeyDown={e => {
              if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                e.preventDefault();
              }
            }}
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Project Name</label>
          <input
            disabled={isPending}
            type="text"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Suffix</label>
          <input
            disabled={isPending}
            type="text"
            value={suffix}
            onChange={e => setSuffix(e.target.value)}
            required
            placeholder="eg. email1"
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Subject Line</label>
          <input
            disabled={isPending}
            type="text"
            value={subjectLine}
            onChange={e => setSubjectLine(e.target.value)}
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Preview Text</label>
          <input
            disabled={isPending}
            type="text"
            value={previewText}
            onChange={e => setPreviewText(e.target.value)}
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Type</label>
          <select
            disabled={isPending}
            value={type}
            onChange={e => setType(e.target.value)}
            required
            className={selectClassName}
          >
            <option value="">Select email type</option>
            <option value="eloqua">eloqua</option>
            <option value="oft">oft</option>
            <option value="highspot">highspot</option>
            <option value="thirdparty">thirdparty</option>
          </select>
        </div>

        <div>
          <label className={labelClassName}>Email Template</label>
          <select
            disabled={isPending}
            value={templateId}
            onChange={e => setTemplateId(e.target.value)}
            required
            className={selectClassName}
          >
            <option value="">Select email template</option>
            <option value="default-email">react (recommended)</option>
            <option value="html-email">html</option>
          </select>
        </div>
        {!isPending ? (
          <Button3D type="submit" className="w-full">
            Create Email
          </Button3D>
        ) : (
          <Button3D type="submit" className="w-full" disabled>
            <LoaderCircle className="animate-spin" size={16} /> Creating email...
          </Button3D>
        )}
      </form>
    </Card>
  );
};

export default CreatePage;
