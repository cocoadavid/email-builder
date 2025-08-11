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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const renderHtml = async () => {
      const baseHtml = await generateFullHtml(email);
      const injectedHtml = baseHtml?.replace(
        /<\/head>/i,
        `
          <style>
            html, body {
              margin: 0;
              padding: 0;
              overflow: auto;
              -webkit-overflow-scrolling: touch; /* iOS smooth scroll */
              scrollbar-width: none; /* Firefox */
            }
            ::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Edge */
            }
          </style>
        </head>
        `
      );

      setHtml(injectedHtml ?? '');
    };
    renderHtml();
  }, [email.id, version]);

  return (
    <div className="w-full flex justify-center overflow-x-hidden shadow-xl rounded-xl border border-gray-200">
      <iframe
        title="Email Preview"
        srcDoc={html}
        className="rounded-xl"
        style={{
          width: '375px',
          height: '667px',
          border: 'none'
        }}
      />
    </div>
  );
};

export default MobileEmailPreview;
