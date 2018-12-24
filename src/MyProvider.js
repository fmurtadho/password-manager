import React, { Component , createContext} from 'react'

import {connect} from 'react-redux'

export const Context = createContext()

class MyProvider extends Component {
    state = {
        logoApi : "https://logo.clearbit.com/"
    }

    render() {
        return (
            <Context.Provider value={{
                state : this.state,
                passwordContainLowercase : () => {
                    return (/[a-z]/.test(this.props.password));
                },
                passwordContainUppercase : () => {
                    return (/[A-Z]/.test(this.props.password));
                },
                passwordContainSpecialChar : () => {
                    return /[$-/:-?{-~!"^_`\[\]]/.test(this.props.password);
                },
                passwordContainDigit : () => {
                    return /\d/.test(this.props.password);
                },
                passwordMinLength : () => {
                    const pwd = this.props.password
                    if(pwd.length > 5){
                      return true
                    }else{
                      return false
                    }
                }
            }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        password : state.formsReducer.home.password
    }
}

const mapDispathToProps = (dispatch) => {
    return null;
}

export default connect(mapStateToProps,mapDispathToProps)(MyProvider);