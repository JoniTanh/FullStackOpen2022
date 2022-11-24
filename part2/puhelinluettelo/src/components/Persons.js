import PhoneNumber from "./PhoneNumber";

const Persons = ({ persons, filter }) => {
  const filterNames = (person) =>
    person.name.toLowerCase().includes(filter.toLowerCase());

  return (
    <div>
      {persons.filter(filterNames).map((person) => (
        <PhoneNumber key={person.name} person={person} />
      ))}
    </div>
  );
};

export default Persons;
