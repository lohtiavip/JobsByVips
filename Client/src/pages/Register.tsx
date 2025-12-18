import { Link, Form, redirect } from "react-router";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import SubmitBtn from "../components/SubmitBtn";

export const action = async ({ request }: { request: any }) => {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>

        <FormRow type="text" name={"name"} label="Name" defaultValue="Jimmy" />
        <FormRow
          type="text"
          name={"lastName"}
          label="last name"
          defaultValue="Singh"
        />
        <FormRow
          type="text"
          name={"location"}
          label="location"
          defaultValue="Hounslow"
        />
        <FormRow
          type="email"
          name={"email"}
          label="email"
          defaultValue="Jimmy@gmail.com"
        />
        <FormRow
          type="password"
          name={"password"}
          label="password"
          defaultValue="12345678"
        />

        <SubmitBtn />
        <p>
          Already a member?
          <Link to={"/login"} className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
