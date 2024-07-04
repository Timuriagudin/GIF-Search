async function search() {
  const query = document.getElementById("js-searchInput").value.trim();
  const latinAlphabetRegex = /^[a-zA-Z0-9]+$/;
  const messageContainer = document.getElementById("js-message");
  const resultsContainer = document.getElementById("js-results");
  const countContainer = document.getElementById("js-count");

  messageContainer.innerHTML = "";
  resultsContainer.innerHTML = "";
  countContainer.textContent = "";

  if (query === "") {
    messageContainer.textContent = "Please enter a search query.";
    return;
  }
  if (!latinAlphabetRegex.test(query)) {
    messageContainer.textContent =
      "Please enter only Latin alphabet characters (A-Z).";
    return;
  }

  const api_key = "BVaNPy4RWbbjNaxy8bzG88OckhnlUwBi";
  const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${api_key}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const gifs = data.data;
    const totalCount = gifs.length;

    if (totalCount === 0) {
      messageContainer.textContent = "No GIFs found.";
      return;
    }
    countContainer.textContent = `Found ${totalCount} GIFs:`;

    gifs.forEach((gif) => {
      const gifUrl = gif.images.downsized.url;
      const title = gif.title;
      const img = document.createElement("img");
      img.src = gifUrl;
      img.alt = title;

      const titleElem = document.createElement("p");
      titleElem.textContent = title;

      const gifContainer = document.createElement("div");
      gifContainer.classList.add("gif-container");
      gifContainer.appendChild(img);
      gifContainer.appendChild(titleElem);

      resultsContainer.appendChild(gifContainer);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    messageContainer.textContent = "An error occurred. Please try again later.";
  }
}

document
  .getElementById("js-searchInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      search();
    }
  });

function performSearch() {
  search();
}
