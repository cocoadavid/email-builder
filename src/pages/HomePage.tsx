import { useState, Suspense, lazy, useEffect } from 'react';
import useFetch from '../hooks/useFetch.ts';
import type { Email } from '../types/email.type.ts';
import { downloadEmailAsHtml } from '../utils/downloadEmailAsHtml.ts';

const HomePage = () => {
    const { data: emails, isPending, error } = useFetch('http://localhost:8000/emails');
    const [selectedEmail, setSelectedEmail] = useState<string>("");

    const selectedEmailObj = emails.find((email: Email) => email.id === selectedEmail);

    const PreviewComponent = selectedEmail
        ? lazy(() => import(`../emails/${selectedEmail}/Email.tsx`))
        : null;
    // State to hold the CSS content for the selected email
    const [cssContent, setCssContent] = useState<string>("");

    // import CSS dynamically based on selected email
    useEffect(() => {
        if (selectedEmail) {
            import(`../emails/${selectedEmail}/email.css?raw`)
                .then((mod) => setCssContent(mod.default))
                .catch((err) => {
                    console.error("Failed to load CSS:", err);
                    setCssContent("");
                });
        }
    }, [selectedEmail]);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Email Preview</h1>

            {error && <div className="text-red-500">{error}</div>}
            {isPending && <div className="text-gray-500">Loading...</div>}

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Email</label>
                <select
                    value={selectedEmail}
                    onChange={(e) => setSelectedEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800"
                >
                    <option value="">-- Select an email --</option>
                    {emails.length > 0 ? (
                        emails.map((email: Email) => (
                            <option key={email.id} value={email.id}>
                                {email.projectName} – {email.wfNumber}
                            </option>
                        ))
                    ) : (
                        <option disabled>No emails available</option>
                    )}
                </select>
            </div>

            {selectedEmail && PreviewComponent && (
                <div className="mt-6">
                    <button
                        onClick={() => downloadEmailAsHtml(PreviewComponent, cssContent)}
                        className="mb-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                    >
                        Download as HTML
                    </button>
                    <Suspense fallback={<div className="text-gray-400">Loading preview...</div>}>
                        <PreviewComponent email={selectedEmailObj} />
                    </Suspense>
                </div>
            )}
        </div>
    );
};

export default HomePage;
