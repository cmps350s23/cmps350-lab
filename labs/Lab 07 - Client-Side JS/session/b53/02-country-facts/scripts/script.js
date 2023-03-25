document.addEventListener("DOMContentLoaded", async () => {
  // fetch the data
  const res = await fetch("https://restcountries.com/v3.1/all");
  let data;
  // if (res.ok) {
  data = await res.json();
  // }
  // console.log(data);

  const regionsSelect = document.querySelector("#regions");
  const subregionsSelect = document.querySelector("#subregions");
  const countriesSelect = document.querySelector("#countries");

  const hierarchy = {};
  data.forEach((fact) => {
    if (!(fact.region in hierarchy)) {
      hierarchy[fact.region] = {};
    }
    if (!fact.subregion) {
      fact.subregion = "—";
    }
    if (!(fact.subregion in hierarchy[fact.region])) {
      hierarchy[fact.region][fact.subregion] = {};
    }
    hierarchy[fact.region][fact.subregion][fact.name.common] = fact;
  });
  // console.log(hierarchy);

  const updateRegions = () => {
    regionsSelect.innerHTML = Object.keys(hierarchy)
      .sort()
      .map((region) => `<option value="${region}">${region}</option>`)
      .join("");
  };

  const updateSubregions = (region) => {
    subregionsSelect.innerHTML = Object.keys(hierarchy[region])
      .sort()
      .map((subregion) => `<option value="${subregion}">${subregion}</option>`)
      .join("");
  };

  const updateCountries = (region, subregion) => {
    countriesSelect.innerHTML = Object.keys(hierarchy[region][subregion])
      .sort()
      .map((country) => `<option value="${country}">${country}</option>`)
      .join("");
  };

  const updateFacts = (region, subregion, country) => {
    const fact = hierarchy[region][subregion][country];

    document.querySelector("#facts").innerHTML = `<h2>Facts about ${
      fact.name.common
    }</h2>
    <div id="country-flag">
      <img src="${fact.flags.svg}" alt="Flag of ${fact.name.common}" />
    </div>
    <table>
      <tbody>
        <tr>
          <th scope="row">Official Name</th>
          <td>${fact.name.official} (${fact.translations.ara.official})</td>
        </tr>
        <tr>
          <th scope="row">Capital City</th>
          <td>${fact.capital}</td>
        </tr>
        <tr>
          <th scope="row">Population</th>
          <td>${Number(fact.population).toLocaleString()}</td>
        </tr>
        <tr>
          <th scope="row">Languages</th>
          <td>${
            "langauges" in fact ? Object.values(fact.languages).join(", ") : "—"
          }</td>
        </tr>
        <tr>
          <th scope="row">Currencies</th>
          <td>${
            "currencies" in fact ? Object.keys(fact.currencies).join(", ") : "—"
          }</td>
        </tr>
        <tr>
          <th scope="row">TLD</th>
          <td>${fact.tld.join(", ")}</td>
        </tr>
      </tbody>
    </table>`;
  };

  regionsSelect.addEventListener("change", () => {
    updateSubregions(regionsSelect.value);
    updateCountries(regionsSelect.value, subregionsSelect.value);
    updateFacts(
      regionsSelect.value,
      subregionsSelect.value,
      countriesSelect.value
    );
  });
  subregionsSelect.addEventListener("change", () => {
    updateCountries(regionsSelect.value, subregionsSelect.value);
    updateFacts(
      regionsSelect.value,
      subregionsSelect.value,
      countriesSelect.value
    );
  });
  countriesSelect.addEventListener("change", () => {
    updateFacts(
      regionsSelect.value,
      subregionsSelect.value,
      countriesSelect.value
    );
  });

  updateRegions();
  updateSubregions(document.querySelector("#regions").value);
  updateCountries(regionsSelect.value, subregionsSelect.value);
  updateFacts(
    regionsSelect.value,
    subregionsSelect.value,
    countriesSelect.value
  );
});

// const hierarchy = {
//   Africa: {
//     "Eastern Africa": {
//       "British Indian Ocean Territory": {
//         name: {
//           common: {

//           }
//         }
//       },
//     },
//   },
//   Americas: {},
// };
