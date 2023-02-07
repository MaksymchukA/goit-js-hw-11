import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImages } from './api';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  console.log(event);

  const imageName = event.target.elements[0].value;
  console.log('🚀 ~ onFormSubmit ~ imageName', imageName);

  if (imageName) {
    return getImages(imageName).then(data => {
      console.log(data);
      searchImages(data);
    });
  }
  searchForm.reset();
}

function searchImages(imagesArray) {
  if (imagesArray.hits.length === 0) {
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  renderedMarkupImages(imagesArray);
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
