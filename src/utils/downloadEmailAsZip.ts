import JSZip from "jszip";
import type { Email } from "@/types/email.type.ts";
import { generateFullHtml } from "./generateFullHtml";
import { toast } from "sonner";

// Segítség: lekéri a képeket blobként
const fetchImageAsBlob = async (url: string): Promise<[string, Blob | null]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Not found");
    const blob = await response.blob();
    return [url, blob];
  } catch {
    return [url, null];
  }
};

const getImagesFromHtml = (html: string): string[] => {
  const regex = /<img[^>]*src="([^"]*images\/[^"]*)"/g;
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(html))) {
    matches.push(match[1]);
  }
  return matches;
};

export const downloadEmailAsZip = async (email: Email) => {
  try {
    const inlinedHtml = await generateFullHtml(email);
    if (!inlinedHtml) {
      toast.error("Failed to generate email HTML.");
      return;
    }

    const cleanedHtml = inlinedHtml.replace(/src=".*?\/images\//g, 'src="images/');

    const zip = new JSZip();
    zip.file("email.html", cleanedHtml);

    const imagePaths = getImagesFromHtml(inlinedHtml);
    const uniqueImagePaths = [...new Set(imagePaths)];

    const imageFetchPromises = uniqueImagePaths.map(async (path) => {
      const [_, blob] = await fetchImageAsBlob(path);
      if (blob) {
        const filename = path.split("/images/")[1];
        zip.folder("images")?.file(filename, blob);
      }
    });

    await Promise.all(imageFetchPromises);

    const content = await zip.generateAsync({ type: "blob" });
    const blobUrl = URL.createObjectURL(content);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${email.id}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);

    toast.success("ZIP file downloaded successfully.");
  } catch (err) {
    console.error("ZIP download error:", err);
    toast.error("An error occurred while generating the ZIP file.");
  }
};
