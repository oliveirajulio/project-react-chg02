import "./index.css"
import { Link, useLocation } from "react-router-dom"
import servicesUsers from "../../services/services-users"
import LogoutIcon from '@mui/icons-material/Logout';


function Menu() {
    const logout = () => {
        servicesUsers.logout();
    }

    const location = useLocation();
    const excludedPaths = ["/login", "/"];

    if (!excludedPaths.includes(location.pathname)) {

        return (
            <ul className="menu">
                <li><Link to='/customers' activeClassName="active">Customers</Link></li>
                <li><Link to='/products' activeClassName="active">Products</Link></li>
                <li><Link to='/login'><LogoutIcon fontSize="inherit"/></Link></li>
            </ul>
        )

    } else{
        return null;
}

  
}

export default Menu;