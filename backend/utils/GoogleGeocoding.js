import {GEOCODING_BASE_URL} from "./Constants.js";
import fs from "fs";

//const validCountries = JSON.parse(fs.readFileSync("./countries.json", "utf-8"));
const countrySet = new Set(validCountries);

export const cleanCountryData = async (countries) => {
    return await Promise.all(
        countries.map(async (country) => {
            if (countrySet.has(country)) {
                return country; // If it's already valid, return immediately
            }
            let resolvedCountry = await findCountryName(country);
            if (resolvedCountry) {
                countrySet.add(resolvedCountry); // Cache the resolved country
               //fs.writeFileSync("./countries.json", JSON.stringify([...countrySet], null, 2));
            }
            return resolvedCountry;
        })
    );
}

const findCountryName = async (country) => {
    let response = await fetch(
        `${GEOCODING_BASE_URL}/json?address=${encodeURIComponent(country)}&key=${process.env.GOOGLE_GEOCODING_KEY}`
    );

    let data = await response.json();
    let addressComponents = data.results[0]?.address_components;

    if (!addressComponents) return null;

    let countryComponent = addressComponents.find(component => component.types.includes('country'));
    return countryComponent ? countryComponent.long_name : null;
};