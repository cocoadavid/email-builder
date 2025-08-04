import { generateFullHtml } from './generateFullHtml';
import type { Email } from '@/types/email.type.ts';

export const copyEmailAsHtml = async (selectedEmailObj: Email) => {
  const finalHtml = await generateFullHtml(selectedEmailObj);
  if (!finalHtml) return;
  navigator.clipboard.writeText(finalHtml)
    .then(() => {
      alert("Email HTML copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy HTML:", err);
      alert("Could not copy HTML to clipboard.");
    });
};
