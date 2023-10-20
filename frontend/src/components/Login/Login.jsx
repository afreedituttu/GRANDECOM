import React, { useState } from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import styles from '../../styles/style';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {server} from '../../server'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e)=> {
      e.preventDefault();
      console.log(email, password);

      await axios.post(`${server}/user/login-user`,{
        email,
        password
      },{withCredentials:true}).then((response)=>{
        console.log('success');
        console.log(response);
        navigate('/')
      }).catch((error)=>{
        console.log(error);
      })
    }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-500"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-non focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-500"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible?"text":"password"}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-non focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible?<AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={()=>{setVisible((preVal)=>{return !preVal})}}
                />:<AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={()=>{setVisible((preVal)=>{return !preVal})}}
                />}
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
                <div className={`${styles.noramlFlex}`}>
                    <input type="checkbox" name="remember-me" id="remember-me" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        remember me
                    </label>
                </div>
                <div className="text-sm">
                    <a href=".forgetpassword" className="font-medium text-blue-600 hover:text-blue-500">
                        Forget your password
                    </a>
                </div>
            </div>
            <button type="submit" className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-900">SUBMIT</button>
            <div className={`${styles.noramlFlex} w-full`}>
                <h4>Dont having any account?</h4>
                <Link to='/sign-up' className='text-blue-600 pl-2'>
                    Sign Up
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
