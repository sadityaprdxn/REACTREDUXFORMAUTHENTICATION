const dbState =  JSON.parse(window.localStorage.getItem('userData'));

const initialState = dbState ? dbState : {
    users : [
        {
            name : 'aditya',
            email : 'addisawant1001@gmail.com',
            password : 'success123@addi',
            id : 0
        }
    ],

    isUserLogin : false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                users : [
                    ...state.users,
                    action.payLoad
                ],
                isUserLogin : true
            }

        case 'UPDATE_USER' : 
        return {
            ...state,
            users : 
                state.users.map(elemnet => {
                    if(elemnet.id == action.payLoad.id) {
                        return action.payLoad;
                    } else {
                        return elemnet;
                    }
                })
        }

        case 'LOGIN_USER' : 
        return {
            ...state,
            isUserLogin : true
        }

        case 'LOGOUT_USER' :
        return {
            ...state,
            isUserLogin : false
        }
    
        default:
            return state;
    }
}

export {userReducer};