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
    refs.loadMoreBtn.classList.add('hidden');
    return;
  }
  refs.gallery.innerHTML = '';
  page = 1;
  refs.loadMoreBtn.classList.add('hidden');
  try {
    const data = await getImages(query);

    if (!data.hits.length) {
      document.body.classList.add('intro');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    document.body.classList.remove('intro');

    renderGallery(data);

    if (page * 40 < data.totalHits) {
      refs.loadMoreBtn.classList.remove('hidden');
    }
    if (page * 40 > data.totalHits) {
      refs.loadMoreBtn.classList.add('hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick() {
  try {
    page += 1;
    const data = await getImages(query, page);
    renderGallery(data);
    if (page * 40 > data.totalHits) {
      refs.loadMoreBtn.classList.add('hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

function renderGallery(data) {
  const markup = createMarkup(data.hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  const gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  return data;
}
