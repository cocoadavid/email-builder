import type { Email } from '@/types/email.type.ts';
import { generateFullHtml } from './generateFullHtml';

export const downloadEmailAsHtml = async (selectedEmailObj: Email) => {
  const finalHtml = await generateFullHtml(selectedEmailObj);
  if (!finalHtml) return;
  const blob = new Blob([finalHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${selectedEmailObj.id}.html`;
  a.click();

  URL.revokeObjectURL(url);
};
