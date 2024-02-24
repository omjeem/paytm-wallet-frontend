
import { Heading } from "./Heading";
import { SubHeading } from "./SubHeading";
import { InputBox } from "./InputBox";
import { Button } from "./Button";
import { BottomWarning } from "./BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { pleaseEnterAllDetails, wrongCredentials } from "../Toasts";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;


export function SignIn() {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const api = API_URL


  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign In"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e) => {
          setUserName(e.target.value)
        }} placeholder="ex : omjeem" label={"Username"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="ex : omjee@123" label={"Password"} />

        <div className="pt-4">
          <Button onClick={async () => {
            if (username == '' || password == "") {
              { pleaseEnterAllDetails()}
              return;
            }
            try {
              const response = await toast.promise(
                axios.post(api + "/api/v1/user/signin", {
                  username, password
                }),
                {
                  pending: 'Loading... ⏳ Please be patient as we process your request. It may take a few moments.',
                  success: 'Logged In Successfull! 🎉',
                  error: 'Incorrect Username or Password'
                }
                , { autoClose: 2000, pauseOnHover: false, });
              localStorage.setItem("token", response.data.token)
              navigate("/dashboard")
            } catch (e) {
              { wrongCredentials() }
            }



          }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}