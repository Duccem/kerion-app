import React, { Component } from 'react'
import axios from "axios";

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            user:'',
            email:'',
            password: ''
        }
    }
    async signUp(e){
        e.preventDefault();
        try {
            await axios.post('/api/usuarios/signup',{
                data: {
                    nombre:this.state.user,
                    email:this.state.email,
                    pass: this.state.password,
                    tipouser_id: 2
                }
            });
            this.props.history.push('/');
        } catch (error) {
            console.log(error)
        }
    }
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
                        <form className="needs-validation" onSubmit={(e)=>this.signUp(e)} novalidate>
                            <div className="form-group">
                                <label for="username" className="">Username:</label>
                                <input className="form-control " type="text" 
                                onChange={(e)=>this.setState({user:e.target.value})}
                                placeholder="Username" required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please give a username.
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="email" className="">Email:</label>
                                <input className="form-control " type="text" 
                                    onChange={(e)=>this.setState({email:e.target.value})}
                                 placeholder="Email" required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please give a email.
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="password" className="">Password:</label>
                                <input className="form-control " type="password" 
                                onChange={(e)=>this.setState({password:e.target.value})}
                                placeholder="password" required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please give a password.
                                </div>
                            </div>                            
                            <div className="form-group">
                                <button className="btn btn-success" type='submit'>
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