import { AnimatePresence, motion } from 'framer-motion';
import { Suspense } from 'react';
import type { Email } from '@/types/email.type';
import EmailActions from './EmailActions';
import LoadingHeader from '@/components/appComponents/LoadingHeader';
import MobileEmailPreview from './MobileEmailPreview';
import type { ViewMode } from '@/types/viewmode.type';

type EmailPreviewPanelProps = {
  email: Email;
  EmailPreviewComponent: React.ComponentType<any> | null;
  viewMode: ViewMode;
};
const EmailPreviewPanel = ({ EmailPreviewComponent, email, viewMode }: EmailPreviewPanelProps) => {
  return (
    <div>
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
