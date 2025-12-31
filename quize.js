
let questions = [
    {
        Question: "Which is Largest Animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        Question: "Which is Largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Shara", correct: false },
            { text: "Antartica", correct: true },
        ]
    },
    {
        Question: "Which is smallest country in the world?",
        answers: [
            { text: "Vatican city", correct: true }, // ✅ Fixed
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false },
        ]
    },
    {
        Question: "Which is Smallest Continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true }, // ✅ Typo fixed
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    }
];

let questionElement = document.getElementById("question");
let answerbutton = document.querySelector(".answers_btn");
let nextbutton = document.getElementById("next_btn");

let currentQuestion_Index = 0;
let score = 0;

function startQuize() {
    currentQuestion_Index = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    nextbutton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    let current_Question = questions[currentQuestion_Index];
    let question_Number = currentQuestion_Index + 1;
    questionElement.innerHTML = question_Number + ". " + current_Question.Question;

    answerbutton.innerHTML = "";

    current_Question.answers.forEach(answer => {
        let bttn = document.createElement("button");
        bttn.innerHTML = answer.text;
        bttn.classList.add("btn");
        answerbutton.appendChild(bttn);

        if (answer.correct) {
            bttn.dataset.correct = answer.correct;
        }

        bttn.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e) {
    let selectedbtn = e.target;
    let iscorrect = selectedbtn.dataset.correct === "true";

    if (iscorrect) {
        selectedbtn.classList.add("correct");
        score++;
    } else {
        selectedbtn.classList.add("incorrect");
    }

    Array.from(answerbutton.children).forEach(bttn => {
        if (bttn.dataset.correct === "true") {
            bttn.classList.add("correct");
        }
        bttn.disabled = true;
    });

    nextbutton.style.display = "block";

    // ✅ Remove old listeners
    let newNextButton = nextbutton.cloneNode(true);                   
    nextbutton.parentNode.replaceChild(newNextButton, nextbutton);
    nextbutton = newNextButton;

    nextbutton.addEventListener("click", () => {
        handleNextButton();
    });
}

function handleNextButton() {
    currentQuestion_Index++;
    if (currentQuestion_Index < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    answerbutton.innerHTML = "";
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";

    nextbutton.addEventListener("click", () => {
        startQuize();
    });
}

startQuize();

