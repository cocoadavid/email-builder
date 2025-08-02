import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { inlineHtmlStyle } from './inlineHtmlStyle';
import baseCss from '@/styles/emailBase.css?raw';
const emailModules = import.meta.glob('/src/emails/*/Email.tsx');

export const downloadEmailAsHtml = async (selectedEmailId: string) => {
  const modulePath = `/src/emails/${selectedEmailId}/Email.tsx`;
  const importFn = emailModules[modulePath];
  if (!importFn) {
    console.error(`Email component not found at: ${modulePath}`);
    return;
  }
  
  const module = await import(
  /* @vite-ignore */ `/src/emails/${selectedEmailId}/Email.tsx?t=${Date.now()}`
  ) as { default: React.ComponentType };
  const Component = module.default;
  const htmlContent = renderToStaticMarkup(React.createElement(Component));

  let cssContent = "";
  try {
    cssContent = (await import(`../emails/${selectedEmailId}/email.css?raw`)).default;
  } catch (error) {
    console.error(`Failed to load CSS for ${selectedEmailId}`, error);
  }

  const fullHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
    <title>Email Preview</title>
    <style type="text/css">
/* Base styles */
${baseCss}
/* Email-specific styles */
${cssContent}
<!--[if (mso)>
<style type="text/css">
a {
    text-decoration: none;
    }
</style>
<![endif]--> 
</style>

  </head>
  <body class="body">
    ${htmlContent}
  </body>
</html>`;

  const inlinedHtml = inlineHtmlStyle(fullHtml);
  const blob = new Blob([inlinedHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${selectedEmailId}.html`;
  a.click();

  URL.revokeObjectURL(url);
};
