import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { inlineHtmlStyle } from './inlineHtmlStyle';
import baseCss from '../styles/emailBase.css?raw';

export const copyEmailAsHtml = (Component: React.ComponentType, cssContent: string, selectedEmailId: string) => {
  console.log("Downloading email as HTML...");
  const htmlContent = renderToStaticMarkup(React.createElement(Component));
  const fullHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Email Preview</title>
    <style type="text/css">
/* Base styles */
${baseCss}

/* Email-specific styles */
${cssContent}
</style>

  </head>
  <body>
    ${htmlContent}
  </body>
</html>`;

  const inlinedHtml = inlineHtmlStyle(fullHtml);
  navigator.clipboard.writeText(inlinedHtml)
    .then(() => {
      alert("Email HTML copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy HTML:", err);
      alert("Could not copy HTML to clipboard.");
    });
};
