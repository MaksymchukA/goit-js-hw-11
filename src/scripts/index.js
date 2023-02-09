import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { getImages } from './api';
import ImageApi from './api';
import LoadMoreBtn from './load-more-btn';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const imageApi = new ImageApi();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});
imageApi.searchQuery = '';

searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.button.addEventListener('click', fetchImages);

function onFormSubmit(event) {
  event.preventDefault();
  console.log(event);

  imageApi.searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  imageApi.resetPage();
  clearGallery();

  fetchImages();

  searchForm.reset();
}

function fetchImages() {
  return imageApi.getImages().then(data => {
    console.log(data);
    searchImages(data);

    // Notify.success(`Hooray! We found ${data.totalHits} images.`);
  });
}

function searchImages(imagesArray) {
  loadMoreBtn.hide();
  if (imagesArray.hits.length === 0 || imageApi.searchQuery === '') {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  renderedMarkupImages(imagesArray);
  loadMoreBtn.show();
  // updateImagesGallery();
}

function renderedMarkupImages({ hits }) {
  const markup = hits.map(hit => {
    return `<div class="photo-card">
  <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${hit.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${hit.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${hit.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${hit.downloads}</b>
    </p>
  </div>
</div>`;
  });
  gallery.innerHTML = markup;
}

function clearGallery() {
  gallery.innerHTML = '';
}

// function updateImagesGallery() {
//   gallery.insertAdjacentHTML('beforeend', );
// }

function onError(error) {}
