
// Existing columns
export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

// export const roomColumns = [
//   { field: "_id", headerName: "ID", width: 70 },
//   {
//     field: "title",
//     headerName: "Title",
//     width: 230,
//   },
//   {
//     field: "desc",
//     headerName: "Description",
//     width: 200,
//   },
//   {
//     field: "price",
//     headerName: "Price",
//     width: 100,
//   },
//   {
//     field: "maxPeople",
//     headerName: "Max People",
//     width: 100,
//   },
// ];

export const roomColumns = [
  { field: '_id', headerName: 'ID', width: 250 }, // Ensure complete ID visibility
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'price', headerName: 'Price', width: 120 },
  { field: 'maxPeople', headerName: 'Max People', width: 120 },
  { field: 'desc', headerName: 'Description', width: 250 },
  {
    field: 'isCleaned',
    headerName: 'Cleaned Status',
    width: 150,
    renderCell: (params) => (
      <div
        className={`status ${params.row.isCleaned ? "cleaned" : "not-cleaned"}`}
      >
        {params.row.isCleaned ? "Cleaned" : "Not Cleaned"}
      </div>
    ),
  },
  {
    field: 'bookedBy',
    headerName: 'Booked By',
    width: 200,
    renderCell: (params) => (
      <div className="cellWrapper">
        {/* <img
          src={params.row.bookedBy?.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="image"
        /> */}
        {params.row.bookedBy?.name || 'Unbooked'}
      </div>
    ),
  },
];


// New Worker Columns
export const workerColumns = [
  { field: "_id", headerName: "ID", width: 400 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    renderCell: (params) => (
      <div className="cellWithImg">
        <img
          className="cellImg"
          src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
          alt="worker avatar"
        />
        {params.row.name}
      </div>
    ),
  },
  {
    field: "assignedRoomId",
    headerName: "Assigned Room ID",
    width: 180,
    renderCell: (params) => (
      <span>{params.row.assignedRoomId ? params.row.assignedRoomId : "N/A"}</span>
    ),
  },
  {
    field: "isFree",
    headerName: "Is Free",
    width: 100,
    renderCell: (params) => (
      <span className={`status ${params.row.isFree ? "free" : "busy"}`}>
        {params.row.isFree ? "Yes" : "No"}
      </span>
    ),
  },
];

export default { userColumns, hotelColumns, roomColumns, workerColumns };
