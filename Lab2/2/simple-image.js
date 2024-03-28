
const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result');

const quizData = [
  {
    question: "Який тип картин представлений в онлайн-магазині?",
    answers: ["Живопис", "Скульптура", "Фотографія", "Графіка"],
    correct_answer: "Живопис"
  },
  {
    question: "Яка можливість повинна бути для зручності покупців картин?",
    answers: ["Перегляд", "Фільтрація", "Реальний", "Відсутній"],
    correct_answer: "Реальний"
  },
  {
    question: "Яка можливість має бути для художників у магазині картин?",
    answers: ["Створення", "Відстеження", "Отримання", "Немає"],
    correct_answer: "Немає"
  },
  {
    question: "Яка можливість має бути для покупців у магазині картин?",
    answers: ["Обмін", "Отримання", "Відслідковувати", "Немає"],
    correct_answer: "Відслідковувати"
  },
  {
    question: "Яка перевага має магазин картин порівняно зі звичайним магазином?",
    answers: ["Більший", "Можливість", "Зручний", "Відсутність"],
    correct_answer: "Зручний"
  }
];

function buildQuiz() {
  quizData.forEach((questionData, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `<p>${index + 1}. ${questionData.question}</p>`;
    questionData.answers.forEach((answer) => {
      const answerElement = document.createElement('div');
      answerElement.classList.add('answer');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question${index}`;
      input.value = answer;
      answerElement.appendChild(input);
      const label = document.createElement('label');
      label.innerHTML = answer;
      answerElement.appendChild(label);
      questionElement.appendChild(answerElement);
    });
    quizContainer.appendChild(questionElement);
  });
}

function showResults() {
  const questionContainers = quizContainer.querySelectorAll('.question');
  let correctAnswers = 0;

  questionContainers.forEach((questionContainer, index) => {
    const selectedAnswer = questionContainer.querySelector('input[name=question'+index+']:checked');
    if (selectedAnswer && selectedAnswer.value === quizData[index].correct_answer) {
      correctAnswers++;
      selectedAnswer.parentNode.style.color = 'green';
    } else if(selectedAnswer) {
      selectedAnswer.parentNode.style.color = 'red';
      const correctIndex = quizData[index].answers.findIndex(answer => answer === quizData[index].correct_answer);
      questionContainer.querySelectorAll('input')[correctIndex].nextSibling.style.color = 'green';
    }

    questionContainer.querySelectorAll('input').forEach(input => {
      input.disabled = true;
    });
  });

  resultContainer.innerHTML = `Ви дали ${correctAnswers} правильних відповідей з ${quizData.length}`;
}


buildQuiz();
submitButton.addEventListener('click', showResults);
