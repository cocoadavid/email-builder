import { useState, Suspense, lazy, useEffect, useRef } from 'react';
import useFetchList from '@/hooks/useFetchList';
import type { Email } from '@/types/email.type.ts';
import { downloadEmailAsHtml } from '@/utils/downloadEmailAsHtml.ts';
import { copyEmailAsHtml } from '@/utils/copyEmailAsHtml.ts';
import { useNavigate } from 'react-router-dom';
import { Copy, Download, FilePlus } from "lucide-react";
import { checkSpelling } from "@/utils/checkSpelling";

// Glob import Email.tsx files for preview components
const previewModules = import.meta.glob<{ default: React.ComponentType<any> }>('/src/emails/*/Email.tsx');
const getPreviewComponent = (id: string) => {
    const mod = previewModules[`/src/emails/${id}/Email.tsx`];
    return mod ? lazy(mod) : null;
};

const HomePage = () => {
    const { data: emails, isPending, error } = useFetchList('http://localhost:8000/emails');
    const [selectedEmailId, setSelectedEmailId] = useState<string>('');
    const [spellingMistakes, setSpellingMistakes] = useState<any[]>([]);
    const selectedEmailObj = emails.find((email: Email) => email.id === selectedEmailId);
    // Lazy load PreviewComponent only if selectedEmailId is set and the module exists
    // This prevents unnecessary loading of components when no email is selected
    const PreviewComponent = selectedEmailId ? getPreviewComponent(selectedEmailId) : null;
    const navigate = useNavigate();
    const previewRef = useRef<HTMLDivElement>(null);

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

    const handleCheck = async () => {
        if (!previewRef.current) return;

        const html = previewRef.current.innerHTML;
        const textOnly = html.replace(/<[^>]+>/g, ""); // szűri a HTML tag-eket

        const result = await checkSpelling(textOnly);
        console.log(result);
        setSpellingMistakes(result);
    };


    return (
        <div className="max-w-7xl mx-auto p-6">

            {error && <div className="text-red-500">{error}</div>}
            {isPending && <div className="text-gray-500">Loading...</div>}

            <div className="mb-2">
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
                                    {email.wfNumber} | {email.projectName}{email.suffix && email.suffix !=="eloqua" && email.suffix.toLowerCase() !=="oft" && email.suffix.toLowerCase() !=="highspot" && email.suffix.toLowerCase() !=="thirdparty" ? ` - ${email.suffix} | ` : " | "}{email.type}
                                </option>
                            ))
                    ) : (
                        <option disabled>No emails available</option>
                    )}
                </select>
            </div>

            {selectedEmailId && PreviewComponent && (
                <div className="mt-4">
                    <div className='flex gap-4 sticky top-0'>
                        <button
                            onClick={() => copyEmailAsHtml(selectedEmailObj!)}
                            className="mb-4 px-4 py-2 bg-sky-600 text-sm text-white rounded hover:bg-sky-700 flex items-center gap-2"
                        >
                            <Copy size={16} />
                            Copy HTML
                        </button>
                        <button
                            onClick={() => downloadEmailAsHtml(selectedEmailObj!)}
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
                        <button
                            onClick={handleCheck}
                            className="mb-4 px-4 py-2 bg-yellow-600 text-sm text-white rounded hover:bg-yellow-700 flex items-center gap-2"
                        >
                            Check spelling
                        </button>
                    </div>
                    {selectedEmailObj?.subjectLine && (
                        <div className="mb-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                            <div><strong>Subject:</strong> {selectedEmailObj.subjectLine}</div>
                            {selectedEmailObj.previewText && (
                                <div><strong>Preview text:</strong> {selectedEmailObj.previewText}</div>
                            )}
                        </div>
                    )}
                    <div ref={previewRef}>
                        <Suspense fallback={<div className="text-gray-400">Loading preview...</div>}>
                            <PreviewComponent email={selectedEmailObj} />
                        </Suspense>
                    </div>
                    {spellingMistakes.length > 0 && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
                            <h3 className="font-semibold mb-2 text-yellow-800">Spelling mistakes:</h3>
                            <ul className="list-disc list-inside text-sm text-yellow-900">
                                {spellingMistakes.map((m, i) => (
                                    <li key={i}>
                                        <strong>{m.context.text.slice(m.context.offset, m.context.offset + m.context.length)}</strong> &rarr; {m.shortMessage || m.message}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;
