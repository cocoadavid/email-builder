import React from 'react';

type TdProps = {
  height?: number;
  padding?: string;
  style?: React.CSSProperties;
  className?: string;
  colspan?: number;
  children: React.ReactNode;
};

const cleanStyleValue = (value: string): string => {
  return value.replace(/;$/, '');
};

const Td = ({ children, height, padding, style, className, colspan = 1 }: TdProps) => {
  const baseStyle: React.CSSProperties = {};

  if (height !== undefined) {
    baseStyle.height = `${height}px`;
  }
  if (padding !== undefined) {
    baseStyle.padding = padding;
  }

  const combinedStyle = { ...baseStyle, ...style };

  // Remove semicolons
  const cleanedStyle = Object.fromEntries(
    Object.entries(combinedStyle).map(([key, value]) => {
      if (typeof value === 'string') {
        return [key, cleanStyleValue(value)];
      }
      return [key, value];
    }),
  );

  return (
    <td className={className || 'text-14'} style={cleanedStyle} height={height} colSpan={colspan}>
      {children}
    </td>
  );
};

export default Td;
