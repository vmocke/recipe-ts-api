import { useState, useEffect } from 'react';

interface httpClientProps {
    interceptors: any;
}

export default (httpClient: httpClientProps) => {
    const [error, setEror] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use((req: any) => {
        setEror(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(
        (res: any) => res,
        (err: any) => {
            setEror(err);
        },
    );

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [httpClient.interceptors.request, httpClient.interceptors.response, reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setEror(null);
    };

    return [error, errorConfirmedHandler];
};
