import Header from "./Header";
import Part from "./Part";
import Total from "./Total";

const Content = ({ course }) => (
  <>
    <Header name={course.name} />
    {course.parts.map((x) => (
      <Part key={x.id} name={x.name} exercises={x.exercises} />
    ))}
    <Total course={course} />
  </>
);

export default Content;
