//alle json arrays und alle template-html-funktionen befinden sich in template.js

let currentQuestion = 0;
let rightAnswers = 0;
let questions = questionsElectronics;
let answeredQuestions = 0;
let currentQuiz = '';
let nextQuiz = '';
let startPage = true;

let AUDIO_SUCCESS = new Audio('audio/right.wav');
AUDIO_SUCCESS.volume = 0.5;
let AUDIO_FAIL = new Audio('audio/wrong.wav');
AUDIO_FAIL.volume = 0.5;


function init() {
  renderStartPage();
}


function linksAtStartPage(parameter) {
  if (parameter === 'disable'){
    document.getElementById('nav-link-bar').style = 'pointer-events: none';
  }else if(parameter === 'enable'){
    document.getElementById('nav-link-bar').style = 'pointer-events: unset';
  }
}


function renderStartPage() {
  body = document.getElementById('card-body');
  body.innerHTML = renderStartPageTemplate();
  linksAtStartPage('disable');
}


function renderWelcomePage(quizName) {
  currentQuiz = quizName;
  body = document.getElementById('card-body');
  body.innerHTML = renderWelcomePageTemplate();
  chooseQuiz();
  highlightSection();
  linksAtStartPage('enable');
}


function chooseQuiz() {
  if (currentQuiz === 'HTML') {
    questions = questionsHTML;
  } else if (currentQuiz === 'NBA') {
    questions = questionsNBA;
  } else if (currentQuiz === 'Germany') {
    questions = questionsGermany;
  } else if (currentQuiz === 'Electronics') {
    questions = questionsElectronics;
  }
}


function highlightSection() {
  document.getElementById(currentQuiz).classList.add('highlight');
}


function renderQuestionsPage() {
  body = document.getElementById('card-body');
  body.innerHTML = renderQuestionsPageTemplate();
  showQuestion();
}


function defineQuestion() {
  let question = questions[currentQuestion];
  removeResult();
  showQuestion();
  if (question["answered"] == true) {
    allowOrBlock('block');
    nextQuestion('enable');
  } else {
    allowOrBlock('allow');
    nextQuestion('disable');;
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
  answeredQuestions++;
  saveAnswer(question, selection);
  playAudio(question, selection);
  AnsweredTrue(question);
  showSolution();
  countRightAnswers(question, selection);
  nextQuestion('enable');
  allowOrBlock('block');
  progressBar();
}


function AnsweredTrue(question) {
  question["answered"] = true;
}


function progressBar() {
  let percentage = Math.round(answeredQuestions / questions.length * 100);
  document.getElementById('progress-bar').style.width = `${percentage}%`;
}


function countRightAnswers(question, selection) {
  if (question["right_answer"] == selection) {
    rightAnswers++;
  }
}


function showSolution() {
  let question = questions[currentQuestion];
  let selctedAnswer = question["selected_answer"];
  let rightAnswer = 'answer' + question["right_answer"];
  if (question["answered"] == true && selctedAnswer == rightAnswer) {
    document.getElementById(question["selected_answer"]).classList.add('backgrd_gr');
    playSuccessAudio(question);
  } else if (question["answered"] == true && selctedAnswer != rightAnswer) {
    document.getElementById(question["selected_answer"]).classList.add('backgrd_red');
    playFailAudio(question);
  }
}


function playAudio(question, selection) {
  let selctedAnswer = question["selected_answer"];
  let rightAnswer = 'answer' + question["right_answer"];
  if (selctedAnswer == rightAnswer && question["answered"] == false) {
    playSuccessAudio(question);
  } else if (selctedAnswer != rightAnswer && question["answered"] == false) {
    playFailAudio(question);
  }
}


function playSuccessAudio(question) {
  if (question["answered"] == false) {
    AUDIO_SUCCESS.play();
  }
}


function playFailAudio(question) {
  if (question["answered"] == false) {
    AUDIO_FAIL.play();
  }
}


function allowOrBlock(parameter) {
  if (parameter === 'block')
    for (let i = 0; i <= 3; i++) {
      document.getElementById('answer' + i).classList.add('pointer-events-none');
    } else if (parameter === 'allow') {
      for (let i = 0; i <= 3; i++) {
        document.getElementById('answer' + i).classList.remove('pointer-events-none');
      }
    }
}


function saveAnswer(question, selection) {
  question["selected_answer"] = "answer" + selection;
}


function nextQuestion(parameter) {
  let question = questions[currentQuestion];
  if (parameter === 'enable' && question["answered"]) {
    document.getElementById('button-arrow-right').disabled = false;
    document.getElementById('button-arrow-right').classList.remove('cursor-not-allowed');
  } else if (parameter === 'disable') {
    document.getElementById('button-arrow-right').disabled = true;
    document.getElementById('button-arrow-right').classList.add('cursor-not-allowed');
  }
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


function renderResult() {
  let body = document.getElementById('card-body')
  body.innerHTML = renderResultTemplate()
}


function replayQuiz() {
  resetAllValues();
  renderStartPage();
}


function resetAllValues() {
  currentQuestion = 0;
  rightAnswers = 0;
  answeredQuestions = 0;
  document.getElementById('progress-bar').style.width = '0';
  document.getElementById(currentQuiz).classList.remove('highlight');
  for (i = 0; i < questions.length; i++) {
    let question = questions[i];
    question["answered"] = false;
    question["selected_answer"] = "";
  }
}


function changeToOtherQuizAlert(quizName) {
  nextQuiz = quizName;
  alert('open');
}


function changeToOtherQuiz(decision) {
  if (decision == true) {
    quizname = nextQuiz;
    alert('close');
    resetAllValues();
    renderWelcomePage(quizname);
  } else {
    alert('close');
  }
}


function alert(parameter) {
  if (parameter === 'open') {
    document.getElementById('alert-bg').classList.remove('d-none');
    document.getElementById('alert').classList.remove('d-none');
  } else if (parameter === 'close') {
    document.getElementById('alert-bg').classList.add('d-none');
    document.getElementById('alert').classList.add('d-none');
  }
}