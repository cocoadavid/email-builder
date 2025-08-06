import { Copy, Download, FilePlus } from "lucide-react";
import { downloadEmailAsHtml } from '@/utils/downloadEmailAsHtml.ts';
import { copyEmailAsHtml } from '@/utils/copyEmailAsHtml.ts';
import { useNavigate } from 'react-router-dom';
import type { Email } from "@/types/email.type";
import { downloadEmailAsZip } from "@/utils/downloadEmailAsZip";

type EmailActionsProps = {
    email: Email
}

const EmailActions = ({ email }: EmailActionsProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex gap-4 sticky top-0 justify-center">
            <button
                onClick={() => copyEmailAsHtml(email)}
                className="mb-4 px-4 py-2 bg-sky-600 text-sm text-white rounded hover:bg-sky-700 flex items-center gap-2"
            >
                <Copy size={16} />
                Copy HTML
            </button>
            <button
                onClick={() => downloadEmailAsHtml(email)}
                className="mb-4 px-4 py-2 bg-sky-600 text-sm text-white rounded hover:bg-sky-700 flex items-center gap-2"
            >
                <Download size={16} />
                Download HTML
            </button>
            <button
                onClick={() => downloadEmailAsZip(email)}
                className="mb-4 px-4 py-2 bg-sky-600 text-sm text-white rounded hover:bg-sky-700 flex items-center gap-2"
            >
                <Download size={16} />
                Download Zip
            </button>
            <button
                onClick={() => navigate(`/duplicate/${email.id}`)}
                className="mb-4 px-4 py-2 bg-emerald-600 text-sm text-white rounded hover:bg-emerald-700 flex items-center gap-2"
            >
                <FilePlus size={16} />
                Duplicate
            </button>
        </div>
    );
}

export default EmailActions;