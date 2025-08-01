import './email.css';

const Email = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px' } }>
      <p className='pink'><strong>WF Number:</strong> WF001</p>
      <p className='yellow'><strong>Email Type:</strong> oft</p>
      <p className='text-20'>SL: subject line</p>
      <p className='blue'>PT: preview text</p>
    </div>
  );
};

export default Email;
