const input = document.getElementById("country_Name");
const btn = document.getElementById("Search");
const output = document.getElementById("all_Data");
const errorBox = document.getElementById("error");

btn.addEventListener("click", getCovidData);

async function getCovidData() {

    const country = input.value.trim();

    // Reset UI
    errorBox.textContent = "";
    output.innerHTML = "";

    if (country === "") {
        errorBox.textContent = "Please enter a country name";
        return;
    }


    const url = `https://disease.sh/v3/covid-19/countries/${country}`

    try {
        const res = await fetch(api);

        if (!res.ok) {
            throw new Error("Invalid country");
        }

        const data = await res.json();

        output.innerHTML = `
            <div class="w-full flex justify-center mt-6">
                <div class="max-w-sm p-6 border rounded-xl text-center shadow-lg bg-white">
                    
                    <img src="${data.countryInfo.flag}" 
                         alt="${data.country}" 
                         class="mx-auto w-28 h-auto rounded mb-4">

                    <h2 class="text-2xl font-bold mb-3">${data.country}</h2>

                    <p class="mb-2 text-gray-700">Total Cases: <b>${data.cases.toLocaleString()}</b></p>
                    <p class="mb-2 text-gray-700">Total Deaths: <b>${data.deaths.toLocaleString()}</b></p>
                    <p class="mb-2 text-gray-700">Recovered: <b>${data.recovered.toLocaleString()}</b></p>
                    <p class="mb-2 text-gray-700">Active Cases: <b>${data.active.toLocaleString()}</b></p>
                </div>
            </div>
        `;

    } catch (err) {
        errorBox.textContent = "Country not found";
        console.log(err);
    }
}