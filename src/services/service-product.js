import service from './service'

function add(produto) {
    return new Promise((resolve, reject) => {
        service.post('/produtos', produto)
            .then(response => resolve(response))
            .catch(erro => reject(erro))
    })
}

function get() {
    return new Promise((resolve, reject) => {
        service.get('/produtos')
            .then(response => resolve(response))
            .catch(erro => reject(erro))
    })
}

function uptade(produto) {
    return new Promise((resolve, reject) => {
        service.put(`/produtos/${produto.id}`, produto)
            .then(response => resolve(response))
            .catch(erro => reject(erro))
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        service.delete(`/produtos/${id}`)
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