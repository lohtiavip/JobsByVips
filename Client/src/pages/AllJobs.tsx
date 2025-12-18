import { createContext, useContext } from "react";
import JobContainer from "../components/JobContainer";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router";
import SearchContainer from "../components/SearchContainer";

const AllJobsContext = createContext<Root>({} as Root);

export const loader = async ({ request }: { request: any }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get("/jobs", {
      params,
    });

    return {
      data: data.data,
      searchValues: { ...params },
    };
    return data as Data;
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();
  console.log("DATA", data);
  console.log("searchValues", searchValues);
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  );
};

export default AllJobs;
export const useAllJobsContext = () => useContext(AllJobsContext);

export interface Root {
  data: Data;
  searchValues: SearchParamType;
}

export interface Data {
  totalJobs: number;
  numOfPages: number;
  currentPage: number;
  jobs: Job[];
}

export interface Job {
  _id: string;
  company: string;
  position: string;
  jobStatus: string;
  jobType: string;
  jobLocation: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SearchParamType {
  search: string;
  jobStatus: string;
  jobType: string;
  sort: string;
}
