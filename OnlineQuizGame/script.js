const questions = [
    {
        question: "What is the name of Naruto's signature jutsu?",
        answers: [
            {text: "Chidori", correct: false},
            {text: "Susano", correct: false},
            {text: "Shadow Clone Jutsu", correct: true},
            {text: "Fireball Jutsu", correct: false}
        ]
    },
    {
        question: "Who is Naruto's first teacher after graduating from the Academy?",
        answers: [
            {text: "Jiraiya", correct: false},
            {text: "Iruka", correct: false},
            {text: "Kakashi", correct: true},
            {text: "Asuma", correct: false}
        ]
    },
    {
        question: "Which tailed beast is sealed inside Naruto?",
        answers: [
            {text: "Three-Tails", correct: false},
            {text: "Eight-Tails", correct: false},
            {text: "Nine-Tails", correct: true},
            {text: "One-Tail", correct: false}
        ]
    },
    {
        question: "Who is the founder of the Uchiha clan?",
        answers: [
            {text: "Madara Uchiha", correct: true},
            {text: "Itachi Uchiha", correct: false},
            {text: "Fugaku Uchiha", correct: false},
            {text: "Obito Uchiha", correct: false}
        ]
    },
    {
        question: "What is Sasuke Uchiha's ultimate goal in the series?",
        answers: [
            {text: "Become Hokage", correct: false},
            {text: "Destroy Konoha", correct: false},
            {text: "Revive his clan", correct: true},
            {text: "Defeat Itachi", correct: false}
        ]
    },
    {
        question: "What is the name of Naruto's father?",
        answers: [
            {text: "Hashirama Senju", correct: false},
            {text: "Minato Namikaze", correct: true},
            {text: "Tobirama Senju", correct: false},
            {text: "Hiruzen Sarutobi", correct: false}
        ]
    },
    {
        question: "Which ninja becomes the Fifth Hokage?",
        answers: [
            {text: "Kakashi Hatake", correct: false},
            {text: "Jiraiya", correct: false},
            {text: "Tsunade Senju", correct: true},
            {text: "Orochimaru", correct: false}
        ]
    },
    {
        question: "What village is Gaara from?",
        answers: [
            {text: "Hidden Leaf Village", correct: false},
            {text: "Hidden Sand Village", correct: true},
            {text: "Hidden Mist Village", correct: false},
            {text: "Hidden Cloud Village", correct: false}
        ]
    },
    {
        question: "Who teaches Naruto the Rasengan?",
        answers: [
            {text: "Jiraiya", correct: true},
            {text: "Kakashi", correct: false},
            {text: "Iruka", correct: false},
            {text: "Minato", correct: false}
        ]
    },
    {
        question: "Which of the following is NOT a member of Team 7?",
        answers: [
            {text: "Naruto", correct: false},
            {text: "Sasuke", correct: false},
            {text: "Sakura", correct: false},
            {text: "Neji", correct: true}
        ]
    }
];

const questionEle = document.querySelector('#question')
const answers = document.querySelector('.answers')
const nextBtn = document.querySelector('#next')

let index = 0
let score = 0
 
const start = () => {
    index = 0
    score = 0
    nextBtn.innerHTML = 'Next'
    showQuestions()
}

const showQuestions = () => {
    reset()
    let currQuestion = questions[index]
    let currQuestionNo = index + 1
    questionEle.innerHTML = currQuestionNo + '. ' + currQuestion.question

    currQuestion.answers.forEach((answer) => {
       const button = document.createElement('button')
       button.innerHTML = answer.text
       button.classList.add('btn')
       answers.appendChild(button)
       if(answer.correct){
        button.dataset.correct = answer.correct
       }
       button.addEventListener('click', selectAnswer)
    })
}

const reset = () => {
    nextBtn.disabled = true
    nextBtn.style.cursor = 'no-drop'
    while(answers.firstChild){
        answers.removeChild(answers.firstChild)
    }
}

const selectAnswer = (e) => {
    const selectBtn = e.target
    if(selectBtn.dataset.correct === 'true'){
        selectBtn.classList.add('correct')
        score++
    }
    else{
        selectBtn.classList.add('incorrect')
    }

    Array.from(answers.children).forEach((button) => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true
    })
    nextBtn.disabled = false
    nextBtn.style.cursor = 'pointer'
}

const showScore = () => {
    reset()
    questionEle.innerHTML = `You scored ${score} out of ${questions.length}`
    nextBtn.innerHTML = `Let's Play Again`
    nextBtn.disabled = false
    nextBtn.style.cursor = 'pointer'
}

const handleNextButton = () => {
    index++
    if(index < questions.length){
        showQuestions()
    }
    else{
        showScore()
    }
}

nextBtn.addEventListener('click', () => {
    if(index < questions.length){
        handleNextButton()
    }
    else{
        start()
    }
})

start()
