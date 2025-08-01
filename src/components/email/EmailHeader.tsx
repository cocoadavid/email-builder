import emailHeaderImage from '@/assets/emailheader.jpg';

type EmailHeaderProps = {
    imgUrl: string;
    altText?: string;
}

const EmailHeader = ({ imgUrl, altText }: EmailHeaderProps) => {
    return (
        <table width="100%" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody>
                <tr>
                    <td align="center">
                        <img
                            src={imgUrl || emailHeaderImage}
                            alt={altText || "Email Header Image"}
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                height: 'auto',
                                display: 'block',
                            }}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default EmailHeader;