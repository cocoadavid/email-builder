import { cleanProjectName } from '@/utils/cleanProjectName';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CreatePage = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [wfNumber, setWfNumber] = useState('');
  const [projectName, setProjectName] = useState('');
  const [subjectLine, setSubjectLine] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [type, setType] = useState('');

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
      // Már van futó request, ne csináljunk újat
      return;
    }

    const createdAt = new Date().toISOString();
    const templateId = 'default-email';
    const newId = `WF${wfNumber}-${cleanProjectName(projectName)}`;

    // Ellenőrizzük, hogy van-e már ilyen ID
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
        return; // Kilépünk, nem fut tovább
      }
    } catch (err) {
      console.error('Error checking existing emails:', err);
      toast.error('Could not check for duplicate ID.', { duration: 4000 });
      return;
    }

    // Csak ha nincs duplikátum, állítjuk be a pending állapotot
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
          timeoutRef.current = null; // tisztítjuk a timeout referenciát
        })
        .catch(err => {
          setIsPending(false);
          console.error('Error creating email:', err);
          toast.error('Something went wrong.', { id: emailData.id });
          timeoutRef.current = null; // tisztítjuk a timeout referenciát
        });
    }, 500);
  };

  return (
    <div className="max-w-xl mx-auto mt-4 bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-sky-100">
      <h2 className="text-2xl font-bold text-sky-700 border-b border-sky-200 pb-2">
        Create New Email
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
            <option value="">Select email type</option>
            <option value="eloqua">eloqua</option>
            <option value="oft">oft</option>
            <option value="highspot">highspot</option>
            <option value="thirdparty">thirdparty</option>
          </select>
        </div>

        {!isPending ? (
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Create Email
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-600 font-semibold py-2 rounded-md"
          >
            Creating email...
          </button>
        )}
      </form>
    </div>
  );
};

export default CreatePage;
