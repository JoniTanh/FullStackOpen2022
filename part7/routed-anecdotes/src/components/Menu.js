import Notification from "./Notification";
import About from "./About";
import Anecdote from "./Anecdote";
import CreateNew from "./CreateNew";
import AnecdoteList from "./AnecdoteList";
import {
  Routes as Switch,
  Route,
  Link,
  useMatch as useRouteMatch,
} from "react-router-dom";

const Menu = ({ addNew, anecdotes, notification }) => {
  const padding = {
    paddingRight: 5,
  };

  const match = useRouteMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null;

  return (
    <>
      <div>
        <Link style={padding} to="/">
          anecdotes
        </Link>
        <Link style={padding} to="/create">
          create new
        </Link>
        <Link style={padding} to="/about">
          about
        </Link>
        <Notification notification={notification} />
      </div>

      <Switch>
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Switch>
    </>
  );
};

export default Menu;
