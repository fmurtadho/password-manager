import '../test-setup'
import store from '../store'

describe('passwords reducer',()=>{
    it('loading and error should be falsy when app initiated',()=>{
        const {loading,error} = store.getState().passwordsReducer
        expect(loading).toBeFalsy()
        expect(error).toBeFalsy()
    })

    it('all value of state property password should be default',()=>{
        const {passwords} = store.getState().passwordsReducer
        expect(passwords[0].url).toMatch('default')
        expect(passwords[0].username).toMatch('default')
        expect(passwords[0].password).toMatch('default')
        expect(passwords[0].createdAt).toMatch('default')
        expect(passwords[0].updatedAt).toMatch('default')
    })

    it('loading should be true when FETCH_PASSWORDS_LOADING dispatched',()=>{
        store.dispatch({type : 'FETCH_PASSWORDS_LOADING'})
        const {loading} = store.getState().passwordsReducer
        expect(loading).toBeTruthy()
    })

    it('error should be true when FETCH_PASSWORDS_ERROR dispatched',()=>{
        store.dispatch({type : 'FETCH_PASSWORDS_ERROR'})
        const {loading,error} = store.getState().passwordsReducer
        expect(loading).toBeFalsy()
        expect(error).toBeTruthy()
    })

    it('error and loading should be false when FETCH_PASSWORDS_SUCCESS dispatched',()=>{
        store.dispatch({type : 'FETCH_PASSWORDS_SUCCESS', payload : [{url : 'data',username : 'data',password : 'data',createdAt : 'data',updatedAt : 'data'}]})
        const {loading,error,passwords} = store.getState().passwordsReducer
        expect(loading).toBeFalsy()
        expect(error).toBeFalsy()
        expect(passwords).toHaveLength(1)
    })
})