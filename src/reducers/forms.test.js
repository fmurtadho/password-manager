// import Enzyme, { shallow, mount } from 'enzyme';

import '../test-setup'
import store from '../store'

describe('forms reducer',() => {
    const {loading,error,editMode,home} = store.getState().formsReducer
    const form = store.getState().formsReducer

    it('expect loading, error and edit mode to be falsy when app initiated',() => {
        expect(loading).toBeFalsy()
        expect(error).toBeFalsy()
        expect(editMode).toBeFalsy()
    })

    it('expect all property of home state to be empty when app initiated',()=>{
        expect(home._id).toMatch('')
        expect(home.url).toMatch('')
        expect(home.username).toMatch('')
        expect(home.password).toMatch('')
        expect(home.createdAt).toMatch('')
        expect(home.updatedAt).toMatch('')
    })

    it('expect loading to be truthy when form_loading dispatched',()=>{
        store.dispatch({
            type : 'FORM_LOADING'
        })
        const {loading} = store.getState().formsReducer
        expect(loading).toBeTruthy()
    })

    it('expect loading to be falsy when form_error dispatched',()=>{
        store.dispatch({
            type : 'FORM_ERROR'
        })
        const {loading,error} = store.getState().formsReducer
        expect(loading).toBeFalsy()
        expect(error).toBeTruthy()
    })

    it('expect loading and error to be falsy when form_success dispatched',()=>{
        store.dispatch({
            type : 'FORM_SUCCESS'
        })
        const {loading,error} = store.getState().formsReducer
        expect(loading).toBeFalsy()
        expect(error).toBeFalsy()
    })

    it('expect home property to be updated when UPDATE_HOME_FORM dispatcher',()=>{
        store.dispatch({
            type : 'UPDATE_HOME_FORM',
            target : '_id',
            payload : 'updated_id'
        })
        
        store.dispatch({
            type : 'UPDATE_HOME_FORM',
            target : 'url',
            payload : 'updatedUrl'
        })

        store.dispatch({
            type : 'UPDATE_HOME_FORM',
            target : 'username',
            payload : 'updatedUsername'
        })

        store.dispatch({
            type : 'UPDATE_HOME_FORM',
            target : 'password',
            payload : 'updatedPassword'
        })

        store.dispatch({
            type : 'UPDATE_HOME_FORM',
            target : 'createdAt',
            payload : 'updatedCreatedAt'
        })

        store.dispatch({
            type : 'UPDATE_HOME_FORM',
            target : 'updatedAt',
            payload : 'updatedUpdatedAt'
        })

        const {home} = store.getState().formsReducer

        expect(home._id).toMatch('updated_id')
        expect(home.url).toMatch('updatedUrl')
        expect(home.username).toMatch('updatedUsername')
        expect(home.password).toMatch('updatedPassword')
        expect(home.createdAt).toMatch('updatedCreatedAt')
        expect(home.updatedAt).toMatch('updatedUpdatedAt')
    })

    it('expect home property value to be replaced when SET_HOME_FORM dispatched',()=>{
        let obj = {
            _id : 'set',
            url : 'set',
            username : 'set',
            password : 'set',
            createdAt : 'set',
            updatedAt : 'set'
        }

        store.dispatch({
            type : 'SET_HOME_FORM',
            payload : obj
        })

        const {home} = store.getState().formsReducer

        expect(home._id).toMatch('set')
        expect(home.url).toMatch('set')
        expect(home.username).toMatch('set')
        expect(home.password).toMatch('set')
        expect(home.createdAt).toMatch('set')
        expect(home.updatedAt).toMatch('set')
    })

    it('expect all state to return to default state when RESET_HOME_FORM dispatched',()=>{
        store.dispatch({
            type : 'RESET_HOME_FORM'
        })
        const form = store.getState().formsReducer

        expect(form.loading).toBeFalsy()
        expect(form.error).toBeFalsy()
        expect(form.editMode).toBeFalsy()
        expect(form.home._id).toMatch('')
        expect(form.home.url).toMatch('')
        expect(form.home.username).toMatch('')
        expect(form.home.password).toMatch('')
        expect(form.home.createdAt).toMatch('')
        expect(form.home.updatedAt).toMatch('')
    })

    it('expect edit mode to be truthy when ENTER_EDIT dispatched',()=>{
        store.dispatch({
            type : 'ENTER_EDIT'
        })
        const {editMode} = store.getState().formsReducer
        expect(editMode).toBeTruthy()
    })

    it('expect edit mode to be falsy when EXIT_EDIT dispatched',()=>{
        store.dispatch({
            type : 'EXIT_EDIT'
        })
        const {editMode} = store.getState().formsReducer
        expect(editMode).toBeFalsy()
    })

})