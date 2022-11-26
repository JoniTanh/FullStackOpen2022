const Button = ({ country, handleButtonClick }) => (
  <button value={country.name.common} onClick={handleButtonClick}>
    show
  </button>
);

export default Button;
