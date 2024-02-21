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
            axios.get(api+"/api/v1/user/username", {
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

    return null;
}

