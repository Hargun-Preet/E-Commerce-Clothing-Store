import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full p-4 relative">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <div className="w-full h-80 overflow-hidden rounded bg-[#f4f4f4]"> {/* Container for the image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain" // Ensure the image covers the container
            />
          </div>
        </Link>
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <p className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-md font-medium mr-0.5 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ₹{product.price}
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Product;