import { useState, Suspense, lazy, useEffect, useRef } from 'react';
import useFetchList from '@/hooks/useFetchList';
import type { Email } from '@/types/email.type.ts';
import { downloadEmailAsHtml } from '@/utils/downloadEmailAsHtml.ts';
import { copyEmailAsHtml } from '@/utils/copyEmailAsHtml.ts';
import { useNavigate } from 'react-router-dom';
import { Copy, Download, FilePlus } from "lucide-react";
import { EmailMetaEditor } from '@/components/appComponents/EmailMetaEditor.tsx';

// Glob import Email.tsx files for preview components
const previewModules = import.meta.glob<{ default: React.ComponentType<any> }>('/src/emails/*/Email.tsx');
const getPreviewComponent = (id: string) => {
    const mod = previewModules[`/src/emails/${id}/Email.tsx`];
    return mod ? lazy(mod) : null;
};

// PATCH API hívás email metaadat frissítéshez
const updateEmailMeta = async (id: string, updates: { type: string; subjectLine: string }) => {
    const response = await fetch(`http://localhost:8000/emails/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("API update failed");
    return response.json();
};

const HomePage = () => {
    const { data: emails, isPending, error } = useFetchList('http://localhost:8000/emails');
    const [localEmails, setLocalEmails] = useState<Email[]>([]);
    const [selectedEmailId, setSelectedEmailId] = useState<string>('');
    const navigate = useNavigate();

    // Szinkronizáljuk a hook által hozott email listát a lokális verzióval
    useEffect(() => {
        if (emails.length > 0) {
            setLocalEmails(emails);
        }
    }, [emails]);

    const selectedEmailObj = localEmails.find((email: Email) => email.id === selectedEmailId);
    const PreviewComponent = selectedEmailId ? getPreviewComponent(selectedEmailId) : null;

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

    const handleMetaSave = async (updated: { type: string; subjectLine: string }) => {
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

            <div className="mb-2">
                <select
                    value={selectedEmailId}
                    onChange={(e) => setSelectedEmailId(e.target.value)}
                    className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800"
                >
                    <option value="">-- Select an email --</option>
                    {localEmails.length > 0 ? (
                        localEmails
                            .slice()
                            .sort((a, b) => b.wfNumber - a.wfNumber)
                            .map((email: Email) => (
                                <option key={email.id} value={email.id}>
                                    {email.id} | {email.type}
                                </option>
                            ))
                    ) : (
                        <option disabled>No emails available</option>
                    )}
                </select>
            </div>

            {selectedEmailObj && (
                <>
                    {PreviewComponent && (
                        <div className="mt-4">
                            <div className="flex gap-4 sticky top-0">
                                <button
                                    onClick={() => copyEmailAsHtml(selectedEmailObj)}
                                    className="mb-4 px-4 py-2 bg-sky-600 text-sm text-white rounded hover:bg-sky-700 flex items-center gap-2"
                                >
                                    <Copy size={16} />
                                    Copy HTML
                                </button>
                                <button
                                    onClick={() => downloadEmailAsHtml(selectedEmailObj)}
                                    className="mb-4 px-4 py-2 bg-sky-600 text-sm text-white rounded hover:bg-sky-700 flex items-center gap-2"
                                >
                                    <Download size={16} />
                                    Download HTML
                                </button>
                                <button
                                    onClick={() => navigate(`/duplicate/${selectedEmailId}`)}
                                    className="mb-4 px-4 py-2 bg-emerald-600 text-sm text-white rounded hover:bg-emerald-700 flex items-center gap-2"
                                >
                                    <FilePlus size={16} />
                                    Duplicate HTML
                                </button>
                            </div>
                            <EmailMetaEditor email={selectedEmailObj} onSave={handleMetaSave} />
                            <Suspense fallback={<div className="text-gray-400">Loading preview...</div>}>
                                <PreviewComponent email={selectedEmailObj} />
                            </Suspense>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default HomePage;
