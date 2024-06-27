import React from 'react';
import { Country } from '../types/Country';

interface CountryCardProps {
  country: Country;
  isSelected: boolean;
  onSelect: (country: Country) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, isSelected, onSelect }) => {
  return (
    <li
      style={{
        border: '1px solid black',
        margin: '10px',
        padding: '10px',
        cursor: 'pointer',
        backgroundColor: isSelected ? 'lightblue' : 'white'
      }}
      onClick={() => onSelect(country)}
    >
      <h2>{country.name.common}</h2>
      <p>Region: {country.region}</p>
      <p>Population: {country.population}</p>
      <img src={country.flags.svg} alt={`${country.name.common} flag`} width="100" />
    </li>
  );
};

export default CountryCard;
