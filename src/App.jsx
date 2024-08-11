import "./App.css"
import Navbar from "@/components/Navbar.jsx";
import {Outlet, Link} from "react-router-dom";

function App() {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
}

export default App;
