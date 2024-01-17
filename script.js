'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
let Refreshbtn = document.getElementsByClassName('btn');
// /https://restcountries.com/v3.1/name/{name}?fullText=true
function showCard(data, className = '') {
  let languageData = data.languages;
  console.log(languageData);
  function myArray(languageData) {
    let Array = Object.entries(languageData);
    return Array;
  }
  console.log(data.languages);
  console.log(data.currencies);
  let langData = myArray(data.languages);
  let currency = myArray(data.currencies);
  console.log(langData);
  console.log(currency);
  function ExtractLangData(data) {
    console.log(data[0]);
    let temp = '';
    for (let i = 0; i < data.length; i++) {
      console.log(data[i][1]);
      temp += `,${data[i][1]}`;
    }
    return temp.substring(1);
    console.log(temp);
  }
  let ans = ExtractLangData(langData);
  console.log(ans.substring(1));
  let html = `<article class="country ${className}">
<img class="country__img" src="${data.flags.png}" />
<div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    1
  )}M</p>
  <p class="country__row"><span>🗣️</span>${ExtractLangData(langData)}</p>
  <p class="country__row"><span>💰</span>${currency[0][1].symbol} ${
    currency[0][1].name
  }</p>
</div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
  // return data;
}
function showCountriesData(name) {
  let request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  request.send();
  request.addEventListener('load', function () {
    let [data] = JSON.parse(this.responseText);
    console.log(data);

    showCard(data);

    // let nebourCountryCOde = data.borders[0];

    const countryNeibour = function (nebourCountryCOde) {
      // console.log(nebourCountryCOde);
      let request1 = new XMLHttpRequest();
      request1.open(
        'GET',
        `https://restcountries.com/v3.1/alpha/${nebourCountryCOde}?fullText=true`
      );
      request1.send();
      request1.addEventListener('load', function () {
        let [neibourData] = JSON.parse(this.responseText);

        console.log(neibourData);

        // return neibourData;
        // for (let i = 0; i < neibourData.borders.length; i++) {
        showCard(neibourData, 'neighbour');
        // }
      });
    };
    // console.log('country data', countryNeibour(data.borders[0]));
    for (let i = 0; i < data.borders.length; i++) {
      // let data = null;
      //   console.log('country data', countryNeibour(data.borders[i]));
      countryNeibour(data.borders[i]);
      //   console.log(data1.borders[i]);
      //   console.log(neibourData.borders[i]);
      //   showCard(countryNeibour(data.borders[i]));
    }
    // countryNeibour();
    // showCard(countryNeibour());
  });
}

function clearContainer(param) {
  countriesContainer.innerHTML = '';
}
function start(userInput) {
  //   let countryName = prompt('ENter country name:-');
  console.log(userInput);
  clearContainer();
  showCountriesData(userInput.trim().toLowerCase());
}
// start();

console.log(Refreshbtn);

function show() {
  let userInput = document.getElementById('input').value;
  console.log(userInput);

  start(userInput);
  console.log('ajma');
}
showCountriesData('india');
// showCountriesData('united states');
// showCountriesData('italy');

let res = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then(response => response.json())
    .then(response => {
      showCard(response[0]);
      console.log(response[0]);
      const COde = response[0].borders[0];
      console.log(COde);
      return fetch(`https://restcountries.com/v3.1/alpha/${COde}`);
    })
    .then(response => response.json())
    .then(data => showCard(data, 'neighbour'));
  // return response;
};
// res('india');
