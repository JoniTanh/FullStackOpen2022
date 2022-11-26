import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState();

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => console.log(error));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const names = [...persons.map((x) => x.name.toLowerCase())];
    const newNameCopy = newName.toLowerCase();

    if (names.includes(newNameCopy)) {
      const update = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (update) {
        handleNumberUpdate(newName);
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage({ type: "create", text: `Added ${newName}` });
          setTimeout(() => {
            setMessage(undefined);
          }, 3000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => console.log(error));
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const toggleDelete = (removedPerson) => {
    if (window.confirm(`Delete ${removedPerson.name} ?`)) {
      personService
        .remove(removedPerson.id)
        .then(() => {
          setPersons(
            persons.filter((person) => person.id !== removedPerson.id)
          );
          setMessage({
            type: "delete",
            text: `Person ${removedPerson.name} was deleted`,
          });
          setTimeout(() => {
            setMessage(undefined);
          }, 3000);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleNumberUpdate = (name) => {
    const oldInfo = persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
    const newInfo = { ...oldInfo, number: newNumber };

    personService
      .update(oldInfo.id, newInfo)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== oldInfo.id ? person : returnedPerson
          )
        );
        setMessage({ type: "update", text: `Updated ${newName}'s number` });
        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setMessage({
          hasErrors: true,
          text: `Information of ${newName} has already been removed from server`,
        });
        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        hasErrors={message?.hasErrors}
        message={message?.text}
        type={message?.type}
      />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        <Persons
          persons={persons}
          filter={filter}
          toggleDelete={toggleDelete}
        />
      </div>
    </div>
  );
};

export default App;
