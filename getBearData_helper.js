const baseUrl = "https://en.wikipedia.org/w/api.php";
const title = "List_of_ursids";

const params = {
  action: "parse",
  page: title,
  prop: "wikitext",
  section: 3,
  format: "json",
  origin: "*"
};

const getBearData = async () => {
  const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch bear data.');
    
    const data = await res.json();
    const wikitext = data.parse.wikitext['*'];

    await extractBears(wikitext);
  } catch (error) {
    console.error('Error fetching bear data:', error);
  }
};
