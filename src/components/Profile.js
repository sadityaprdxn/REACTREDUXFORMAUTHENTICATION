import React, { useState, useEffect, useRef } from 'react';
import '../scss/App.scss';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    useHistory,
    useParams
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser , logoutUser } from '../redux/actions/actions';
import  background  from '../images/Ffootball2.jpg';


const regex = {
    name: /^([a-zA-Z]){2,10}$/,
    email: /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/,
    password: /((?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z])){4,15}/,
    mobile: /^([0-9]){10}$/
}


const Profile = () => {

    const params = useParams();
    const history = useHistory();
    const user = useSelector(state=>state.users[parseInt(params.id)]);
    const state = useSelector(state=>state);
    const dispatch = useDispatch();

    const [updatedSuccessfully, changeStatus] = useState(false);
    const [edit , changeEdit] = useState(false);
    const [updateFields, chnageValue] = useState({
        name     : { value : user.name , status : 'success' },
        email    : { value : user.email , status : 'success' },
        password : { value : user.password , status : 'success' },
        mobile   : { value : user.mobile , status : user.mobile ? 'success' : null }
    });

    const onChangeHandler = (field, value) => {

        let status = null ;

        if ( field === 'name') {
            status =  value === "" ? null :  regex['name'].test(value) ? ("success") : ("error");
        } else if ( field === 'email') {
            status =  value === "" ? null :  regex['email'].test(value) ? ("success") : ("error");
        } else if ( field === 'password') {
            status =  value === "" ? null :  regex['password'].test(value) ? ("success") : ("error");
        } else if ( field === 'mobile') {
            status =  value === "" ? null :  regex['mobile'].test(value) ? ("success") : ("error");
        }

        chnageValue((prevState) => {
            return(
                {
                    ...prevState,
                    [field] : {
                        value,
                        status
                    }
                }
            )
        });
    }

    const updateHandler = (e) => {
        e.preventDefault();
        if(updateFields.name.status === 'success' && updateFields.email.status === 'success' && updateFields.password.status === 'success' && (updateFields.mobile.status === 'success' || updateFields.mobile.status === null)) {
            debugger;
            console.log(updateFields);
            dispatch(updateUser(updateFields, params.id));
            changeStatus(true);
            changeEdit(false);
        }
    }

    const editUser = () => { 
        changeEdit(true);
        changeStatus(false);
    }

    const logoutHandler = () => {
        window.localStorage.setItem('loginUser', false);
        dispatch(logoutUser());
        history.push('/');
    }

    useEffect(() => {
        window.localStorage.setItem('userData' , JSON.stringify(state));
    }, [updatedSuccessfully])

    return (
        <section className='profile'>
            <div className='wrapper'>
                <div className='user' style={{backgroundImage: `url(${background})`}}>
                    <figure>
                        <img src='https://via.placeholder.com/150x150' alt="Profile Picture"/>
                    </figure>
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    <a href='#FIXME' id='edit' onClick={editUser}>edit profile</a>
                    <a href='#FIXME' id='logout' onClick={logoutHandler}>logout</a>
                </div>

                <div className={edit ? 'update-user active' : 'update-user'}>
                    <form>
                        <div className="form-group" className={updateFields.name.status !== null ? (`form-group ${updateFields.name.status}`) : ("form-group")}>
                            <label>Name :</label>
                            <input 
                                className="name"
                                type="text" 
                                value={updateFields.name.value} 
                                placeholder="Update Name"
                                onChange={ (e) => onChangeHandler('name', e.target.value)}
                            />
                            <a className="red" title="Red">red</a>
                            <a className="green" title="Green">green</a>
                            <span>please enter the valid name</span>
                        </div>
                        <div className="form-group" className={updateFields.email.status !== null ? (`form-group ${updateFields.email.status}`) : ("form-group")}>
                            <label>Email :</label>
                            <input 
                                className="email"
                                type="text" 
                                value={updateFields.email.value} 
                                placeholder="Update Email"
                                onChange={ (e) => onChangeHandler('email', e.target.value)}
                            />
                            <a className="red" title="Red">red</a>
                            <a className="green" title="Green">green</a>
                            <span>please enter the valid email id or register first</span>
                        </div>
                        <div className="form-group" className={updateFields.password.status !== null ? (`form-group ${updateFields.password.status}`) : ("form-group")}>
                            <label>Password :</label>
                            <input 
                                className="password"
                                type="text" 
                                value={updateFields.password.value} 
                                placeholder="update password"
                                onChange={ (e) => onChangeHandler('password', e.target.value)}
                            />
                            <a className="red" title="Red">red</a>
                            <a className="green" title="Green">green</a>
                            <span>please enter the valid password</span>
                        </div>
                        <div className="form-group" className={updateFields.mobile.status !== null ? (`form-group ${updateFields.mobile.status}`) : ("form-group")}>
                            <label>Mobile No:</label>
                            <input 
                                className="mobile"
                                type="text" 
                                value={updateFields.mobile.value} 
                                placeholder="Enter Mobile"
                                onChange={ (e) => onChangeHandler('mobile', e.target.value)}
                            />
                            <a className="red" title="Red">red</a>
                             <a className="green" title="Green">green</a>
                            <span>please enter the valid mobile</span>
                        </div>
                        <div className='form-controls'>
                            <button onClick={updateHandler}>update</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Profile;