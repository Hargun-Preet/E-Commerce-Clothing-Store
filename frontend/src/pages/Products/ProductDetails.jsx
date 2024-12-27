import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoryByIdQuery } from "../../redux/api/categoryApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock,FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
    const {id: productId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] =  useState("");
    const [size, setSize] = useState(""); // State to manage selected size

    const [showDescription1, setShowDescription1] = useState(false); // State to manage description visibility
    const [isArrowRotated1, setIsArrowRotated1] = useState(false); // State to manage arrow rotation

    const [showDescription2, setShowDescription2] = useState(false); // State to manage description visibility
    const [isArrowRotated2, setIsArrowRotated2] = useState(false); // State to manage arrow rotation

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);

    const {userInfo} = useSelector((state) => state.auth);

    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation();

    const { data: category, isLoading: categoryLoading, error: categoryError } = useFetchCategoryByIdQuery(product?.category);

    const toggleDescription1 = () => {
      setShowDescription1(!showDescription1);
      setIsArrowRotated1(!isArrowRotated1);
    };

    const toggleDescription2 = () => {
      setShowDescription2(!showDescription2);
      setIsArrowRotated2(!isArrowRotated2);
    };

    const submitHandler = async (e) => {
      e.preventDefault();
        
      try {
        await createReview({
          productId, rating, comment,
        }).unwrap();
        refetch();
        toast.success("Review created successfully!");
      } catch (error) {
        toast.error(error?.data || error.message) 
      }
    };

    const addToCartHandler = () => {
      if (!size) {
        toast.error("Please select a size before adding to cart!");
      } else {
          // Add to cart logic here
          dispatch(addToCart({...product, qty, size}));
          navigate("/cart");
          toast.success("Added to cart successfully!");
      }
    }

  return (
    <>
      <div className="flex justify-center items-center"> 
            <Link to = "/"><img src="../../../../uploads/logo.png" alt="logo" className="h-16"/></Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
            {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
            <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
                <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full rounded-lg xl:w-[35rem] lg:w-[35rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]" />

                    <div className="absolute top-4 right-10">
                        <HeartIcon product={product} />
                    </div>
                </div>

                <div className="justify-between">
                    <h2 className="text-2xl font-semibold">{product.name}</h2>

                    {categoryLoading ? (
                                <Loader />
                            ) : categoryError ? (
                                <Message variant="danger">{categoryError?.data?.message || categoryError.message}</Message>
                            ) : (
                                <p className="text-md text-gray-500 font-medium my-2">{category.name}</p>
                                
                            )}
                          
                    <br />
                    <hr className="border-1 border-gray-700"/>
                    <br />
                    <h1 className="text-3xl"> ₹ {product.price}</h1>
                    <p className="mt-[1rem] text-md text-gray-500">MRP incl. of all taxes</p>
                    <br />


                    {/* Size Selector */}
                    <div className="mt-4">
                        <label className="block text-md font-medium text-white">Select Size:</label>
                        <div className="flex space-x-4 mt-2">
                            {['XS', 'S', 'M', 'L','XL','XXL'].map((s) => (
                                <label key={s} className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="size"
                                        value={s}
                                        checked={size === s}
                                        onChange={(e) => setSize(e.target.value)}
                                        className="hidden"
                                        required
                                    />
                                    <span
                                        className={`px-6 py-2 border-2 rounded-full transition duration-200 ease-in-out ${
                                            size === s ? 'border-red-600' : 'border-gray-500'
                                        }`}
                                    >
                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    <br />

                    <div className="flex ">
                      <span className="font-medium p-2">Quantity:</span>

                      {product.countInStock > 0 && (
                        <div>
                          <select value = {qty} onChange={e => setQty(e.target.value)} className="ml-3 p-1.5 w-[5rem] rounded-lg text-black">
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key = {x + 1} value = {x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    <br />

                    <div className="btn-container ">
                      <button 
                        onClick={addToCartHandler} 
                        disable = {product.countInStock === 0} 
                        className="w-[40%] bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                      >
                        Add to Cart
                      </button>
                    </div>

                    <br /> 

                    < Ratings value = {product.rating} text = {`${product.numReviews} Reviews`} />
                      
                    <br /> <br /> <br /> <hr className="border-gray-700" /> <br /> <br />
                    
                    <button
                      className="w-full mt-0 mb-2 py-2 px-4 bg-zinc-600 hover:bg-zinc-700 active:bg-zinc-700  text-white text-left rounded"
                      onClick={toggleDescription1}
                    >
                      Overview
                      <FontAwesomeIcon icon={isArrowRotated1 ? faAngleUp : faAngleDown} className={`ml-[85%] transition-transform duration-1000 transform ${isArrowRotated1 ? 'rotate-360' : ''}`} />
                     </button>

                    <div
                      className={`overflow-hidden transition-all duration-1000 ${
                        showDescription1 ? "slide-down" : "slide-up"
                      }`}
                    >
                    <p className="whitespace-pre-wrap my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                      {product.description}
                    </p>
                    </div>

                    <button
                      className="w-full mt-0 mb-2 py-2 px-4 bg-zinc-600 hover:bg-zinc-700 active:bg-zinc-700  text-white text-left rounded"
                      onClick={toggleDescription2}
                    >
                      Materials
                      <FontAwesomeIcon icon={isArrowRotated2 ? faAngleUp : faAngleDown} className={`ml-[85%] transition-transform duration-1000 transform ${isArrowRotated2 ? 'rotate-360' : ''}`} />
                     </button>

                    <div
                      className={`overflow-hidden transition-all duration-1000 ${
                        showDescription2 ? "slide-down" : "slide-up"
                      }`}
                    >
                      <p className="whitespace-pre-wrap my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                        FABRIC DETAILS <br />
                        100% Cotton ( 25% Uses Recycled Cotton Fiber ) <br />
                        WASHING INSTRUCTIONS <br />
                        Machine wash cold, Do not Dry Clean, Tumble dry low. <br />
                        COUNTRY OF ORIGIN <br />
                        Vietnam <br />
                        IMPORTED AND MARKETED BY <br />
                        Kamikaze India Pvt. Ltd., <br />
                        Amritsar - 143001, India <br />
                        - The images shown may include colors that are not available. <br />
                        - Clothing using recycled materials is part of our effort to support the reduction of waste and use of new materials. Ratios of recycled material vary by item. Please check “Materials” on the price tag or care label for details. <br />
                        Disclaimer: There may be change in the information on label attached to the product delivered to the customer due to size chosen, date of import, name of manufacturer (in case of manufacturing in India), country of manufacture, etc. The exact details relevant to the product delivered to the customer will reflect in the price tag attached to the product so delivered.
                      </p>
                    </div>

                </div>
            </div>
            <div className="ml-[9rem] mt-[4rem]">
                    < ProductTabs loadingProductReview = {loadingProductReview} userInfo = {userInfo} submitHandler = {submitHandler} rating = {rating} setRating = {setRating} comment = {comment} setComment = {setComment} product = {product} />
             </div>
        </>
      )}
    </>
  )
};

export default ProductDetails;
