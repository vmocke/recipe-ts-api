import React, { useState, useEffect, useCallback } from 'react';
import classes from './Auth.module.css';
import { updateObject, checkValidity } from '../../shared/utility';
import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';
import SVGIcon from '../../assets/img/SVGIcon';
import { useSelector, useDispatch } from 'react-redux';
import * as actionsAuth from '../../store/actions/actionsAuth';
import { Redirect } from 'react-router-dom';
import SpinnerBig from '../../components/UI/SpinnerBig/SpinnerBig';
import { AppState } from '../../index';

const Auth = () => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email address',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
        },
    });
    const [isSignup, setIsSignup] = useState(true);

    const spinner_ = useSelector((state: AppState) => state.reducer_Auth.spinner);
    const error_ = useSelector((state: AppState) => state.reducer_Auth.error);
    const isAuthenticated_ = useSelector((state: AppState) => state.reducer_Auth.token !== null);
    const authRedirectPath_ = useSelector((state: AppState) => state.reducer_Auth.authRedirectPath);

    const dispatch = useDispatch();
    const on_Auth = (email_: string, password_: string, isSignup_: boolean) =>
        dispatch(actionsAuth.auth(email_, password_, isSignup_));
    const on_Set_Auth_Redirect_Path = useCallback(() => dispatch(actionsAuth.setAuthRedirectPath('/home')), [dispatch]);

    useEffect(() => {
        return () => {
            if (authRedirectPath_ !== '/home') {
                on_Set_Auth_Redirect_Path();
            }
        };
    }, [authRedirectPath_, on_Set_Auth_Redirect_Path]);

    const inputChangedHandler = (e: { preventDefault: () => void; target: { value: string } }, controlName: any) => {
        e.preventDefault();

        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: e.target.value,
                valid: checkValidity(e.target.value, controls[controlName].validation),
                touched: true,
            }),
        });
        setControls(updatedControls);
    };

    const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        on_Auth(controls.email.value, controls.password.value, isSignup);
    };

    const switchAuthModeHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setIsSignup(!isSignup);
    };

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key],
        });
    }

    let form = formElementsArray.map((formElement) => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(e: any) => inputChangedHandler(e, formElement.id)}
        />
    ));

    let formElement = (
        <React.Fragment>
            <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

            <form onSubmit={submitHandler}>{form}</form>

            <div className={classes.Button}>
                <Button
                    classNameDiv="headerLogout"
                    classNameButton="btnSmall"
                    onClick={(e: any) => {
                        switchAuthModeHandler(e);
                    }}
                >
                    <span>{isSignup ? 'Switch To Login' : 'Switch To Sign Up'}</span>
                    <SVGIcon name="icon-triangle-right" className="search__icon" fill="#fff" />
                </Button>
                <Button
                    classNameDiv="headerLogout"
                    classNameButton="btnSmall"
                    onClick={(e: any) => {
                        submitHandler(e);
                    }}
                >
                    <span>{isSignup ? 'Sign Up' : 'Login'}</span>
                    <SVGIcon name="icon-triangle-right" className="search__icon" fill="#fff" />
                </Button>
            </div>
        </React.Fragment>
    );

    let errorMessage = null;
    if (error_) {
        errorMessage = <p>{error_.message}</p>;
    }

    let authRedirect = null;
    if (isAuthenticated_) {
        authRedirect = <Redirect to={authRedirectPath_} />;
    }

    return (
        <React.Fragment>
            {spinner_ ? (
                <SpinnerBig />
            ) : (
                <div className={classes.Auth}>
                    {errorMessage}
                    {authRedirect}
                    {formElement}
                </div>
            )}
        </React.Fragment>
    );
};

export default Auth;
