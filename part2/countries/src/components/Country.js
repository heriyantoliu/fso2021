import React from "react";
import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>

      <div>capital {country.capital}</div>
      <div>population {country.population}</div>

      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img alt={country.name} src={country.flags.png} width="100px" />
      <Weather capital={country.capital} />
    </div>
  );
};

export default Country;
