import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Pagination, Navigation, Autoplay } from "swiper/modules";
import bannerImage1 from "../../../assets/banner/banner1.png";
import bannerImage2 from "../../../assets/banner/banner2.png";
import bannerImage3 from "../../../assets/banner/banner3.png";
import { LuArrowUpRight } from "react-icons/lu";

const Banner = () => {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            keyboard={{
                enabled: true,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            modules={[Keyboard, Pagination, Navigation, Autoplay]}
            className="mySwiper mb-24"
        >
            <SwiperSlide className="relative">
                <img className="h-full w-full" src={bannerImage1} alt="banner image"/>
                <div className="-mt-[120px] ms-24 flex items-center">
                    <Link to="/track-your-percel" className="btn btn-primary text-black-12 font-bold text-[20px] outline-0 rounded-full px-8 py-4">Track Your Parcel</Link>
                    <div className="bg-black-12 rounded-full p-3 mr-5"><LuArrowUpRight className="text-primary w-4 h-4" /></div>
                    <Link to="/be-a-rider" className="btn text-[20px] text-black-12 font-bold rounded-xl px-8 py-4">Be a Rider</Link>
                </div>
            </SwiperSlide>
            <SwiperSlide className="relative">
                <img src={bannerImage2} alt="banner image"/>
                <div className="-mt-[120px] ms-24 flex items-center">
                    <Link to="/track-your-percel" className="btn btn-primary text-black-12 font-bold text-[20px] outline-0 rounded-full px-8 py-4">Track Your Parcel</Link>
                    <div className="bg-black-12 rounded-full p-3 mr-5"><LuArrowUpRight className="text-primary w-4 h-4" /></div>
                    <Link to="/be-a-rider" className="btn text-[20px] text-black-12 font-bold rounded-xl px-8 py-4">Be a Rider</Link>
                </div>
            </SwiperSlide>
            <SwiperSlide className="relative">
                <img src={bannerImage3} alt="banner image"/>
                <div className="-mt-[145px] ms-24 flex items-center">
                    <Link to="/track-your-percel" className="btn btn-primary text-black-12 font-bold text-[20px] outline-0 rounded-full px-8 py-4">Track Your Parcel</Link>
                    <div className="bg-black-12 rounded-full p-3 mr-5"><LuArrowUpRight className="text-primary w-4 h-4" /></div>
                    <Link to="/be-a-rider" className="btn text-[20px] text-black-12 font-bold rounded-xl px-8 py-4">Be a Rider</Link>
                </div>
            </SwiperSlide>
            </Swiper>
    );
};

export default Banner;