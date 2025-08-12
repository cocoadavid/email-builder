type Button3DProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
};

const Button3D = ({
  children,
  onClick,
  className,
  disabled = false,
  type = 'button',
}: Button3DProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`group text-sm text-white font-semibold relative inline-flex h-8 items-center gap-2 justify-center overflow-hidden rounded-md ${!disabled ? 'bg-sky-600 [box-shadow:0px_4px_1px_#075985]' : 'bg-gray-400 cursor-not-allowed'} px-4 transition-all active:translate-y-[2px] active:shadow-none ${className}`}
    >
      {children}
    </button>
  );
};

export default Button3D;
