const questionContainer = document.getElementById('question-container');
const question = document.getElementById('question');
const answerButton = document.getElementById('answer-btn');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex;
var score = 0;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', nextQuestion)

function startGame() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    currentQuestionIndex = 0;
    setQuestion(currentQuestionIndex)
}

function setQuestion(currentQuestionIndex) {
    question.innerText = questions[currentQuestionIndex]["question"]
    var answers = questions[currentQuestionIndex]["content"];

    for (let i = 0; i < answers.length; i++) {

        answerButton.children[i].innerText = answers[i];

        answerButton.children[i].addEventListener('click', selectedAnswer)
    }

}

function selectedAnswer(e) {
    const selectedButton = e.target;
    const correctAnswerString = questions[currentQuestionIndex]["answer"];
    const correctAnswerIndex = questions[currentQuestionIndex]["correct"];
    if (selectedButton.innerText === correctAnswerString) {
        selectedButton.classList.add('correct');
        nextButton.classList.remove('hide')
        score++
        console.log(score);

    } else {
        answerButton.children[correctAnswerIndex].classList.add('correct')
        selectedButton.classList.add('wrong')
        nextButton.classList.remove('hide')
    }

}

function nextQuestion() {
    resetState();
    currentQuestionIndex++
    setQuestion(currentQuestionIndex)
}

function resetState() {
    for (let i = 0; i < answerButton.children.length; i++){
        clearStatusClass(answerButton.children[i])
    }
    nextButton.classList.add('hide')
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// function startGame() {
//     startButton.classList.add('hide');
//     questionContainer.classList.remove('hide');
//     currentQuestionIndex = 0;
//     setNextQuestion();
// }

// function setNextQuestion() {
//     resetState();
//     showQuestion(currentQuestionIndex);
// }

// function resetState() {
//     nextButton.classList.add('hide');
//     while (answerButton.firstChild) {
//         answerButton.removeChild(answerButton.firstChild)
//       }
// }

// function showQuestion(currentQuestionIndex) {
//     question.innerText = questions[currentQuestionIndex]["question"]
//     questions[currentQuestionIndex]["content"].forEach(answer => {
//         const button = document.createElement('button')
//         button.innerText = answer.text
//         button.classList.add('btn')
//     })

// }





const questions = [{
        "question": "In what children's game are participants chased by someone designated \"It\"?",
        "content": [
            "Tag",
            "Simon Says",
            "Charades",
            "Hopscotch"
        ],
        "correct": 0,
        "answer": "Tag"
    },
    {
        "question": "On a radio, stations are changed by using what control?",
        "content": [
            "Tuning",
            "Volume",
            "Bass",
            "Treble"
        ],
        "correct": 0,
        "answer": "Tuning"
    },
    {
        "question": "Which material is most dense?",
        "content": [
            "Silver",
            "Styrofoam",
            "Butter",
            "Gold"
        ],
        "correct": 3,
        "answer": "Gold"
    },
    {
        "question": "Which state in the United States is largest by area?",
        "content": [
            "Alaska",
            "California",
            "Texas",
            "Hawaii"
        ],
        "correct": 0,
        "answer": "Alaska"
    },
    {
        "question": "What is Aurora Borealis commonly known as?",
        "content": [
            "Fairy Dust",
            "Northern Lights",
            "Book of ages",
            "a Game of Thrones main character"
        ],
        "correct": 1,
        "answer": "Northern Lights"
    }

]