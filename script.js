// Poimt to ids in HTML
const questionContainer = document.getElementById('question-container');
const question = document.getElementById('question');
const answerButton = document.getElementById('answer-btn');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
// Keep track of current question
let currentQuestionIndex;
// Score counter when question is answered correctly
var score = 0;

// Add event listeners to control buttons
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', nextQuestion)

// Initialize the start of game
function startGame() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    currentQuestionIndex = 0;
    setQuestion(currentQuestionIndex)
}

// Set the text of current question and answer
function setQuestion(questionNumber) {
    // Sets the text of current question
    question.innerText = questions[questionNumber]["question"]

    // Sets the answer text on button for the current question
    var answers = questions[questionNumber]["content"];
    for (let i = 0; i < answers.length; i++) {
        answerButton.children[i].innerText = answers[i];

        // add event listeners for each answer button
        answerButton.children[i].addEventListener('click', selectedAnswer)
    }

}

//  Checks the answer for the selected button pressed 
function selectedAnswer(e) {
    const selectedButton = e.target;

    // Current correct answer in string form
    const correctAnswerString = questions[currentQuestionIndex]["answer"];

    // Current correct answer in array index form
    const correctAnswerIndex = questions[currentQuestionIndex]["correct"];

    // disable each button after a answer button is selected to prevent the user from pressing each button and score from increasing when button is continually pressed.
    for (let i = 0; i < questions[currentQuestionIndex]["content"].length; i++) {
        answerButton.children[i].disabled = true;
    }

    // Increase score counter if selected answer is correct and reveal the correct.
    if (selectedButton.innerText === correctAnswerString) {
        selectedButton.classList.add('correct');
        nextButton.classList.remove('hide')
        score++

        // If answer is wrong, reveal correct answer and highlight which button/answer the user pressed. 
    } else {
        answerButton.children[correctAnswerIndex].classList.add('correct')
        selectedButton.classList.add('wrong')
        nextButton.classList.remove('hide')
    }

}
// Move on to next question when user press 'next' button
function nextQuestion() {
    resetState();
    currentQuestionIndex++
    setQuestion(currentQuestionIndex)

    if (currentQuestionIndex = )
}

// Reset the state of each button by re-enabling each button and removing right and wrong highlight
function resetState() {
    for (let i = 0; i < answerButton.children.length; i++) {
        clearStatusClass(answerButton.children[i])
        answerButton.children[i].disabled = false;
    }
    nextButton.classList.add('hide')
}

// Remove the highlights of each button
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