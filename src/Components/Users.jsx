import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Icon } from "./Icon";

const API_URL = import.meta.env.VITE_API_URL;
export function Users() {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")
    const [history, setHistory] = useState([])
    const [status, setStatus] = useState(true)
    const [historyFilter, setHistoryFilter] = useState("")
    const api = API_URL

    useEffect(() => {
        axios.get(api + "/api/v1/user/bulk?filter=" + filter, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    useEffect(() => {
        axios.get(api + "/api/v1/account/trasaction?filter=" + historyFilter, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setHistory(response.data.trasaction);

        })
    }, [historyFilter])



    return <>
        <div className="flex justify-between items-center">
            {
                status ? (
                    <div className="font-bold mt-6 text-2xl items-center">
                        Users
                    </div>
                ) : (
                    <div className="font-bold mt-6 text-2xl items-center">
                        Transaction History :-
                    </div>
                )
            }


            <div className="cursor-pointer" onClick={() => {
                if (status == false) {
                    setStatus(true)
                }
                else {
                    setStatus(false)
                }
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                </svg>


            </div>
        </div>

        {
            status ? (
                <div>
                    <div className="my-4">
                        <input onChange={(e) => {
                            setFilter(e.target.value)
                        }} type="text" placeholder="Search Users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
                    </div>
                    {users.map(user => <User user={user} />)}
                </div>
            ) : (
                <div>
                    <div className="my-4">
                        <input onChange={(e) => {
                            setHistoryFilter(e.target.value)
                        }} type="text" placeholder="Search History..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
                    </div>
                    {history.map(history => <History history={history} />)}
                </div>
            )
        }
    </>
}

function User({ user }) {
    const navigate = useNavigate();

    return <div className="rounded-lg bg-gray-100 my-4 flex justify-between p-3">
        <div className="flex">
            <Icon name={user.firstName[0]} />
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName + " " + user.lastName);
            }} label={"Send Money"} />
        </div>
    </div>
}

function History({ history }) {
    const navigate = useNavigate();

    return <div className="rounded-lg bg-gray-100 my-4 flex justify-between p-3 my-4">
        <div className="flex">
            <Icon name={history.username[0]} />
            <div className="flex flex-col justify-center h-ful">
                <div className="ms-3">
                    <div className="text-lg font-medium">
                        {history.username}
                    </div>
                    <div className="text-xs	">
                        {history.time}
                    </div>
                </div>
            </div>
        </div>

        {
            history.status == '+' ? (
                <div className="flex flex-col justify-center h-ful text-2xl font-medium text-green-400 ">
                    {history.status} {history.amount}
                </div>
            ) : (
                <div className="flex flex-col justify-center h-ful text-2xl font-medium ">
                    {history.status} {history.amount}
                </div>
            )
        }


    </div>
}