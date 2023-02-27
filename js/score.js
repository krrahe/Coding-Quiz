function displayHighscores() {
    // Get highscores from localstorage or set to empty array
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
    // Sort highscores by score property in descending order
    highscores.sort((a, b) => b.score - a.score);
  
    // Create list items for each high score and add to list element
    const olEl = document.getElementById("highscores");
    highscores.forEach(score => {
      const liTag = document.createElement("li");
      liTag.textContent = `${score.initials} - ${score.score}`;
      olEl.appendChild(liTag);
    });
  
    // Add click event listener to clear button to remove highscores from localstorage and reload page
    const clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("highscores");
      window.location.reload();
    });
  }
  
  // Call displayHighscores function when page loads
  displayHighscores();