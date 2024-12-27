import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

// Private Route
import PrivateRoute from "./components/PrivateRoute.jsx";

//Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx"; // Add this line
import ResetPassword from "./pages/Auth/ResetPassword.jsx";

import Profile from "./pages/User/Profile.jsx";

import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import Home from "./pages/Home.jsx";

import Favourites from "./pages/Products/Favourites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";

import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import Order from "./pages/Orders/Order.jsx";
import UserOrder from "./pages/User/UserOrder.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path = "/" element = {<App />}> 
    <Route path = "/login" element = {<Login/>} />
    <Route path = "/register" element = {<Register/>} />
    <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add this line */}
    <Route path="/reset-password/:token" element={<ResetPassword/>} />
    <Route index = {true} path = "/" element = {<Home/>} />
    <Route path = "/favourite" element = {<Favourites />} />
    <Route path = "/product/:id" element = {<ProductDetails />} />
    <Route path = "/cart" element = {<Cart />} />
    <Route path = "/shop" element = {<Shop />} />
    <Route path = "/user-orders" element = {<UserOrder />} />

    <Route path = "" element = {<PrivateRoute />}>
      <Route path = "/profile" element = {<Profile />} />
      <Route path = "/shipping" element = {<Shipping />} />
      <Route path = "/placeorder" element = {<PlaceOrder />} />
      <Route path = "/order/:id" element = {<Order />} />
    </Route>

    {/*Admin Routes */}
    <Route path = "/admin" element = {<AdminRoute />}>
      <Route path = "userlist" element = {<UserList />} />
      <Route path = "categorylist" element = {<CategoryList />} />
      <Route path = "productlist" element = {<ProductList />} />
      <Route path = "allproductslist" element = {<AllProducts />} />
      <Route path = "orderlist" element = {<OrderList />} />
      <Route path = "product/update/:_id" element = {<ProductUpdate />} />
      <Route path = "dashboard" element = {<AdminDashboard />} />
    </Route>
  </Route>)
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store = {store}>
      <PayPalScriptProvider>
        <RouterProvider router = {router} />
      </PayPalScriptProvider>
    </Provider>
);
