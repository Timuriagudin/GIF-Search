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
}
  