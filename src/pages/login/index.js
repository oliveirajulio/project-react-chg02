import "./index.css";
import { useState } from "react";
import Swal from "sweetalert2";
import servicesUsers from "../../services/services-users";
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import CancelIcon from '@mui/icons-material/Cancel';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';




function Login() {
    const [email, setEmail] = useState("admin@admin.com");
    const [password, setPassword] = useState("123456");

    

    const autenticate = () => {
        if (!email || !password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                showConfirmButton: false,
                timer: 3000
            });
        }

        servicesUsers.autenticate(email, password)
            .then(response => {
                servicesUsers.saveToken(response.data.token);
                servicesUsers.saveuser(response.data.usuario);
                window.location = "/customers"

            })
            .catch(erro => {

            })
    };

    const home = () => {
        window.location = "/"
    }

    function Sidebar() {
        const divloading = document.getElementById("sidebar");
        divloading.style.display = "block"
        dblh();
    }

    function btncancel() {
        const divloading = document.getElementById("sidebar");
        divloading.style.display = "none"

        const divheader = document.getElementById("box-l");
        divheader.style.display = "block"
    }

    function dblh  () {
        const divheader = document.getElementById("box-l");
        divheader.style.display = "none"
}
    return (

        <div id="ctn-home">

            <div id="home">
                <button onClick={home}id='btn-hom'><HomeOutlinedIcon fontSize="large"/></button>
            </div>

            <button id='btn-access' onClick={Sidebar}>Login <LoginIcon/></button>

            <div id='box-l'>
                <h1>Log in to access information</h1>
                <h2>about the company and enjoy all available featuresy</h2>
            </div>

            <div id="sidebar">
                <h4 className="padlock"><LockIcon fontSize="large"/></h4>
                <div className="box-login">
                    <div className="login-title">
                        <h2>Login</h2>
                    </div>

                    <div className="group">
                        <label for="email">E-mail:</label>
                        <input id="email" value={email} type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Type your e-mail"></input>
                    </div>

                    <div className="group">
                        <label for="password">Password:</label>
                        <input id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"></input>
                    </div>

                    <div className="forgot-pass">
                        <a href="#">Forgot Password?</a>
                    </div>

                    <button id="btn-entrar" onClick={autenticate}>Enter</button>

                </div>

                <button id="cls-login" onClick={btncancel}><CancelIcon fontSize="large"/></button>

            </div>
        </div>
    )
}

export default Login;