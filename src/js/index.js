import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchSearch, imgPerPage } from './fetch_functions';
import { refs } from './refs';
import { renderMarkup } from './renderMarkup';

let page = 1;
let searchWord = null;

refs.form.addEventListener('submit', onSearchWord);
refs.button.addEventListener('click', loadMoreImg);

function onSearchWord(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.button.style.display = 'block';

  const {elements: { searchQuery }} = e.target;
  searchWord = searchQuery.value.trim();

  try {
  fetchSearch(page, searchWord).then(imgs => {
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
};

function loadMoreImg() {
  try{
    page += 1;
    fetchSearch(page, searchWord).then(newImg => {
      if(page === Math.ceil(newImg.totalHits / imgPerPage)) {
        refs.button.style.display = 'none';
        Notify.failure('We\'re sorry, but you\'ve reached the end of search results.');
      };

      renderMarkup(newImg)
    });
  } catch(error) {
      console.log(error.message);
  }
};