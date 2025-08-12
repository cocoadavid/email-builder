import juice from 'juice';

export const inlineHtmlStyle = (html: string) => {
  const cleanedHtml = html.replace(
    /<span\s+id="salutation"[^>]*>(.*?)<\/span>/gi,
    '<span elqid="73" elqtype="DynamicContent" class="remove-absolute" style="display: block"></span>',
  );
  return juice(cleanedHtml, { preserveMediaQueries: true, removeStyleTags: false });
};
