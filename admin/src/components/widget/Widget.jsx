// import "./widget.scss";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
// import { useState, useEffect } from "react";

// const Widget = ({ type }) => {
//   const [count, setCount] = useState(0); // Count of items (users, hotels, rooms)
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   useEffect(() => {
//     const fetchData = async () => {
//       let url;

//       // Define the URL based on the widget type
//       switch (type) {
//         case "user":
//           url = "http://localhost:8800/api/users";
//           break;
//         case "hotel":
//           url = "http://localhost:8800/api/hotels";
//           break;
//         case "rooms":
//           url = "http://localhost:8800/api/rooms";
//           break;
//         case "balance":
//           setCount(500); // Static balance
//           setLoading(false);
//           return;
//         default:
//           setError("Invalid widget type");
//           setLoading(false);
//           return;
//       }

//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch data from ${url}`);
//         }
//         const data = await response.json();

//         if (type === "rooms") {
//           // Calculate room count based on roomNumbers array
//           const totalRooms = data.reduce(
//             (acc, room) => acc + room.roomNumbers.length,
//             0
//           );
//           setCount(totalRooms);
//         } else {
//           // For users and hotels, count the array length
//           setCount(data.length);
//         }
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [type]);

//   // Define the widget data structure
//   const data =
//     {
//       user: {
//         title: "USERS",
//         isMoney: false,
//         link: "See all users",
//         icon: (
//           <PersonOutlinedIcon
//             className="icon"
//             style={{
//               color: "crimson",
//               backgroundColor: "rgba(255, 0, 0, 0.2)",
//             }}
//           />
//         ),
//       },
//       hotel: {
//         title: "HOTELS",
//         isMoney: false,
//         link: "View all hotels",
//         icon: (
//           <ShoppingCartOutlinedIcon
//             className="icon"
//             style={{
//               backgroundColor: "rgba(218, 165, 32, 0.2)",
//               color: "goldenrod",
//             }}
//           />
//         ),
//       },
//       rooms: {
//         title: "ROOMS",
//         isMoney: false,
//         link: "View all rooms",
//         icon: (
//           <MonetizationOnOutlinedIcon
//             className="icon"
//             style={{
//               backgroundColor: "rgba(0, 128, 0, 0.2)",
//               color: "green",
//             }}
//           />
//         ),
//       },
//       balance: {
//         title: "BALANCE",
//         isMoney: true,
//         link: "See details",
//         icon: (
//           <AccountBalanceWalletOutlinedIcon
//             className="icon"
//             style={{
//               backgroundColor: "rgba(128, 0, 128, 0.2)",
//               color: "purple",
//             }}
//           />
//         ),
//       },
//     }[type] || {};

//   return (
//     <div className="widget">
//       <div className="left">
//         <span className="title">{data.title}</span>
//         <span className="counter">
//           {data.isMoney && "$"} {loading ? "Loading..." : count}
//         </span>
//         <span className="link">{data.link}</span>
//       </div>
//       <div className="right">
//         {error ? (
//           <span className="error">{error}</span>
//         ) : (
//           <>
//             <div className="percentage positive">
//               <KeyboardArrowUpIcon />
//               20%
//             </div>
//             {data.icon}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Widget;

import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useState, useEffect } from "react";

const Widget = () => {
  const [userCount, setUserCount] = useState(0);
  const [hotelCount, setHotelCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [balance, setBalance] = useState(500); // Static balance
  const [userError, setUserError] = useState(null);
  const [hotelError, setHotelError] = useState(null);
  const [roomError, setRoomError] = useState(null);

  useEffect(() => {
    // Fetch user data
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8800/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users data");
        }
        const data = await response.json();
        setUserCount(data.length);
      } catch (err) {
        setUserError(err.message);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Fetch hotel data
    const fetchHotels = async () => {
      try {
        const response = await fetch("http://localhost:8800/api/hotels");
        if (!response.ok) {
          throw new Error("Failed to fetch hotels data");
        }
        const data = await response.json();
        setHotelCount(data.length);
      } catch (err) {
        setHotelError(err.message);
      }
    };

    fetchHotels();
  }, []);
  // });

  useEffect(() => {
    // Fetch room data
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:8800/api/rooms");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms data");
        }
        const data = await response.json();
        const totalRooms = data.reduce(
          (acc, room) => acc + room.roomNumbers.length,
          0
        );
        setRoomCount(totalRooms);
      } catch (err) {
        setRoomError(err.message);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">USERS</span>
        <span className="counter">
          {userError ? "Error: " + userError : userCount}
        </span>
        <span className="link">See all users</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          20 %
        </div>
        <PersonOutlinedIcon
          className="icon"
          style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
          }}
        />
      </div>

      <div className="left">
        <span className="title">HOTELS</span>
        <span className="counter">
          {hotelError ? "Error: " + hotelError : hotelCount}
        </span>
        <span className="link">View all hotels</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          20 %
        </div>
        <ShoppingCartOutlinedIcon
          className="icon"
          style={{
            backgroundColor: "rgba(218, 165, 32, 0.2)",
            color: "goldenrod",
          }}
        />
      </div>

      <div className="left">
        <span className="title">ROOMS</span>
        <span className="counter">
          {roomError ? "Error: " + roomError : roomCount}
        </span>
        <span className="link">View all rooms</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          20 %
        </div>
        <MonetizationOnOutlinedIcon
          className="icon"
          style={{
            backgroundColor: "rgba(0, 128, 0, 0.2)",
            color: "green",
          }}
        />
      </div>

      <div className="left">
        <span className="title">BALANCE</span>
        <span className="counter">{balance}</span>
        <span className="link">See details</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          20 %
        </div>
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: "rgba(128, 0, 128, 0.2)",
            color: "purple",
          }}
        />
      </div>
    </div>
  );
};

export default Widget;
