import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    searcher: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
};

const DEBOUNCE_DELAY = 300;

refs.searcher.addEventListener(
    'input',
    debounce(onInputChange, DEBOUNCE_DELAY));


function onInputChange(e) {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';


    const name = e.target.value.trim();

    fetchCountries(name)
        .then(response => {

            if (response.length > 10) {
                Notify.warning('Too many matches found. Please enter a more specific name.');

            } else if (response.length >= 2 && response.length <= 10) {
                createListMarkup(response);
                refs.info.innerHTML = '';
                
            } else {
                createCardMarkup(response);
                refs.list.innerHTML = '';
            };
        })
        .catch(error => {
            Notify.failure('Oops, there is no country with that name');
        });  
};


function createListMarkup(response) {
    const listElements = response
    .map(({ name, flags }) => {
        return `<li class="country-item">
            <img src="${flags.svg}" alt="${name.official}" width="50" height="auto">
            <span>${name.official}</span>
        </li>`;
    })
    .join('');

    refs.list.insertAdjacentHTML('beforeend', listElements);

    return listElements;
};

function createCardMarkup(response) {
    const cardElements = response
        .map(({ name, capital, population, flags, languages }) => {
            return `<img class="img" src="${flags.svg}" alt="${name.official} width="120">
            <p class="name"> ${name.official}</p>
            <div class="card-list">
                <div class="card-list__item">
                    <p class="key">Capital:</p>
                    <p class="value">   ${capital.join(', ')}</p>
                </div>
                <div class="card-list__item">
                    <p class="key">Population:</p>
                    <p class="value">${population}</p>
                </div>
                <div class="card-list__item">
                    <p class="key">Languages:</p>
                    <p class="value">${Object.values(languages).join(', ')}</p>
                </div>
            </div>`;
        })
        .join('');
    
    refs.info.insertAdjacentHTML('beforeend', cardElements);
    
    return cardElements;
};
