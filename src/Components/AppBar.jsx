
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "./Icon";
import { loggedOutSuccessfull } from "../Toasts";

const API_URL = import.meta.env.VITE_API_URL;

export function AppBar() {

    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate();
    const api = API_URL

    useEffect(() => {
        axios.get(api + "/api/v1/user/username", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(function (response) {
          setUserInfo(response.data)
        })
    }, [])



    return <div className="px-4 py-4 border-b border-gray-300">

        <div className="flex justify-between items-center">
            <div className="font-bold text-2xl">PayTm Wallet</div>
            {userInfo.userName && (
                <div className="flex items-center">
                    <div className="font-medium ">
                        Hello, {userInfo.userName}
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="ml-2 mr-2 cursor-pointer">

                            <Icon
                                onClick={() => navigate("/updateProfile?username=" + userInfo.userName+"&firstName="+userInfo.firstName+"&lastName="+userInfo.lastName)}
                                name={userInfo.userName[0]}
                            />

                        </div>
                        <div className="items-center ">
                            <button onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/signin")
                                {loggedOutSuccessfull()}
                            }} type="button" class="w-15 h-15  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 me-2 ">Log Out</button>
                        </div>

                    </div>


                </div>
            )}

        </div>
    </div>
}