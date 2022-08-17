import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import { getImages } from './fetchImg';

const refs = {
  form: document.querySelector('.search-form'),
};
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value;
  getImages(query);
}
