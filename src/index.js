import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};
const API_KEY = '30150528-560befc7305f5d94b030c7990';
const URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true`;

refs.form.addEventListener('submit', onSearchWord);

function onSearchWord(e) {
  e.preventDefault();

  const {elements: { searchQuery }} = e.target;
  const searchWord = searchQuery.value.trim();
  const correctUrl = `${URL}&q=${searchWord}`

  fetchSearch(correctUrl).then(imgs => renderMarkup(imgs));

  return console.log(fetchSearch(correctUrl).then(imgs => console.log(imgs)));

};

async function fetchSearch(correctUrl) {
  const response = await fetch(correctUrl);
  const imgs = await response.json();
  return imgs;
};

function renderMarkup(imgs) {
  if(imgs.hits.length === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }

  const markup = imgs.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads })=> {
    return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span>${likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        <span>${views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <span>${comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <span>${downloads}</span>
      </p>
    </div>
  </div>`;
  }).join('');

  refs.gallery.innerHTML = markup;
}