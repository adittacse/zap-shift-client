import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo.jsx";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Logo />
            <div className="flex items-center">
                <div className="flex-1">
                    <div className="max-w-96 mx-auto">
                        <Outlet />
                    </div>
                </div>
                <div className="flex-1 bg-green-1">
                    <img src={authImg} alt="auth image"/>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;