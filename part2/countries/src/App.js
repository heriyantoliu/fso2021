import React, { useEffect, useState } from "react";
import axios from "axios";

import Country from "./components/Country";

const App = () => {
  const [filteredName, setFilteredName] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChangeFilteredName = (event) => {
    setFilteredName(event.target.value);

    setFilteredCountries(
      filteredName
        ? countries.filter((country) => {
            let name = country.name.toLowerCase();
            return name.includes(filteredName.toLowerCase());
          })
        : countries
    );
  };

  const showCountry = (clickedCountry) => {
    setFilteredCountries(
      countries.filter((country) => {
        let name = country.name.toLowerCase();
        return name.includes(clickedCountry.toLowerCase());
      })
    );
  };

  return (
    <div>
      find countries{" "}
      <input value={filteredName} onChange={handleChangeFilteredName} />
      {filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : filteredCountries.length <= 10 ? (
        filteredCountries.map((country) => (
          <div key={country.name}>
            {country.name}{" "}
            <button onClick={() => showCountry(country.name)}>show</button>
          </div>
        ))
      ) : (
        <div>Too many matches, specifiy another filter</div>
      )}
    </div>
  );
};
export default App;
