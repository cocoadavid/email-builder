import { Monitor, Smartphone } from 'lucide-react';
import type { ViewMode } from '@/types/viewmode.type';

type ViewToggleProps = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => {
  return (
    <div className="flex justify-end">
      <button
        className={`rounded-tl-md px-3 py-1 flex items-center gap-2  ${viewMode === 'desktop' ? 'bg-sky-600 text-white' : 'bg-gray-200'}`}
        onClick={() => setViewMode('desktop')}
      >
         <Monitor size={16} />
      </button>
      <button
        className={`rounded-tr-md px-3 py-1 flex items-center gap-2 ${viewMode === 'mobile' ? 'bg-sky-600 text-white' : 'bg-gray-200'}`}
        onClick={() => setViewMode('mobile')}
      >
        <Smartphone size={16} />
      </button>
    </div>
  );
};

export default ViewToggle;
