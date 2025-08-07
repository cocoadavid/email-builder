import type { ViewMode } from '@/types/viewmode.type';

type ViewToggleProps = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => {
  return (
    <div className="flex gap-2">
      <button
        className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        onClick={() => setViewMode('desktop')}
      >
        💻 Desktop
      </button>
      <button
        className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        onClick={() => setViewMode('mobile')}
      >
        📱 Mobile
      </button>
    </div>
  );
};

export default ViewToggle;
