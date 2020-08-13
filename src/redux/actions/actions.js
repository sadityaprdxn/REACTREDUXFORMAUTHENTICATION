
const addUser = (userData , unicode) => {
    return {
        type : 'ADD_USER',
        payLoad : {
            name     : userData.signUpUserName.value,
            email    : userData.signUpUserEmail.value,
            password : userData.signUpPassword.value,
            id       : unicode
        }
    }
}

const updateUser = (userData , unicode) => {
    return {
        type : 'UPDATE_USER',
        payLoad : {
            name     : userData.name.value,
            email    : userData.email.value,
            password : userData.password.value,
            mobile   : userData.mobile.value,
            id       : unicode
        }
    }
}

const loginUser = () => {
    return {
        type : 'LOGIN_USER'
    }
}

const logoutUser = () => {
    return {
        type : 'LOGOUT_USER'
    }
}

export {addUser, updateUser, logoutUser , loginUser};