import React, { useState } from 'react';
import './App.css'; // You can create this CSS file for styling

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const people = require('./people.json'); // Import the JSON file

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter people based on the search term
    const results = people.filter(
      (person) =>
        person.name.toLowerCase().includes(term.toLowerCase()) ||
        person.email.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const toggleSelected = (person) => {
    setSelectedPeople((selected) => {
      if (isSelected(person)) {
        return selected.filter((p) => p !== person);
      } else {
        setSearchTerm(''); // Clear the text field
        return [...selected, person];
      }
    });
  };

  const isSelected = (person) => {
    return selectedPeople.includes(person);
  };

  return (
    <div className="App">
      <h1>Search and Select People</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="selected-people">
        {selectedPeople.map((person, index) => (
          <span key={index} className="selected-person">
            {person.name}
            <button onClick={() => toggleSelected(person)}>Remove</button>
          </span>
        ))}
      </div>
      {searchTerm && (
        <div className="search-results">
          {searchResults.map((person, index) => (
            <div key={index} className="search-result" onClick={() => toggleSelected(person)}>
              {person.name} - {person.email}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
