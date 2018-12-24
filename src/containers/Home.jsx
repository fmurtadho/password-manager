// MODULES
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import moment from 'moment'
import matchSorter from 'match-sorter'
import eyeLoading from '../eyeLoading.gif'

// CONTEXT
// import {Context} from '../MyProvider'

// COMPONENTS
import Input from '../components/form/Input'
import Button from '../components/Button'
import Thumbnail from '../components/LogoThumbnail'
import ValidationList from '../components/ValidationList'

// ACTIONS
import checkLogin from '../actions/checkLogin.js'
import fetchPasswords from '../actions/passwordsAction.js'
import {updateForm,exitEditMode} from '../actions/formAction.js'
import {create,deleteDoc,findOne,update} from '../actions/crudAction.js'
import Validation from '../components/ValidationList';

class Home extends Component {
    constructor(props) {
      super(props)
    }
    
    handleUrl = (e) => {
      this.props.updateForm('url',e.target.value);
    }

    handleUsername = (e) => {
      this.props.updateForm('username',e.target.value);
    }

    handlePassword = (e) => {
      this.props.updateForm('password',e.target.value);
    }

    handleFormAdd = (e) => {
      e.preventDefault();
      
      const {url,username,password} = this.props
      const owner = this.props.user

      let obj = {
        owner,
        url,
        username,
        password,
        createdAt : moment().format('DD/MM/YYYY HH:mm'),
        updatedAt : moment().format('DD/MM/YYYY HH:mm')
      }
      this.props.createDoc(obj)
      
    }

    componentDidMount = () => {
      this.props.checkLogin(this.props.history)
      this.props.fetchPasswords()
    }

    passwordContainLowercase = () => {
      return (/[a-z]/.test(this.props.password));
    }

    passwordContainUppercase = () => {
      return (/[A-Z]/.test(this.props.password));
    }

