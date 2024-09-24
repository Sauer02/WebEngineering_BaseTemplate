const extractBears = async (wikitext) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)\n/); // Extract range data

      if (nameMatch && binomialMatch && imageMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');
        
        try {
          const imageUrl = await fetchImageUrl(fileName);
          
          const bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl,
            range: rangeMatch ? rangeMatch[1].trim() : 'Range data not available'
          };
          
          bears.push(bear);
          
          // Only update the UI after all bears are processed
          if (bears.length === rows.length) {
            updateBearUI(bears);
          }
        } catch (error) {
          console.error('Error fetching bear image or processing bear data', error);
        }
      }
    }
  }
};

const updateBearUI = (bears) => {
  const moreBearsSection = document.querySelector('.more_bears');
  moreBearsSection.innerHTML = ''; // Clear the section before updating

  bears.forEach(bear => {
    moreBearsSection.innerHTML += `
      <div>
        <h3>${bear.name} (${bear.binomial})</h3>
        <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
        <p><strong>Range:</strong> ${bear.range}</p>
      </div>
    `;
  });
};
