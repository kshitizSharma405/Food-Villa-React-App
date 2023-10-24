import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { BtnLogo } from "../assets/img/logo.js";
import { Link } from "react-router-dom";
import { swiggyURLRishikesh } from "../config";
import Restaurants from "./restaurants";
const Body = () => {
  function filterData(text, resData) {
    const filteredData = resData.filter((res) =>
      res?.info?.name?.toLowerCase().includes(text.toLowerCase())
    );
    return filteredData;
  }
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const searchAlgo = function () {
    const data = filterData(searchText, allRestaurants);
    setFilteredRestaurants(data);
  };

  //imported Restaurants functional component that fetch fetch restaurants data from swiggy API and adds restaurants in body

  Restaurants({
    url: swiggyURLRishikesh,
    setFilteredRestaurant: setFilteredRestaurants,
    setAllRestaurant: setAllRestaurants,
  });

  // useEffect(() => {
  //   //API CALL
  //   getRestaurants(swiggyURLRishikesh);
  // }, []);
  // async function getRestaurants(url) {
  //   const data = await fetch(url);
  //   const json = await data.json();
  //   const restaurantList = await json?.data?.cards[5]?.card?.card?.gridElements
  //     ?.infoWithStyle?.restaurants;
  //   setAllRestaurants(restaurantList);
  //   setFilteredRestaurants(restaurantList);
  // }

  //Conditional Rendering
  //if Restaurants are not there => dont render anything (Early Return)
  const count = 10;
  if (!allRestaurants) return null;
  //If restaurant is empty => render Shimmer UI
  return allRestaurants?.length === 0 ? (
    <Shimmer count={count} />
  ) : (
    //If restaurant has data => render actual data
    <>
      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          searchAlgo();
        }}
      >
        <input
          id="searchEng"
          type="text"
          className="search-container"
          value={searchText}
          placeholder="search"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="button" id="search-btn" onClick={searchAlgo}>
          <BtnLogo />
        </button>
      </form>
      <div className="restaurant-container">
        <div className="restaurant-card">
          {filteredRestaurants?.length === 0 ? (
            <h1 style={{ height: "48vh", margin: "auto" }}>
              No Restaurant match your search!!
            </h1>
          ) : (
            filteredRestaurants.map((restaurant) => {
              return (
                <Link
                  to={"/restaurant/" + restaurant?.info?.id}
                  key={restaurant.info.id}
                >
                  {" "}
                  <RestaurantCard {...restaurant.info} />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Body;
