import React, { useEffect, useState } from 'react';
import { Country } from '../types/Country';
import CountryCard from './CountryCard';
import { fetchCountries } from '../api/fetchCountries';

const CountryList: React.FC = () => {
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  React.useEffect(() => {
    const getCountries = async () => {
      try {
        const data: Country[] = await fetchCountries();
        setCountries(data);
      } catch (error) {
        setError('Failed to fetch countries');
      }
    };

    getCountries();
  }, []);

  const handleSelectCountry = (country: Country): void => {
    setSelectedCountries((prevSelected) =>
      prevSelected.find((c) => c.cca3 === country.cca3)
        ? prevSelected.filter((c) => c.cca3 !== country.cca3)
        : [...prevSelected, country]
    );
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>선택한 나라</h1>
      <ul style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '10px', 
        listStyleType: 'none', 
        padding: 0 
      }}>
        {selectedCountries.map((country : Country) => (
          <CountryCard
          key={country.cca3}
          country={country}
          isSelected={selectedCountries.some((c) => c.cca3 === country.cca3)}
          onSelect={handleSelectCountry}
        />
        ))}
      </ul>
      <h1>나라 리스트</h1>
      <ul style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '10px', 
        listStyleType: 'none', 
        padding: 0 
      }}>
        {countries.map((country : Country) => (
          <CountryCard
          key={country.cca3}
          country={country}
          isSelected={selectedCountries.some((c) => c.cca3 === country.cca3)}
          onSelect={handleSelectCountry}
        />
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
