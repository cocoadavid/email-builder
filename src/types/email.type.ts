export type Email = {
    id: string;
    wfNumber: number;
    projectName: string;
    subjectLine: string;
    previewText: string;
    type: string;
    createdAt: string;
    sourceId?: string;
    suffix?: string;
}