import extractBears from './bearExtract_helper';
import { BASE_URL } from './constants';

const title: string = 'List_of_ursids';

const params: Record<string, string | number> = {
  action: 'parse',
  page: title,
  prop: 'wikitext',
  section: 3,
  format: 'json',
  origin: '*',
};

// Define the structure of the response from the API
interface BearDataResponse {
  parse: {
    wikitext: {
      '*': string;
    };
  };
}

const getBearData = async (): Promise<void> => {
  const url = `${BASE_URL}?${new URLSearchParams(params as Record<string, string>).toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch bear data.');

    const data: BearDataResponse = await res.json(); // Type cast the API response
    const wikitext = data.parse.wikitext['*'];

    await extractBears(wikitext);
  } catch (error) {
    console.error('Error fetching bear data:', error);
  }
};

export default getBearData;
