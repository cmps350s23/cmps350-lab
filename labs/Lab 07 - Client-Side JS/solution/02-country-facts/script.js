document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  let data;
  if (res.ok) {
    data = await res.json();
  }

  const tree = {};
  data.map((country) => {
    if (!("region" in country)) {
      country.region = "N/A";
    }
    if (!("subregion" in country)) {
      country.subregion = "N/A";
    }

    if (!(country.region in tree)) {
      tree[country.region] = {};
    }
    if (!(country.subregion in tree[country.region])) {
      tree[country.region][country.subregion] = {};
    }
    tree[country.region][country.subregion][country.name.common] = country;
  });

  console.log(tree);

  const regions = document.querySelector("#regions");
  const subregions = document.querySelector("#subregions");
  const countries = document.querySelector("#countries");
  const facts = document.querySelector("#facts");

  const updateRegions = () => {
    regions.innerHTML = Object.keys(tree)
      .sort()
      .map((region) => `<option value="${region}">${region}</option>`)
      .join("");
  };

  const updateSubregions = (region) => {
    subregions.innerHTML = Object.keys(tree[region])
      .sort()
      .map((subregion) => `<option value="${subregion}">${subregion}</option>`)
      .join("");
  };

  const updateCountries = (region, subregion) => {
    countries.innerHTML = Object.keys(tree[region][subregion])
      .sort()
      .map(
        (country) =>
          `<option value="${country}">${tree[region][subregion][country].name.common}</option>`
      )
      .join("");
  };

  const updateFacts = (region, subregion, country) => {
    const f = tree[region][subregion][country];
    facts.innerHTML = `<h2>Facts about ${f.name.common}</h2>
    <div id="country-flag">
      <img src="${f.flags.svg}" alt="Flag of ${f.name.common}" />
    </div>
    <table>
      <tbody>
        <tr>
          <th scope="row">Official Name</th>
          <td>${f.name.official} (${f.translations.ara.official})</td>
        </tr>
        <tr>
          <th scope="row">Capital City</th>
          <td>${f.capital}</td>
        </tr>
        <tr>
          <th scope="row">Population</th>
          <td>${Number(f.population).toLocaleString()}</td>
        </tr>
        <tr>
          <th scope="row">Languages</th>
          <td>${Object.values(f.languages).join(", ")}</td>
        </tr>
        <tr>
          <th scope="row">Currencies</th>
          <td>${Object.keys(f.currencies).join(", ")}</td>
        </tr>
        <tr>
          <th scope="row">TLD</th>
          <td>${f.tld.join(", ")}</td>
        </tr>
      </tbody>
    </table>`;
  };

  regions.addEventListener("change", () => {
    updateSubregions(regions.value);
    updateCountries(regions.value, subregions.value);
    updateFacts(regions.value, subregions.value, countries.value);
  });

  subregions.addEventListener("change", () => {
    updateCountries(regions.value, subregions.value);
    updateFacts(regions.value, subregions.value, countries.value);
  });

  countries.addEventListener("change", () => {
    updateFacts(regions.value, subregions.value, countries.value);
  });

  updateRegions();
  updateSubregions(regions.value);
  updateCountries(regions.value, subregions.value);
  updateFacts(regions.value, subregions.value, countries.value);
});

// const hierarchy = {
//   "Africa" : {
//     "Eastern Africa": {
//       "British Indian Ocean Territory": {
//         ...
//       },
//       "Burundi": {
//         ...
//       },
//       ...
//     },
//     ...
//   },
//   ...
// };
