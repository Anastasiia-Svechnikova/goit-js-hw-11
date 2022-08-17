import axios from 'axios';

const KEY = '29314851-8b512a5abc572021537d02a85';
const URL = 'https://pixabay.com/api/';

export async function getImages(query, page = 1) {
  const params = new URLSearchParams({
    key: KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 40,
  });

  const result = await axios.get(`${URL}?${params}`);
  return result.data;
}
