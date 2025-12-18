import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import { useAllJobsContext } from "../pages/AllJobs";
import PageBtnContainer from "./PageBtnContainer";

const JobContainer = () => {
  const { data } = useAllJobsContext();
  console.log("JobContainerdata", data.jobs);
  const { jobs, totalJobs, numOfPages } = data;

  if (data.jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {data.jobs.map((job: any) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobContainer;
