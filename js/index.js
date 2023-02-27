document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.querySelector("#start");
  const submitBtn = document.querySelector("#submit");
  const initialsEl = document.querySelector("#initials");
  const timerEl = document.querySelector("#time");
  const feedbackEl = document.querySelector("#feedback");
  const questionsEl = document.querySelector("#questions");
  const choicesEl = document.querySelector("#choices");
  // quiz state variables
  let currentQuestionIndex = 0;
  let time = questions.length * 15;
  let timerId;

  function startQuiz() {
    // hide start screen
    const startScreenEl = document.querySelector("#start-screen");
    startScreenEl.classList.add("hide");

    // un-hide questions section
    questionsEl.classList.remove("hide");

    // start timer
    timerId = setInterval(clockTick, 1000);

    // show starting time
    timerEl.textContent = time;

    getQuestion();
  }

  function getQuestion() {
    // get current question object from array
    const currentQuestion = questions[currentQuestionIndex];

    // update title with current question
    const titleEl = document.querySelector("#question-title");
    titleEl.textContent = currentQuestion.title;

    // clear out any old question choices
    choicesEl.innerHTML = "";

    // loop over choices
    currentQuestion.choices.forEach((choice, i) => {
      // create new button for each choice
      const choiceNode = document.createElement("button");
      choiceNode.classList.add("choice");
      choiceNode.value = choice;

      choiceNode.textContent = i + 1 + ". " + choice;

      // attach click event listener to each choice
      choiceNode.addEventListener("click", questionClick);

      // display on the page
      choicesEl.appendChild(choiceNode);
    });
  }

  function questionClick(event) {
    // check if user guessed wrong
    if (event.target.value !== questions[currentQuestionIndex].answer) {
      // penalize time
      time -= 15;

      if (time < 0) {
        time = 0;
      }
      // display new time on page
      timerEl.textContent = time;
      feedbackEl.textContent = "Wrong!";
    } else {
      feedbackEl.textContent = "Correct!";
    }

    // flash right/wrong feedback
    feedbackEl.classList.add("feedback");
    setTimeout(() => {
      feedbackEl.classList.remove("feedback");
    }, 1000);

    // next question
    currentQuestionIndex++;

    // time checker
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }

  function quizEnd() {
    // stop timer
    clearInterval(timerId);

    // show end screen
    const endScreenEl = document.querySelector("#end-screen");
    endScreenEl.classList.remove("hide");

    // show final score
    const finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;

    // hide questions section
    questionsEl.classList.add("hide");
  }

  function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
  }

  function saveHighscore() {
    // get value of input box
    const initials = initialsEl.value.trim();

    // make sure value wasn't empty
    if (initials !== "") {
      // get saved scores from localstorage, or if not any, set to empty array
      const highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];

      // format new score object for current user
      const newScore = {
        score: time,
        initials: initials,
      };

      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));

      // redirect to next page
      window.location.href = "highscores.html";
    }
  }

  function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
      saveHighscore();
    }
  }

  // user clicks button to submit initials
  submitBtn.onclick = saveHighscore;

  // user clicks button to start quiz
  startBtn.onclick = startQuiz;

  // user presses enter to submit initials
  initialsEl.onkeyup = checkForEnter;
});
