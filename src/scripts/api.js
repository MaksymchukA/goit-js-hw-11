import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33456523-920060555a2604cf0d60222c4';

export default class ImageApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getImages() {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );

    this.incrementPage();

    // return response.then(response => response.data);
    return response.data;
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
