import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Warehouse from "./pages/warehouse/Warehouse";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/warehouses" element={<List />} />
            <Route path="/warehouses/:id" element={<Warehouse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
