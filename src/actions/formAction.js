import { dispatch } from "rxjs/internal/observable/range";


export function updateForm(target,value){
    return {type:'UPDATE_HOME_FORM', target : target, payload : value}
}

// export function enterEditMode(){
//     return {type : 'ENTER_EDIT'}
// }

export function exitEditMode(){
    return (dispatch) => {
        dispatch({type : 'EXIT_EDIT'})
        dispatch({type : 'RESET_HOME_FORM'})
    }
}