// Define an asynchronous function named 'search'
async function search() {
  // Retrieve the search query input value and trim any whitespace
  const query = document.getElementById("js-searchInput").value.trim();

  // Regular expression to validate if query contains only Latin alphabet characters, digits, or spaces
  const latinAlphabetRegex = /^[a-zA-Z0-9\s]+$/;

  // Get references to HTML elements where messages, results, and count will be displayed
  const messageContainer = document.getElementById("js-message");
  const resultsContainer = document.getElementById("js-results");
  const countContainer = document.getElementById("js-count");

  // Clear previous content in message, results, and count containers
  messageContainer.innerHTML = "";
  resultsContainer.innerHTML = "";
  countContainer.textContent = "";

  // If the search query is empty, display a message and exit the function
  if (query === "") {
    messageContainer.textContent = "Please enter a search query.";
    return;
  }

  // If the search query contains characters other than Latin alphabet, digits, or spaces, display a message and exit the function
  if (!latinAlphabetRegex.test(query)) {
    messageContainer.textContent =
      "Please enter only Latin alphabet characters (A-Z).";
    return;
  }

  // API key for accessing Giphy API
  const api_key = "BVaNPy4RWbbjNaxy8bzG88OckhnlUwBi";

  // Construct the URL for Giphy API search endpoint using the search query and API key
  const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${api_key}`;

  try {
    // Fetch data from the Giphy API
    const response = await fetch(apiUrl);

    // If the network response is not okay, throw an error
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the JSON response
    const data = await response.json();

    // Extract the array of GIFs from the response data
    const gifs = data.data;

    // Get the total count of GIFs returned
    const totalCount = gifs.length;

    // If no GIFs were found, display a message and exit the function
    if (totalCount === 0) {
      messageContainer.textContent = "No GIFs found.";
      return;
    }

    // Display the total count of GIFs found
    countContainer.textContent = `Found ${totalCount} GIFs:`;

    // Iterate through each GIF in the array
    gifs.forEach((gif) => {
      // Extract the URL and title of the GIF
      const gifUrl = gif.images.downsized.url;
      const title = gif.title;

      // Create an <img> element for the GIF
      const img = document.createElement("img");
      img.src = gifUrl;
      img.alt = title;

      // Create a <p> element for the title of the GIF
      const titleElem = document.createElement("p");
      titleElem.textContent = title;

      // Create a <div> container for each GIF and its title
      const gifContainer = document.createElement("div");
      gifContainer.classList.add("gif-container");
      gifContainer.appendChild(img);
      gifContainer.appendChild(titleElem);

      // Append the GIF container to the results container
      resultsContainer.appendChild(gifContainer);
    });
  } catch (error) {
    // If an error occurs during fetching or processing data, log the error and display an error message
    console.error("Error fetching data:", error);
    messageContainer.textContent = "An error occurred. Please try again later.";
  }
}

// Add an event listener to the search input field for keypress events
document
  .getElementById("js-searchInput")
  .addEventListener("keypress", function (event) {
    // When the Enter key is pressed in the search input field, call the 'search' function
    if (event.key === "Enter") {
      search();
    }
  });

// Function to perform a search, which calls the 'search' function
function performSearch() {
  search();
}
