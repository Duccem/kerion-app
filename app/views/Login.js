import React, { Component, Con } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            user:'',
            pass:'',
            error: false
        }
    }
    async login(e){
        e.preventDefault();
        try {
            const res = await axios.post('/api/usuarios/login',{
                data: {
                    user:this.state.user,
                    password: this.state.pass
                }
            });
            this.props.history.push({
                pathname:'/home',
                data:res.data.data
            });
        } catch (error) {
            this.setState({error:true})
            console.log(error)
        }
    }
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
                    {
                        this.state.error ? <div className="alert alert-danger" role="alert">
                            Credenciales invalidas
                            <button type="button" className="close" onClick={()=>this.setState({error:false})} data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div> : ''
                    }
                        <form className="needs-validation">
                            <div className="form-group">
                                <label htmlFor="" className="">Username:</label>
                                <input className="form-control" type="text" onChange={(e)=> this.setState({user:e.target.value})} name="username" id="" placeholder="User name" required />
                                <div className="invalid-feedback">
                                    Please give a username.
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="">Password:</label>
                                <input className="form-control" type="password" name="password" onChange={(e)=> this.setState({pass:e.target.value})} id="" placeholder="Your password" required />
                                <div className="invalid-feedback">
                                    Please give a password.
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success mr-2" onClick={(e)=> this.login(e)}>
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