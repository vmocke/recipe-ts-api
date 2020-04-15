import React, { useEffect, Suspense, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import * as actionsAuth from './store/actions/actionsAuth';
import * as actionsLikesItems from './store/actions/actionsLikesItems';
import { fire } from './axios-export';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';
import { AppState } from '.';

const MainPage = React.lazy(() => import('./containers/MainPage/MainPage'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const App = () => {
    const isAuthenticated_ = useSelector((state: AppState) => state.reducer_Auth.token !== null);
    const token_ = useSelector((state: AppState) => state.reducer_Auth.token);
    const userId_ = useSelector((state: AppState) => state.reducer_Auth.userId);

    const dispatch = useDispatch();
    const on_Try_Auto_Signup = useCallback(() => dispatch(actionsAuth.authCheckState()), [dispatch]);
    const on_Fetch_Likes_Items_List = useCallback(
        (token, userId) => dispatch(actionsLikesItems.fetchLikesItemsList(token, userId)),
        [dispatch],
    );

    useEffect(() => {
        on_Try_Auto_Signup();
        if (token_ && userId_) {
            on_Fetch_Likes_Items_List(token_, userId_);
        }
    }, [on_Fetch_Likes_Items_List, on_Try_Auto_Signup, token_, userId_]);

    let routes = (
        <React.Fragment>
            <Route path="/login" render={(props: any) => <Auth {...props} />} />
            <Redirect to="/login" />
        </React.Fragment>
    );

    if (isAuthenticated_) {
        routes = (
            <React.Fragment>
                <Route path="/home" render={(props: any) => <MainPage {...props} />} />
                <Route path="/logout" render={(props: any) => <Logout {...props} />} />
                <Route path="/login" render={(props: any) => <Auth {...props} />} />
                <Redirect to="/home" />
            </React.Fragment>
        );
    }

    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </div>
    );
};

export default withRouter(withErrorHandler(App, fire));
