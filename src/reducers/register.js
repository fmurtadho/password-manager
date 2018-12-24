const defaultState = {
    loading : false,
    error : false,
    errorMessage : ''
}

const registerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'REGISTER_LOADING' :
            return {
                loading : true,
                error : false,
                errorMessage : ''
            }
        
        case 'REGISTER_SUCCESS' :
            return {
                loading : false,
                error : false,
                errorMessage : ''
            }

        case 'REGISTER_ERROR' :
            return {
                loading : false,
                error : true,
                errorMessage : String(action.payload)
            }

        default : return state
    }
}

export default registerReducer;