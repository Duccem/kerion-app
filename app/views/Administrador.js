import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class Administrador extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            tickets: [],
            user: ''
        };
    }
    async getUsers() {
        const res = await axios.get('/api/usuarios/')
        this.setState({ users: res.data.data });
    }
    async getTickets() {
        try {
            const res = await axios.get('/api/ticket/')
            this.setState({ tickets: res.data.data });
        } catch (error) {
            console.log(error);
            this.setState({ tickets: [] });
        }
    }
    
    async componentDidMount() {
        await this.getUsers();
        await this.getTickets();
    }

    async saveTicket(e) {
        e.preventDefault();
        await axios.post('/api/ticket', {
            data: {
                usuarios_id: this.state.user
            }
        })
        await this.getTickets();
    }

    async deleteTicket(id) {
        await axios.delete('/api/ticket/' + id);
        await this.getTickets();
    }
    async pedirTicket(id) {
        await axios.post('/api/ticket/' + id,{
            data:{
                ticket_pedido:1
            }
        });
        await this.getTickets();
    }
    onChangeSelect(e) {
        this.setState({ user: e.target.value });
    }
    render() {
        const { data } = this.props.location;
        if(!data){
            return (
                <div className="container">
                    <h1 className="text-align-center">Sesion caducada, vuelva al login</h1>
                    <Link className="btn btn-primary mx-auto" to='/'>Login</Link>
                </div>
            );
        }
        
        let buttons;
        let form;
        if (data.tipouser_id == '1') {
            form = <div className="col-md-4 mx-auto">
                <div className="card card-body">
                    <h1>Create ticket</h1>
                    <form onSubmit={(e) => this.saveTicket(e)}>
                        <div className="form-group">
                            <select name="" id="" className="form-control" onChange={(e) => this.onChangeSelect(e)}>
                                {
                                    this.state.users.map(user =>
                                        <option value={user.id} className="list-group-item list-group-item-action" key={user.id}>
                                            {user.nombre}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>;
            buttons = this.state.tickets.map(ticket =>
                <div className="card col-md-3 m-2" key={ticket.id}>
                    <div className="card-body">
                        <h2 className="card-title">
                            Ticket nro {ticket.id}
                        </h2>
                        <p>
                            {
                                this.state.users.find(el => el.id === ticket.usuarios_id)?.nombre || ''
                            }
                        </p>
                        <p>{ticket.ticket_pedido == '0' ? 'Sin pedir' : 'Pedido'}</p>
                        <button className="btn btn-danger" onClick={() => this.deleteTicket(ticket.id)}>Eliminar</button>
                    </div>
                </div>
            )
        } else {
            form = <h1 className="text-align-center">Tus tickets</h1>
            let myTickets = this.state.tickets.filter(el => el.usuarios_id == data.id);
            buttons = myTickets.map(ticket =>
                <div className="card col-md-3 m-2" key={ticket.id}>
                    <div className="card-body">
                        <h2 className="card-title">
                            Ticket nro {ticket.id}
                        </h2>
                        {
                            ticket.ticket_pedido == '1' ?
                                <p>Pedido</p> :
                                <button className="btn btn-info" onClick={()=>this.pedirTicket(ticket.id)}>Pedir</button>
                        }
                    </div>
                </div>
            );
        }
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    {form}
                    <div className="col-md-12">
                        <div className="row justify-content-center">
                            {buttons}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

