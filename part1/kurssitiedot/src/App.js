const Header = ({ course }) => (
  <>
    <h1>{course.name}</h1>
  </>
);

const Part = ({ name, exercises }) => (
  <>
    <p>
      {name} {exercises}
    </p>
  </>
);

const Content = ({ course }) => (
  <>
    {course.parts.map((x) => (
      <Part key={x.name} name={x.name} exercises={x.exercises} />
    ))}
  </>
);

const Total = ({ course }) => (
  <>
    <p>
      Number of exercises{" "}
      {course.parts.flatMap((x) => x.exercises).reduce((a, b) => a + b)}
    </p>
  </>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
