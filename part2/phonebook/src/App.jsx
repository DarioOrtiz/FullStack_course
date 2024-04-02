import React, { useState } from 'react';

const Filter = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      Search: <input value={searchTerm} onChange={onSearchChange} />
    </div>
  );
};

const PersonForm = ({ newName, newNumber, onNameChange, onNumberChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <br />
      <div>
        Name: <input value={newName} onChange={onNameChange} />
      </div>
      <br />
      <div>
        Number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
      <br />
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const PersonsList = ({ persons, searchTerm, onDelete}) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person, index) => (
          <li className='note' key={index}>{person.name}: {person.number}
          <button onClick={() => onDelete(person.id)}>Delete</button>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

const deletePerson = (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this contact?");
  if (confirmed) {
    setPersons(persons.filter(person => person.id !== id));
  }
};




const App = () => {
  const [notification, setNotification] = useState(null);
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
 

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      const confirmed = window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`);
      if (confirmed) {
        updatePerson(existingPerson.id, newNumber);
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1 // Assign a unique id to the new person
      };
      setPersons(persons.concat(personObject));
    }
    setNotification(`Added ${newName}`);
    setTimeout(() => {
      setNotification(null);
    }, 5000); 
    setNewName('');
    setNewNumber('');
  };
  
  const updatePerson = (id, newNumber) => {
    fetch(`URL_DEL_ENDPOINT/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ number: newNumber })
    })
    .then(response => {
      if (response.ok) {
        // Si la solicitud es exitosa, actualiza el estado de la agenda telefónica
        setPersons(persons.map(person => person.id === id ? { ...person, number: newNumber } : person));
      }
    })
    .catch(error => console.error('Error updating person:', error));
  };
  
  const Notification = ({ message }) => {
    return (
      <div className="notification">
        {message}
      </div>
    );
  };
  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification message={notification} />}
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
      <PersonsList persons={persons} searchTerm={searchTerm} onDelete={deletePerson} />
    </div>
  );
};

export default App;
