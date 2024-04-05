import "./index.css"
import LoginIcon from '@mui/icons-material/Login';

const log = () => {
    window.location = "/login"
}


function Home() {
    return (
        <div id="ctn-hm">
            <button id='btn-log' onClick={log}>Access your account  <LoginIcon/></button> 

            <div id='box'>
                <h1>Manage customers and products</h1>
                <h2>efficiently</h2>
                <h4>  Complete control for your company.</h4>
            </div>
        </div>
    
    )
}

export default Home;