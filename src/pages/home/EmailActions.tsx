import { Copy, Download, FilePlus } from 'lucide-react';
import { downloadEmailAsHtml } from '@/utils/downloadEmailAsHtml.ts';
import { copyEmailAsHtml } from '@/utils/copyEmailAsHtml.ts';
import { useNavigate } from 'react-router-dom';
import type { Email } from '@/types/email.type';
import { downloadEmailAsZip } from '@/utils/downloadEmailAsZip';
import Button3D from '@/components/appComponents/Button3D';

type EmailActionsProps = {
  email: Email;
};

const EmailActions = ({ email }: EmailActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 sticky top-0 justify-center z-100 mb-4">
      <Button3D className="bg-[#EEE]" onClick={() => copyEmailAsHtml(email)}>
        <Copy size={16} />
        Copy HTML
      </Button3D>
      <Button3D className="bg-[#EEE]" onClick={() => downloadEmailAsHtml(email)}>
        <Download size={16} />
        Download HTML
      </Button3D>
      <Button3D className="bg-[#EEE]" onClick={() => downloadEmailAsZip(email)}>
        <Download size={16} />
        Download Zip
      </Button3D>
      <Button3D className="bg-[#EEE]" onClick={() => navigate(`/duplicate/${email.id}`)}>
        <FilePlus size={16} />
        Duplicate
      </Button3D>
    </div>
  );
};

export default EmailActions;
