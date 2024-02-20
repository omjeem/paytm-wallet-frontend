import axios from "axios"
import { useEffect, useState } from "react"
const API_URL = import.meta.env.VITE_API_URL

export function Balance() {
    const api = API_URL

    
    const [balance, setBalance] = useState(0)
    useEffect( () => {
         axios.get(api+"/api/v1/account/balance", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(function(response){
            setBalance(response.data.balance)

        })
    }, [])

    return <div className="flex">
        <div className="font-bold text-xl">
            Your balance :-

        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>

}