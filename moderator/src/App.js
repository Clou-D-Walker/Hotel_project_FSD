import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import WorkerList from "./pages/worker/WorkerList"; // Ensure this import is correct
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
// import Profile from "./components/profile/Profile";
// import Profile from "./components/profile/Profile.jsx";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          
          <Route path="users">
            <Route index element={<List columns={userColumns} />} />
            <Route path=":userId" element={<Single />} />
            <Route path="new" element={<New inputs={userInputs} title="Add New User" />} />
          </Route>
          
          <Route path="hotels">
            <Route index element={<List columns={hotelColumns} />} />
            <Route path=":productId" element={<Single />} />
            <Route path="new" element={<NewHotel />} />
          </Route>
          
          <Route path="rooms">
            <Route index element={<List columns={roomColumns} />} />
            <Route path=":productId" element={<Single />} />
            <Route path="new" element={<NewRoom />} />
          </Route>

          <Route path="worker" element={<WorkerList />} /> {/* Moved here */}
          // Add this route in your router configuration
          {/* <Route path="/profile/:id" element={<Profile />} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
