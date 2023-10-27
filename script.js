let questions = [
  {
    "question": "Wer hat HTML erfunden?",
    "answer_1": "Robbie Williams",
    "answer_2": "Lady Gaga",
    "answer_3": "Tim Berners-Lee",
    "answer_4": "Justin Biber",
    "right_answer": 3
  },
  {
    "question": "CSS Frage",
    "answer_1": "CSS Antwort",
    "answer_2": "CSS Antwort",
    "answer_3": "CSS Antwort",
    "answer_4": "CSS Antwort",
    "right_answer": 1
  },
  {
    "question": "JS Frag",
    "answer_1": "JS Antwort",
    "answer_2": "JS Antwort",
    "answer_3": "JS Antwort",
    "answer_4": "JS Antwort",
    "right_answer": 2
  },
  {
    "question": "Java Frage",
    "answer_1": "Java Frage",
    "answer_2": "Java Frage",
    "answer_3": "Java Frage",
    "answer_4": "Java Frage",
    "right_answer": 4
  }
]

let currentQuestion = 0;


function init() {
  renderHomePage();
}


function renderHomePage() {
  body = document.getElementById('card-body');
  body.innerHTML = renderHomePageTemplate();
}


function renderHomePageTemplate() {
  return `
    <div class="headlines-home-page">
    <h3> <span>Welcome to</span> <span>The Awesome HTML Quiz</span></h3>
    <h4>Ready for the challenge?</h4>
  </div>
  <div class="w-100 d-flex justify-content-end my-5">
    <button class="btn btn-primary font-size-20 d-flex align-items-center start-button" onclick="renderQuestion()">
      Start now <i class="arrow-css turn-right mt-1 ms-2 me-1"></i>
    </button>
  </div>
    `
}


function renderQuestion() {
  body = document.getElementById('card-body');
  body.innerHTML = renderQuestionTemplate();
  showQuestion();
}


function renderQuestionTemplate() {
  return `
    <span class="card-text" id="quiz-question">Question</span>
      <div class="card quiz-answer-card mt-1 d-flex flex-row align-items-center border-white" onclick="answer(1 )">
        <div class="answer-letter">A</div>
        <div class="card-body" id="answer1">
          Answer
        </div>
      </div>
      <div class="card quiz-answer-card mt-1 d-flex flex-row align-items-center border-white" onclick="answer(2)">
        <div class="answer-letter">B</div>
        <div class="card-body" id="answer2">
          Answer
        </div>
      </div>
      <div class="card quiz-answer-card mt-1 d-flex flex-row align-items-center border-white" onclick="answer(3)">
        <div class="answer-letter">C</div>
        <div class="card-body" id="answer3">
          Answer
        </div>
      </div>
      <div class="card quiz-answer-card mt-1 d-flex flex-row align-items-center border-white" onclick="answer(4)">
        <div class="answer-letter">D</div>
        <div class="card-body" id="answer4">
          Answer
        </div>
      </div>
      
      <div class="disable-arrow"><img src="img/icon-links.png" alt="zurück" class="arrow arrow-left" onclick="changeQuestion(-1)"></div>
      <div class="disable-arrow"><img src="img/icon-rechts.png" alt="weiter" class="arrow arrow-right" onclick="changeQuestion(1)"></div>
      `
}


function showQuestion() {
  let question = questions[currentQuestion];
  document.getElementById('quiz-question').innerHTML = question["question"];
  for (let i = 1; i <= 4; i++) {
    document.getElementById("answer" + i).innerHTML = question["answer_" + i];
  }
  highlightSidebarElement();
}


function answer(selection) {
  let question = questions[currentQuestion];
  if (selection == question["right_answer"]) {
    document.getElementById('answer' + selection).parentElement.classList.add('backgrd_gr')
  }
  else {
    document.getElementById('answer' + selection).parentElement.classList.add('backgrd_red')
  }
}


function changeQuestion(operator) {
  currentQuestion += (operator);
  if (currentQuestion < 0) {
    currentQuestion = 0;
  } else if (currentQuestion >= questions.length) {
    renderResult();
  } else {
    showQuestion();
    removeResult();
  }

}


function jumpToQuestion(questionNumber) {
  currentQuestion = questionNumber;
  removeResult();
  showQuestion();
}


function removeResult() {
  document.getElementById('answer1').parentElement.classList.remove('backgrd_gr');
  document.getElementById('answer2').parentElement.classList.remove('backgrd_gr');
  document.getElementById('answer3').parentElement.classList.remove('backgrd_gr');
  document.getElementById('answer4').parentElement.classList.remove('backgrd_gr');
  document.getElementById('answer1').parentElement.classList.remove('backgrd_red');
  document.getElementById('answer2').parentElement.classList.remove('backgrd_red');
  document.getElementById('answer3').parentElement.classList.remove('backgrd_red');
  document.getElementById('answer4').parentElement.classList.remove('backgrd_red');
  // for (let i = 0; i < 4; i++) {
  //     document.getElementById('answer'+i).parentElement.classList.remove(cssClass);
  // }
}


function highlightSidebarElement() {
  removeHighlight();
  document.getElementById('nav-link-' + currentQuestion).classList.add('highlight');
  console.log('nav-link-' + currentQuestion);
}


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
      <button class="btn text-primary">REPLAY</button>
    </div>
  `
}