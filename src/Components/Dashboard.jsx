import { AppBar } from "./AppBar";
import { Balance } from "./Balance";
import { Users } from "./Users";


export function Dashboard() {

    return <div>
        <AppBar />
        <div className="px-6 py-6">
            <Balance />
            <Users />
        </div>
    </div>
}