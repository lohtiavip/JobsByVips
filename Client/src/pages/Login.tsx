import { Link, Form, redirect, useNavigate } from "react-router";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import FormRow from "../components/FormRow";
import Logo from "../components/Logo";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import SubmitBtn from "../components/SubmitBtn";

export const action = async ({ request }: { request: any }) => {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  console.log("dataobj", data);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Logged In");
    return redirect("/dashboard");
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();

  const onExplore = async () => {
    const data = {
      email: "test@test.com",
      password: "terces123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("take a test drive");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" label="email" />
        <FormRow type="password" name="password" label="password" />

        <SubmitBtn />

        <button type="button" className="btn btn-block" onClick={onExplore}>
          explore the app
        </button>
        <p>
          Not a member yet??
          <Link to={"/register"} className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
