import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router";
import Logo from "../components/Logo";
import beautyimg from "../assets/images/makeup_landing.svg";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className="container page">
        <div className="info">
          <h1>
            Get <span>Job</span> with Jobs by Vips
          </h1>

          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn ">
            Login / Demo User
          </Link>
        </div>

        <img src={beautyimg} alt="job hunt" className="img main-img" />

        <Title>You are welcome in VIPS World!</Title>
      </div>

      {/* <Rotate id="con">
        <Button
          id="bt"
          onFocus={focus}
          onMouseEnter={focus}
          // onMouseLeave={focusOver}
        >
          Press Me!
        </Button>
      </Rotate> */}
    </Wrapper>
  );
};

export default Landing;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

// const Wrapper = styled.section`
//   padding: 4em;
//   background: papayawhip;
// `;

// Create the keyframes
// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }

//   to {
//     transform: rotate(360deg);
//   }
// `;

// const Button = styled.button`
//   font-size: 1.5rem;
//   background-color: lightpink;
//   color: white;

//   div:hover {
//     transform: scaleX(5);
//     transition: all 5s;
//     animation-play-state: paused;
//   }
// `;

// Here we create a component that will rotate everything we pass in over two seconds
// const Rotate = styled.div`
//   display: inline-block;
//   animation: ${rotate} 4s linear infinite;
//   padding: 2rem 1rem;
//   font-size: 1.2rem;
//   Button:hover {
//     transform: scale(1.5);
//     animation-play-state: paused;

//     animation: ${rotate} 0s linear infinite;
//   }
// `;
