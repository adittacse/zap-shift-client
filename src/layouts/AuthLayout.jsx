import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo.jsx";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center bg-green-1">
                <div className="flex-1 bg-base-100">
                    <div className="py-[30px]">
                        <Logo />
                    </div>
                    <div className="max-w-8/12 mx-auto">
                        <Outlet />
                    </div>
                </div>
                <div className="flex-1">
                    <img src={authImg} alt="auth image"/>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;