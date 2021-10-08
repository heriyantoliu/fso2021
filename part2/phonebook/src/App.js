import React, { useState, useEffect } from "react";
import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    let found = persons.find((person) => person.name === newName);
    if (found) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    personService.create(newPerson).then((response) => {
      setPersons(persons.concat(response));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const filteredPersons = filterName
    ? persons.filter((person) => {
        let name = person.name.toLowerCase();
        return name.includes(filterName.toLowerCase());
      })
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleFilterNameChange} />

      <h2>add a new </h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        nameChange={handleNameChange}
        newNumber={newNumber}
        numberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
