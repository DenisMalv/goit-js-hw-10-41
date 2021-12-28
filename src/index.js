import '../scss/custom.scss'
import './css/styles.css';
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { fetchCountries } from './fetchCountries'
const debounce = require('lodash.debounce');


const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}
const { input, countryList, countryInfo } = refs
console.log(countryList)
console.log(countryInfo)
input.addEventListener('input', debounce(onInputChangeValue, 300))

function onInputChangeValue(event) {
    console.log(event.target.value.trim())
    const name = event.target.value.trim()
    if (name.length >= 1) {
        fetchCountries(name)
            .then((responce) => {
                // console.log(responce)
                console.log(responce.length)
                if (responce.length > 10) {
                    clearMarkup()
                    return Notify.info("Too many matches found. Please enter a more specific name.");
                }
                if (responce.length !== 1) {
                    clearMarkup()
                    countryArrayMarkup(responce)
                }
                if (responce.length === 1) {
                    clearMarkup()
                    countryInfoMarkup(responce)
                }
            })
            .catch((error) => {
                clearMarkup()
                Notify.failure("Oops, there is no country with that name");
            });
    }
    
}
function clearMarkup() {
    countryList.innerHTML=''
    countryInfo.innerHTML=''
}

function countryInfoMarkup(object) {
    console.log(object)
    const infoMarkup = object.map(({ name, flags, capital, population, languages }) => {
        console.log(name.official)
        console.log(flags)
        console.log(capital)
        console.log(population)
        console.log(languages)
        console.log(Object.values(languages))
        const eachLanguage = Object.values(languages).map((el)=>el).join(", ")
    return `
    <p class="country_name"><img style="width:30px; margin-right:20px" class="country_flag" src="${flags.svg}" alt="${name.official}">${name.official}</p>
    <p class="country_capital">Capital: ${capital}</p>
    <p class="country_population">Population: ${population}</p>
    <p class="country_languages">Languages: ${eachLanguage}</p>`
    }).join('')
    countryInfo.insertAdjacentHTML('beforeend', infoMarkup)
}

function countryArrayMarkup(array) {
    const arrayMarkup = array.map(({ name, flags }) => {
        console.log(array)
        return `<li style="margin:10px;" ><img style="width:30px; margin-right:20px" src="${flags.svg}" alt="${name.common?name.common:name.official}"><span>${name.common?name.common:name.official}</span></li>`
    }).join("")
    countryList.insertAdjacentHTML('beforeend',arrayMarkup)
}
