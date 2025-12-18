import SmallSideBar from "../components/SmallSideBar";
import BigSideBar from "../components/BigSideBar";
import NavBar from "../components/NavBar";
import Wrapper from "../assets/wrappers/DashboardPage";
import { useContext, createContext, useState } from "react";
import { checkDefaultTheme } from "../main";
import { useNavigate } from "react-router-dom";

import { Outlet, redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch("/user/current-user");
    const user = data.data;
    return user;
  } catch (error) {
    return redirect("/");
  }
};

export interface CurrentUserContextType {
  user: UserTypes;
  showSideBar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSideBar: () => void;
  logoutUser: () => void;
}

export interface UserTypes {
  createdAt: string;
  email: string;
  lastName: string;
  location: string;
  name: string;
  role: string;
  updatedAt: string;
  _id: string;
  avatar: string;
  avatarPublicId: string;
}

const DashboardContext = createContext<CurrentUserContextType>(
  {} as CurrentUserContextType
);

const Dashboard = () => {
  const user = useLoaderData();
  const navigate = useNavigate();

  console.log("user Dashboard", user);

  const [showSideBar, setShowSideBar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme.toString());
  };

  const toggleSideBar = () => {
    console.log("I AM CLICKED SIDEBAR TOGGLE");
    console.log(showSideBar);
    setShowSideBar(!showSideBar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging out...");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSideBar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSideBar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default Dashboard;
