import Link from "next/link";

export default async function Home({ params }) {
  const { slug } = params;
  let region, subregion, country;

  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=region,subregion,name,cca3"
  ).then((res) => res.json());

  const tree = {};
  data.map((country) => {
    if (!("region" in country)) {
      country.region = "...";
    }
    if (!("subregion" in country)) {
      country.subregion = "...";
    }

    if (!(country.region in tree)) {
      tree[country.region] = {};
    }
    if (!(country.subregion in tree[country.region])) {
      tree[country.region][country.subregion] = {};
    }
    tree[country.region][country.subregion][country.cca3] = country;
  });

  // console.log(slug);

  if (slug) {
    if (slug.length > 0) {
      region = decodeURI(slug[0]);
    }
    if (slug.length > 1) {
      subregion = decodeURI(slug[1]);
    }
    if (slug.length > 2) {
      country = decodeURI(slug[2]);
    }
  }

  let facts;
  if (country) {
    facts = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${country}`
    ).then((res) => res.json());
    facts = facts[0];
  }

  return (
    <>
      <header>
        <nav className="flex flex-wrap gap-x-2 text-blue-500 text-xl">
          {Object.keys(tree)
            .sort()
            .map((r) => (
              <Link
                key={r}
                className={r === region ? "underline" : ""}
                href={`/${encodeURI(r)}`}
              >
                {r}
              </Link>
            ))}
        </nav>
        {region && (
          <nav className="flex flex-wrap gap-x-2 text-blue-500 text-lg">
            {Object.keys(tree[region])
              .sort()
              .map((sr) => (
                <Link
                  key={sr}
                  className={sr === subregion ? "underline" : ""}
                  href={`/${encodeURI(region)}/${encodeURI(sr)}`}
                >
                  {sr}
                </Link>
              ))}
          </nav>
        )}
        {subregion && (
          <nav className="flex flex-wrap gap-x-2 text-blue-500">
            {Object.keys(tree[region][subregion])
              .sort((a, b) => (a.name.common > b.name.common ? -1 : 1))
              .map((cc) => (
                <Link
                  key={cc}
                  className={cc === country ? "underline" : ""}
                  href={`/${encodeURI(region)}/${encodeURI(
                    subregion
                  )}/${encodeURI(cc)}`}
                >
                  {tree[region][subregion][cc].name.common}
                </Link>
              ))}
          </nav>
        )}
      </header>
      {facts && (
        <main>
          <h2>Facts about {facts.name.common}</h2>
          <div id="country-flag">
            <img src={facts.flags.svg} alt={`Flag of ${facts.name.common}`} />
          </div>
          <table>
            <tbody>
              <tr>
                <th scope="row">Official Name</th>
                <td>State of Qatar (دولة قطر)</td>
              </tr>
              <tr>
                <th scope="row">Capital City</th>
                <td>Doha</td>
              </tr>
              <tr>
                <th scope="row">Population</th>
                <td>2,881,060</td>
              </tr>
              <tr>
                <th scope="row">Languages</th>
                <td>Arabic</td>
              </tr>
              <tr>
                <th scope="row">Currencies</th>
                <td>Qatari riyal (ر.ق)</td>
              </tr>
              <tr>
                <th scope="row">TLD</th>
                <td>.qa</td>
              </tr>
            </tbody>
          </table>
        </main>
      )}
    </>
  );
}
