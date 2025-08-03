import { useState, lazy, useEffect } from 'react';
import useFetchList from '@/hooks/useFetchList';
import type { Email } from '@/types/email.type.ts';
import { updateEmailMeta } from '@/utils/updateEmailMeta';
import { EmailSelector } from './EmailSelector';
import EmailPreviewPanel from './EmailPreviewPanel';

// Glob import Email.tsx files for preview components
const previewModules = import.meta.glob<{ default: React.ComponentType<any> }>('/src/emails/*/Email.tsx');
const getPreviewComponent = (id: string) => {
    const mod = previewModules[`/src/emails/${id}/Email.tsx`];
    return mod ? lazy(mod) : null;
};

const HomePage = () => {
    // State
    const { data: emails, isPending, error } = useFetchList('http://localhost:8000/emails');
    const [localEmails, setLocalEmails] = useState<Email[]>([]);
    const [selectedEmailId, setSelectedEmailId] = useState<string>('');
    // Derived data
    const selectedEmailObj = localEmails.find((email: Email) => email.id === selectedEmailId);
    const PreviewComponent = selectedEmailId ? getPreviewComponent(selectedEmailId) : null;
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
            const exists = localEmails.some((email) => email.id === savedId);
            setSelectedEmailId(exists && savedId ? savedId : localEmails[localEmails.length - 1].id);
        }
    }, [localEmails]);
    // Event handlers
    const handleMetaSave = async (updated: { type: string; subjectLine: string, previewText: string }) => {
        try {
            await updateEmailMeta(selectedEmailId, updated);
            const updatedList = localEmails.map((email) =>
                email.id === selectedEmailId ? { ...email, ...updated } : email
            );
            setLocalEmails(updatedList);
        } catch (err) {
            alert("Could not save");
            console.error(err);
        }
    };
    
    return (
        <div className="max-w-7xl mx-auto p-6">
            {error && <div className="text-red-500">{error}</div>}
            {isPending && <div className="text-gray-500">Loading...</div>}

            <EmailSelector
                emails={localEmails}
                selectedEmailId={selectedEmailId}
                onChange={setSelectedEmailId}
            />

            {selectedEmailObj && (
                <EmailPreviewPanel
                    email={selectedEmailObj}
                    PreviewComponent={PreviewComponent}
                    onSave={handleMetaSave}
                />
            )}
        </div>
    );
};

export default HomePage;
