import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImageApi from './api';
import LoadMoreBtn from './load-more-btn';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const text = document.querySelector('.end-collection');
const imageApi = new ImageApi();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.button.addEventListener('click', fetchImages);

function onFormSubmit(event) {
  event.preventDefault();
  // console.log(event);

  imageApi.searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  if (!imageApi.searchQuery) {
    return;
  }

  imageApi.resetPage();
  clearGallery();

  fetchImages();

  searchForm.reset();
}

async function fetchImages() {
  loadMoreBtn.hide();
  text.classList.add('hidden');

  const data = await imageApi.getImages();
  console.log(data);
  searchImages(data);
  return data;
}

function searchImages(imagesArray) {
  const currentPage = imageApi.page - 1;

  if (imagesArray.hits.length > 40) {
    loadMoreBtn.show();
  } else {
    loadMoreBtn.hide();
  }

  if (imagesArray.hits.length === 0) {
    loadMoreBtn.hide();
    text.classList.add('hidden');
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  if (imagesArray.hits.length > 0) {
    renderedMarkupImages(imagesArray);
    loadMoreBtn.show();
    text.classList.add('hidden');
  }

  if (imagesArray.hits.length < 40) {
    loadMoreBtn.hide();
    text.classList.remove('hidden');
  }

  if (currentPage === 1) {
    Notify.success(`Hooray! We found ${imagesArray.totalHits} images.`);
  }
}

function renderedMarkupImages({ hits }) {
  const markup = hits
    .map(hit => {
      return `
    <div class="photo-card">
    <a href="${hit.largeImageURL}">
    <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
    </a>
    <div class="info">
    <p class="info-item">
      <b>Likes ${hit.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${hit.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${hit.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${hit.downloads}</b>
    </p>
    </div>
    </div>
    `;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  gallery.innerHTML = '';
}
