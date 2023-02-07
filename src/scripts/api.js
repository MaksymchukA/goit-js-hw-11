import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33456523-920060555a2604cf0d60222c4';

export function getImages(query) {
  const response = axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  console.log('🚀 ~ getImages ~ response', response);

  return response.then(response => response.data);
}
