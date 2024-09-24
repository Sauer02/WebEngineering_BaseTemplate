import { BASE_URL } from './constants';

const fetchImageUrl = async (fileName: string): Promise<string> => {
  const imageParams: Record<string, string> = {
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const url = `${BASE_URL}?${new URLSearchParams(imageParams).toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch image URL.');

    const data: ImageApiResponse = await res.json(); // Typed response
    const pages = data.query.pages;
    const imageInfo = Object.values(pages)[0]?.imageinfo;

    if (imageInfo && imageInfo.length > 0) {
      return imageInfo[0].url;
    } else {
      throw new Error('Image not found.');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occurred.');
    }
    return 'media/noBearFound.jpg';
  }
};

// Define the API response types
interface ImageApiResponse {
  query: {
    pages: Record<
      string,
      {
        imageinfo?: Array<{
          url: string;
        }>;
      }
    >;
  };
}

export default fetchImageUrl;
