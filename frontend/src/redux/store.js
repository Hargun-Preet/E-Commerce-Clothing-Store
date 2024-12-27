import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import cartSliceReducer from "./features/cart/cartSlice";
import shopSliceReducer from "./features/shop/shopSlice";
import favouritesReducer from "./features/favourites/favouriteSlice";
import { getFavouritesFromLocalStorage } from "../Utils/localStorage";

const initialFavourites = getFavouritesFromLocalStorage() || [];

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favourites: favouritesReducer,
        cart: cartSliceReducer,
        shop: shopSliceReducer,
    },

    preloadedState: {
        favourites: initialFavourites,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),

    devTools: true,
});

setupListeners(store.dispatch);
export default store;