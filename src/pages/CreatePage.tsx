import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const [wfNumber, setWfNumber] = useState('');
    const [projectName, setProjectName] = useState('');
    const [subjectLine, setSubjectLine] = useState('');
    const [previewText, setPreviewText] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const createdAt = new Date().toISOString();
        const emailData = {
            id: `WF${wfNumber}-${projectName.replace(/\s+/g, '_')}-${type}`,
            wfNumber: wfNumber,
            projectName,
            subjectLine,
            previewText,
            type,
            createdAt,
        };
        setIsPending(true);
        fetch('http://localhost:8000/emails', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emailData),
        }).then(() => {
            setIsPending(false);
            localStorage.setItem('lastSelectedEmailId', emailData.id);
            navigate('/'); 
        }).catch(err => {
            console.error("Error creating email:", err);
            setIsPending(false);
        });
    };


    return (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-sky-100">
            <h2 className="text-2xl font-bold text-sky-700 border-b border-sky-200 pb-2">Create New Email</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Workfront Number</label>
                    <input
                        type="number"
                        value={wfNumber}
                        onChange={(e) => setWfNumber(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-sky-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Project Name</label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-sky-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Subject Line</label>
                    <input
                        type="text"
                        value={subjectLine}
                        onChange={(e) => setSubjectLine(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-sky-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Preview Text</label>
                    <input
                        type="text"
                        value={previewText}
                        onChange={(e) => setPreviewText(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-sky-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
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
}

export default CreatePage;