import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BedIcon from '@mui/icons-material/Bed';
import axios from 'axios';

const Widget = ({ type }) => {
  const [userCount, setUserCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);

  // Fetching user count
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/users"); // Adjust the URL as needed
        setUserCount(response.data.length); // Assuming the response is an array of users
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };
    fetchUserCount();
  }, []);

  // Fetching room count
  useEffect(() => {
    const fetchRoomCount = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/rooms"); // Adjust the URL as needed
        setRoomCount(response.data.length); // Assuming the response is an array of rooms
      } catch (error) {
        console.error("Error fetching room count:", error);
      }
    };
    fetchRoomCount();
  }, []);

  let data;
  let amount;
  let diff;

  switch (type) {
    case "user":
      amount = userCount;  // Dynamic user count
      diff = 17;
      data = {
        title: "CUSTOMERS",
        isMoney: false,
        link: "See all Customers",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        currencySymbol: "",
      };
      break;
    case "Rooms":
      amount = roomCount;  // Dynamic room count
      diff = 0;
      data = {
        title: "ROOMS",
        isMoney: false,
        link: "View all rooms",
        icon: (
          <BedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        currencySymbol: "",
      };
      break;
    case "earning":
      amount = userCount*200;
      diff = 22;
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <CurrencyRupeeIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
        currencySymbol: "₹",
      };
      break;
    case "balance":
      amount = 500;
      data = {
        title: "AMOUNT TO BE SETTLED",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
        currencySymbol: "₹",
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && data.currencySymbol} {amount}
        </span>
        {type === "user" ? (
          <Link to="/users" className="link">
            {data.link}
          </Link>
        ) : type === "Rooms" ? (
          <Link to="/rooms" className="link">
            {data.link}
          </Link>
        ) : (
          <span className="link">{data.link}</span>
        )}
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
