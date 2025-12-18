import type { ReactElement } from "react";
import Wrapper from "../assets/wrappers/StatItem";

const StatItem = ({
  count,
  title,
  icon,
  color,
}: // bcg,
{
  count: number;
  title: string;
  icon: ReactElement;
  color: string;
  // bcg: string;
}) => {
  return (
    // <Wrapper color={color} bcg={bcg}>
    <Wrapper color={color}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
