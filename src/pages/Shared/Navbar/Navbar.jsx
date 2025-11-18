import { useContext } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo/Logo.jsx";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";
import { LuArrowUpRight } from "react-icons/lu";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                // user signed out
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    const links = <>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/coverage">Coverage</NavLink></li>
        <li><NavLink to="/about-us">About Us</NavLink></li>
        <li><NavLink to="/pricing">Pricing</NavLink></li>
        <li><NavLink to="/be-a-rider">Be a Rider</NavLink></li>
    </>;

    return (
        <div className="navbar bg-base-100 shadow-sm rounded-2xl px-8 py-5 mb-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Logo />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <button onClick={handleLogOut} className="btn btn-primary font-bold py-4 px-8">Sign Out</button>
                    </> : <>
                        <Link to="/login" className="btn font-bold py-4 px-8 mr-4">Sign In</Link>
                        <Link to="/be-a-rider" className="btn bg-primary font-bold py-4 px-8">Be a Rider</Link>
                        <div className="bg-black-12 rounded-full p-3 mr-5">
                            <LuArrowUpRight className="text-primary w-4 h-4" />
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;