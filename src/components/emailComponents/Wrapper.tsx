type WrapperProps = {
  children: React.ReactNode;
  width?: number;
};

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
        backgroundColor: '#eeeeee',
      }}
    >
      <tbody>
        <tr>
          <td align="center">
            <table
              width={width || "600"}
              cellPadding={0}
              cellSpacing={0}
              className="drop-shadow-xl full-width-mobile"
              style={{
                width: `${width}px` || '600px',
                backgroundColor: '#ffffff',
                borderCollapse: 'collapse',
              }}
            >
              <tbody>
                <tr>
                  <td>{children}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Wrapper;