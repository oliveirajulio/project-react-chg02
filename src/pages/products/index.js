import "../../Styles.css"
import "./index.css"
import serviceProduct from "../../services/service-product"
import Swal from "sweetalert2"
import Product from "../../models/Product"

import { useState, useEffect } from "react"

function Products() {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(new Product());
    const [EditorMode, setEditorMode] = useState(false)

    useEffect(() => {
        serviceProduct.get()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((erro) => { })
    }, [])

    const edit = (e) => {
        setEditorMode(true);
        let productforedit = products.find(c => c.id == e.target.id)
        productforedit.dataCadastro = productforedit.dataCadastro.substring(0,10);
        setProduct(productforedit)
    }

    const removeproductlist = (product) => {
        let indice = products.findIndex(c => c.id == product.id);
        products.splice(indice, 1);
        setProducts(arr => [...arr]);
    }

    const remove = (e) => {
        let productfordelete = products.find(c => c.id == e.target.id)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#ED7121',
            cancelButtonColor: "#ED7121",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                serviceProduct.remove(productfordelete.id)
                .then(() => {
                    removeproductlist(productfordelete)
                })
                Swal.fire({
                    title: "Deleted!",
                    text: `${productfordelete.nome}, has been deleted`,
                    icon: "success",
                    confirmButtonColor: '#ED7121',
    
                });
            }
        })
    }

    const save = () => { 
        if(!product.valor || !product.quantidadeEstoque) {
            Swal.fire({
                icon: 'error',
                text: 'Price and Stock are required.',
                confirmButtonColor: '#ED7121'
            });

            return;

        }

        (EditorMode)
        ? uptadeproductback(product) 
        : addproductback(product);

    }

    const uptadeproductback = (product) => {
        serviceProduct.uptade(product)
        .then(response => {
            clearmodal();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${product.nome}, uptaded sucessfully.`,
                showConfirmButton: false,
                timer: 5000
            })

            let indice = products.findIndex(c => c.id == product.id)
            products.splice(indice, 1, product);

            setProducts(list => [...list]);
        })
    }

    const add = () => {
        setEditorMode(false);
        clearmodal();
    }

    const clearmodal = () => {
        setProduct({...product, 
            id:'',
            nome:'',
            valor:'',
            quantidadeEstoque:'',
            observacao:'',
            dataCadastro:''
        })
    }

    const addproductback = (product) => {
        serviceProduct.add(product)
        .then(response =>{
            setProducts(list => [...list, new Product(response.data)])
            
            clearmodal();

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${product.nome}, added sucessfully.`,
                showConfirmButton: false,
                timer: 5000
            })
                
        })
    }

    return (
        <div className="container">

            <div className="row mt-4">
                <div className="col-sm-3">
                    <button onClick={add} id="btn-add1" className="btn btn-light btn-sm" data-bs-toggle="modal"
                        data-bs-target="#modal-product">Add</button>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-12">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Obs</th>
                                <th>Register Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr>
                                    <td>{product.id}</td>
                                    <td>{product.nome}</td>
                                    <td>{product.valor}</td>
                                    <td>{product.quantidadeEstoque}</td>
                                    <td>{product.observacao}</td>
                                    <td>{new Date(product.dataCadastro).toLocaleDateString()}</td>
                                    <td>
                                        <button id={product.id} onClick={edit} className="btn btn-outline-light btn-sm mr-3" data-bs-toggle="modal" 
                                        data-bs-target="#modal-product">Edit</button>
                                        <button id={product.id} onClick={remove} className="btn btn-outline-light btn-sm mr-3">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal" id="modal-product">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">{EditorMode ? 'Edit product' :'Add product'}</h4>
                            <button id="modal-product" type="button" className="btn-close"></button>
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
                                    value={product.id}
                                    onChange={(e) => setProduct({...product, id: e.target.value})}/>
                                </div>
                                <div className="col-sm-10">
                                    <label for="nome" className="form-label">Name:</label>
                                    <input id="nome" type="text" className="form-control"
                                    value={product.nome}
                                    onChange={(e) => setProduct({...product, nome: e.target.value})} />
                                </div>
                            </div>

                            <div className="row">

                            <div className="col-sm-4">
                                    <label for="valor" className="form-label">Price:</label>
                                    <input id="valor" type="text" className="form-control" 
                                    value={product.valor}
                                    onChange={(e) => setProduct({...product, valor: e.target.value})}/>
                                </div>
                                
                                <div className="col-sm-3">
                                    <label for="quantidadeEstoque" className="form-label">Stock:</label>
                                    <input id="quantidadeEstoque" type="text" className="form-control"
                                    value={product.quantidadeEstoque}
                                    onChange={(e) => setProduct({...product, quantidadeEstoque: e.target.value})}/>
                                </div>
                                <div className="col-sm-2">
                                    <label for="obs" className="form-label">Obs:</label>
                                    <input 
                                    id="obs" 
                                    type="text" 
                                    className="form-control" 
                                    value={product.observacao}
                                    onChange={(e) => setProduct({...product, observacao: e.target.value})}/>
                                </div>
                                <div className="col-sm-3">
                                    <label for="date" className="form-label">Register Date:</label>
                                    <input id="date" type="date" className="form-control"
                                    value={product.dataCadastro}
                                    onChange={(e) => setProduct({...product, dataCadastro: e.target.value})}/>
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

export default Products;