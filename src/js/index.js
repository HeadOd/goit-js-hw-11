import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchSearch, fetchLoadMore, URL, imgPerPage } from './fetch_functions.js';
import { refs } from './refs';
import { renderMarkup } from './renderMarkup';

let page = 1;
let correctUrl = null;

refs.form.addEventListener('submit', onSearchWord);
refs.button.addEventListener('click', loadMoreImg)

function onSearchWord(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';

  const {elements: { searchQuery }} = e.target;
  const searchWord = searchQuery.value.trim();
  correctUrl = `${URL}&q=${searchWord}`

  try {
  fetchSearch(correctUrl).then(imgs => {
    if(imgs.hits.length === 0) {
      refs.button.style.display = 'none';
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    };
  
    if(page === Math.ceil(imgs.totalHits / imgPerPage)) {
      refs.button.style.display = 'none';
      Notify.failure('We\'re sorry, but you\'ve reached the end of search results.');
    };
    renderMarkup(imgs)});

  } catch (error) {
    error => console.log(error);
  }

  refs.button.style.display = 'block';
};

function loadMoreImg() {
  try{
    page += 1;
    fetchLoadMore().then(newImg => renderMarkup(newImg));
  } catch(error) {
      console.log(error.message);
  }
};