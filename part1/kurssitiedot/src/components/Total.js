const Total = ({ course }) => (
  <p>
    <b>
      total of{" "}
      {course.parts.flatMap((x) => x.exercises).reduce((a, b) => a + b, 0)}{" "}
      exercises
    </b>
  </p>
);

export default Total;
