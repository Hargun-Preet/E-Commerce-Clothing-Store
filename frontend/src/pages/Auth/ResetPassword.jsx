import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/usersApiSlice.js"; // Ensure only one import
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";

const ResetPassword = () => {
  const { token } = useParams(); // Extract the token from URL parameters
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Using useResetPasswordMutation hook from usersApiSlice
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Calling the resetPassword mutation with token and password
      await resetPassword({ token, password }).unwrap();
      toast.success("Password reset successfully");
      navigate("/login"); // Redirect to login page after success
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap ">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4">
                    Reset Password
                </h1>

                <form onSubmit = {submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label htmlFor="password" className="block text-sm font-medium text-white">Enter New Password</label>

                        <input 
                        type="password" 
                        id="password" 
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Enter Your New Password"
                        value = {password}
                        onChange = {e => setPassword(e.target.value)} 
                        />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="password" className="block text-sm font-medium text-white">Confirm Password</label>

                        <input 
                        type="password" 
                        id="confirmPassword" 
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Confirm Password"
                        value = {confirmPassword}
                        onChange = {e => setConfirmPassword(e.target.value)} 
                        />
                    </div>

                    <button disabled = {isLoading} type = "submit" className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]" > {isLoading ? "Resetting..." : "Reset Password"}</button>

                    {isLoading && <Loader />}
                </form>
            </div>

            <img
             src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
             alt=""
             className="fixed right-[1.25%] top-[3%] h-[41rem] w-[45%] xl:block md:hidden sm:hidden rounded-lg"
            /> 
        </section>
    </div>
  );
};

export default ResetPassword;
