import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('.load-more'),
};
const API_KEY = '30150528-560befc7305f5d94b030c7990';
const imgPerPage = 40;
const URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${imgPerPage}`;
let page = 1;
let correctUrl = null;

refs.form.addEventListener('submit', onSearchWord);
refs.button.addEventListener('click', loadMoreImg)

function onSearchWord(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.button.style.display = 'block';

  const {elements: { searchQuery }} = e.target;
  const searchWord = searchQuery.value.trim();
  correctUrl = `${URL}&q=${searchWord}`

  try {
    fetchSearch(correctUrl).then(imgs => renderMarkup(imgs));
  } catch (error) {
    error => console.log(error);
  }
};

async function fetchSearch(correctUrl) {
  const response = await fetch(correctUrl);
  //! чи вірно робити таку перевірку?
  if (!response.ok) {
    throw new Error(response.status);
  };

  const imgs = await response.json();
  return imgs;
};

function renderMarkup(imgs) {
  if(imgs.hits.length === 0) {
    refs.button.style.display = 'none';
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  };

  if(page === Math.ceil(imgs.totalHits / imgPerPage)) {
    refs.button.style.display = 'none';
    Notify.failure('We\'re sorry, but you\'ve reached the end of search results.');
  };

  const markup = imgs.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads })=> {
    return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b><br>
        <span>${likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b><br>
        <span>${views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b><br>
        <span>${comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b><br>
        <span>${downloads}</span>
      </p>
    </div>
  </div>`;
  }).join('');

  refs.gallery.insertAdjacentHTML("beforeend", markup);
};

//*btn
async function loadMoreImg() {
  try{
    page += 1;
    fetchLoadMore().then(newImg => renderMarkup(newImg));
  } catch(error) {
      console.log(error.message);
  }
};

async function fetchLoadMore() {
  const params = '&page=';
  const response = await fetch(`${correctUrl}${params}${page}`);
  //! чи вірно робити таку перевірку?
  if (!response.ok) {
    throw new Error(response.status);
  };

  const newImg = await response.json();
  return newImg
};