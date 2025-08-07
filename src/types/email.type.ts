export type EmailType = 'eloqua' | 'oft' | 'highspot' | 'thirdparty';

export type EmailUpdateInput = {
  type: EmailType;
  subjectLine: string;
  previewText: string;
};

export type Email = {
  id: string;
  wfNumber: number;
  projectName: string;
  subjectLine: string;
  previewText: string;
  type: EmailType;
  createdAt: string;
  templateId: string;
  sourceId?: string;
  suffix?: string;
};
