type WrapperProps = {
    children?: React.ReactNode;
    width?: string;
}

const Wrapper = ({ children, width }: WrapperProps) => {
    return (
        <table
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            style={{
                width: '100%',
                borderCollapse: 'collapse',
                margin: '0 auto',
                backgroundColor: "#f5f5f5",
                padding: "20px 0"
            }}>
            <tbody>
                <tr>
                    <td align="center">
                        <table
                            width="600"
                            cellPadding={0}
                            cellSpacing={0}
                            style={{
                                width: width || "600px",
                                backgroundColor: "#ffffff",
                                borderCollapse: "collapse",
                            }}
                        >
                            <tbody><tr><td>{children}</td></tr></tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Wrapper;