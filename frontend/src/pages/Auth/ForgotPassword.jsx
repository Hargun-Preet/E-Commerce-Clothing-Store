// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { useForgotPasswordMutation } from '../../redux/api/usersApiSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword({ email }).unwrap();
            toast.success('Password reset email sent');
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    return (
        <div>
                    <div>
                <section className="pl-[10rem] flex flex-wrap ">
                    <div className="mr-[4rem] mt-[5rem]">
                        <h1 className="text-2xl font-semibold mb-4">
                            Forgot Password
                        </h1>

                        <form onSubmit = {submitHandler} className="container w-[40rem]">
                            <div className="my-[2rem]">
                                <label htmlFor="email" className="block text-sm font-medium text-white">E-mail Address</label>

                                <input 
                                type="email" 
                                id="email" 
                                className="mt-1 p-2 border rounded w-full"
                                placeholder="Enter Your E-mail Address"
                                value = {email}
                                onChange = {e => setEmail(e.target.value)} 
                                />
                            </div>

                            <button disabled = {isLoading} type = "submit" className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]" > {isLoading ? 'Sending...' : 'Send Reset Link'}</button>

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
        </div>
    );
};

export default ForgotPassword;
