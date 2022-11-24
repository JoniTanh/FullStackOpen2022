import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => (
  <>
    {course.id === 1 ? <Header name="mainHeader" /> : ""}
    <Content course={course} />
  </>
);

export default Course;
