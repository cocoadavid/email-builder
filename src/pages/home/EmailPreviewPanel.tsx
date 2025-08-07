import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, useState } from 'react';
import type { Email } from '@/types/email.type';
import EmailActions from './EmailActions';
import LoadingHeader from '@/components/appComponents/LoadingHeader';
import MobileEmailPreview from './MobileEmailPreview';
import type { ViewMode } from '@/types/viewmode.type';
import ViewToggle from './ViewToggle';

type EmailPreviewPanelProps = {
  email: Email;
  EmailPreviewComponent: React.ComponentType<any> | null;
};
const EmailPreviewPanel = ({ EmailPreviewComponent, email }: EmailPreviewPanelProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');

  return (
    <div className='flex flex-col items-center'>
      {EmailPreviewComponent && (
        <>
          <EmailActions email={email} />
          <AnimatePresence mode="wait">
            <motion.div
              key={email.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'backInOut' }}
            >
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
              <Suspense fallback={<LoadingHeader />}>
                {viewMode == 'mobile' && <MobileEmailPreview email={email} />}
                {viewMode == 'desktop' && <EmailPreviewComponent key={email.id} email={email} />}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default EmailPreviewPanel;
