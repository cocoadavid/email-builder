import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import useFetchSingle from '@/hooks/useFetchSingle';
import { cleanProjectName } from '@/utils/cleanProjectName.ts';
import Button3D from '@/components/appComponents/Button3D';

const CreatePage = () => {
  const { sourceId } = useParams<{ sourceId: string }>();
  const navigate = useNavigate();
  const { data: email } = useFetchSingle(`http://localhost:8000/emails/${sourceId}`);
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
    if (sourceId && email) {
      setWfNumber(email.wfNumber);
      setProjectName(email.projectName);
      setSubjectLine(email.subjectLine);
      setPreviewText(email.previewText);
      setType(email.type);
      setTemplateId(email.templateId);
    }
  }, [sourceId, email]);

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
      return; // már fut egy request
    }

    const createdAt = new Date().toISOString();
    const newId = `WF${wfNumber}-${cleanProjectName(projectName)}-${cleanProjectName(suffix)}`;

    try {
      const res = await fetch('http://localhost:8000/emails');
      if (!res.ok) {
        throw new Error('Failed to fetch emails');
      }
      const existingEmails = await res.json();

      const alreadyExists = existingEmails.some((em: any) => em.id === newId);
      if (alreadyExists) {
        toast.error(
          `Email with ID "${newId}" already exists! Please try with a different suffix.`,
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
      wfNumber,
      projectName,
      subjectLine,
      previewText,
      type,
      createdAt,
      templateId,
      sourceId,
      suffix,
    };

    const toastId = toast.loading('Generating email...');
    timeoutRef.current = setTimeout(() => {
      fetch('http://localhost:8000/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      })
        .then(() => {
          setIsPending(false);
          toast.success('New email created', { id: toastId });
          localStorage.setItem('lastSelectedEmailId', emailData.id);
          navigate('/');
          timeoutRef.current = null;
        })
        .catch(err => {
          setIsPending(false);
          console.error('Error creating email:', err);
          toast.error('Something went wrong.', { id: toastId });
          timeoutRef.current = null;
        });
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto mt-4 bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-sky-100">
      <h2 className="text-2xl font-bold text-sky-700 border-b border-sky-200 pb-2">
        Duplicate Email | WF{wfNumber}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Workfront Number</label>
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
            className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-sky-50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Project Name</label>
          <input
            disabled={isPending}
            type="text"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-sky-50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Suffix</label>
          <input
            disabled={isPending}
            type="text"
            value={suffix}
            onChange={e => setSuffix(e.target.value)}
            required
            placeholder="eg. resend"
            className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-sky-50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Subject Line</label>
          <input
            disabled={isPending}
            type="text"
            value={subjectLine}
            onChange={e => setSubjectLine(e.target.value)}
            required
            className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-sky-50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Preview Text</label>
          <input
            disabled={isPending}
            type="text"
            value={previewText}
            onChange={e => setPreviewText(e.target.value)}
            required
            className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-sky-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            disabled={isPending}
            value={type}
            onChange={e => setType(e.target.value)}
            required
            className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800"
          >
            <option value="">Select type</option>
            <option value="eloqua">Eloqua</option>
            <option value="oft">OFT</option>
            <option value="highspot">Highspot</option>
            <option value="thirdparty">Thirdparty</option>
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
    </div>
  );
};

export default CreatePage;
