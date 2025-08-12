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
  let initialClasses = `relative inline-flex items-center gap-2 justify-center px-4 py-2 shadow-xl text-sm font-semibold text-vsBlackLight
        border-2 border-vsRed hover:bg-linear-to-r hover:from-vsRed hover:via-vsRed hover:to-vsPurple hover:text-white`;
  if (disabled) {
    initialClasses = `relative inline-flex items-center gap-2 justify-center px-4 py-2 shadow-xl text-sm font-semibold text-vsGrayDark
        border-2 border-transparent bg-vsGrayLight/50`;
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${initialClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button3D;
