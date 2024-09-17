const fetchImageUrl = async (fileName) => {
  const imageParams = {
    action: "query",
    titles: `File:${fileName}`,
    prop: "imageinfo",
    iiprop: "url",
    format: "json",
    origin: "*"
  };

  const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch image URL.');
    
    const data = await res.json();
    const pages = data.query.pages;
    const imageInfo = Object.values(pages)[0].imageinfo;

    if (imageInfo && imageInfo.length > 0) {
      return imageInfo[0].url;
    } else {
      throw new Error('Image not found.');
    }
  } catch (error) {
    console.error(error.message);
    return 'media/noBearFound.jpg';
  }
};
