import firebase from '../firebase'

export default function(email,password, history) {
    return (dispatch) => {
        dispatch({type : 'LOGIN_LOADING'})
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
            dispatch({type : 'LOGIN_SUCCESS', payload : email})
            history.push('/');
        })
        .catch((error) => {
            dispatch({type : 'LOGIN_ERROR' , payload : String(error.message)})
        });
    }
}