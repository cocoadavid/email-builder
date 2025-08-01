import { useState, useEffect } from "react";
import type { Email } from "../types/email.type";

const useFetch = (url: string) => {
    const [data, setData] = useState<Email[] | []>([]);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(url, {signal: abortCont.signal})
            .then(res => {
            if(!res.ok){
                throw Error('Could not fetch the data.');
            }
            return res.json();
            })
            .then(data => {
            setData(data);
            setIsPending(false);
            setError(null);
            })
            .catch((err) => {
                if(err.name === 'AbortError'){
                    console.log("fetch aborted")
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            })

        return () => abortCont.abort();
    }, [url]);

    return {data, isPending, error}
}

export default useFetch;