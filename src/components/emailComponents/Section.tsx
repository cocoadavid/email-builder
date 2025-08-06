type SectionProps = {
    html?: string;
    children?: React.ReactNode;
    bgColor?: string;
    classes?: string;
}

const Section = ({ html, children, bgColor, classes }: SectionProps) => {
    if (html) {
        return (<section style={{ margin: 0, padding: 0 }}>
            <table width={"100%"} cellPadding="0" cellSpacing="0" role="presentation" bgcolor={bgColor || "#FFFFFF"} style={{ borderCollapse: "collapse", width: "100%", background: bgColor || "#FFFFFF" }}>
                <tbody>
                    <tr>
                        <td dangerouslySetInnerHTML={{ __html: html }} className={`section${classes ? ' ' + classes : ''}`}
                        >
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        )
    }
    return (
        <section style={{ margin: 0, padding: 0 }}>
            <table width={"100%"} cellPadding="0" cellSpacing="0" role="presentation" bgcolor={bgColor || "#FFFFFF"} style={{ borderCollapse: "collapse", width: "100%", background: bgColor || "#FFFFFF" }}>
                <tbody>
                    <tr>
                        <td className={`section${classes ? ' ' + classes : ''}`}>
                            {children}
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

export default Section;