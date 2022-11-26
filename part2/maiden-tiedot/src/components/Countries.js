import Button from "./Button";
import Country from "./Country";

const Countries = ({ countries, filter, handleButtonClick }) => {
  const countryNames = (country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase());
  const countryCount = countries.filter(countryNames);

  return (
    <div>
      {countryCount.length > 10 ? (
        "Too many matches, specify another filter"
      ) : countryCount.length > 1 ? (
        <>
          {countries.filter(countryNames).map((country) => (
            <span key={country.name.common}>
              {country.name.common}{" "}
              <Button country={country} handleButtonClick={handleButtonClick} />
              <br />
            </span>
          ))}
        </>
      ) : (
        <>
          {countries.filter(countryNames).map((country) => (
            <span key={country.name.common}>
              <Country country={country} />
            </span>
          ))}
        </>
      )}
    </div>
  );
};

export default Countries;
