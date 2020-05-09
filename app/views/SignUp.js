import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div className="container col-md-7 mt-5">
                <div className="card">
                    <div className="card-header bg-dark">
                        <h3 className="card-title text-white">
                            <i className="fas fa-user-plus"></i> SignUp
                        </h3>
                    </div>
                    <div className="card-body">
                        <form action="/user/signup" enctype="multipart/form-data" method="POST" className="needs-validation" novalidate>
                            <div className="form-group">
                                <label for="username" className="">Username:</label>
                                <input className="form-control " type="text" name="username" id="" placeholder="Username" required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please give a username.
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="email" className="">Email:</label>
                                <input className="form-control " type="text" name="email" id="" placeholder="Email" required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please give a email.
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="password" className="">Password:</label>
                                <input className="form-control " type="password" name="password" id="" placeholder="password" required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please give a password.
                                </div>
                            </div>                            
                            <div className="form-group">
                                <button className="btn btn-success">
                                    <i className="fas fa-upload"></i> SignIn
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}