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
        className={`px-3 py-1 flex items-center gap-2  ${viewMode === 'desktop' ? 'bg-vsRed text-white' : 'bg-vsGrayLight'}`}
        onClick={() => setViewMode('desktop')}
      >
        <Monitor size={16} />
      </button>
      <button
        className={`px-3 py-1 flex items-center gap-2 ${viewMode === 'mobile' ? 'bg-vsRed text-white' : 'bg-vsGrayLight'}`}
        onClick={() => setViewMode('mobile')}
      >
        <Smartphone size={16} />
      </button>
    </div>
  );
};

export default ViewToggle;
