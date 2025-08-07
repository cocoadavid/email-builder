import { toast } from 'sonner';
import { generateFullHtml } from './generateFullHtml';
import type { Email } from '@/types/email.type.ts';

export const copyEmailAsHtml = async (selectedEmailObj: Email) => {
  const finalHtml = await generateFullHtml(selectedEmailObj);
  if (!finalHtml) return;
  navigator.clipboard
    .writeText(finalHtml)
    .then(() => {
      toast.success('Email HTML copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy HTML:', err);
      toast.error(`Failed to copy HTML: look at the console for more details.`);
    });
};
