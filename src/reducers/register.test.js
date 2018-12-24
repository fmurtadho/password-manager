import '../test-setup'
import store from '../store'

describe('Register Reducer',()=>{
    it('expect loading,error and error message to have value false/empty when app initiated',()=>{
        const {loading,error,errorMessage} = store.getState().registerReducer
        expect(loading).toBeFalsy()
        expect(error).toBeFalsy()
        expect(errorMessage).toMatch('')
    })

    it('expect loading to be true when REGISTER_LOADING dispatched',()=>{
        store.dispatch({
            type : 'REGISTER_LOADING'
        })
        const {loading} = store.getState().registerReducer
        expect(loading).toBeTruthy()
    })

    it('expect error to be true when REGISTER_ERROR dispatched',()=>{
        store.dispatch({
            type : 'REGISTER_ERROR',
            payload : 'Registration Failed'
        })
        const {loading,error,errorMessage} = store.getState().registerReducer
        expect(loading).toBeFalsy()
        expect(error).toBeTruthy()
        expect(errorMessage).toMatch('Registration Failed')
    })

    it('expect error and loading to be falsy when REGISTER_SUCCESS dispatched',()=>{
        store.dispatch({
            type : 'REGISTER_SUCCESS'
        })
        const {loading,error} = store.getState().registerReducer
        expect(loading).toBeFalsy()
        expect(error).toBeFalsy()
    })

})