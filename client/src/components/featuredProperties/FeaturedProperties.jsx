import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/hotels?featured=true&limit=15`
  );

  return (
    <div className="fpContainer">
      {loading ? (
        "Loading"
      ) : (
        <div className="fpScrollWrapper">
          <button className="scrollButton left" onClick={() => scrollLeft()}>
            ◀
          </button>
          <div className="fp">
            {data.map((item) => (
              <div className="fpItem" key={item._id}>
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">
                  Starting from ${item.cheapestPrice}
                </span>
                {item.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="scrollButton right" onClick={() => scrollRight()}>
            ▶
          </button>
        </div>
      )}
    </div>
  );

  // Scroll functions
  function scrollLeft() {
    document.querySelector(".fp").scrollBy({ left: -300, behavior: "smooth" });
  }

  function scrollRight() {
    document.querySelector(".fp").scrollBy({ left: 300, behavior: "smooth" });
  }
};

export default FeaturedProperties;
