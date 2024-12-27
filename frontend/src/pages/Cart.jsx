import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty}));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  
  return (
    <>
      <div className="flex justify-center items-center"> 
            <Link to = "/"><img src="../../../../uploads/logo.png" alt="logo" className="h-16"/></Link>
      </div>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (<div>Your Cart is Empty! <Link to = "/shop"> Go to Shop </Link> </div>) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

              {cartItems.map((item) => (
                <div>
                  <div key = {item._id} className="flex items-center mt-3 mb-[1rem] pb-2">
                    <div className="w-[5rem] h-[5rem]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                    </div>

                    <div className="flex-1 ml-4">
                      <Link to = {`/product/${item._id}`} className="text
                      white">{item.name}</Link>

                      <div className="flex flex-wrap gap-8">
                        
                        <div className="mt-2 text-white font-bold">
                          ₹{item.price}
                        </div>

                        <div className="mt-2 text-white font-semibold">
                          Size: {item.size}
                        </div>
                      </div>
                    </div>

                    <div className="w-24">
                      <select className="w-full p-1 border rounded text-black" value={item.qty} onChange={e => addToCartHandler(item, Number(e.target.value))}>
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key = {x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <button className="text-gray-400 hover:text-red-500 mr-[5rem]" onClick={() => removeFromCartHandler(item._id)}><FaTrash className="ml-[1rem] mt-[0.5rem]" /></button>
                    </div>

                    

                  </div>
                  <hr className="border-gray-700 my-4"/>
                  </div>
                ))}
                

                <div className="mt-8 w-[40rem]">
                  <div className="p-4 rounded-lg">
                    <p className="text-xl font-semibold mb-2">
                      Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                    </p>

                    <div className="text-2xl font-bold">
                      Total: ₹ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </div>

                    <button className="bg-red-600 hover:bg-red-800 mt-4 py-2 px-4 rounded-full text-lg w-[45%]" disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</button>
                  </div>
                </div>
            </div>
          </>)}
      </div>
    </>
  )
};

export default Cart;
