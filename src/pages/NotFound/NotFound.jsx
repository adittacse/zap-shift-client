import { Link } from "react-router";
import notFoundImg from "../../assets/NotFound.png";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center bg-base-100 rounded-4xl py-20 mb-8">
            <img className="w-[300px]" src={notFoundImg} alt="Not found"/>
            <Link className="btn bg-primary font-bold text-[20px] rounded-xl py-4 px-[26px]">Go Home</Link>
        </div>
    );
};

export default NotFound;