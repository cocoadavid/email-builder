import { useEmailType } from '@/context/EmailTypeContext';

type SalutationProps = {
  text?: string;
};

const Salutation = ({ text = 'Hello,' }: SalutationProps) => {
  const { emailType } = useEmailType();

  if (emailType === 'eloqua') {
    return (
      <span id="salutation" className="bg-yellow-200 text-gray-700">
        Hello Developer,
      </span>
    );
  } else {
    return <>{text}</>;
  }
};

export default Salutation;
