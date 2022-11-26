import CurrentWeather from "./CurrentWeather";

const Country = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    capital {country.capital} <br />
    area {country.area}
    <h3>languages:</h3>
    {Object.values(country.languages).map((x) => (
      <li key={x}>{x}</li>
    ))}{" "}
    <br />
    <img alt="flag" src={country.flags.png} />
    <CurrentWeather capital={country.capital} />
  </div>
);

export default Country;
