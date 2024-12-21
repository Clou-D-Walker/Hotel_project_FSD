import React, { useEffect, useState } from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "axios";
import { Tab } from "@mui/material";

const List = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/rooms");
        if (response.data && Array.isArray(response.data)) {
          setRooms(response.data);
        } else {
          throw new Error("Invalid response format");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };


    fetchRooms();
  }, []);

  const handleDelete = async (roomId) => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
      // const config = {
      //   // headers: {
      //   //   Authorization: `Bearer ${token}`,
      //   // },
      // };

      await axios.delete(`http://localhost:8800/api/rooms/${roomId}`);
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
      alert("Room deleted successfully!");
    } catch (err) {
      alert(`Error deleting room: ${err.response?.data || err.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Room ID</TableCell>
            <TableCell className="tableCell">Title</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Max People</TableCell>
            <TableCell className="tableCell">Is Cleaned</TableCell>
            <TableCell className="tableCell">Booked By</TableCell>
            <TableCell className="tableCell">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room._id}>
              <TableCell className="tableCell">{room._id || "N/A"}</TableCell>
              <TableCell className="tableCell">{room.title || "N/A"}</TableCell>
              <TableCell className="tableCell">{room.desc || "N/A"}</TableCell>
              <TableCell className="tableCell">{room.price !== undefined ? room.price : "N/A"}</TableCell>
              <TableCell className="tableCell">{room.maxPeople || "N/A"}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${room.isCleaned ? "cleaned" : "not-cleaned"}`}>
                  {room.isCleaned ? "Cleaned" : "Not Cleaned"}
                </span>
              </TableCell>
              <TableCell className="tableCell">
                {room.bookedBy ? (
                  <div>
                    <p>{room.bookedBy.username}</p>
                    <p>{room.bookedBy.email}</p>
                  </div>
                ) : (
                  "Not Booked"
                )}
              </TableCell>
              <TableCell className="tableCell">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleDelete(room._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
