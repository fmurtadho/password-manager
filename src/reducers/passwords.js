const defaultState = {
    loading : false,
    error : false,
    passwords : [{
        url : 'default',
        username : 'default',
        password : 'default',
        createdAt : 'default',
        updatedAt : 'default'
    }]
}

const passwordsReducer = (state=defaultState, action) => {
    switch (action.type) {
        case 'FETCH_PASSWORDS_LOADING' :
            return {
                ...state,
                loading : true
            }

        case 'FETCH_PASSWORDS_ERROR' :
            return {
                ...state,
                loading : false,
                error : true
            }

        case 'FETCH_PASSWORDS_SUCCESS' :
            return {
                ...state,
                loading : false,
                error : false,
                passwords : action.payload
            }

        default : return state;
    }
}

export default passwordsReducer;