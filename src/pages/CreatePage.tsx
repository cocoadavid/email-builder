import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const [wfNumber, setWfNumber] = useState('');
    const [projectName, setProjectName] = useState('');
    const [subjectLine, setSubjectLine] = useState('');
    const [previewText, setPreviewText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailData = {
            wfNumber: `WF${wfNumber}`,
            projectName,
            subjectLine,
            previewText,
        };
        setIsPending(true);
        fetch('http://localhost:8000/emails', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emailData)
        }).then(() => {
            console.log("New email added");
            setIsPending(false);
            navigate('/');
        })
        console.log({ subjectLine, previewText, wfNumber });
        navigate('/'); // Redirect to home page after submission
    };
    return (
        <div className='create'>
            <h2>Create new email</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Workfront Number:</label>
                    <input
                        type="number"
                        value={wfNumber}
                        onChange={(e) => setWfNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Project name:</label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Subject Line:</label>
                    <input
                        type="text"
                        value={subjectLine}
                        onChange={(e) => setSubjectLine(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Preview Text:</label>
                    <input
                        type="text"
                        value={previewText}
                        onChange={(e) => setPreviewText(e.target.value)}
                        required
                    />
                </div>
                {!isPending && <button type="submit">Create Email</button>}
                {isPending && <button disabled>Creating email...</button>}
            </form>
        </div>
    );
}

export default CreatePage;