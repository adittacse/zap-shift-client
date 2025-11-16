import { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ReviewSlider.css";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import reviewQuote from "../../../assets/reviewQuote.png";
import customerTop from "../../../assets/customer-top.png";

const Reviews = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise);

    return (
        <div className="review-slider-wrapper mb-24">
            <div className="flex justify-center mb-10">
                <img src={customerTop} alt="customer top"/>
            </div>
            <h3 className="font-extrabold text-[40px] text-secondary text-center mb-6">What our customers are sayings</h3>
            <p className="text-black-8 text-center mb-10">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br />pain, and strengthen your body with ease!</p>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 50,
                    stretch: "50%",
                    depth: 200,
                    modifier: 1,
                    scale: 0.75,
                    slideShadows: true,
                }}
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Autoplay, Pagination]}
                className="mySwiper"
            >
                {
                    reviews.map(review => <SwiperSlide key={review.id}>
                        <div className="review-card">
                            <img className="mb-2" src={reviewQuote} alt="review quote" />
                            <p className="review-text">{review.review}</p>

                            <div className="border-t border-dashed border-blue-9 py-6" />

                            <div className="review-footer">
                                <div className="review-avatar">
                                    <img src={review.user_photoURL} alt={review.userName} />
                                </div>
                                <div>
                                    <div className="review-name">{review.userName}</div>
                                    <div className="review-role">Customer</div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Reviews;