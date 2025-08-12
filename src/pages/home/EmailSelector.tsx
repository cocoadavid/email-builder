import Card from '@/components/appComponents/Card';
import type { Email } from '@/types/email.type.ts';

type EmailSelectorProps = {
  emails: Email[];
  selectedEmailId: string;
  onChange: (id: string) => void;
};

export const EmailSelector = ({ emails, selectedEmailId, onChange }: EmailSelectorProps) => {
  return (
    <Card className="flex items-center py-0 px-0">
      <select
        value={selectedEmailId}
        onChange={e => onChange(e.target.value)}
        className="w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-vsBlack bg-white"
      >
        <option value="">-- Select an email --</option>
        {emails.length > 0 ? (
          emails
            .slice()
            .sort((a, b) => Number(b.wfNumber) - Number(a.wfNumber))
            .map((email: Email) => (
              <option key={email.id} value={email.id}>
                {email.id} | {email.type}
              </option>
            ))
        ) : (
          <option disabled>No emails available</option>
        )}
      </select>
    </Card>
  );
};
