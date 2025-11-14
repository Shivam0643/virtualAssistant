import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/userContext";
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import aiImg from "../assets/ai.gif"
import userImg from "../assets/user.gif"

const Home = () => {

  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate()
  const [listening, setListening] = useState(false)
  const [userText, setUserText] = useState("")
  const [aiText, setAiText] = useState("")
  const [ham, setHam] = useState(false)
  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null)
  const isRecognizingRef = useRef(false)
  const synth = window.speechSynthesis


  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`,
        {withCredentials: true}
      )
      setUserData(null)
      navigate('/signin');
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }

  const startRecongnition = () => {
   if(isSpeakingRef.current && !isRecognizingRef.current){
     try {
      recognitionRef.current?.start()
      console.log("Recognition requested to start")
    } catch (error) {
      if(!error.message !== "InvalidStateError"){
        console.error("Start Error: ", error)
      }
    }
   }
  }

  const speak = (text) => {
    const utterence = new SpeechSynthesisUtterance(text)
    utterence.lang = "hi-IN"
    const voices = synth.getVoices()
    const hindiVoice = voices.find(v => v.lang === "hi-IN");
    if(hindiVoice){
      utterence.voice = hindiVoice;
    }

    isSpeakingRef.current = true
    utterence.onend = () => {
      setAiText("")
      isSpeakingRef.current = false
      setTimeout(() => {
        startRecongnition()
      }, 800)
    }
    synth.cancel()
    synth.speak(utterence)
  } 

  const handleCommand = (data) => {
    const {type, userInput, response} = data;
    speak(response)

    if(type === 'google-search'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank')
    }

    if(type === 'calculator-open'){
      window.open(`https://www.google.com/search?q=calculator`, '_blank')
    }

    if(type === 'instagram-open'){
      window.open(`https://www.instagram.com/`, '_blank')
    }

    if(type === 'facebook-open'){
      window.open(`https://www.facebook.com/`, '_blank')
    }

    if(type === 'weather-show'){
      window.open(`https://www.google.com/search?q=weather`, '_blank')
    }

    if(type === 'youtube-search' || type === 'youtube-play'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank')
    }
  } 

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new SpeechRecognition()
    recognition.continuous = true,
    recognition.lang = "en-US"
    recognition.interimResults = false;

    recognitionRef.current=recognition

    let isMounted = true; //Flag to avoid setState on unmounted component

    const startTimeout = setTimeout(() => {
      if(isMounted && !isSpeakingRef.current && !isRecognizingRef.current){
        try {
          recognition.start()
          console.log("Recognition requested to start")
        } catch (error) {
          if(error.name !== "InvalidStateError"){
            console.error(error)
          }
        }
      }
    }, 1000)

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true)
    }

    recognition.onend = () => {
      isRecognizingRef.current = false;
      setListening(false)
      if(isMounted && !isSpeakingRef.current){
        setTimeout(() => {
          if(isMounted){
            try {
              recognition.start()
              console.log("Recognition restarted")
            } catch (error) {
              if(error.name !== "InvalidStateError"){
                console.log(error)
              }
            }
          }
        }, 1000)
      }
    }


    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);
      isRecognizingRef.current = false;
      setListening(false)
      if(event.error !== "aborted" && !isSpeakingRef.current){
        setTimeout(() => {
          if(isMounted){
            try {
              recognition.start()
              console.log("Recognition restarted after error")
            } catch (error) {
              if(error.name !== "InvalidStateError"){
                console.log(error)
              }
            }
          }
        }, 1000)
      }
    }

    recognition.onresult= async (e)=> {
      const transcript = e.results[e.results.length-1][0].transcript.trim()

      if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
        setAiText("")
        setUserText(transcript)
        recognition.stop()
        isRecognizingRef.current = false
        setListening(false)
      const data = await getGeminiResponse(transcript)
      console.log(data)
      handleCommand(data)
      setAiText(data.response)
      setUserText("")
      }
    }

      const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`);
      greeting.lang = "hi-IN"
      window.speechSynthesis.speak(greeting);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout)
      recognition.stop()
      setListening(false)
      isRecognizingRef.current = false
    }

  }, [])

  return (
    <div
      className="relative w-full h-screen bg-gradient-to-t from-black to-[#02023d] 
    flex justify-center items-center flex-col gap-4 overflow-hidden"
    >
      <CgMenuRight
      onClick={()=>setHam(true)}
      className="lg:hidden text-white absolute top-[20px] right-[20px] 
      w-[25px] h-[25px]"/>

      <div className={`absolute top-0 w-full h-full bg-[#00000053] backdrop-blur-lg p-5
      flex flex-col gap-5 items-start ${ham?"translate-x-0":"translate-x-full"} transition-transform duration-300`}>
        <RxCross1
        onClick={()=>setHam(false)}
        className=" text-white absolute top-[20px] right-[20px] 
        w-[25px] h-[25px]"/>

        <button
      onClick={handleLogout}
        className=" min-w-[150px] h-[60px] bg-white rounded-lg text-[19px]
         text-black cursor-pointer font-semibold hover:bg-slate-200 transition-all duration-200"
      >
        Log Out
      </button>
      <button
      onClick={()=>navigate("/customize")}
        className=" min-w-[150px] h-[60px] bg-white rounded-lg text-[19px]
         text-black cursor-pointer font-semibold hover:bg-slate-200 transition-all duration-200 px-5 2.5"
      >
        Customize Your Assistant
      </button>
      <div className="w-full h-[2px] bg-gray-400"></div>
      <h1 className="text-white font-semibold text-[19px]">History</h1>
      <div className="w-full h-[400px] gap-5 overflow-y-auto flex flex-col">
          {userData.history?.map((his, userId) => (
            <span
            key={userId}
            className="text-gray-200 text-[18px]">{his}</span>
          ))}
      </div>
      </div>

      <button
      onClick={handleLogout}
        className="absolute top-[20px] right-[20px] hidden lg:block min-w-[150px] h-[60px] bg-white rounded-lg text-[19px] mt-[30px]
         text-black cursor-pointer font-semibold hover:bg-slate-200 transition-all duration-200"
      >
        Log Out
      </button>
      <button
      onClick={()=>navigate("/customize")}
        className="absolute top-[100px] right-[20px] hidden lg:block min-w-[150px] h-[60px] bg-white rounded-lg text-[19px] mt-[30px]
         text-black cursor-pointer font-semibold hover:bg-slate-200 transition-all duration-200 px-5 2.5"
      >
        Customize Your Assistant
      </button>
      <div
        className="w-[300px] h-[400px] flex justify-center items-center 
      overflow-hidden rounded-4xl shadow-lg "
      >
        <img
          src={userData?.assistantImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-white text-[18px] font-semibold">
        I'm {userData?.assistantName}
      </h1>
      {!aiText && <img src={userImg} alt="" className="w-[200px]"/>}
      {aiText && <img src={aiImg} alt="" className="w-[200px]"/>}
      <h1 className="text-white text-[18px] font-semibold text-wrap">{userText ? userText : aiText ? aiText : null}</h1>
    </div>
  );
};

export default Home;
