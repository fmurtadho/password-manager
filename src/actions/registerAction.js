import firebase from '../firebase'

export default function(email, password, history) {
    return (dispatch) => {
        dispatch({type : 'REGISTER_LOADING'})
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
            dispatch({type : 'REGISTER_SUCCESS'})
            history.push('/login');
        })
        .catch((error) => {
            dispatch({type : 'REGISTER_ERROR' , payload : error.message})
        });
    }
}