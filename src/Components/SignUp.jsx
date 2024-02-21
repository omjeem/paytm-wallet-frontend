import { Heading } from "./Heading";
import { SubHeading } from "./SubHeading";
import { InputBox } from "./InputBox";
import { Button } from "./Button";
import { BottomWarning } from "./BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { pleaseEnterAllDetails, signedUpSuccessfull, userNameAlreadyTaken } from "../Toasts";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;



export function SignUp() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const api = API_URL


  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign Up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox onChange={(e) => {
          setFirstName(e.target.value)
        }} placeholder="Om" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value)
        }} placeholder="Mishra" label={"Last Name"} />
        <InputBox onChange={(e) => {
          setUserName(e.target.value)
        }} placeholder="omjeem" label={"Username"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="12345" label={"Password"} />

        <div className="pt-4">
          <Button onClick={async () => {
            if (firstName == '' || lastName == "" || username == "" || password == "") {
              {pleaseEnterAllDetails()}
              return;
            }
             try {
              const response = await toast.promise(
                axios.post(api + "/api/v1/user/signup", {
                  username,
                  password,
                  firstName,
                  lastName
                }),
                {
                  pending: 'Loading... 🕒',
                  success: 'Sign Up Successfull ! 🎉',
                  error: 'Username already taken'
                }
                , { autoClose: 2000, pauseOnHover: false, });
              localStorage.setItem("token", response.data.token)
              navigate("/dashboard")
            } catch (e) {
              console.log("Error: ", e)
            }


          }} label={"Sign Up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Login"} to={"/signin"} />
      </div>
    </div>
  </div>
}