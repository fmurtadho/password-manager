import React, { Component } from 'react'
import logo from '../logo.svg';

import logout from '../actions/logoutAction'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

class Navbar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-dark black">
        <div className="container">
          <div className="navbar-brand">
            <img src={logo} height="30" alt="react logo"/>
            FALSECRYPT
          </div>
            {!this.props.isLogin ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to='/login' className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to='/register' className="nav-link">Register</Link>
              </li>
            </ul>
            ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" onClick={this.props.logout}>{this.props.user} &nbsp; <i className="fas fa-sign-out-alt"></i></a>
              </li>
            </ul>
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.loginReducer.user,
    isLogin : state.loginReducer.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout : () => dispatch(logout())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);