// src/components/EmailMetaEditor.tsx
import type { Email } from "@/types/email.type";
import { useState, useEffect } from "react";

type EmailMetaEditorProps = {
    email: Email;
    onSave: (updated: { type: string; subjectLine: string, previewText: string }) => void;
};

const typeOptions = ["eloqua", "oft", "highspot", "thirdparty"];

export const EmailMetaEditor = ({ email, onSave }: EmailMetaEditorProps) => {
    const [type, setType] = useState(email.type || "");
    const [subjectLine, setSubjectLine] = useState(email.subjectLine || "");
    const [previewText, setPreviewText] = useState(email.previewText || "");
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setType(email.type || "");
        setSubjectLine(email.subjectLine || "");
        setSubjectLine(email.previewText || "");
        setIsDirty(false);
    }, [email]);

    useEffect(() => {
        setIsDirty(type !== email.type || subjectLine !== email.subjectLine || previewText !== email.previewText);
    }, [type, subjectLine, previewText, email]);

    return (
        <div className="mb-4 p-4 border bg-white shadow-lg rounded-2xl border border-sky-100">
            <div className="flex flex-col gap-2">

                <label className="text-sm">
                    Subject:
                    <input
                        type="text"
                        value={subjectLine}
                        onChange={(e) => setSubjectLine(e.target.value)}
                        className="mt-1 block w-full border rounded px-3 py-1"
                    />
                </label>

                <label className="text-sm">
                    Preview text:
                    <input
                        type="text"
                        value={previewText}
                        onChange={(e) => setPreviewText(e.target.value)}
                        className="mt-1 block w-full border rounded px-3 py-1"
                    />
                </label>
                <label className="text-sm">
                    type
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="mt-1 block w-full border rounded px-3 py-1"
                    >
                        {typeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </label>
                <button
                    onClick={() => onSave({ type, subjectLine, previewText })}
                    disabled={!isDirty}
                    className={`px-4 py-2 text-sm rounded text-white ${isDirty ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    Update email data
                </button>
            </div>
        </div>
    );
};