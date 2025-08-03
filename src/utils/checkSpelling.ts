export type LTMatch = {
  message: string;
  shortMessage?: string;
  offset: number;
  length: number;
  replacements: { value: string }[];
  context: { text: string; offset: number; length: number };
  rule: { id: string; description: string; issueType: string };
};

export async function checkSpelling(text: string): Promise<LTMatch[]> {
  const res = await fetch("https://api.languagetoolplus.com/v2/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      text,
      language: "en-gb", // Change to your desired language
    }),
  });

  if (!res.ok) {
    console.error("LanguageTool API hiba:", res.statusText);
    return [];
  }

  const data = await res.json();
  return data.matches as LTMatch[];
}
