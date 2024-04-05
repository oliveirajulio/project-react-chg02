import Customers from "./pages/customers";
import Products from "./pages/products";
import Login from "./pages/login";
import Menu from "./components/menu";
import Home from "./pages/Home";

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function Router() {
    return (
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </BrowserRouter>

    )
}

export default Router;