import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { inlineHtmlStyle } from './inlineHtmlStyle';
import baseCss from '../styles/emailBase.css?raw';

export const downloadEmailAsHtml = (Component: React.ComponentType, cssContent: string) => {
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
  const blob = new Blob([inlinedHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'email.html';
  a.click();

  URL.revokeObjectURL(url);
};
