import firebase from '../firebase.js'

export default () => {
    return (dispatch) => {
        firebase
        .auth()
        .signOut()
        .then((result) => {
            dispatch({
                type: 'LOGOUT'
            });
        }).catch((err) => {
            console.log('log out error',err);
        });
 
    }
    
}