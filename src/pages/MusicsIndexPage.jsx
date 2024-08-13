import {Outlet} from "react-router-dom";
import NavBar from "@/components/Navbar.jsx";

export default function MusicsIndexPage() {
    return (
        <>
            <NavBar/>
            <div className={'h-20'}></div>
            <Outlet/>
        </>
    )
}