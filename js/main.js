// Function to perform search
function search() {
  const query = document.getElementById("js-searchInput").value.trim();
  const latinAlphabetRegex = /^[a-zA-Z]+$/;
  const messageContainer = document.getElementById("js-message");
  const resultsContainer = document.getElementById("js-results");
  messageContainer.innerHTML = "";
  resultsContainer.innerHTML = ""; // Clear previous results

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

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const gifs = data.data;

      if (gifs.length === 0) {
        messageContainer.textContent = "No results found.";
        return;
      }

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
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      messageContainer.textContent = "An error occurred. Please try again later.";
    });
}

// Event listener for Enter key press
document.getElementById("js-searchInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    search();
  }
});

// Function to initiate search on button click
function performSearch() {
  search();
}
