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

  useEffect(() => {
    const interval = setInterval(() => {
      setVersion(Date.now()); // force reload if file changes so it can be seen on the preview
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const renderHtml = async () => {
      const baseHtml = await generateFullHtml(email, false);
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
        `,
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
          border: 'none',
        }}
      />
    </div>
  );
};

export default MobileEmailPreview;
