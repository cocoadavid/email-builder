import React from 'react';
import ReactDOMServer from 'react-dom/server';

type SectionProps = {
  variables?: Record<string, any>;
  html?: string;
  bgColor?: string;
  className?: string;
  children?: React.ReactNode;
};

function replacePlaceholders(html: string, obj: Record<string, any>, prefix = ''): string {
  let result = html;

  Object.entries(obj).forEach(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const regex = new RegExp(`{{\\s*${fullKey}(?::([^}]+))?\\s*}}`, 'g');

    if (React.isValidElement(value)) {
      result = result.replace(regex, () =>
        ReactDOMServer.renderToStaticMarkup(React.createElement(React.Fragment, null, value)),
      );
    } else if (typeof value === 'function') {
      result = result.replace(regex, (_, propsString) => {
        let props: Record<string, any> = {};
        if (propsString) {
          propsString.split(';').forEach((pair: string) => {
            const [propKey, propValue] = pair.split('=');
            props[propKey.trim()] = propValue.trim();
          });
        }
        return ReactDOMServer.renderToStaticMarkup(React.createElement(value, props));
      });
    } else if (typeof value === 'string' || typeof value === 'number') {
      result = result.replace(regex, String(value));
    } else if (typeof value === 'object' && value !== null) {
      // 🔹 Rekurzív feldolgozás, de ugyanazon result-on
      result = replacePlaceholders(result, value, fullKey);
    }
  });

  return result;
}

const Section = ({ html, children, bgColor, className, variables }: SectionProps) => {
  // Ha van html és images, akkor cseréljük a placeholder-eket
  let processedHtml = html;
  if (processedHtml && variables) {
    processedHtml = replacePlaceholders(processedHtml, variables);
  }

  if (processedHtml) {
    return (
      <section style={{ margin: 0, padding: 0}}>
        <table
          width={'100%'}
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
          bgcolor={bgColor || '#FFFFFF'}
          style={{ borderCollapse: 'collapse', width: '100%', background: bgColor || '#FFFFFF' }}
        >
          <tbody>
            <tr>
              <td
                dangerouslySetInnerHTML={{ __html: processedHtml }}
                className={`section${className ? ' ' + className : ''}`}
              ></td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
  return (
    <section style={{ margin: 0, padding: 0, fontSize: '14px', lineHeight: '16px'  }}>
      <table
        width={'100%'}
        cellPadding="0"
        cellSpacing="0"
        role="presentation"
        bgcolor={bgColor || '#FFFFFF'}
        style={{ borderCollapse: 'collapse', width: '100%', background: bgColor || '#FFFFFF' }}
      >
        <tbody>
          <tr>
            <td className={`section${className ? ' ' + className : ''}`}>{children}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Section;
