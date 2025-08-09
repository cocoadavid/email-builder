import React from 'react';

type TableProps = {
    width?: number;
    style?: React.CSSProperties;
    children: React.ReactNode;
};

const Table = ({ children, width, style }: TableProps) => {
    const baseStyle: React.CSSProperties = width ? { width: `${width}px` } : { width: '100%' };
    const combinedStyle = { ...baseStyle, ...style };

    // Ellenőrzés: ha children egy tömb vagy egy elem, ellenőrizzük a típust
    const checkChildrenAreTR = (child: React.ReactNode): boolean => {
        if (React.isValidElement(child)) {
            // React elem, ellenőrizzük a típusát
            if (child.type === 'tr') return true;
            return false;
        }
        if (Array.isArray(child)) {
            // Tömb esetén minden elemét ellenőrizzük
            return child.every(c => checkChildrenAreTR(c));
        }
        return false; // Nem React elem vagy nem tömb
    };

    const validChildren = checkChildrenAreTR(children);

    if (!validChildren) {
        console.warn('Email.Table child should be <tr> element!');
    }

    return (
        <table
            width={width ? width : "100%"}
            style={combinedStyle}
            cellPadding={0}
            cellSpacing={0}
            border={0}
            role="presentation"
        >
            <tbody>
                {children}
            </tbody>
        </table>
    );
};

export default Table;
