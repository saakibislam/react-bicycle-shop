import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const API_URL = "https://api.restcountries.com/countries/v5";

const fetchPage = (offset, apiKey) =>
  fetch(`${API_URL}?limit=100&offset=${offset}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
    .then((r) => r.json())
    .then((json) => json.data?.objects ?? []);

const CountrySelect = ({ value, onChange, isInvalid = false }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const key = process.env.REACT_APP_RESTCOUNTRIES_API_KEY;
    Promise.all([fetchPage(0, key), fetchPage(100, key), fetchPage(200, key)])
      .then((pages) => {
        const names = pages
          .flat()
          .map((c) => c.names.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(names);
      })
      .catch(() => {});
  }, []);

  return (
    <Form.Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      isInvalid={isInvalid}
    >
      <option value="">Select country...</option>
      {countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </Form.Select>
  );
};

export default CountrySelect;
