import { useState } from 'react';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import Card from '@/components/appComponents/Card';
import type { Email } from '@/types/email.type.ts';

type EmailSelectorProps = {
  emails: Email[];
  selectedEmailId: string;
  onChange: (id: string) => void;
};

export const EmailSelector = ({ emails, selectedEmailId, onChange }: EmailSelectorProps) => {
  const [query, setQuery] = useState('');

  // rendezett és filterelt lista
  const filteredEmails =
    query === ''
      ? emails
          .slice()
          .sort((a, b) => Number(b.wfNumber.substring(2)) - Number(a.wfNumber.substring(2)))
      : emails
          .filter(email => `${email.id} ${email.type}`.toLowerCase().includes(query.toLowerCase()))
          .sort((a, b) => Number(b.wfNumber.substring(2)) - Number(a.wfNumber.substring(2)));

  const selectedEmail = emails.find(e => e.id === selectedEmailId) || null;

  return (
    <Card className="flex items-center px-1 py-1">
      <Combobox value={selectedEmail} onChange={(email: Email) => onChange(email?.id || '')}>
        <div className="relative w-full">
          <div className="relative w-full cursor-default overflow-hidden bg-white text-left sm:text-sm focus:ring-1 focus:ring-black">
            <ComboboxInput
              className="w-full border-none py-2 pl-3 pr-10 leading-5 text-vsGrayDark focus:outline-none"
              displayValue={(email: Email) => (email ? `${email.id} | ${email.type}` : '')}
              onChange={event => setQuery(event.target.value)}
              placeholder="-- Select an email --"
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown className="h-5 w-5 text-vsGrayDark" />
            </ComboboxButton>
          </div>
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 shadow-lg text-sm ring-1 ring-vsGrayLight focus:outline-none">
            {filteredEmails.length === 0 ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-500">
                No emails available
              </div>
            ) : (
              filteredEmails.map(email => (
                <ComboboxOption
                  key={email.id}
                  className="relative cursor-pointer select-none py-2 pl-2 pr-2 text-vsGrayDark
             data-[focus]:bg-vsGrayDark data-[focus]:text-white"
                  value={email}
                >
                  <>
                    <span className="block truncate font-normal data-[selected]:font-medium">
                      {email.id} | {email.type}
                    </span>
                    <span
                      className="absolute inset-y-0 left-0 hidden items-center pl-3 
                 text-vsBlack data-[focus]:text-white data-[selected]:flex"
                    >
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </>
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </Card>
  );
};
