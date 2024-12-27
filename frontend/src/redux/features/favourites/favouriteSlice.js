import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name: "favourites",
    initialState: [],
    reducers: {
        addToFavourites: (state, action ) => {
            // Check if the product is already not in favourite
            if ( !state.some((product) => product._id === action.payload._id)) {
                state.push(action.payload);
            }
        },
        removeFromFavourites: (state, action ) => {
            // Remove the product with the matching id
            return state.filter((product) => product._id !== action.payload._id);
        },
        setFavourite: ( state, action ) => {
            //Set Favourite from localStorage
            return action.payload;
        },
    },
});

export const {addToFavourites, removeFromFavourites, setFavourite} = favouriteSlice.actions;
export const selectFavouriteProduct = (state) => state.favourites;
export default favouriteSlice.reducer;