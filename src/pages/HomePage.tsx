import { useState, Suspense, lazy, useEffect } from 'react';
import useFetchList from '@/hooks/useFetchList';
import type { Email } from '@/types/email.type.ts';
import { downloadEmailAsHtml } from '@/utils/downloadEmailAsHtml.ts';
import { copyEmailAsHtml } from '@/utils/copyEmailAsHtml.ts';
import { useNavigate } from 'react-router-dom';

// Glob import Email.tsx files for preview components
const previewModules = import.meta.glob<{ default: React.ComponentType<any> }>('/src/emails/*/Email.tsx');
const getPreviewComponent = (id: string) => {
    const mod = previewModules[`/src/emails/${id}/Email.tsx`];
    return mod ? lazy(mod) : null;
};

const HomePage = () => {
    const { data: emails, isPending, error } = useFetchList('http://localhost:8000/emails');
    const [selectedEmailId, setSelectedEmailId] = useState<string>('');
    const selectedEmailObj = emails.find((email: Email) => email.id === selectedEmailId);
    // Lazy load PreviewComponent only if selectedEmailId is set and the module exists
    // This prevents unnecessary loading of components when no email is selected
    const PreviewComponent = selectedEmailId ? getPreviewComponent(selectedEmailId) : null;
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedEmailId) return;
        localStorage.setItem('lastSelectedEmailId', selectedEmailId);
    }, [selectedEmailId]);

    useEffect(() => {
        if (emails.length > 0 && !selectedEmailId) {
            const savedId = localStorage.getItem('lastSelectedEmailId');
            const exists = emails.some((email) => email.id === savedId);
            // If no saved ID or it doesn't exist, select the last email
            setSelectedEmailId(exists && savedId ? savedId : emails[emails.length - 1].id);
        }
    }, [emails]);

    return (
        <div className="max-w-5xl mx-auto p-6">
            {error && <div className="text-red-500">{error}</div>}
            {isPending && <div className="text-gray-500">Loading...</div>}

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Email</label>
                <select
                    value={selectedEmailId}
                    onChange={(e) => setSelectedEmailId(e.target.value)}
                    className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800"
                >
                    <option value="">-- Select an email --</option>
                    {emails.length > 0 ? (
                        emails
                            .slice() // do not mutate the original array
                            .sort((a, b) => b.wfNumber - a.wfNumber)
                            .map((email: Email) => (
                                <option key={email.id} value={email.id}>
                                    {email.wfNumber} | {email.projectName} | {email.suffix && `${email.suffix} | `}{email.type}
                                </option>
                            ))
                    ) : (
                        <option disabled>No emails available</option>
                    )}
                </select>
            </div>

            {selectedEmailId && PreviewComponent && (
                <div className="mt-4">
                    <div className='flex gap-4 mb-2'>
                        <button
                            onClick={() => copyEmailAsHtml(selectedEmailId)}
                            className="mb-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                        >
                            Copy HTML
                        </button>
                        <button
                            onClick={() => downloadEmailAsHtml(selectedEmailId)}
                            className="mb-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                        >
                            Download HTML
                        </button>
                        <button
                            onClick={() => navigate(`/duplicate/${selectedEmailId}`)}
                            className="mb-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                        >
                            Duplicate Html
                        </button>
                    </div>
                    <Suspense fallback={<div className="text-gray-400">Loading preview...</div>}>
                        <PreviewComponent email={selectedEmailObj} />
                    </Suspense>
                </div>
            )}
        </div>
    );
};

export default HomePage;
