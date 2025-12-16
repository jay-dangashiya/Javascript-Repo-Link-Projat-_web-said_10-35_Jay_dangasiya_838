class Quiz {
    constructor(question) {
        this.question = question
        this.currentIndex = 0
        this.answers = {}
    }

    getcurrentquestion() {
        return this.question[this.currentIndex]
    }

    answercurrent(choiceIndex) {
        this.answers[this.getcurrentquestion().id] = choiceIndex
    }

    next() {
        if (this.currentIndex < this.question.length - 1) this.currentIndex++
    }

    prev() {
        if (this.currentIndex > 0) this.currentIndex--
    }

    score() {
        return this.question.filter(q => this.answers[q.id] === q.answer).length
    }
}

const question = [
    {
        id: 1,
        q: 'Which festival is known as the "Festival of Lights?',
        choice: ['Holi', 'Eid', 'Diwali', 'Christmas'],
        answer: 2
    },
    {
        id: 2,
        q: 'Who wrote the "Harry Potter" series?',
        choice: ['Stephen King', 'J.K. Rowling', 'George R.R. Martin', 'J.R.R. Tolkien'],
        answer: 1
    },
    {
        id: 3,
        q: 'What is the capital of India?',
        choice: ['Mumbai', 'Kolkata', 'Chennai', 'New Delhi'],
        answer: 3
    },
    {
        id: 4,
        q: 'What is the largest planet in our solar system?',
        choice: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        answer: 2
    },
    {
        id: 5,
        q: 'Which gas do plants take in for photosynthesis?',
        choice: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        answer: 2
    }
]

const quiz = new Quiz(question)

const questions = document.getElementById('question')
const choices = document.getElementById('choices')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const submitBtn = document.getElementById('submitBtn')
const result = document.getElementById('result')

function render() {
    const q = quiz.getcurrentquestion()
    questions.textContent = q.q
    choices.innerHTML = ''
    q.choice.forEach((c, i) => {
        const div = document.createElement('div')
        div.className = 'choice' + (quiz.answers[q.id] === i ? 'selected' : '')
        div.textContent = c
        div.onclick = () => {
            quiz.answercurrent(i)
            render()
        }
        choices.appendChild(div)
    });
}

prevBtn.onclick = () => {
    quiz.prev()
    render()
}

nextBtn.onclick = () => {
    quiz.next()
    render()
}

submitBtn.onclick = () => {
    result.textContent = 'score:' + quiz.score() + '/' + question.length
}

render()