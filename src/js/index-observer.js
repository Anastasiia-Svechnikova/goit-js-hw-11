import Notiflix from 'notiflix';
import axios from 'axios';
import { getImages } from './fetchImg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createMarkup from './create-markup';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  guard: document.querySelector('.js-guard'),
};

let page = 1;
let query = '';

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();
  query = e.target.elements.searchQuery.value;
  if (!query) {
    refs.gallery.innerHTML = '';
    Notiflix.Notify.failure('Enter the keyword, please!');
    document.body.classList.add('intro');

    return;
  }
  refs.gallery.innerHTML = '';
  page = 1;

  try {
    const data = await getImages(query);

    if (!data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    document.body.classList.remove('intro');

    renderGallery(data);
    observer.observe(refs.guard);
  } catch (error) {
    console.log(error);
  }
}

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1,
};
const observer = new IntersectionObserver(updateGallery, options);

async function updateGallery(entries) {
  try {
    if (entries[0].isIntersecting) {
      page += 1;
      const data = await getImages(query, page);
      renderGallery(data);
    }
  } catch (error) {
    console.log(error);
  }
}
function renderGallery(data) {
  const markup = createMarkup(data.hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  const gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  return data;
}
