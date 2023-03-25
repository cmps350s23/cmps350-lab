document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  let facts;
  // if (res.ok) {
  facts = await res.json();
  // }

  // const regions = facts
  //   .map((fact) => fact.region)
  //   .filter((region, i, a) => a.indexOf(region) === i)
  //   .sort();

  const hierarchy = {};

  facts.forEach((fact) => {
    const region = fact.region;
    const subregion = fact.subregion ?? "—";
    // const subregion = fact.subregion ? fact.subregion : "—";
    const country = fact.name.common;

    if (!(region in hierarchy)) {
      hierarchy[region] = {};
    }
    if (!(subregion in hierarchy[region])) {
      hierarchy[region][subregion] = {};
    }
    hierarchy[region][subregion][country] = fact;
  });

  const regionsSelect = document.querySelector("#regions");
  const subregionsSelect = document.querySelector("#subregions");
  const countriesSelect = document.querySelector("#countries");
  const factsSection = document.querySelector("#facts");

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

    factsSection.innerHTML = `<h2>Facts about ${fact.name.common}</h2>
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
            fact.languages ? Object.values(fact.languages).join(", ") : "—"
          }</td>
        </tr>
        <tr>
          <th scope="row">Currencies</th>
          <td>${
            fact.currencies ? Object.keys(fact.currencies).join(", ") : "—"
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

  countriesSelect.addEventListener("change", () =>
    updateFacts(
      regionsSelect.value,
      subregionsSelect.value,
      countriesSelect.value
    )
  );

  updateRegions();
  updateSubregions(regionsSelect.value);
  updateCountries(regionsSelect.value, subregionsSelect.value);
  updateFacts(
    regionsSelect.value,
    subregionsSelect.value,
    countriesSelect.value
  );
});
