// import Enzyme, { shallow} from 'enzyme';
import '../test-setup'
import store from '../store'

describe("login reducer",() => {
    it('all value must be falsy and empty when app initiated',()=>{
        const login = store.getState().loginReducer
        expect(login.loading).toBeFalsy()
        expect(login.error).toBeFalsy()
        expect(login.user).toMatch('')
        expect(login.isLogin).toBeFalsy()
        expect(login.errorMessage).toMatch('')
    })

    it('loading must be true when LOGIN_LOADING dispatched',()=>{
        store.dispatch({
            type : 'LOGIN_LOADING'
        })
        const {loading} = store.getState().loginReducer
        expect(loading).toBeTruthy()
    })

    it('loading must be false and error true when LOGIN_ERROR dispatched',()=>{
        store.dispatch({
            type : 'LOGIN_ERROR'
        })
        const {loading,error} = store.getState().loginReducer
        expect(loading).toBeFalsy()
        expect(error).toBeTruthy()
    })

    it('isLogin must be true and user will be update to logged in user email when LOGIN_SUCCESS dispatched',()=>{
        store.dispatch({
            type : 'LOGIN_SUCCESS',
            payload : 'test@mail.com'
        })

        const {loading,error,user,isLogin} = store.getState().loginReducer
        expect(loading).toBeFalsy()
        expect(error).toBeFalsy()
        expect(isLogin).toBeTruthy()
        expect(user).toMatch('test@mail.com')
    })

    it('isLogin must be false and user back to empty when LOGOUT dispatched',()=>{
        store.dispatch({
            type : 'LOGOUT',
        })

        const {user,isLogin} = store.getState().loginReducer

        expect(isLogin).toBeFalsy()
        expect(user).toMatch('')
    })

})