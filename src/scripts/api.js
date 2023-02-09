import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33456523-920060555a2604cf0d60222c4';

// export function getImages(query) {
//   const response = axios.get(
//     `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
//   );
//   console.log('🚀 ~ getImages ~ response', response);

//   return response.then(response => response.data);
// }

export default class ImageApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  getImages() {
    const response = axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    // console.log('🚀 ~ getImages ~ response', response);

    this.incrementPage();

    return response.then(response => response.data);
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  // get query() {
  //   return this.searchQuery;
  // }

  // set query(newQuery) {
  //   this.query = newQuery;
  // }
}
