const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}


const darkToggle = document.getElementById("darkToggle");

// Load saved theme preference
if (darkToggle) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkToggle.textContent = "☀️";
  }

  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    darkToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light"); // Save preference
  });
}


const quizData = [
  { q: "2 + 2 = ?", options: ["3", "4", "5"], answer: "4" },
  { q: "Capital of France?", options: ["London", "Paris"], answer: "Paris" },
];

const quizContainer = document.getElementById("quizContainer");
const submitQuiz = document.getElementById("submitQuiz");
const quizResult = document.getElementById("quizResult");

if (quizContainer && submitQuiz && quizResult) {
  // Render questions
  quizData.forEach((item, index) => {
    const qDiv = document.createElement("div");
    qDiv.classList.add("quiz-question");

    // Question Text
    const question = document.createElement("p");
    question.textContent = item.q;
    qDiv.appendChild(question);

    // Options
    item.options.forEach((opt) => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="q${index}" value="${opt}"> ${opt}
      `;
      qDiv.appendChild(label);
      qDiv.appendChild(document.createElement("br"));
    });

    quizContainer.appendChild(qDiv);
  });

  // Handle Submit
  submitQuiz.addEventListener("click", () => {
    let score = 0;

    quizData.forEach((item, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === item.answer) {
        score++;
      }
    });

    quizResult.textContent = `You scored ${score}/${quizData.length} 🎉`;
  });
}


const getJokeBtn = document.getElementById("getJoke");
const jokeText = document.getElementById("jokeText");

if (getJokeBtn && jokeText) {
  getJokeBtn.addEventListener("click", async () => {
    jokeText.textContent = "Loading a joke... 😂";
    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      jokeText.textContent = `${data.setup} - ${data.punchline}`;
    } catch (error) {
      jokeText.textContent = "😢 Oops! Couldn't load a joke.";
      console.error("Joke fetch error:", error);
    }
  });
}
