import React, { Fragment } from 'react'
import {Context} from '../MyProvider'

const Validation = (props) => {
    return (
        <Context.Consumer>
            {(context) => 
            <Fragment>
                {context.passwordContainUppercase() ? (
                    <li className="list-group-item list-group-item-success"><i className="fas fa-check"></i> &nbsp; Password must contain at least one uppercase character</li>
                ):(
                    <li className="list-group-item list-group-item-danger">Password must contain at least one uppercase character</li>
                )}
                {context.passwordContainLowercase() ? (
                    <li className="list-group-item list-group-item-success"><i className="fas fa-check"></i> &nbsp; Password must contain at least one lowercase character</li>
                ):(
                    <li className="list-group-item list-group-item-danger">Password must contain at least one lowercase character</li>
                )}
                {context.passwordContainSpecialChar() ? (
                    <li className="list-group-item list-group-item-success"><i className="fas fa-check"></i> &nbsp; Password must contain at least one special character</li>
                ):(
                    <li className="list-group-item list-group-item-danger">Password must contain at least one special character</li>
                )}
                {context.passwordContainDigit() ? (
                    <li className="list-group-item list-group-item-success"><i className="fas fa-check"></i> &nbsp; Password must contain at least one numeric digit</li>
                ):(
                    <li className="list-group-item list-group-item-danger">Password must contain at least one numeric digit</li>
                )}
                {context.passwordMinLength() ? (
                    <li className="list-group-item list-group-item-success"><i className="fas fa-check"></i> &nbsp; Password must be at least 5 characters long</li>
                ):(
                    <li className="list-group-item list-group-item-danger">Password must be at least 5 characters long</li>
                )}
            </Fragment>
            }
        </Context.Consumer>
    )
}

export default Validation;