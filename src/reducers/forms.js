const defaultState = {
    loading : false,
    error : false,
    editMode : false,
    home : {
        _id : '',
        url : '',
        username : '',
        password : '',
        createdAt : '',
        updatedAt : ''
    }
}

const formsReducer = (state=defaultState , action) => {
    switch (action.type) {
        case 'FORM_LOADING' : 
            return {
                ...state,
                loading : true
            }

        case 'FORM_SUCCESS' : 
            return {
                ...state,
                error : false,
                loading : false
            }
        
        case 'FORM_ERROR' :
            return {
                ...state,
                loading : false,
                error : true
            }

        case 'UPDATE_HOME_FORM' :
            return {
                ...state,
                home : {
                    ...state.home,
                    [action.target] : action.payload
                }
            }

        case 'RESET_HOME_FORM' :
            return {
                editMode : false,
                loading : false,
                error : false,
                home : {
                    _id : ' ',
                    url : ' ',
                    username : ' ',
                    password : ' ',
                    createdAt : ' ',
                    updatedAt : ' '
                }
            }

        case 'SET_HOME_FORM' :
            return {
                ...state,
                loading : false,
                home : action.payload
            }


        case 'ENTER_EDIT' : 
            return {
                ...state,
                editMode : true
            }

        case 'EXIT_EDIT' : 
            return {
                ...state,
                editMode : false
            }
        
        default : return state
    }
}

export default formsReducer;

