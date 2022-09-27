import { refs } from './refs';

export function renderMarkup(imgs) {
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