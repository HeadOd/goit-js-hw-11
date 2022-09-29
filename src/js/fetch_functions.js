const imgPerPage = 40;

async function fetchSearch(page, searchWord) {
  const API_KEY = '30150528-560befc7305f5d94b030c7990';
  const URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${imgPerPage}`;
  const correctUrl = `${URL}&q=${searchWord}`;
  const params = '&page=';
  const response = await fetch(`${correctUrl}${params}${page}`);

  if (!response.ok) {
    throw new Error(response.status);
  };

  const imgs = await response.json();
  return imgs;
};

export { fetchSearch, imgPerPage };