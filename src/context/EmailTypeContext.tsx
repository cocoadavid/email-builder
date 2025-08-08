import React, { createContext, useContext, useState } from 'react';

type EmailTypeContextType = {
  emailType: string | null;
  setEmailType: (type: string) => void;
};

const EmailTypeContext = createContext<EmailTypeContextType>({
  emailType: null,
  setEmailType: () => {},
});

export const EmailTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emailType, setEmailType] = useState<string | null>(null);

  return (
    <EmailTypeContext.Provider value={{ emailType, setEmailType }}>
      {children}
    </EmailTypeContext.Provider>
  );
};

export const useEmailType = () => useContext(EmailTypeContext);
