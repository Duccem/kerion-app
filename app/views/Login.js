import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Login extends Component {
    render(){
        return (
            <div className="container col-md-7 mt-5">
                <div className="card">
                    <div className="card-header bg-dark">
                        <h3 className="card-title text-white">
                            <i className="fas fa-sign-in-alt"></i> Login
                        </h3>
                    </div>
                    <div className="card-body">
                        <form action="/user/login" className="needs-validation" method="POST" noValidate>
                            <div className="form-group">
                                <label htmlFor="" className="">Username:</label>
                                <input className="form-control" type="text" name="username" id="" placeholder="User name" required />
                                <div className="invalid-feedback">
                                    Please give a username.
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="">Password:</label>
                                <input className="form-control" type="password" name="password" id="" placeholder="Your password" required />
                                <div className="invalid-feedback">
                                    Please give a password.
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success">
                                    <i className="fas fa-upload"></i> SignIn
                                </button>
                                <Link id="cancelar" to="/signup" className="btn btn-info text-white ml-auto" style={{cursor:'pointer'}}>
                                    <i className="fas fa-user-plus"></i> SignUp
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}