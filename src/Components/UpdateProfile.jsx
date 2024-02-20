import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

export const UpdateProfile = () => {
    const [searchParams] = useSearchParams();
    const username = searchParams.get("username");
    const firstNameParam = searchParams.get("firstName");
    const lastNameParmam = searchParams.get("lastName");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const api = API_URL




    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                <div class="flex flex-col space-y-1.5 pt-6">
                    <h2 class="text-3xl font-bold text-center">Update Your Profile</h2>
                </div>
                <div class="p-3">
                    <div class="flex items-center space-x-4 pb-4">
                        <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span class="text-2xl text-white">{username.charAt(0)}</span>
                        </div>
                        <h3 class="text-2xl font-semibold">{username}</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="space-y-2">

                            <input
                                onChange={(e) => {
                                    setFirstName(e.target.value);

                                }}

                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder= {firstNameParam}
                            />
                            <input
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder={lastNameParmam!=""?lastNameParmam : "Last Name" }
                            />
                            <input
                                onChange={(e) => {
                                    setPassword(e.target.value);

                                }}
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter New Password"
                            />
                        </div>
                        <button onClick={async () => {
                            try {
                                const response = await axios.put( api + "/api/v1/updateProfile", {
                                    data: {
                                        ...(firstName && { firstName }),
                                        ...(lastName && { lastName }),
                                        ...(password && { password }),
                                    }
                                }, {
                                    headers: {
                                        Authorization: localStorage.getItem("token")
                                    }
                                })

                                alert(response.data.message)
                            }
                            catch (err) {
                                alert("Profile Not Updated")
                            }

                        }} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}