import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from "swiper/modules";

import amazonLogo from "../../../assets/brands/amazon.png";
import casioLogo from "../../../assets/brands/casio.png";
import moonstarLogo from "../../../assets/brands/moonstar.png";
import randstadLogo from "../../../assets/brands/randstad.png";
import starLogo from "../../../assets/brands/star.png";
import startPeopleLogo from "../../../assets/brands/start_people.png";

const brandLogos = [amazonLogo, casioLogo, moonstarLogo, randstadLogo, starLogo, startPeopleLogo];

const Brands = () => {
    return (
        <div className="mb-24">
            <h4 className="text-center text-[28px] text-secondary font-extrabold mb-10">We've helped thousands of sales teams</h4>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                grabCursor={true}
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
            >
                {
                    brandLogos.map((logo, index) => <SwiperSlide key={index}>
                        <img src={logo} alt="brand logo"/>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Brands;