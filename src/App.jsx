import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignUp } from "./Components/SignUp"
import { SignIn } from "./Components/SignIn"
import { Dashboard } from "./Components/Dashboard"
import { SendMoney } from "./Components/SendMoney"
import { FirstPage } from "./Components/FirstPage"
import { UpdateProfile } from "./Components/UpdateProfile"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce />

    </div>
  )
}

export default App
