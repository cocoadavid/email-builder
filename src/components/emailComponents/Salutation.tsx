import { useEmailType } from '@/context/EmailTypeContext';

type SalutationProps = {
  text?: string;
  type?: 'eloqua' | 'oft' | 'thirdparty' | 'highspot';
};

const Salutation = ({ text = 'Hello,', type }: SalutationProps) => {
  const { emailType } = useEmailType();

  if (emailType === 'eloqua' || type === 'eloqua') {
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
