import type { Email } from '@/types/email.type.ts';

type EmailSelectorProps = {
  emails: Email[];
  selectedEmailId: string;
  onChange: (id: string) => void;
};

export const EmailSelector = ({ emails, selectedEmailId, onChange }: EmailSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      <select
        value={selectedEmailId}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800"
      >
        <option value="">-- Select an email --</option>
        {emails.length > 0 ? (
          emails
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
  );
};
