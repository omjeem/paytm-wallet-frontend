import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export function FirstPage() {
    const navigate = useNavigate();
    const api = API_URL

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/signin");
        } else {
            axios.get(api + "/api/v1/user/username", {
                headers: {
                    Authorization: token
                }
            })
                .then(function (res) {
                    if (res.status === 400) {
                        navigate("/signin");
                    } else {
                        navigate("/dashboard");
                    }
                })
                .catch(function (error) {
                    navigate("/signin");
                });
        }
    }, [navigate]);

    return <div className="flex justify-center items-center h-full pb-40">
        <div className="text-center items-center pt-48">
            <h2 className="text-3xl font-bold mb-2">Please be patient while we fetch your details. Our backend is hosted on a <br></br>serverless cloud provider, which may take longer than usual.</h2>
        </div>
    </div>;
}

