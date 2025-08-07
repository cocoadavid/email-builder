// components/MobileEmailPreview.tsx
import { useEffect, useState } from 'react';
import { generateFullHtml } from '@/utils/generateFullHtml';
import type { Email } from '@/types/email.type';

type MobileEmailPreviewProps = {
  email: Email;
};

const MobileEmailPreview = ({ email }: MobileEmailPreviewProps) => {
  const [html, setHtml] = useState<string | undefined>('');
  const [version, setVersion] = useState<number>(Date.now());

  // Trigger újragenerálás mentéskor
  useEffect(() => {
    const interval = setInterval(() => {
      setVersion(Date.now()); // ez trükkösen "kikényszeríti" az újrahívást, ha a fájl változik
    }, 1000); // vagy: 500ms, ha gyorsan akarsz reagálni

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const renderHtml = async () => {
      const html = await generateFullHtml(email);
      setHtml(html ?? '');
    };
    renderHtml();
  }, [email.id, version]);

  return (
    <div className="w-full flex justify-center overflow-x-hidden p-4">
      <iframe
        title="Email Preview"
        srcDoc={html}
        sandbox=""
        className="rounded-xl border shadow-lg"
        style={{
          width: '375px',
          height: '667px',
          border: 'none',
        }}
      />
    </div>
  );
};

export default MobileEmailPreview;
