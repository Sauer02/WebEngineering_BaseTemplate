import fetchImageUrl from './imageFetching_helper';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

const extractBears = async (wikitext: string): Promise<void> => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');

    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)\n/);

      if (nameMatch && binomialMatch && imageMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');

        try {
          const imageUrl = await fetchImageUrl(fileName);

          const bear: Bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl,
            range: rangeMatch
              ? rangeMatch[1].trim()
              : 'Range data not available',
          };

          bears.push(bear);

          // Only update the UI after all bears are processed
          if (bears.length === rows.length) {
            updateBearUI(bears);
          }
        } catch (error) {
          console.error(
            'Error fetching bear image or processing bear data',
            error
          );
        }
      }
    }
  }
};

const updateBearUI = (bears: Bear[]): void => {
  const moreBearsSection =
    document.querySelector<HTMLDivElement>('.more_bears');

  if (!moreBearsSection) {
    console.error('More bears section not found.');
    return;
  }

  moreBearsSection.innerHTML = '';

  bears.forEach((bear) => {
    moreBearsSection.innerHTML += `
      <div>
        <h3>${bear.name} (${bear.binomial})</h3>
        <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
        <p><strong>Range:</strong> ${bear.range}</p>
      </div>
    `;
  });
};

export default extractBears;
