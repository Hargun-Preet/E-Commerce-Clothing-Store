import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavouriteProduct } from "../../redux/features/favourites/favouriteSlice";
import Product from "./Product";


const Favourites = () => {
    const favourites = useSelector(selectFavouriteProduct);

    return (
        <>
            <div className="flex justify-center items-center">
                <Link to="/">
                    <img src="../../../../uploads/logo.png" alt="logo" className="h-16" />
                </Link>
            </div>

            <div className="ml-[10rem]">
                <h1 className="text-3xl ml-[3rem] mt-[3rem]">Favourite Products</h1>

                <div className="flex flex-wrap">
                    {favourites.length === 0 ? (
                        <p className="text-lg ml-[3rem] mt-[3rem]">No favourite products found. Click on the Heart Icon on the Product to Add to Favourites.</p>
                    ) : (
                        favourites.map((product) => (
                            <Product key={product._id} product={product} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Favourites;