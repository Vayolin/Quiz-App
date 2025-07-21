const quizData = [
  {
    question: "Choose the correct HTML element for the largest heading ?",
    options: ["<h1>", "<h6>", "<head>", "<heading>"],
    answer: "<h1>"
  },
  {
    question: "What is the correct HTML element for inserting a line break ?",
    options: ["<lb>", "<b>", "<br>", "<break>"],
    answer: "<br>"
  },
  {
    question: "Choose the correct HTML element to define important text ?",
    options: ["<b>", "<strong>", "<important>", "<i>"],
    answer: "<strong>"
  },
  {
    question: "HTML stands for?",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyper Transfer Markup Language",
      "Hyper Tool Multi Language"
    ],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which character is used to indicate an end tag ?",
    options: ["*", "^", "/", "<"],
    answer: "/"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");
const finalScore = document.getElementById("final-score");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn, q.answer);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selectedBtn, correctAnswer) {
  const allButtons = optionsEl.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true);

  if (selectedBtn.textContent === correctAnswer) {
    selectedBtn.classList.add("correct");
    feedbackEl.textContent = "Correct!";
    score++;
  } else {
    selectedBtn.classList.add("wrong");
    feedbackEl.textContent = `Wrong! Correct: ${correctAnswer}`;
    allButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
};

function showScore() {
  document.getElementById("quiz-box").classList.add("hidden");
  scoreBox.classList.remove("hidden");

  let currentScore = 0;
  const total = quizData.length;
  const interval = setInterval(() => {
    if (currentScore <= score) {
      finalScore.textContent = `${currentScore} / ${total}`;
      currentScore++;
    } else {
      clearInterval(interval);
    }
  }, 200); // speed of animation
}

loadQuestion();
