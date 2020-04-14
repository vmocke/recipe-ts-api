import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';
import { AxiosInstance } from 'axios';

const withErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {
    return (props: any) => {
        const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);

        return (
            <React.Fragment>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? <h1>Something went wrong...</h1> : null}
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    };
};

export default withErrorHandler;
