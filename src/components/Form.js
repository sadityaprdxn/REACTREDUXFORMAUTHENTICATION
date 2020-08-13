import React, { useState, useEffect, useRef } from 'react';
import '../scss/App.scss';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    useHistory
} from 'react-router-dom';
import backgroundImage from '../images/Ffootball1.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { addUser , loginUser} from '../redux/actions/actions';

const regex = {
    userName: /^([a-zA-Z]){2,10}$/,
    userEmail: /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/,
	userPassword: /((?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z])){4,15}/
}


const Form = () => {

    const unicode = useSelector(state => state.users[state.users.length - 1].id);
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    if(state.isUserLogin) {
        const userId = window.localStorage.getItem('loginUser');
        history.push(`/user/${userId}`);
    }

    const [signInFields , chnageSignInFieldsValue] = useState({
        signInUserEmail : { value : '' , status : null },
        signInPassword  : { value : '' , status : null }
    });
    
    const [signUpFields , chnageSignUpFieldsValue] = useState({
        signUpUserEmail : { value : '' , status : null },
        signUpUserName  : { value : '' , status : null },
        signUpPassword  : { value : '' , status : null }
    });

    const pannelControl = useRef();
    const formContainer = useRef();
    

    const onChangeHandler =  (field , value) => {
        if ( field.includes('signIn')) {

            let status = null ;

            if ( field.includes('Email')) {
                status =  value === "" ? null :  regex['userEmail'].test(value) ? ("success") : ("error");
            } else if ( field.includes('Password') ) {
                status =  value === "" ? null :  regex['userPassword'].test(value) ? ("success") : ("error");
            }

            chnageSignInFieldsValue((prevState) => {
                return {
                    ...prevState,
                    [field] : { 
                        value,
                        status
                    }
                }
            });
        }

        
        if ( field.includes('signUp')) {

            let status = null ;

            if ( field.includes('Email')) {
                status =  value === "" ? null :  regex['userEmail'].test(value) ? ("success") : ("error");
            } else if ( field.includes('Password') ) {
                status =  value === "" ? null :  regex['userPassword'].test(value) ? ("success") : ("error");
            } else if ( field.includes('Name') ) {
                status =  value === "" ? null :  regex['userName'].test(value) ? ("success") : ("error");
            }

            chnageSignUpFieldsValue((prevState) => {
                return {
                    ...prevState,
                    [field] : { 
                        value,
                        status
                    }
                }
            });
        }
    }

    const swipeForm = (value) => {
        if(value === 'signUp') {
            console.log('hey');
            pannelControl.current.className = 'pannel-container';
            formContainer.current.className = 'form-container';
        } else if(value === 'signIn') {
            console.log('hey');
            pannelControl.current.className = 'pannel-container active';
            formContainer.current.className = 'form-container active';
        }
    }

    const signUpUser = (e) => {
        e.preventDefault();
        const userNameStatus = signUpFields.signUpUserName.status;
        const userEmailStatus = signUpFields.signUpUserEmail.status;
        const userPasswordStatus = signUpFields.signUpPassword.status;
        if(userNameStatus === 'success' && userEmailStatus === 'success' && userPasswordStatus === 'success') {
            const uniqueId = unicode + 1;
            dispatch(addUser(signUpFields , uniqueId));
            window.localStorage.setItem('loginUser', uniqueId);
            history.push(`/user/${uniqueId}`);
        }
    }

    const signInUser = (e) => {
        e.preventDefault();
        const userEmail = signInFields.signInUserEmail;
        const userPassword = signInFields.signInPassword;

        if ( userPassword.status === 'success' && userEmail.status === 'success') {
            state.users.map(element => {
                if (element.email === userEmail.value && element.password === userPassword.value) {
                    dispatch(loginUser());
                    window.localStorage.setItem('loginUser', element.id);
                    history.push(`/user/${element.id}`);
                }
            });
        } else {
            chnageSignInFieldsValue((prevState) => {
                return {
                    signInUserEmail : { ...prevState.signInUserEmail, status : 'error' },
                    signInPassword  : { ...prevState.signInPassword , status : 'error' }
                }
            })
        }
    }

    useEffect(() => {
        window.localStorage.setItem('userData', JSON.stringify(state));
    },[]);

    return (
        <section className="banner">
            <div className="wrapper">
                <div className="background-image"  style={{background: `url(${backgroundImage})`}}>background image</div>
                <div className="form-section">
                    <div className="form-container" ref={formContainer}>
                        <form className="sign-in-form">
                            <h3>sign in</h3>

                            <div className="form-group" className={signInFields.signInUserEmail.status !== null ? (`form-group ${signInFields.signInUserEmail.status}`) : ("form-group")}>
                                <input 
                                    className="sign-in-email" 
                                    type="text" 
                                    value={signInFields.signInUserEmail.value} 
                                    placeholder="Enter Email" 
                                    onChange={ (e) => onChangeHandler('signInUserEmail', e.target.value)}
                                />
                                <a className="red" title="Red">red</a>
                                <span>please enter the valid email id or register first</span>
                            </div>

                            <div className="form-group" className={signInFields.signInPassword.status !== null ? (`form-group ${signInFields.signInPassword.status}`) : ("form-group")}>
                                <input 
                                    className="sig`n-in-password" 
                                    type="password" 
                                    value={signInFields.signInPassword.value} 
                                    placeholder="Enter Password" 
                                    onChange={ (e) => onChangeHandler('signInPassword', e.target.value)}
                                />
                                <a className="red" title="Red">red</a>
                                <span>password does not match</span>
                            </div>

                            <div className="form-controls">
                                <button className="sign-in" href="#FIXME" title="Sign In" onClick={signInUser}>sign in</button>
                            </div>
                        </form>
                        <form className="sign-up-form">
                            <h3>sign up</h3>

                            <div className="form-group" className={signUpFields.signUpUserName.status !== null ? (`form-group ${signUpFields.signUpUserName.status}`) : ("form-group")}>
                                <input 
                                    className="sign-up-name" 
                                    type="text" 
                                    data-regex="username_regex" 
                                    placeholder="Enter Username"
                                    value={signUpFields.signUpUserName.value} 
                                    onChange={ (e) => onChangeHandler('signUpUserName', e.target.value)}
                                />
                                <a className="green" title="Green">green</a>
                                <a className="red" title="Red">red</a>
                                <span>name must be in between 2-10 characters and it should not contain any numbers</span>
                            </div>

                            <div className="form-group" className={signUpFields.signUpUserEmail.status !== null ? (`form-group ${signUpFields.signUpUserEmail.status}`) : ("form-group")}>
                                <input 
                                    className="sign-up-email" 
                                    type="text" 
                                    data-regex="email_regex" 
                                    placeholder="Enter Email Id"
                                    value={signUpFields.signUpUserEmail.value} 
                                    onChange={ (e) => onChangeHandler('signUpUserEmail', e.target.value)}
                                />
                                <a className="green" title="Green">green</a>
                                <a className="red" title="Red">red</a>
                                <span>please enter the valid email id or email id already exist</span>
                            </div>

                            <div className="form-group" className={signUpFields.signUpPassword.status !== null ? (`form-group ${signUpFields.signUpPassword.status}`) : ("form-group")}>
                                <input 
                                    className="sign-up-password" 
                                    type="password" 
                                    data-regex="password_regex" 
                                    placeholder="Enter Password"
                                    value={signUpFields.signUpPassword.value} 
                                    onChange={ (e) => onChangeHandler('signUpPassword', e.target.value)}
                                />
                                <a className="green" title="Green">green</a>
                                <a className="red" title="Red">red</a>
                                <span>password must contain atleast one special character and number</span>
                            </div>

                            <div className="form-controls">
                                <button className="sign-up" href="#FIXME" title="Sign Up" onClick={signUpUser}>sign up</button>
                            </div>
                        </form>
                    </div>

                    <div className="pannel-container" ref={pannelControl}>
                        <a id="sign-up-button" title="Sign Up" onClick={() => swipeForm('signUp')}>sign up</a>
                        <a id="sign-in-button" title="Sign In" onClick={() => swipeForm('signIn')}>sign in</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Form;
