import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({product}) => {
    return (
        <div className="w-[20rem] ml-[2rem] p-3">
            
            <div className="relative">
                <Link to = {`/product/${product._id}`}>
                    <img src={product.image} alt={product.name} className="w-80 h-80 bg-white rounded object-contain" />
                </Link>
                <HeartIcon product = {product} />

                <div className="p-4">
                <Link to = {`/product/${product._id}`}>
                        <p className="flex justify-between items-center">
                            <div>{product.name}</div>
                            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">₹{product.price}</span>
                        </p>
                </Link>
                </div>
            </div>
            
        </div>
    )
};

export default SmallProduct;