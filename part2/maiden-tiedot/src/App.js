import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Filter from "./components/Filter";

const COUNTRIES_URL = "https://restcountries.com/v3.1/all";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get(COUNTRIES_URL).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleButtonClick = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries
        countries={countries}
        filter={filter}
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
};

export default App;
