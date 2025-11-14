import React, { useContext, useState } from "react";
import bg from "../assets/authBg.png";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext";
import axios from "axios";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl, userData, setUserData } = useContext(userDataContext);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUserData(result.data)
      setLoading(false);
      navigate("/")
    } catch (error) {
      setUserData(null)
      setErr(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSignIn}
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] 
      backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]"
      >
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Sign In to
          <span className="text-blue-400"> Virtual Assistant</span>
        </h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent
        text-white placeholder-gray-300 px-[20px] py-[10px] rounded-lg text-[18px]"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div
          className="relative w-full h-[60px] border-2 border-white bg-transparent
        text-white rounded-lg text-[18px]"
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px] rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!showPassword && (
            <IoMdEye
              className="absolute top-4.5 right-3 w-6 h-6 text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
          {showPassword && (
            <IoMdEyeOff
              className="absolute top-4.5 right-3 w-6 h-6 text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>
        {err.length > 0 && <p className="text-red-500 text-xs">*{err}</p>}
        <button
          className="min-w-[150px] h-[60px] bg-white rounded-lg text-[19px] mt-[30px]
         text-black font-semibold hover:bg-slate-200 transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <p
          onClick={() => navigate("/signup")}
          className="text-white text=[18px] cursor-pointer"
        >
          Create a new account ?<span className="text-blue-400"> Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
