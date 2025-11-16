import Banner from "../Banner/Banner.jsx";
import Brands from "../Brands/Brands.jsx";
import Reviews from "../Reviews/Reviews.jsx";

const reviewsPromise = fetch("/reviews.json").then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner />
            <Brands />
            <Reviews reviewsPromise={reviewsPromise} />
        </div>
    );
};

export default Home;