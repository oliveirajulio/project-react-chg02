class Customer {
    constructor(obj) {
        obj = obj || {}
        this.id = obj.id
        this.nome = obj.nome
        this.cpfOuCnpj = obj.cpfOuCnpj
        this.email = obj.email
        this.dataCadastro = obj.dataCadastro
        this.telefone = obj.telefone
    }

    validar() {
        return !!(this.cpfOuCnpj && this.email);
    }
}

export default Customer;


