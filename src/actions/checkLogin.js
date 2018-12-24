import firebase from 'firebase'

export default (history) => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch({type : 'LOGIN_SUCCESS', payload : user.email})

                dispatch({type : 'FETCH_PASSWORDS_LOADING'})

                const db = firebase.firestore();

                let passwordsRef = db.collection("passwords").where("owner","==",user.email)

                passwordsRef.onSnapshot((passwords) => {
                    const datas = []
            
                    passwords.forEach((doc)=>{
                        let data = doc.data()
                        let obj = {
                            _id : doc.id,
                            ...data,
                        }

                        datas.push(obj)
                    })
                
                    dispatch({type : 'FETCH_PASSWORDS_SUCCESS' , payload : datas})
                })
                
            }else {
                history.push('/login')
            }
        });
    }
}