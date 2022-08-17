import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import { getImages } from './fetchImg';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value;
  if (!query) {
    Notiflix.Notify.failure('Enter the keyword, please!');
    return;
  }
  refs.gallery.innerHTML = '';
  getImages(query).then(data => {
    if (!data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    renderImages(data.hits);
  });
}

function renderImages(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        views,
        downloads,
        comments,
        likes,
        tags,
        largeImageURL,
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy"  width="300" height="200"/>
  <div class="info">
    <p class="info-item">
      <b>Likes<span>${likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views <span>${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments<span>${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads<span>${downloads}</span></b>
    </p>
  </div>
</div>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('afterbegin', markup);
}
