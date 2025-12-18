import Wrapper from "../assets/wrappers/StatsContainer";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router";
import StatItem from "../components/StatItem";
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";

export const loader = async () => {
  try {
    const response = await customFetch.get("/user/admin/app-stats");
    console.log("response.data", response.data);
    return response.data.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};
const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        // bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        // bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
