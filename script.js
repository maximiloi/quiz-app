const quizData = [ // вопросы обо мне
    {
        question: 'Где я родился?',
        a: 'Иркутск',
        b: 'Ангарск',
        c: 'на берегу Ангары',
        d: 'Харьков',
        correct: 'c',
    }, {
        question: 'Есть у меня вышее образование?',
        a: 'Нет',
        b: 'Да',
        c: 'Ты же учился в ПТУ',
        d: 'Армия школа жизни',
        correct: 'b',
    }, {
        question: 'В какой вид спорта я играю?',
        a: 'Бег',
        b: 'Регби',
        c: 'Флаг-футбол',
        d: 'Флорбол',
        correct: 'c',
    }, {
        question: 'Где я учился верстке?',
        a: 'А ты учился?',
        b: 'Geekbrains',
        c: 'У Александра Лущенко в itgid.info',
        d: 'HTMLAcademy',
        correct: 'd',
    }, {
        question: 'Что я сейчас ищю?',
        a: 'Смысл жизни',
        b: 'Себя',
        c: 'Ничего',
        d: 'Работу',
        correct: 'd',
    },
];

const quiz = document.querySelector('#quiz');  // находим элементы с которыми будем работать
const block = document.querySelector('.block');
const question = document.querySelector('.question');
const answerELements = document.querySelectorAll('input[type=radio]');
const answer_a = document.querySelector('.answer_a');
const answer_b = document.querySelector('.answer_b');
const answer_c = document.querySelector('.answer_c');
const answer_d = document.querySelector('.answer_d');
const button = document.querySelector('.button');
// const answers = document.querySelectorAll('label');

let currentQuiz = 0; // присваиваем начальное значение первому вопросу
let score = 0; // нулевое значение

function loadQuiz() { // функция установки вопроса и ответов
    deselectAnswers(); // вызов функции убирания выбора в радиокнопке

    const currentQuizData = quizData[currentQuiz]; // назначаем какой вопрос из массива вопросов

    question.innerText = currentQuizData.question; // вставляем вопросы и ответы
    answer_a.innerText = currentQuizData.a;
    answer_b.innerText = currentQuizData.b;
    answer_c.innerText = currentQuizData.c;
    answer_d.innerText = currentQuizData.d;
}

function getSelected() { // функция выбора ответа
    let answer = undefined; // обнуляем ответ

    answerELements.forEach((answerelement) => { // перебираем список на поиск выбранного ответа
        if (answerelement.checked) {
            answer = answerelement.id; // присваиваем ответу ID элемент
        }
    });

    return answer; // выдаем ответ
}

function deselectAnswers() { // функция снятия выбора
    answerELements.forEach((answerelement) => { // перебираем список и устанавливаем выбору false
        answerelement.checked = false;
    });
}

button.addEventListener("click", function () { // при нажатии кнопки
    const answer = getSelected(); // ищем нажатый ответ

    if (answer) { // если ответ есть
        if (answer === quizData[currentQuiz].correct) { // проверяем правильность ответа
            score++; // увеличеваем количество правильных ответов
        }
        currentQuiz++; // увеличиваем значения вопроса

        if (currentQuiz < quizData.length) { // если ещё есть вопросы
            loadQuiz(); // загружаем следующий вопрос
        } else { // если вопросы закончились выводить результат
            quiz.innerHTML = `<h2 style="text-align: center;padding: 1rem;margin: 0;">Вы правильно ответили на ${score} из ${quizData.length} вопросов.</h2>
            <button onclick="location.reload()">Пройти заново</button>`; // перезапускаем страницу, что бы начать заново
        }
    }
});

// запуск опроса
loadQuiz();