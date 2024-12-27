import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";
import { Link } from "react-router-dom";

const Header = () => {
    const {data, isLoading, error} = useGetTopProductsQuery();
    
    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <h1>Error!</h1>
    }

  return (
    <>
      <div>
        <div className="flex justify-center items-center">
          <Link to = "/"><img src="uploads\logo.png" alt="" className=" h-16"/></Link>
        </div>
        <div className="flex justify-center items-center p-8">
          <ProductCarousel />
        </div>

        <h1 className="mx-20 my-6 p-3 text-4xl font-semibold">Featured Products</h1>

        <div className="xl:block lg:hidden md:hidden sm:hidden">
            <div className="flex flex-wrap px-12">
                {data.map((product) => 
                    <div key = {product._id}>
                        <SmallProduct product = {product} />
                    </div>
                )}
            </div>
        </div>
                
        </div>
    </>
  )
};

export default Header;
