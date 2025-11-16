import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/Footer.jsx";
import Navbar from "../pages/Shared/Navbar/Navbar.jsx";

const RootLayout = () => {
    return (
        <div className="font-urbanist bg-[#f3f6f6]">
            <div className="max-w-7xl mx-auto">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default RootLayout;