import type { ReactElement } from "react";
import Wrapper from "../assets/wrappers/JobInfo";
const JobInfo = ({ icon, text }: { icon: ReactElement; text: string }) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
