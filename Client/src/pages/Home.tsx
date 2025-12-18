import { useEffect } from "react";
import { Outlet } from "react-router";

export const loader = async () => {};
const Home = () => {
  useEffect(() => {}, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Home;
