const defaultState = {
    loading : false,
    error : false,
    user : '',
    isLogin : false,
    errorMessage : ''
}

const loginReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN_LOADING' : 
            return {
                ...state,
                loading : true
            }

        case 'LOGIN_ERROR' : 
            return {
                ...state,
                loading : false,
                error : true,
                errorMessage : action.payload
            }

        case 'LOGIN_SUCCESS' :
            return {
                loading : false,
                error : false,
                isLogin : true,
                user : action.payload
            }

        case 'LOGOUT' :
            return {
                ...state,
                isLogin : false,
                user : ''
            }

        default : return state
    }
}

export default loginReducer;