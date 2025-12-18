import { Link, useRouteError } from "react-router";
import errorimg from "../assets/images/error_img.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
  const err = useRouteError() as any;
  console.log(err);
  if (err && err?.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={errorimg} alt="not found" />
          <h3>Ohh! page not found</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to="/">back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h1>
        Oops! <span>Something</span> went wrong
      </h1>
    </Wrapper>
  );
};

export default Error;
