import type { Email } from "@/types/email.type";
import EmailActions from "./EmailActions";
import { EmailMetaEditor } from "./EmailMetaEditor";
import { Suspense } from "react";

type EmailPreviewPanelProps = {
    email: Email;
    EmailPreviewComponent: React.ComponentType<any> | null;
    onSave: (updated: { type: string; subjectLine: string, previewText: string }) => void;
}
const EmailPreviewPanel = ({ EmailPreviewComponent, email, onSave }: EmailPreviewPanelProps) => {
    return (
        <div className="mt-4">
            {EmailPreviewComponent && (
                <div className="mt-4">
                    <EmailActions email={email} />
                    <EmailMetaEditor email={email} onSave={onSave} />
                    <Suspense fallback={<div className="text-gray-400">Loading preview...</div>}>
                        <EmailPreviewComponent email={email} selectedEmailObj={email} />
                    </Suspense>
                </div>
            )}
        </div>
    );
}

export default EmailPreviewPanel;