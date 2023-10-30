let questions = [
  {
    "question": "Wer hat HTML erfunden?",
    "answer_0": "Robbie Williams",
    "answer_1": "Lady Gaga",
    "answer_2": "Tim Berners-Lee",
    "answer_3": "Justin Biber",
    "right_answer": 2,
    "answered": false,
    "selected_answer": ""
  },
  {
    "question": "CSS Frage",
    "answer_0": "CSS Antwort",
    "answer_1": "CSS Antwort",
    "answer_2": "CSS Antwort",
    "answer_3": "CSS Antwort",
    "right_answer": 1,
    "answered": false,
    "selected_answer": ""
  },
  {
    "question": "JS Frag",
    "answer_0": "JS Antwort",
    "answer_1": "JS Antwort",
    "answer_2": "JS Antwort",
    "answer_3": "JS Antwort",
    "right_answer": 2,
    "answered": false,
    "selected_answer": ""
  },
  {
    "question": "Java Frage",
    "answer_0": "Java Frage",
    "answer_1": "Java Frage",
    "answer_2": "Java Frage",
    "answer_3": "Java Frage",
    "right_answer": 0,
    "answered": false,
    "selected_answer": ""
  }
]

let currentQuestion = 0;
let rightAnswers = 0;


function init() {
  renderStartPage();
}


function renderStartPage(){
  body = document.getElementById('card-body');
  body.innerHTML = renderStartPageTemplate();
}


function renderStartPageTemplate(){
  return `
  <h2>Welcome to QuizzIt</h2>
  <h3>Which Quiz do you want to Play?</h3>
  <button onclick="renderWelcomePage('HTML')" class="btn btn-outline-danger mt-2 w-50">HTML-Quiz</button>
  <button onclick="renderWelcomePage('CSS')" class="btn btn-outline-primary mt-2 w-50">CSS-Quiz</button>
  <button onclick="renderWelcomePage('JavaScript')" class="btn btn-outline-warning mt-2 w-50">JavaScript-Quiz</button>
  <button onclick="renderWelcomePage('Java')" class="btn btn-outline-secondary mt-2 w-50">Java-Quiz</button>
  `
}


function renderWelcomePage(quizName) {
  body = document.getElementById('card-body');
  body.innerHTML = renderWelcomePageTemplate(quizName);
}


function renderWelcomePageTemplate(quizName) {
  return `
    <div class="headlines-home-page">
    <h3> <span>Welcome to</span> <span>The Awesome ${quizName} Quiz</span></h3>
    <h4>Ready for the challenge?</h4>
  </div>
  <div class="w-100 d-flex justify-content-end my-5">
    <button class="btn btn-primary font-size-20 d-flex align-items-center start-button" onclick="renderQuestionsPage()">
      Start now <i class="arrow-css turn-right mt-1 ms-2 me-1"></i>
    </button>
  </div>
  `
}


function renderQuestionsPage() {
  body = document.getElementById('card-body');
  body.innerHTML = renderQuestionsPageTemplate();
  showQuestion();
}


function renderQuestionsPageTemplate() {
  return `
    <span class="card-text" id="quiz-question">Question</span>
      <div class="card quiz-answer-card mt-1 d-flex flex-row align-items-center border-white" id="answer0" onclick="answer(0)">
        <div class="answer-letter">A</div>
        <div class="card-body" id="insert-answer0">
          Answer
        </div>
      </div>
      <div class="card quiz-answer-card mt-1 d-flex flex-row align-items-center border-white" id="answer1" onclick="answer(1)">
        <div class="answer-letter">B</div>
        <div class="card-body" id="insert-answer1">
          Answer
        </div>
      </div>
      <div class="card quiz-answer-card mt-1 d-flex flex-row align-items-center border-white" id="answer2" onclick="answer(2)">
        <div class="answer-letter">C</div>
        <div class="card-body" id="insert-answer2">
          Answer
        </div>
      </div>
      <div class="card quiz-answer-card mt-1 d-flex flex-row align-items-center border-white" id="answer3" onclick="answer(3)">
        <div class="answer-letter">D</div>
        <div class="card-body" id="insert-answer3">
          Answer
        </div>
      </div>
      <button onclick="changeQuestion(-1)" class="arrow arrow-left cursor-not-allowed" id="button-arrow-left" disabled><img src="img/icon-links.png" alt="zurück" ></button>
      <button onclick="changeQuestion(1)" class="arrow arrow-right cursor-not-allowed" id="button-arrow-right" disabled><img src="img/icon-rechts.png" alt="weiter"></button>
      `
}


function defineQuestion() {
  let question = questions[currentQuestion];
  removeResult();
  showQuestion();
  if(question["answered"] == true){
    blockAnswers();
    enableNextQuestion();
  }else{
    allowAnswers();
    disableNextQuestion();
  }
  showSolution();
  enablePreviousQuestion();
}