    passwordContainSpecialChar = () => {
      return /[$-/:-?{-~!"^_`\[\]]/.test(this.props.password);
    }

    passwordContainDigit = () => {
      return /\d/.test(this.props.password);
    }

    passwordMinLength = () => {
      const pwd = this.props.password
      if(pwd.length > 5){
        return true
      }else{
        return false
      }
    }

    handleEdit = (id) => {
      this.props.findOne(id)
    }

    handleCancelEdit = () => {
      this.props.exitEditMode()
    }

    handleFormSave = (e) => {
      e.preventDefault();

      let obj = {
        ...this.props.home_form,
        updatedAt : moment().format('DD/MM/YYYY HH:mm')
      }

      this.props.submitUpdate(obj._id,obj)
    }
    
    handleDelete = (id) => {
      deleteDoc(id)
    }

    render() {
      const {url,username,password} = this.props
      const {passwords} = this.props
      const columns = [
        {name : 'URL', Header : 'URL', accessor : 'url', filterAll: true},
        {name : 'USERNAME' , Header : 'USERNAME', accessor : 'username',filterAll: true},
        {name : 'PASSWORD',Header:'PASSWORD',accessor:'password',filterAll: true},
        {name : 'CREATED AT',Header : 'CREATED AT',accessor:'createdAt',filterAll: true},
        {name : 'UPDATED AT',Header : 'UPDATED AT',accessor : 'updatedAt',filterAll: true},
        {
          name : 'ACTIONS',
          filterable : false,
          Header : 'ACTIONS',
          Cell : doc => (
            <div className="row d-flex justify-content-center">
              <button
                data-toggle="tooltip"
                title="Edit Document"
                style={{cursor:'pointer'}} 
                onClick={() => this.handleEdit(doc.row._original._id)} 
                className="btn-sm btn-outline-elegant">
                Edit <i className="fas fa-edit"></i>
              </button>
              <button
                data-toggle="tooltip"  
                title="Delete"
                style={{cursor:'pointer'}} 
                onClick={() => this.handleDelete(doc.row._original._id)} 
                className="btn-sm btn-outline-danger ml-1">
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
          )
        }
      ]
      const cardBorder = {
        ['border-style'] : 'solid',
        ['border-width'] : '1px',
        ['border-color'] : 'black'
      }
      const logo = `https://logo.clearbit.com/${url}`
      
      // PASSWORD STRENGTH
      const validations = [this.passwordContainDigit(),this.passwordContainLowercase(),this.passwordContainSpecialChar(),this.passwordContainUppercase(),this.passwordMinLength()]
      let strength = 0;
      validations.forEach(validation => {
        if(validation){
          strength += 20
        }
      })
      let meterClass = ''
      let meterStatus = ''
      const meter = `${strength}%`
      if(strength <= 40){
        meterClass = 'progress-bar bg-danger'
        meterStatus = 'very weak'
      }else if(strength === 60){
        meterClass = 'progress-bar bg-warning'
        meterStatus = 'weak'
      }else if(strength === 80){
        meterClass = 'progress-bar bg-info'
        meterStatus = 'good'
      }else if(strength === 100){
        meterClass = 'progress-bar bg-success'
        meterStatus = 'strong'
      }
      

      let formHandler = this.handleFormAdd
      if(this.props.editMode){
        formHandler = this.handleFormSave
      }

      let unaddable = true
      if(strength === 100){
        unaddable = false
      }
      
      return (
        <div className="container mt-3 mb-3">
          <div className="row">
            <div className="col-sm-12">
              <div className="card mb-3 z-depth-2" style={cardBorder}>
                <div className="card-body">
                {this.props.loading ? (
                  <div className="row d-flex justify-content-center">
                    <img className="mx-auto" src={eyeLoading} style={{maxHeight:"350px"}}/>
                  </div>
                ):(
                  <ReactTable
                    filterable
                    defaultFilterMethod={(filter, rows) => matchSorter(rows, filter.value, { keys: [filter.id] })} 
                    data={passwords} 
                    columns={columns}
                    defaultPageSize = {5}
                    pageSizeOptions = {[5, 10]}
                    className="-striped -highlight"
                  />
                )}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card mb-3 z-depth-2" style={{...cardBorder,minHeight:'404px'}}>
                <div className="card-body">
                  {this.props.editMode && <h5 className="text-center">Edit Mode</h5>}
                  <div>
                    {this.props.form_loading ? (
                      <div className="row d-flex justify-content-center">
                        <img className="mx-auto" src={eyeLoading} style={{maxHeight:"270px"}}/>
                      </div>
                    ) : (
                      <>
                        <Input type={'Text'}
                          title={'URL'} 
                          name= {'url'}
                          value={url} 
                          placeholder = {'Url'}
                          handleChange = {this.handleUrl}
                        />
                        <Input type={'Text'}
                          title={'Username'} 
                          name= {'username'}
                          value={username} 
                          placeholder = {'Username'}
                          handleChange = {this.handleUsername}
                        />
                        <Input type={'Text'}
                          title={'Password'} 
                          name= {'password'}
                          value={password} 
                          placeholder = {'Password'}
                          handleChange = {this.handlePassword}
                        />
                        <div className="progress mb-4">
                          <div className={meterClass} role="progressbar" style={{width: meter}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">{meterStatus}</div>
                        </div>
                      </>
                    )}
                    
                    {!this.props.editMode ? (
                      <Button
                        action={this.handleFormAdd}
                        bootstrap={"btn btn-outline-black"}
                        title={"Add"}
                        disabled={unaddable}
                        // type={"Submit"}
                      />
                    ): (
                      <>
                        <Button
                          action={this.handleCancelEdit}
                          bootstrap={"btn btn-outline-black"}
                          title={"Cancel"}
                        />
                        <Button
                          action={this.handleFormSave}
                          bootstrap={"btn btn-outline-black"}
                          title={"Update"}
                          disabled={unaddable}
                          // type={"Submit"}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card z-depth-2" style={cardBorder}>
                {/* <img className="card-img-top mx-auto mt-3 img-thumbnail z-depth-2" 
                  onError={(e)=>{e.target.onerror = null; e.target.src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX28756542.jpg"}} 
                  src={logo} 
                  style={{...cardBorder,width:'100px',height:'100px'}} 
                /> */}
                <Thumbnail url={url} cardBorder={cardBorder} />
                <div className="card-body">
                  <ul className="list-group">
                    {/* {this.passwordContainUppercase() ? (
                      <li className="list-group-item list-group-item-success"><i className="fas fa-check"></i> &nbsp; Password must contain at least one uppercase character</li>
                    ):(
                      <li className="list-group-item list-group-item-danger">Password must contain at least one uppercase character</li>
                    )}
                    {this.passwordContainLowercase() ? (
                      <li className="list-group-item list-group-item-success"><i className="fas fa-check"></i> &nbsp; Password must contain at least one lowercase character</li>
                    ):(
                      <li className="list-group-item list-group-item-danger">Password must contain at least one lowercase character</li>
                    )}
                    {this.passwordContainSpecialChar() ? (
                      <li className="list-group-item list-group-item-success"><i className="fas fa-check"></i> &nbsp; Password must contain at least one special character</li>
                    ):(
                      <li className="list-group-item list-group-item-danger">Password must contain at least one special character</li>
                    )}
                    {this.passwordContainDigit() ? (
                      <li className="list-group-item list-group-item-success"><i className="fas fa-check"></i> &nbsp; Password must contain at least one numeric digit</li>
                    ):(
                      <li className="list-group-item list-group-item-danger">Password must contain at least one numeric digit</li>
                    )}
                    {this.passwordMinLength() ? (
                      <li className="list-group-item list-group-item-success"><i className="fas fa-check"></i> &nbsp; Password must be at least 5 characters long</li>
                    ):(
                      <li className="list-group-item list-group-item-danger">Password must be at least 5 characters long</li>
                    )} */}
                    <ValidationList />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

const mapStateToProps = (state) =>{
  return {
    //USER STATUS
    isLogin : state.loginReducer.isLogin,
    user : state.loginReducer.user,

    //MAIN DATA
    loading : state.passwordsReducer.loading,
    error : state.passwordsReducer.error,
    passwords : state.passwordsReducer.passwords,

    //MAIN FORM
    home_form : state.formsReducer.home,
    url : state.formsReducer.home.url,
    username : state.formsReducer.home.username,
    password : state.formsReducer.home.password,
    form_loading : state.formsReducer.loading,

    //MODE
    editMode : state.formsReducer.editMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // USER STATUS
    checkLogin: (history) => dispatch(checkLogin(history)),
    
    // MAIN DATA
    fetchPasswords: () => dispatch(fetchPasswords()),

    //CRUD
    createDoc : (value) => dispatch(create(value)),
    updateForm : (target,value) => dispatch(updateForm(target,value)),
    findOne : (id) => dispatch(findOne(id)),
    submitUpdate : (id,value) => dispatch(update(id,value)),

    //MODE
    exitEditMode : () => dispatch(exitEditMode())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);