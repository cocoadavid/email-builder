import juice from 'juice';

export const inlineHtmlStyle = (html: string, clean: boolean = true) => {
  const cleanedHtml = clean
    ? html.replace(
        /<span\s+id="salutation"[^>]*>(.*?)<\/span>/gi,
        '<span elqid="73" elqtype="DynamicContent" class="remove-absolute" style="display: block"></span>',
      )
    : html;
  return juice(cleanedHtml, { preserveMediaQueries: true, removeStyleTags: false });
};
