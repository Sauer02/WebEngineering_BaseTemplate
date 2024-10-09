import fetchImageUrl from './imageFetching_helper';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

const extractBears = async (wikitext: string): Promise<void> => {
  const speciesTables = splitSpeciesTables(wikitext);
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = splitRowsFromTable(table);

    for (const row of rows) {
      const bear = await processBearRow(row);
      if (bear !== null) {
        bears.push(bear);
      }
    }
  }

  if (bears.length > 0) {
    updateBearUI(bears);
  }
};

const splitSpeciesTables = (wikitext: string): string[] => {
  return wikitext.split('{{Species table/end}}');
};

const splitRowsFromTable = (table: string): string[] => {
  return table.split('{{Species table/row');
};

const processBearRow = async (row: string): Promise<Bear | null> => {
  const name = extractMatch(row, /\|name=\[\[(.*?)\]\]/);
  const binomial = extractMatch(row, /\|binomial=(.*?)\n/);
  const imageFileName = extractMatch(row, /\|image=(.*?)\n/);
  const range = extractMatch(
    row,
    /\|range=(.*?)\n/,
    'Range data not available'
  );

  if (name.length > 0 && binomial.length > 0 && imageFileName.length > 0) {
    const fileName = cleanFileName(imageFileName);

    try {
      const imageUrl = await fetchImageUrl(fileName);
      return createBearObject(name, binomial, imageUrl, range);
    } catch (error) {
      console.error('Error fetching bear image or processing bear data', error);
      return null;
    }
  }

  return null;
};

export const extractMatch = (
  text: string,
  regex: RegExp,
  defaultValue = ''
): string | string => {
  const match = text.match(regex);
  return match !== null ? match[1].trim() : defaultValue;
};

export const cleanFileName = (fileName: string): string => {
  return fileName.replace('File:', '').trim();
};

const createBearObject = (
  name: string,
  binomial: string,
  imageUrl: string,
  range: string
): Bear => {
  return {
    name,
    binomial,
    image: imageUrl,
    range: range.trim(),
  };
};

const updateBearUI = (bears: Bear[]): void => {
  const moreBearsSection =
    document.querySelector<HTMLDivElement>('.more_bears');

  if (moreBearsSection === null || moreBearsSection === undefined) {
    console.error('More bears section not found.');
    return;
  }

  moreBearsSection.innerHTML = bears
    .map((bear) => renderBearCard(bear))
    .join('');
};

const renderBearCard = (bear: Bear): string => {
  return `
    <div>
      <h3>${bear.name} (${bear.binomial})</h3>
      <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
      <p><strong>Range:</strong> ${bear.range}</p>
    </div>
  `;
};

export default extractBears;
