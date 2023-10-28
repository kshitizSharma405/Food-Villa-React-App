import React, { lazy, useState, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import About from "./components/about.js";
import Error from "./components/error";
import Contact from "./components/contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Profile from "./components/ProficeClass";
import Shimmer from "./components/Shimmer";
// import Instamart from "./components/Instamart";
//Lazy Loading
//Chunking
//On Demand import
const About = lazy(() => import("./components/About"));

const Instamart = lazy(() => import("./components/Instamart.js"));

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
  console.log(useState());
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantMenu />,
      },
      {
        path: "/instamart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Instamart />
          </Suspense>
        ),
      },
    ],
  },
]);

root.render(<RouterProvider router={appRouter} />);
