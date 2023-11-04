function renderWelcomePageTemplate() {
  return /*html*/`
      <div class="headlines-home-page">
      <h3> <span>Welcome to</span> <span>The Awesome ${currentQuiz} Quiz</span></h3>
      <h4>Ready for the challenge?</h4>
    </div>
    <div class="w-100 d-flex justify-content-end my-5">
      <button class="btn btn-primary font-size-20 d-flex align-items-center start-button" onclick="renderQuestionsPage()">
        Start now <i class="arrow-css turn-right mt-1 ms-2 me-1"></i>
      </button>
    </div>
    `
}


function renderStartPageTemplate() {
  return /*html*/`
    <h2 class="PT-Sans">Welcome to QuizzIt</h2>
    <h3 class="PT-Sans">Which Quiz do you want to Play?</h3>
    <button onclick="renderWelcomePage('HTML')" class="btn btn-outline-danger mt-4 w-50">HTML-Quiz</button>
    <button id="NBA" onclick="renderWelcomePage('NBA')" class="btn btn-outline-primary mt-4 w-50">NBA-Quiz</button>
    <button id="Germany" onclick="renderWelcomePage('Germany')" class="btn btn-outline-warning mt-4 w-50">Germany-Quiz</button>
    <button id="Electronics" onclick="renderWelcomePage('Electronics')" class="btn btn-outline-secondary mt-4 w-50">Electronics-Quiz</button>
    `
}


function renderQuestionsPageTemplate() {
  return /*html*/`
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


function renderResultTemplate() {
  return /*html*/`
      <div class="result-headline">
        <img src="./img/brain_result.png" alt="brain">
        <h2><span>QUIZ COMPLETE!!</span></h2>
      </div>
      <div class="end-result"><span class="your-score">Your Score</span><span class="right-answers">${rightAnswers}/${questions.length}</span></div>
      <div class="d-flex flex-column w-100 align-items-center">
        <button class="btn btn-primary w-25 btn-resp">SHARE</button>
        <button class="btn btn-outline-primary mt-1 w-25 btn-resp" onclick="replayQuiz()">REPLAY</button>
      </div>
      <div class="trophy-container"><img src="img/tropy.png" alt="Trophy"></div>
    `
}