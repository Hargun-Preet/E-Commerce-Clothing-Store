import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {

    const {data: orders, isLoading, error} = useGetOrdersQuery();


  return (
    <>
     {isLoading ? (<Loader />) : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>) : (
        <div>
            <p className="text-2xl font-semibold mt-4 mb-7 pl-[15rem]">Orders</p>
            <table className="container mx-auto w-2/3">
            <AdminMenu />
            <thead className="w-full border ">
                <tr className="mb-[5rem]">
                    <th className="text-left pl-1 border-r px-2 border-gray-400">Items</th>
                    <th className="text-left pl-1 border-r px-2 border-gray-400">Id</th>
                    <th className="text-left pl-1 border-r px-2 border-gray-400">User</th>
                    <th className="text-left pl-1 border-r px-2 border-gray-400">Data</th>
                    <th className="text-left pl-1 border-r px-2 border-gray-400">Total</th>
                    <th className="text-left pl-1 border-r px-2 border-gray-400">Paid</th>
                    <th className="text-left pl-1 border-r border-gray-400 px-2">Delivered</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                        
                            <img src={order.orderItems[0].image} alt={order._id} className="w-[5rem] pt-4"/>
                        
                        <td className="border-r border-l px-2 border-gray-400">{order._id}</td>

                        <td className="border-r px-2 border-gray-400">{order.user ? order.user.username : "N/A"} </td>

                        <td className="border-r px-2 border-gray-400">{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>

                        <td className="border-r px-2 border-gray-400">₹ {order.totalPrice}</td>

                        <td className="py-2 border-r px-2 border-gray-400">{order.isPaid ? (
                            <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">Completed</p>
                        ) : (
                            <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">Pending</p>
                        )}</td>

                        <td className="px-2 py-2 border-r border-gray-400">
                            {order.isDelivered ? (
                                <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">Completed</p>
                            ) : (
                                <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">Pending</p>
                            )}
                        </td>

                        <td className="px-2 py-2 border-r border-gray-400">
                            <Link to={`/order/${order._id}`}>
                                <button className="bg-blue-400 text-white py-2 px-3 rounded">View Details</button>
                            </Link>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
        </div>
     )} 
    </>
  )
}

export default OrderList
