import service from './service'

function autenticate(email, senha) {
    return new Promise((resolve, reject) => {
        service.post('/login', { email, senha })
            .then(response => resolve(response))
            .catch(erro => reject(erro))
    })
}

function saveToken(token) {
    localStorage.setItem('token', token);
}

function saveuser(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
}

function gettoken() {
    return localStorage.getItem('token');
}

function getuser() {
    return localStorage.getItem('usuario');
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.open('/login', '_self')
}

export default {
    autenticate,
    saveToken,
    saveuser,
    gettoken,
    getuser
}