import React, { useState, useEffect } from "react";
import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const Notification = ({ message }) => {
  if (message.text === null) {
    return null;
  }

  return <div className={message.class}>{message.text}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState({ text: null, class: "" });

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    let foundPerson = persons.find((person) => person.name === newName);
    if (foundPerson) {
      const result = window.confirm(
        `${foundPerson.name} is already added to phonebook, replace the old number with the new one ?`
      );
      if (!result) {
        return;
      }
      const updatedPerson = { ...foundPerson, number: newNumber };
      personService.update(foundPerson.id, updatedPerson).then((response) => {
        setPersons(
          persons.map((person) =>
            person.id !== foundPerson.id ? person : updatedPerson
          )
        );
      });
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      personService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");
          setMessage({ text: `Added ${newName}`, class: "success" });
          setTimeout(() => {
            setMessage({ text: null, class: "" });
          }, 5000);
        })
        .catch((error) => {
          setMessage({
            text: `Added ${error.response.data.error}`,
            class: "error",
          });
          setTimeout(() => {
            setMessage({ text: null, class: "" });
          }, 5000);
        });
    }
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

  const handleDeletePerson = (id) => {
    const deletePerson = persons.find((person) => person.id === id);
    const result = window.confirm(`Delete ${deletePerson.name} ?`);
    if (result) {
      personService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage({
            text: `Information of ${deletePerson.name} has already been removed from server`,
            class: "error",
          });
          setTimeout(() => {
            setMessage({ text: null, class: "" });
          }, 5000);
        });
    }
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
      <Notification message={message} />
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
      <Persons persons={filteredPersons} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
