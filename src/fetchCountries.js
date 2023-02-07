const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER_RESPONSE = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
    return fetch(`${BASE_URL}${name}?${FILTER_RESPONSE}`)
    .then(response => response.json())
    .catch(error => console.error);
}