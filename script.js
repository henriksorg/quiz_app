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
    showQuestion();
    highlightSidebarElement();
}


function showQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('quiz-question').innerHTML = question["question"];
    for (let i = 1; i <= 4; i++) {
        document.getElementById("answer" + i).innerHTML = question["answer_" + i];
    }
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


function changeQuestion(operator, event) {
    currentQuestion += (operator);
    if (currentQuestion < 0) {
        currentQuestion = 0;
    } else if (currentQuestion > 4) {
        currentQuestion = 4;
    }
    init();
    removeResult('backgrd_gr');
    removeResult('backgrd_red');
}



function removeResult(cssClass){
    document.getElementById('answer1').parentElement.classList.remove(cssClass);
    document.getElementById('answer2').parentElement.classList.remove(cssClass);
    document.getElementById('answer3').parentElement.classList.remove(cssClass);
    document.getElementById('answer4').parentElement.classList.remove(cssClass);
    // for (let i = 0; i < 4; i++) {
    //     document.getElementById('answer'+i).parentElement.classList.remove(cssClass);
    // }
}


function highlightSidebarElement(){
    removeHighlight();
    document.getElementById('nav-link-' + currentQuestion).classList.add('highlight');
    console.log('nav-link-' + currentQuestion);
}


function removeHighlight(){
    for (let i = 0; i < 4; i++) {
        document.getElementById('nav-link-' + i).classList.remove('highlight');
    }
}

