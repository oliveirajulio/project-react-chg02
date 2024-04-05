import service from './service'

function add(cliente) {
    return new Promise((resolve, reject) => {
        service.post('/clientes', cliente)
            .then(response => resolve(response))
            .catch(erro => reject(erro))
    })
}

function get() {
    return new Promise((resolve, reject) => {
        service.get('/clientes')
            .then(response => resolve(response))
            .catch(erro => reject(erro))
    })
}

function uptade(cliente) {
    return new Promise((resolve, reject) => {
        service.put(`/clientes/${cliente.id}`, cliente)
            .then(response => resolve(response))
            .catch(erro => reject(erro))
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        service.delete(`/clientes/${id}`)
            .then(response => resolve(response))
            .catch(erro => reject(erro))
    })
}




export default {
    get,
    add,
    uptade,
    remove
}