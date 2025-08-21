import React, { useState } from "react";


const Login = () => {
 

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    gender:""
  });

  // function to handle the user input
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // function to login
  const handleLogin = async (event) => {
    event.preventDefault();

    
    setLoginData({
      email: "",
      password: "",
    });

    console.log(loginData)
  };

  return (
   
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-80 h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="email">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-transparent px-2 py-1 border-2 border-black"
              value={loginData.email}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className=" text-blue-600 text-lg font-semibold" htmlFor="password">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className=" text-blue-600 px-2 py-1 border border-black"
              value={loginData.password}
              onChange={handleUserInput}
            />
          </div>
          
          <div className="flex gap-1">
            <label className=" text-blue-600 text-lg font-semibold" htmlFor="gender">
              male
            </label>
            <input
              required
              type="radio"
              name="gender"
              id="gender"
              placeholder="Enter your password"
              className=" text-blue-600 px-2 py-1 border border-black"
              value={loginData.gender="male"}
              onChange={handleUserInput}
            />
          
          </div>
             <div className="flex gap-1">
            <label className=" text-blue-600 text-lg font-semibold" htmlFor="gender1">
              female
            </label>
            <input
              required      
              type="radio"
              name="gender"
              id="gender1"
              placeholder="Enter your password"
              className=" text-blue-600 px-2 py-1 border border-black"
              value={loginData.gender="female"}
              onChange={handleUserInput}
            />
          
          </div>

          {/* guest account access */}
          <div
            onClick={() =>
              setLoginData({ email: "test@gmail.com", password: "Test@123" })
            }
            className="text-center link text-accent cursor-pointer"
          >
            Guest Login
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Login
          </button>

       

          <p className="text-center">
            Don't have an account ?{" "}
           
          </p>
        </form>
      </div>
    
  );
};

export default Login;
