const API_KEY = '30150528-560befc7305f5d94b030c7990';
const imgPerPage = 40;
const URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${imgPerPage}`;

async function fetchSearch(correctUrl) {
  const response = await fetch(correctUrl);
  
  if (!response.ok) {
    throw new Error(response.status);
  };

  const imgs = await response.json();
  return imgs;
};

async function fetchLoadMore() {
  const params = '&page=';
  const response = await fetch(`${correctUrl}${params}${page}`);

  if (!response.ok) {
    throw new Error(response.status);
  };

  const newImg = await response.json();
  return newImg
};

export { fetchSearch, fetchLoadMore, URL, imgPerPage };