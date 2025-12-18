import { Form, useOutletContext } from "react-router";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import FormRow from "../components/FormRow";
import FormRowSelect from "../components/FormRowSelect";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import type { UserTypes } from "./Dashboard";
import SubmitBtn from "../components/SubmitBtn";

interface userT {
  user: UserTypes;
}

export const action = async ({ request }: { request: any }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", data);
    toast.success("Job saved successfully");
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext() as userT;

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue="tester" />
          <FormRow type="text" name="company" defaultValue="bebo" />
          <FormRow
            type="text"
            name="jobLocation"
            label="job location"
            defaultValue={user?.location}
          />
          <FormRowSelect
            name="jobStatus"
            label="job status"
            list={JOB_STATUS}
          />
          <FormRowSelect name="jobType" label="job type" list={JOB_TYPE} />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
