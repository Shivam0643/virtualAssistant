import React, { useContext, useEffect, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Customize2 = () => {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

   useEffect(() => {
    setAssistantName("");
  }, []);

  const handleUpdateAssistant = async () => {
    try {
        setLoading(true)
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      setUserData(result.data);
      setAssistantName("");
      navigate('/')
    } catch (error) {
      console.log(error);
    } finally {
        setLoading(false)
    }
  };
  return (
    <div
      className="relative w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] 
    flex justify-center items-center flex-col p-[20px]"
    >
        <MdKeyboardBackspace
        onClick={()=>navigate('/customize')}
        className="absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer"/>
      <h1 className="text-white text-[30px] mb-[40px] text-center">
        Enter Your <span className="text-blue-200">Assistant Name</span>
      </h1>
      <input
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
        type="text"
        placeholder="eg. shifra"
        className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent
        text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
      />
      {assistantName && (
        <button
          onClick={() => {
            handleUpdateAssistant();
          }}
          className="min-w-[300px] h-[60px] bg-white rounded-full text-[19px] mt-[30px]
         text-black font-semibold hover:bg-slate-200 transition-all duration-200 cursor-pointer"
         disabled={loading}
        >
         {!loading ? "Finally Create Your Assistant" : "Loading..."}
        </button>
      )}
    </div>
  );
};

export default Customize2;