function showQuestion() {
  let question = questions[currentQuestion];
  document.getElementById('quiz-question').innerHTML = question["question"];
  for (let i = 0; i <= 3; i++) {
    document.getElementById("insert-answer" + i).innerHTML = question["answer_" + i];
  }
}


function answer(selection) {
  let question = questions[currentQuestion];
  saveAnswer(question, selection);
  showSolution();
  countRightAnswers(question, selection);
  enableNextQuestion();
  blockAnswers();
}


function countRightAnswers(question, selection){
  if (question["right_answer"] == selection){
    rightAnswers++;
  }
}


function showSolution() {
  let question = questions[currentQuestion];
  let selctedAnswer = question["selected_answer"];
  let rightAnswer = 'answer' + question["right_answer"];
  if (question["answered"] == true && selctedAnswer == rightAnswer) {
    document.getElementById(question["selected_answer"]).classList.add('backgrd_gr')
  } else if (question["answered"] == true && selctedAnswer != rightAnswer) {
    document.getElementById(question["selected_answer"]).classList.add('backgrd_red');
  }
}


function blockAnswers() {
  for (let i = 0; i <= 3; i++) {
    document.getElementById('answer' + i).classList.add('pointer-events-none');
  }
}


function allowAnswers() {
  for (let i = 0; i <= 3; i++) {
    document.getElementById('answer' + i).classList.remove('pointer-events-none');
  }
}


function saveAnswer(question, selection) {
  question["answered"] = true;
  question["selected_answer"] = "answer" + selection;
}


function enableNextQuestion() {
  let question = questions[currentQuestion];
  if (question["answered"]) {
    document.getElementById('button-arrow-right').disabled = false;
    document.getElementById('button-arrow-right').classList.remove('cursor-not-allowed');
  }
}


function disableNextQuestion() {
  document.getElementById('button-arrow-right').disabled = true;
  document.getElementById('button-arrow-right').classList.add('cursor-not-allowed')
}


function changeQuestion(operator) {
  currentQuestion += (operator);
  if (currentQuestion < 0) {
    currentQuestion = 0;
  } else if (currentQuestion >= questions.length) {
    renderResult();
  } else {
    defineQuestion();
  }
}


function enablePreviousQuestion() {
  if (currentQuestion == 0) {
    document.getElementById('button-arrow-left').disabled = true;
    document.getElementById('button-arrow-left').classList.add('cursor-not-allowed')
  } else if (currentQuestion > 0) {
    document.getElementById('button-arrow-left').disabled = false;
    document.getElementById('button-arrow-left').classList.remove('cursor-not-allowed')
  }
}


// function jumpToQuestion(questionNumber) {
//   currentQuestion = questionNumber;
//   removeResult();
//   whichAnswerSelcted();
//   showQuestion();
// }


function removeResult() {
  for (let i = 0; i <= 3; i++) {
    document.getElementById('answer' + i).classList.remove('backgrd_gr');
    document.getElementById('answer' + i).classList.remove('backgrd_red');
  }
}


function whichAnswerSelcted() {
  let question = questions[currentQuestion];
  let selctedAnswer = question["selected_answer"];
  let rightAnswer = 'answer' + question["right_answer"];
  if (question["answered"] == true && selctedAnswer == rightAnswer) {
    document.getElementById(question["selected_answer"]).classList.add('backgrd_gr')
  } else if (question["answered"] == true && selctedAnswer != rightAnswer) {
    document.getElementById(question["selected_answer"]).classList.add('backgrd_red');
  }
}


// function highlightSidebarElement() {
//   removeHighlight();
//   document.getElementById('nav-link-' + currentQuestion).classList.add('highlight');
// }


function removeHighlight() {
  for (let i = 0; i < 4; i++) {
    document.getElementById('nav-link-' + i).classList.remove('highlight');
  }
}


function renderResult() {
  let body = document.getElementById('card-body')
  body.innerHTML = renderResultTemplate()
}


function renderResultTemplate() {
  return `
    <div class="result-headline">
      <img src="/img/brain_result.png" alt="brain">
      <h2><span>COMPLETE</span><span>HTML QUIZ</span></h2>
    </div>
    <div class="end-result"><span class="your-score">Your Score</span><span class="right-answers">${rightAnswers}/${questions.length}</span></div>
    <div class="d-flex flex-column w-100 align-items-center">
      <button class="btn btn-primary w-25">SHARE</button>
      <button class="btn text-primary" onclick="replayQuiz()">REPLAY</button>
    </div>
  `
}


function replayQuiz(){
  resetAllValues();
  renderStartPage();
}


function resetAllValues(){
  currentQuestion = 0;
  rightAnswers = 0;
  for(i=0; i<questions.length; i++){
    let question = questions[i];
    question["answered"] = false;
    question["selected_answer"]= "";
  }
}