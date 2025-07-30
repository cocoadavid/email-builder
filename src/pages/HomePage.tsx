import useFetch from '../hooks/useFetch.ts';

const HomePage = () => {
    const { data: emails, isPending, error } = useFetch('http://localhost:8000/emails');

    return ( 
    <div>
        <h1>HOME</h1>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        emailList: {emails.length > 0 ? emails.map((email, index) => (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h2>{email.projectName}</h2>
                <p>{email.wfNumber}</p>
            </div>
        )) : <p>No emails found.</p>}
    </div> 
    );
}
 
export default HomePage;