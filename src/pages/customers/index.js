import "../../Styles.css"
import "./index.css"
import serviceCustomer from "../../services/service-customer";
import Swal from "sweetalert2"
import Customer from "../../models/Customer"

import { useState, useEffect } from "react"

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState(new Customer());
    const [EditorMode, setEditorMode] = useState(false)

    useEffect(() => {
        serviceCustomer.get()
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((erro) => { })
    }, [])

    const edit = (e) => {
        setEditorMode(true);
        let customerforedit = customers.find(c => c.id == e.target.id)
        customerforedit.dataCadastro = customerforedit.dataCadastro.substring(0,10);
        setCustomer(customerforedit)
    }

    const removecustomerlist = (customer) => {
        let indice = customers.findIndex(c => c.id == customer.id);
        customers.splice(indice, 1);
        setCustomers(arr => [...arr]);
    }

    const remove = (e) => {
        let customerfordelete = customers.find(c => c.id == e.target.id)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d5c8B6",
            cancelButtonColor: "#ED7121",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                serviceCustomer.remove(customerfordelete.id)
                .then(() => {
                    removecustomerlist(customerfordelete)
                })
                Swal.fire({
                    title: "Deleted!",
                    text: `${customerfordelete.nome}, has been deleted`,
                    icon: "success",
                    confirmButtonColor: "#d5c8B6",
    
                });
            }
        })
    }

    const save = () => { 
        if(!customer.cpfOuCnpj || !customer.email) {
            Swal.fire({
                icon: 'error',
                text: 'E-mail and SNN are required.',
                confirmButtonColor: '#ED7121'
            });

            return;

        }

        (EditorMode)
        ? uptadecustomerback(customer) 
        : addcustomerback(customer);

    }

    const uptadecustomerback = (customer) => {
        serviceCustomer.uptade(customer)
        .then(response => {
            clearmodal();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${customer.nome}, uptaded sucessfully.`,
                showConfirmButton: false,
                timer: 5000
            })

            let indice = customers.findIndex(c => c.id == customer.id)
            customers.splice(indice, 1, customer);

            setCustomers(list => [...list]);
        })
    }

    const add = () => {
        setEditorMode(false);
        clearmodal();
    }

    const clearmodal = () => {
        setCustomer({...customer, 
            id:'',
            nome:'',
            cpfOuCnpj:'',
            telefone:'',
            email:'',
            dataCadastro:''
        })
    }

    const addcustomerback = (customer) => {
        serviceCustomer.add(customer)
        .then(response =>{
            setCustomers(list => [...list, new Customer(response.data)])
            
            clearmodal();

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${customer.nome}, added sucessfully.`,
                showConfirmButton: false,
                timer: 5000
            })
                
        })
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-sm-3">
                    <button onClick={add} id="btn-add1" className="btn btn-light btn-sm" data-bs-toggle="modal"
                        data-bs-target="#modal-customer">Add</button>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-12">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>SSN</th>
                                <th>E-mail</th>
                                <th>Phone</th>
                                <th>Register Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(customer => (
                                <tr>
                                    <td>{customer.id}</td>
                                    <td>{customer.nome}</td>
                                    <td>{customer.cpfOuCnpj}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.telefone}</td>
                                    <td>{new Date(customer.dataCadastro).toLocaleDateString()}</td>
                                    <td>
                                        <button id={customer.id} onClick={edit} className="btn btn-outline-light btn-sm mr-3" data-bs-toggle="modal" 
                                        data-bs-target="#modal-customer">Edit</button>
                                        <button id={customer.id} onClick={remove} className="btn btn-outline-light btn-sm mr-3">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal" id="modal-customer">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">{EditorMode ? 'Edit Customer' :'Add Customer'}</h4>
                            <button id="modal-customer" type="button" className="btn-close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-2">
                                    <label for="id" className="form-label">Id:</label>
                                    <input 
                                    id="id" 
                                    type="text" 
                                    disabled 
                                    className="form-control"
                                    value={customer.id}
                                    onChange={(e) => setCustomer({...customer, id: e.target.value})}/>
                                </div>
                                <div className="col-sm-10">
                                    <label for="nome" className="form-label">Name:</label>
                                    <input id="nome" type="text" className="form-control"
                                    value={customer.nome}
                                    onChange={(e) => setCustomer({...customer, nome: e.target.value})} />
                                </div>
                            </div>

                            <div className="row">

                            <div className="col-sm-4">
                                    <label for="email" className="form-label">E-mail:</label>
                                    <input id="email" type="text" className="form-control" 
                                    value={customer.email}
                                    onChange={(e) => setCustomer({...customer, email: e.target.value})}/>
                                </div>
                                
                                <div className="col-sm-3">
                                    <label for="phone" className="form-label">Phone:</label>
                                    <input id="phone" type="text" className="form-control"
                                    value={customer.telefone}
                                    onChange={(e) => setCustomer({...customer, telefone: e.target.value})}/>
                                </div>
                                <div className="col-sm-2">
                                    <label for="ssn" className="form-label">SSN:</label>
                                    <input 
                                    id="ssn" 
                                    type="text" 
                                    className="form-control" 
                                    value={customer.cpfOuCnpj}
                                    onChange={(e) => setCustomer({...customer, cpfOuCnpj: e.target.value})}/>
                                </div>
                                <div className="col-sm-3">
                                    <label for="date" className="form-label">Register Date:</label>
                                    <input id="date" type="date" className="form-control"
                                    value={customer.dataCadastro}
                                    onChange={(e) => setCustomer({...customer, dataCadastro: e.target.value})}/>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button onClick={save}id="btn-save1" type="button" className="btn btn-light">Save</button>
                            <button id="btn-cancel1" type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}

export default Customers;