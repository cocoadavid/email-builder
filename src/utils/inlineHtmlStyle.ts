import juice from "juice"

export const inlineHtmlStyle = (html: string) => {
  // Use juice to inline styles in the HTML content
  return juice(html, { preserveMediaQueries: true, removeStyleTags: false });
}