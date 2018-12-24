import React, { Component } from 'react'
import { connect } from 'react-redux'

import Input from '../components/form/Input'
import Button from '../components/Button'

import login from '../actions/loginAction'

class Login extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        email : '',
        password : ''
      }
    }

    handleFormSubmit = (e) => {
      e.preventDefault();
      const {email,password} = this.state
      this.props.login(email,password,this.props.history)

      this.setState({
        email : '',
        password : ''
      })
    }

    handleEmail = (e) => {
      let value = e.target.value;
      this.setState({email : value})
    }

    handlePassword = (e) => {
      let value = e.target.value;
      this.setState({password : value})
    }

    render() {
      return (
        <div className="container mt-3 mb-3">
          <div className="row">
            <div className="col-sm-12 col-lg-4 offset-lg-4">
              <div className="card">
              <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHch2g0P07yoEVezBSwNTAR0rGjXP3o4B2tN_xYkCBRc_xwPpj" alt="falsecrypt" style={{height : '270px'}} />
                <div className="card-body">
                  {this.props.error && <h5 className="text-center">{this.props.errorMessage}</h5>}
                  {this.props.loading && <h4 className="text-center">Please wait...</h4>}
                  <form onSubmit={this.handleFormSubmit}>
                    <Input type={'Email'}
                        title={'Email'} 
                        name= {'email'}
                        value={this.state.email} 
                        placeholder = {'Enter Your Email'}
                        handleChange = {this.handleEmail}
                    />
                    <Input type={'Password'}
                        title={'Password'} 
                        name= {'password'}
                        value={this.state.password} 
                        placeholder = {'Enter Your Password'}
                        handleChange = {this.handlePassword}
                    />
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-6">
                        <Button
                            action={this.handleFormSubmit}
                            bootstrap={"btn btn-outline-black"}
                            title={"Login"}
                            type={"Submit"}
                        />
                        </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }   
}

const mapStateToProps = (state) => {
  return {
    loading : state.loginReducer.loading,
    error : state.loginReducer.error,
    errorMessage : state.loginReducer.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email,password,history) => dispatch(login(email,password,history))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);