function search() {
  const query = document.getElementById("js-searchInput").value.trim();
  const latinAlphabetRegex = /^[a-zA-Z]+$/;
  const messageContainer = document.getElementById("js-message");
  messageContainer.innerHTML = '';

  if (query === "") {
    messageContainer.textContent = "Please enter a search query.";
    return;
  }
  if (!latinAlphabetRegex.test(query)){
    messageContainer.textContent = "Please enter only Latin alphabet characters (A-Z).";
    return;
  }

  const api_key = "BVaNPy4RWbbjNaxy8bzG88OckhnlUwBi";
  const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${api_key}`;

  fetch(apiUrl)
  .then(response => response.json())
  .then((data) => {
    const gifs = data.data;
    const resultsContainer = document.getElementById('js-results');
    resultsContainer.innerHTML = "";
    gifs.forEach((gif) => {
        const gifUrl = gif.images.downsized.url;
        const title = gif.title;
  })
})
}
