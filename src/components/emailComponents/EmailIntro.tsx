type EmailIntroProps = {
    bgColor?: string;
    textColor?: string;
    children?: React.ReactNode;
}

const EmailIntro = ({bgColor, children}: EmailIntroProps) => {
    return ( 
        <table width={"100%"} cellPadding="0" cellSpacing="0" role="presentation" bgcolor={bgColor || "#FFFFFF"} style={{borderCollapse: "collapse", width: "100%", background: bgColor || "#FFFFFF"}}>
            <tbody>
                <tr>
                    <td className="text-14" style={{padding: "24px 24px 24px 24px"}}>
                        {children}
                    </td>
                </tr>
            </tbody>
        </table>
     );
}
 
export default EmailIntro;