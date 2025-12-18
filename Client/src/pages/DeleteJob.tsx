import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ params }: { params: any }) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("Job deleted successfully");
  } catch (error: any) {
    toast.error(error.response.data.msg);
  }
  return redirect("/dashboard/all-jobs");
};

const DeleteJob = () => {
  return <></>;
};

export default DeleteJob;
