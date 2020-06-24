// const for the quiz game
const questionContainer = document.getElementById('question-container');
const question = document.getElementById('question');
const answerButton = document.getElementById('answer-btn');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
var userName = document.getElementById('userName')
var timeDisplay = document.getElementById('timer')

// const for modal to view Score
const scoreList = document.getElementById('viewScore')
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var peopleList = document.getElementById('people-list');
// Keep track of current question
let currentQuestionIndex;

// Score counter when question is answered correctly
var score;
var finalScore;
var people = [];

// Consts to keep track of timer. 
var timeLeft;
var interval;
// When 0 time left end quiz
function timer() {
    if (timeLeft === 0) {
        testFinished();
    } else {
        timeLeft--;
        timeDisplay.textContent = timeLeft + "s";
    }
}


// Add event listeners to control buttons
startButton.onclick = startGame;
nextButton.onclick = nextQuestion;

//submitButton.addEventListener('click', submit)
submitButton.onclick = function () {
    addPersonToList();
    modal.style.display = "block";
}

// Add username and score to High Score list, and keep track of previous scores. 
function addPersonToList() {
    event.preventDefault();
    var name = userName.value;
    var li = document.createElement("li");
    li.innerHTML = name + ": " + finalScore + "%";
    people.push(`${name}: ${finalScore}%`);
    peopleList.append(li);
}
// When the user clicks on the button, open the modal
scoreList.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Initialize the start of game
function startGame() {
    // Check to see if username is blank.
    if (userName.value.trim() === "") {
        alert("Enter a valid username")
    } else {
        // Execute all start parameters.
        score = 0;
        timeLeft = 100;
        interval = setInterval(timer, 1000);
        currentQuestionIndex = 0;
        userName.classList.add('hide')
        startButton.classList.add('hide');
        questionContainer.classList.remove('hide');
        setQuestion(currentQuestionIndex)
    }
}

// Set the text of current question and answer
function setQuestion(questionNumber) {
    // Sets the text of current question
    question.innerText = suffledQuestions[questionNumber]["question"]

    // Sets the answer text on button for the current question
    var answers = suffledQuestions[questionNumber]["content"];
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
    const correctAnswerString = suffledQuestions[currentQuestionIndex]["answer"];

    // Current correct answer in array index form
    const correctAnswerIndex = suffledQuestions[currentQuestionIndex]["correct"];

    // disable each button after a answer button is selected to prevent the user from pressing each button and score from increasing when button is continually pressed.
    for (let i = 0; i < suffledQuestions[currentQuestionIndex]["content"].length; i++) {
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
        timeLeft = timeLeft - 5;
    }

}
// End quiz when completed or by time limit and aggregate final score. 
function testFinished() {
    clearInterval(interval);
    questionContainer.classList.add('hide');
    submitButton.classList.remove('hide')
    nextButton.classList.add('hide')
    finalScore = Math.round((score / suffledQuestions.length) * 100);
}
// Move on to next question when user press 'next' button
function nextQuestion() {
    // Check to see if user is on last question.
    if (currentQuestionIndex === suffledQuestions.length - 1) {
        testFinished();
    } else {
        resetState();
        currentQuestionIndex++
        setQuestion(currentQuestionIndex)
    }
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



// Questions used in the test.
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
    }, {
        "correct": 3,
        "content": [
            "developed the telescope",
            "discovered four satellites of Jupiter",
            "discovered that the movement of pendulum produces a regular time measurement",
            "All of the above"
        ],
        "question": "Galileo was an Italian astronomer who",
        "answer": "All of the above"
    },
    {
        "correct": 3,
        "content": [
            "the infrared light kills bacteria in the body",
            "resistance power increases",
            "the pigment cells in the skin get stimulated and produce a healthy tan",
            "the ultraviolet rays convert skin oil into Vitamin D"
        ],
        "question": "Exposure to sunlight helps a person improve his health because",
        "answer": "the ultraviolet rays convert skin oil into Vitamin D"
    },
    {
        "correct": 0,
        "content": [
            "a club or a local sport association for remarkable achievements",
            "amateur athlete, not necessarily an Olympian",
            "National Olympic Committee for outstanding work",
            "None of the above"
        ],
        "question": "Sir Thomas Fearnley Cup is awarded to",
        "answer": "a club or a local sport association for remarkable achievements"
    },
    {
        "correct": 1,
        "content": [
            "1968",
            "1929",
            "1901",
            "1965"
        ],
        "question": "Oscar Awards were instituted in",
        "answer": "1929"
    },
    {
        "correct": 2,
        "content": [
            "1998",
            "1989",
            "1979",
            "1800"
        ],
        "question": "When did Margaret Thatcher became the first female Prime Minister of Britain?",
        "answer": "1979"
    },
    {
        "correct": 2,
        "content": [
            "15th April",
            "12th December",
            "1st May",
            "1st August"
        ],
        "question": "When is the International Workers' Day?",
        "answer": "1st May"
    }

]

// Shuffled array of questions. 
var suffledQuestions = questions.sort(() => Math.random() - 0.5);