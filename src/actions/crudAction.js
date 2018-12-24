import firebase from '../firebase'
const db = firebase.firestore();

export function create(value){
    db.collection("passwords").add(value)
    return {type : 'RESET_HOME_FORM'}
}

export function deleteDoc(id){
    db.collection("passwords").doc(id).delete()
        .then(function() {
            console.log("Document successfully deleted!");
            return null
        })
        .catch(function(error) {
            console.error("Error removing document: ", error);
        });
}

export function findOne(id){
    return (dispatch) => {
        dispatch({type : 'FORM_LOADING'})
        dispatch({type : 'ENTER_EDIT'})
        db.collection("passwords").doc(id).get()
        .then(function(querySnapshot) {
            const data = querySnapshot.data()

            let obj = {
                _id :querySnapshot.id,
                ...data
            }

            dispatch({type : 'SET_HOME_FORM', payload : obj})
            dispatch({type : 'FORM_SUCCESS'})
        })
        .catch(function(error) {
            dispatch({type : 'FORM_ERROR'})
            console.log("Error getting documents: ", error);
        });
    }
}

export function update(id,value){
    return (dispatch) => {
        dispatch({type : 'FORM_LOADING'})
        db.collection("passwords").doc(id).set(value)
        .then(()=> {
            dispatch({type : 'EXIT_EDIT'})
            dispatch({type:'RESET_HOME_FORM'})
            dispatch({type : 'FORM_SUCCESS'})
        })
        .catch((error)=>{
            console.log('UPDATE ERROR',error)
            dispatch({type : 'FORM_ERROR'})
        })
    }
}