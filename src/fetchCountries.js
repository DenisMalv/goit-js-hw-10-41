function fetchCountries(name) {
    console.log(name)
   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if (!response.ok) {
        throw new Error(response.status);
        }
        return response.json();
    })
    .then((responce) => {
        // console.log(responce)
        return responce
    })
    .catch(error => {
         console.log('Это error: ',error)
    });
}
export { fetchCountries }