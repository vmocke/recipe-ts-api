import React, { useEffect, Suspense, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import * as actionsAuth from './store/actions/actionsAuth';
import * as actionsLikesItems from './store/actions/actionsLikesItems';
import Auth from './containers/Auth/Auth';
import { fire } from './axios-export';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';
import { AppState } from '.';
import MainPage from './containers/MainPage/MainPage';
import Logout from './containers/Auth/Logout/Logout';

/*const MainPage = React.lazy(() => {
    return import('./containers/MainPage/MainPage');
});
const Logout = React.lazy(() => {
    return import('./containers/Auth/Logout/Logout');
});*/

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
            <Route path="/login" component={Auth} />
            <Redirect to="/login" />
        </React.Fragment>
    );

    if (isAuthenticated_) {
        routes = (
            <React.Fragment>
                <Route path="/home" component={MainPage} />
                <Route path="/logout" component={Logout} />
                <Route path="/login" component={Auth} />
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
