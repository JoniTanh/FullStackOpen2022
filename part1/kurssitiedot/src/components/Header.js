const Header = ({ name }) => (
  <>
    {name === "mainHeader" ? (
      <h1>Web development curriculum</h1>
    ) : (
      <h3>{name}</h3>
    )}
  </>
);

export default Header;
