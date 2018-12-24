import React, { Component } from 'react'
import { connect } from 'react-redux';

import Input from '../components/form/Input'
import Button from '../components/Button'

//action
import register from '../actions/registerAction'

export class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            newUser : {
                email : '',
                password : ''
            }
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        const {email,password} = this.state.newUser
        
        this.props.register(email,password,this.props.history)

        this.setState({
            newUser : {
                email : '',
                password : ''
            }
        })
    }

    handleEmail = (e) => {
        let value = e.target.value;
        this.setState( prevState => ({ newUser : 
            {...prevState.newUser, email: value}
        }))
    }

    handlePassword = (e) => {
        let value = e.target.value;
        this.setState( prevState => ({ newUser : 
            {...prevState.newUser, password: value}
        }))
    }

    render() {
        return (
        <div className="container mt-3 mb-3">
            <div className="row">
                <div className="col-sm-12 col-lg-4 offset-lg-4">
                    <div className="card">
                        <img className="card-img-top" src="https://i.ytimg.com/vi/3jXTxqeXke4/hqdefault.jpg" alt="falsecrypt" style={{height : '270px'}} />
                        <div className="card-body">
                            {this.props.error && <h5 className="text-center">{this.props.errorMessage}</h5>}
                            {!this.props.loading ?
                            (<form onSubmit={this.handleFormSubmit}>
                                <Input type={'Email'}
                                    title={'Email'} 
                                    name= {'email'}
                                    value={this.state.newUser.email} 
                                    placeholder = {'Enter Your Email'}
                                    handleChange = {this.handleEmail}
                                />
                                <Input type={'Password'}
                                    title={'Password'} 
                                    name= {'password'}
                                    value={this.state.newUser.password} 
                                    placeholder = {'Enter Your Password'}
                                    handleChange = {this.handlePassword}
                                />
                                <div className="row d-flex justify-content-center">
                                    <div className="col-lg-6">
                                    <Button
                                        action={this.handleFormSubmit}
                                        bootstrap={"btn btn-outline-black"}
                                        title={"Register"}
                                        type={"Submit"}
                                    />
                                    </div>
                                </div>
                            </form>
                            ):(
                            <h3 className="text-center">Please Wait...</h3>
                            )
                            }
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
        loading: state.registerReducer.loading,
        error: state.registerReducer.error,
        errorMessage: state.registerReducer.errorMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register : (email,password,history) => dispatch(register(email,password,history))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);