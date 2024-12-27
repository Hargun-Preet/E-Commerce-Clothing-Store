import { useEffect } from "react";
import { FaHeart, FaRegHeart} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToFavourites, removeFromFavourites, setFavourite } from "../../redux/features/favourites/favouriteSlice";
import { addFavouriteToLocalStorage, getFavouritesFromLocalStorage, removeFavouriteFromLocalStorage } from "../../Utils/localStorage";

const HeartIcon = ({product}) => {
    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.favourites) || [];
    const isFavourites = favourites.some((p) => p._id === product._id);

    useEffect(() => {
        const favouritesFromLocalStorage = getFavouritesFromLocalStorage();
        dispatch(setFavourite(favouritesFromLocalStorage));
    }, []);

    const toggleFavourites = () => {
        if (isFavourites) {
            dispatch(removeFromFavourites(product));
            //remove the product from localStorage as well
            removeFavouriteFromLocalStorage(product._id);
        } else {
            dispatch(addToFavourites(product));
            //add the product to localStorage as well
            addFavouriteToLocalStorage(product);
        }
    };

  return (
    <div className="absolute text-2xl top-5 right-5 cursor-pointer" onClick={toggleFavourites}>
      {isFavourites ? (<FaHeart className="text-red-600"/>) : (<FaRegHeart className="text-black" />)}
    </div>
  )
};

export default HeartIcon;
