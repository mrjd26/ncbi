const btn = document.querySelector('#btn');
const resultBox = document.querySelector('#resultBox');
const inputField = document.querySelector('#inputField');
const form = document.querySelector('#form');

let gene = '/genome';
let taxon_suggest = '/SARS-COV-2'
let download = '/download'

const ncbiRequest = async (animal) => {
  const ncbiApi = 'https://api.ncbi.nlm.nih.gov/datasets/v1alpha';
  
  try {
    const endpoint = `/virus/taxon${taxon_suggest}${gene}/download`;
    const url = ncbiApi+endpoint;
    console.log(`url: ${url}`);

    const response = await fetch(url); 

    if (response.ok) {
      const jsonResponse = await response.json();
      jsonResponse.sci_name_and_ids.forEach( (animal) => {
        resultBox.innerHTML += "<br />" + animal.sci_name + '  ' + animal.tax_id;
      });
      //const result = JSON.stringify(jsonResponse);
    }
  } catch (err) {
    console.log(err);
  }
}

function logSubmit(event) {
  event.preventDefault();
  ncbiRequest(inputField.value);  
}

form.addEventListener('submit', logSubmit);

