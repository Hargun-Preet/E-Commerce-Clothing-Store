import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {

    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    
    const [createOrder, {isLoading, error}] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate("/shipping");
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const dispatch = useDispatch();

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems.map(item => ({
                    ...item,
                    size: item.size // Ensure size is included
                })),
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error);
        }
    };

  return (
    <>
      <ProgressSteps step1 step2 step3/>

      <div className="container flex justify-around items-center mx-auto mt-[3rem]">
        {cart.cartItems.length === 0 ? (
            <Message>Your Cart is Empty</Message>
        ) : (
            <div className="border-collapse">
                <table>
                <thead>
                    <tr>
                        <td className="px-3 py-2 text-left align-top border-r border-b border-gray-500">Image</td>
                        <td className="px-4 py-2 text-left border-r border-b border-gray-500">Product</td>
                        <td className="px-4 py-2 text-left border-r border-b border-gray-500">Quantity</td>
                        <td className="px-4 py-2 text-left border-r border-b border-gray-500">Size</td>
                        <td className="px-4 py-2 text-left border-r border-b border-gray-500">Price</td>
                        <td className="px-4 py-2 text-left border-b border-gray-500">Total</td>
                    </tr>
                </thead>

                <tbody>
                    {cart.cartItems.map((item, index) => (
                        <tr key={index}>
                            <td className="p-2 border-r border-b border-gray-500">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover"/>
                            </td>

                            <td className="p-2 border-r border-b border-gray-500">
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </td>
                            <td className="p-2 text-center border-r border-b border-gray-500">{item.qty}</td>
                            <td className="p-2 text-center border-r border-b border-gray-500">{item.size}</td>
                            <td className="p-2 text-right border-r border-b border-gray-500">{item.price.toFixed(2)}</td>
                            <td className="p-2 text-right  border-b border-gray-500">₹ {(item.qty * item.price).toFixed(2)}</td>
                        </tr>
                    ))}

                    
                </tbody>
                </table>

            </div>
        )}
      </div>

      <div className="lg:pr-10 lg:pl-20 mt-8">
                        <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
                        <div className="flex justify-between flex-wrap p-4 bg-[#181818]">
                            <ul className="text-lg">
                                <li>
                                    <span className="font-semibold mb-4">Items: </span>
                                        ₹ {cart.itemsPrice}
                                </li>

                                <li>
                                    <span className="font-semibold mb-4">Shipping: </span>
                                        ₹ {cart.shippingPrice}
                                </li>

                                <li>
                                    <span className="font-semibold mb-4">Tax: </span>
                                        ₹ {cart.taxPrice}
                                </li>

                                <li>
                                    <span className="font-semibold mb-4">Total: </span>
                                        ₹ {cart.totalPrice}
                                </li>
                            </ul>

                            {error && <Message variant = "danger">{error.data.message}</Message>}

                            <div className="items-right">
                                <h2 className="text-2xl font-semibold mb-4">
                                    Shipping
                                </h2>
                                <p>
                                    <strong>Address: </strong>
                                    {cart.shippingAddress.address},{""} 
                                    {cart.shippingAddress.city}{""},
                                    {cart.shippingAddress.postalCode},{""}
                                    {cart.shippingAddress.country}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </div>
                        </div>

                        <div className="flex justify-around items-center">
                        <button type="button" className="bg-red-500 hover:bg-green-400 text-white py-2 px-4 rounded-full text-lg w-[30%] mt-4" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</button>
                        </div>
                        {isLoading && <Loader/>}
                </div>
    </>
  )
}

export default PlaceOrder
