let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Biber",
        "right_answer": 3
    }
]

let currentQuestion = 0;
let question = questions[currentQuestion];

function init() {
    showQuestion();
}

function showQuestion(){
    document.getElementById('quiz-question').innerHTML = question["question"];
    for (let i = 1; i <= 4; i++) {
        document.getElementById("answer" + i).innerHTML = question["answer_"+ i];
    }
}

function answer(selection){
    if (selection == question["right_answer"]){
        document.getElementById('answer'+selection).parentElement.classList.add('backgrd_gr')
    }
    else{
        document.getElementById('answer'+selection).parentElement.classList.add('backgrd_red')
    }
}

