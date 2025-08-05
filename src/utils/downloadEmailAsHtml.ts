import type { Email } from '@/types/email.type.ts';
import { generateFullHtml } from './generateFullHtml';
import { toast } from 'sonner';

export const downloadEmailAsHtml = async (selectedEmailObj: Email) => {
  try {
    const finalHtml = await generateFullHtml(selectedEmailObj);
    if (!finalHtml) return;
    const blob = new Blob([finalHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedEmailObj.id}.html`;
    a.click();

    URL.revokeObjectURL(url);
    toast.success('HTML downloaded successfully.');
  } catch (error) {
    console.error('HTML download error: ', error);
    toast.error(`An error occurred while generating the HTML file.`)
  }

};
