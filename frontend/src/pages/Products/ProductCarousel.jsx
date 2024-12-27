import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomStyles.css"
import moment from "moment";
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
    const {data: products, isLoading, error} = useGetTopProductsQuery();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

  return (
    <div className="mb-4 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
            {error?.data?.message || error.message}
        </Message>
      ) : <Slider {...settings} className="h-[32rem] xl:w-[80rem] lg:w-[80rem] md:w-[56rem] sm:w-[40rem] sm:block">
            <div>
                <img src="uploads\streetwear-banner_1944x.webp" alt="" className="w-screen rounded-lg object-cover h-[30rem]"/>
            </div>
            <div>
                <img src="uploads\IMG_0092_2_69e387f4-e968-4788-b0ed-a51f5f6544ee.webp" alt="" className="w-screen rounded-lg object-cover h-[30rem]"/>
            </div>
            <div>
                <img src="uploads\ConvertOut-Resized-A7308907_900x.progressive.webp" alt="" className="w-screen rounded-lg object-cover h-[30rem]"/>
            </div>
            <div>
                <img src="uploads\bannerDesk.webp" alt="" className="w-screen rounded-lg object-cover h-[30rem]"/>
            </div>
            { /*
                products.map(({image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock}) => (
                    <div key = {_id}>
                        <img src={image} alt={name} className="w-full rounded-lg object-contain h-[30rem]"/>

                        
                    </div>
                ))
            */}
        </Slider>}
    </div>
  )
};

export default ProductCarousel;
