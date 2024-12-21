import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Modal from "react-modal";
import "./table.scss";
Modal.setAppElement("#root");

const WorkerList = () => {
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorker, setNewWorker] = useState({ name: "", email: "" });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/workers");
        setWorkers(response.data);
      } catch (err) {
        console.error("Error fetching workers:", err);
        setError(err.message || "An error occurred while fetching workers.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [user]);

  const handleAddWorker = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/api/workers", {
        ...newWorker,
      });
      alert("Worker added successfully!");
      setWorkers([...workers, response.data]); // Update the workers list
      setIsModalOpen(false); // Close the modal
      setNewWorker({ name: "", email: "" }); // Reset form
    } catch (err) {
      console.error("Error adding worker:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add worker");
    }
  };
  const assignRoom = async (workerId) => {
    try {
      const response = await axios.post(
        `http://localhost:8800/api/rooms/assign/${workerId}`,
        {},
        // {
        //   headers: {
        //     Authorization: `Bearer ${user.token}`,
        //   },
        // }
      );
      alert(response.data.message); // Display success message
      // Refresh workers list
      const updatedWorkers = await axios.get("http://localhost:8800/api/workers", {
        // headers: { Authorization: `Bearer ${user.token}` },
      });
      setWorkers(updatedWorkers.data);
    } catch (err) {
      console.error("Error assigning room:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to assign room");
    }
  };
  
  const workerColumns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "assignedRoom",
      headerName: "Assigned Room",
      width: 150,
      valueGetter: (params) =>
        params.row.assignedRoomId ? params.row.assignedRoomId.title : "N/A",
    },
    {
      field: "isFree",
      headerName: "Availability",
      width: 150,
      renderCell: (params) => (
        <div className={`cellWithStatus ${params.row.isFree ? "free" : "busy"}`}>
          {params.row.isFree ? "Free" : "Busy"}
        </div>
      ),
    },
    {
      field: "assign",
      headerName: "Assign",
      width: 150,
      renderCell: (params) => {
        // Check if the worker has an assigned room
        const isAssigned = params.row.assignedRoomId;

        return (
          <button
            className={`assign-button ${isAssigned ? "assigned" : "assign"}`} // Add conditional class
            onClick={() => isAssigned ? null : assignRoom(params.row.id)} // Disable action if already assigned
          >
            {isAssigned ? "Assigned" : "Assign"} {/* Toggle text */}
          </button>
        );
      },
    },
  ];

  const rows = workers.map((worker) => ({
    id: worker._id,
    name: worker.name,
    assignedRoomId: worker.assignedRoomId,
    isFree: worker.isFree,
  }));

  return (
    <div className="workerListContainer">
      <Sidebar />
      <div className="workerListContent">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Worker List
            <button
              className="addButton"
              onClick={() => {
                console.log("Opening modal...");
                setIsModalOpen(true);
              }}
            >
              Add Worker
            </button>

          </div>
          <DataGrid
            rows={rows}
            columns={workerColumns}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(row) => row.id}
            loading={loading || (workers.length === 0 && !error)}
            components={{
              NoRowsOverlay: () => (
                <div style={{ padding: "16px", textAlign: "center" }}>
                  {error ? "Error loading data" : "No workers available"}
                </div>
              ),
            }}
          />
        </div>

        {/* Modal for Adding Worker */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Add Worker"
          className="modal"
          overlayClassName="modalOverlay"
        >
          <h2>Add New Worker</h2>
          <form onSubmit={handleAddWorker} className="addWorkerForm">
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newWorker.name}
                onChange={(e) =>
                  setNewWorker({ ...newWorker, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={newWorker.email}
                onChange={(e) =>
                  setNewWorker({ ...newWorker, email: e.target.value })
                }
                required
              />
            </div>
            <button type="submit">Add Worker</button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="cancelButton"
            >
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default WorkerList;
