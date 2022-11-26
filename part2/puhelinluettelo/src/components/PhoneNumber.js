const PhoneNumber = ({ person, toggleDelete }) => (
  <div>
    {person.name} {person.number}{" "}
    <button onClick={() => toggleDelete(person)}>delete</button>
  </div>
);

export default PhoneNumber;
