import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
const useRestaurant = (url) => {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    getRestaurantinfo();
  }, []);
  async function getRestaurantinfo() {
    const data = await fetch(url);

    const json = await data.json();
    // console.log(json);

    const restaurantData = json?.data?.cards[0]?.card?.card?.info;
    // console.log(restaurantData);
    setRestaurant(restaurantData);
  }
  return restaurant;
};
export const useRestaurantMenu = (url) => {
  const [restaurantMenu, setResMenu] = useState("");

  const dispatch = useDispatch();
  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };
  useEffect(() => {
    getRestaurantinfo();
  }, []);
  async function getRestaurantinfo() {
    const data = await fetch(url);
    const json = await data.json();
    const resMenu =
      json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card
        ?.card?.itemCards;
    // console.log(resMenu);
    const resMenuList = resMenu.map((item) => (
      <li key={item?.card?.info?.id}>
        {item?.card?.info?.name}:
        <span>{item?.card?.info?.price.toString().slice(0, -2) + ".00"} </span>
        <button
          onClick={() => addFoodItem(item)}
          className=" w-6 m-2 text-white border rounded-full bg-green-300"
        >
          +
        </button>
      </li>
    ));
    setResMenu(resMenuList);
  }
  return restaurantMenu;
};

export default useRestaurant;
