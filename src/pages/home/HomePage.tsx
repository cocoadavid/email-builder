import { useState, lazy, useEffect } from 'react';
import { toast } from 'sonner';
import useFetchList from '@/hooks/useFetchList';
import type { Email, EmailType, EmailUpdateInput } from '@/types/email.type.ts';
import { updateEmailMeta } from '@/utils/updateEmailMeta';
import { EmailSelector } from './EmailSelector';
import EmailPreviewPanel from './EmailPreviewPanel';
import EmailUpdateEditor from './EmailUpdateEditor';
import type { ViewMode } from '@/types/viewmode.type';

// Glob import Email.tsx files for preview components
const emailPreviewModules = import.meta.glob<{ default: React.ComponentType<any> }>(
  '/src/emails/*/Email.tsx',
);
const getEmailPreviewComponent = (id: string) => {
  const mod = emailPreviewModules[`/src/emails/${id}/Email.tsx`];
  return mod ? lazy(mod) : null;
};

const HomePage = () => {
  // State
  const { data: emails, isPending, error } = useFetchList('http://localhost:8000/emails');
  const [localEmails, setLocalEmails] = useState<Email[]>([]);
  const [selectedEmailId, setSelectedEmailId] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  // Derived data
  const selectedEmailObj = localEmails.find((email: Email) => email.id === selectedEmailId);
  const EmailPreviewComponent = selectedEmailId ? getEmailPreviewComponent(selectedEmailId) : null;
  // Effects
  useEffect(() => {
    if (emails.length > 0) {
      setLocalEmails(emails);
    }
  }, [emails]);

  useEffect(() => {
    if (!selectedEmailId) return;
    localStorage.setItem('lastSelectedEmailId', selectedEmailId);
  }, [selectedEmailId]);

  useEffect(() => {
    if (localEmails.length > 0 && !selectedEmailId) {
      const savedId = localStorage.getItem('lastSelectedEmailId');
      const exists = localEmails.some(email => email.id === savedId);
      setSelectedEmailId(exists && savedId ? savedId : localEmails[localEmails.length - 1].id);
    }
  }, [localEmails]);
  // Event handlers
  const handleUpdate = async (updated: EmailUpdateInput) => {
    try {
      await updateEmailMeta(selectedEmailId, updated);
      const updatedList = localEmails.map(email =>
        email.id === selectedEmailId ? { ...email, ...updated } : email,
      );
      setLocalEmails(updatedList);
      toast.success('Email updated.');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Check console for more details.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-6 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-2 items-start">
      {error && <div className="text-red-500">{error}</div>}
      {isPending && <div className="text-gray-500">Loading...</div>}

      <div className="space-y-6">
        <EmailSelector
          emails={localEmails}
          selectedEmailId={selectedEmailId}
          onChange={setSelectedEmailId}
        />
        {selectedEmailObj && <EmailUpdateEditor email={selectedEmailObj} onSave={handleUpdate} />}
      </div>

      {selectedEmailObj && (
        <EmailPreviewPanel email={selectedEmailObj} EmailPreviewComponent={EmailPreviewComponent} />
      )}
    </div>
  );
};

export default HomePage;
