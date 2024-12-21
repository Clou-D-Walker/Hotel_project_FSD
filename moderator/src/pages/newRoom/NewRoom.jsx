import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState("");

  const { data, loading, error } = useFetch("http://localhost:8800/api/hotels");

  // Handle input change
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle click and prevent duplicates
  const handleClick = async (e) => {
    e.preventDefault();

    if (!hotelId) {
      alert("Please select a hotel.");
      return;
    }

    if (!rooms.trim()) {
      alert("Please enter room numbers.");
      return;
    }

    // Ensure unique room numbers
    const roomNumbers = Array.from(
      new Set(rooms.split(",").map((room) => room.trim()))
    ).map((room) => ({ number: room }));

    try {
      console.log("Sending data:", { ...info, roomNumbers });
      const response = await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
      console.log("Server response:", response.data);
      alert("Room(s) added successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Error adding rooms:", err);
      alert("An error occurred while adding rooms. Please try again.");
    }
  };

  console.log("Room info:", info);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Give comma-separated room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => {
                    console.log("Selected hotelId:", e.target.value); // Debug log
                    setHotelId(e.target.value);
                  }}
                >
                  <option value="">Select a hotel</option>
                  {loading
                    ? "Loading..."
                    : data &&
                    data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>
                        {hotel.name}
                      </option>
                    ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
