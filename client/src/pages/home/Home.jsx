import { useSelector } from "react-redux";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  const bookingHistory = useSelector((state) => state.booking.bookingHistory);

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <h1 className="homeTitle">Your Booking History</h1>
        {bookingHistory.length === 0 ? (
          <p>No bookings made yet.</p>
        ) : (
          <ul>
            {bookingHistory.map((booking, index) => (
              <li key={index}>
                <strong>Hotel ID:</strong> {booking.hotelId},{" "}
                <strong>Rooms:</strong> {booking.rooms.join(", ")},{" "}
                <strong>Dates:</strong> {new Date(booking.dates[0]).toDateString()}{" "}
                to {new Date(booking.dates[booking.dates.length - 1]).toDateString()}
              </li>
            ))}
          </ul>
        )}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
