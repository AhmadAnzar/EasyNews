import React, { useState } from "react";

const countries = [
  { name: "United Arab Emirates", code: "ae" },
  { name: "Argentina", code: "ar" },
  { name: "Austria", code: "at" },
  { name: "Australia", code: "au" },
  { name: "Belgium", code: "be" },
  { name: "Bulgaria", code: "bg" },
  { name: "Brazil", code: "br" },
  { name: "Canada", code: "ca" },
  { name: "Switzerland", code: "ch" },
  { name: "China", code: "cn" },
  { name: "Colombia", code: "co" },
  { name: "Cuba", code: "cu" },
  { name: "Czech Republic", code: "cz" },
  { name: "Germany", code: "de" },
  { name: "Egypt", code: "eg" },
  { name: "France", code: "fr" },
  { name: "United Kingdom", code: "gb" },
  { name: "Greece", code: "gr" },
  { name: "Hong Kong", code: "hk" },
  { name: "Hungary", code: "hu" },
  { name: "Indonesia", code: "id" },
  { name: "Ireland", code: "ie" },
  { name: "Israel", code: "il" },
  { name: "India", code: "in" },
  { name: "Italy", code: "it" },
  { name: "Japan", code: "jp" },
  { name: "South Korea", code: "kr" },
  { name: "Lithuania", code: "lt" },
  { name: "Latvia", code: "lv" },
  { name: "Morocco", code: "ma" },
  { name: "Mexico", code: "mx" },
  { name: "Malaysia", code: "my" },
  { name: "Nigeria", code: "ng" },
  { name: "Netherlands", code: "nl" },
  { name: "Norway", code: "no" },
  { name: "New Zealand", code: "nz" },
  { name: "Philippines", code: "ph" },
  { name: "Poland", code: "pl" },
  { name: "Portugal", code: "pt" },
  { name: "Romania", code: "ro" },
  { name: "Serbia", code: "rs" },
  { name: "Russia", code: "ru" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "Sweden", code: "se" },
  { name: "Singapore", code: "sg" },
  { name: "Slovenia", code: "si" },
  { name: "Slovakia", code: "sk" },
  { name: "Thailand", code: "th" },
  { name: "Turkey", code: "tr" },
  { name: "Taiwan", code: "tw" },
  { name: "Ukraine", code: "ua" },
  { name: "United States", code: "us" },
  { name: "Venezuela", code: "ve" },
  { name: "South Africa", code: "za" },
];

function CountryDropdown({ onSelect }) {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleChange = (e) => {
    const selectedCode = e.target.value;
    setSelectedCountry(selectedCode);
    if (onSelect) onSelect(selectedCode); // optional callback
  };

  return (
    <div>
      <label htmlFor="country-select">Choose a country: </label>
      <select id="country-select" value={selectedCountry} onChange={handleChange}>
        <option value="">-- Select a country --</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name} ({country.code})
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountryDropdown;
