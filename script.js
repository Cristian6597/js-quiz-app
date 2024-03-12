const questions = [
    {
      question: "Who's Monkey D. Luffy's brother?",
      answers: [
        { text: "Garp", correct: false },
        { text: "Ace", correct: true },
        { text: "Zoro", correct: false },
        { text: "God Usopp", correct: false },
      ],
    },
    {
      question: "Who's the most powerful character in One Piece universe",
      answers: [
        { text: "God Usopp", correct: true },
        { text: "Gol D. Roger", correct: false },
        { text: "Monkey D. Luffy", correct: false },
        { text: "Crocodile", correct: false },
      ],
    },
    {
      question: "Who's the vice captain of strahat crew?",
      answers: [
        { text: "Nami", correct: false },
        { text: "God Usopp", correct: false },
        { text: "Zoro", correct: true },
        { text: "Robin", correct: false },
      ],
    },
    {
      question: "Who was on the Oro Jackson with Gol D. Roger?",
      answers: [
        { text: "Mihawk", correct: false },
        { text: "Bugy the Clown", correct: true },
        { text: "Monkey D. Luffy", correct: false },
        { text: "Lucky Lou", correct: false },
      ],
    },
  ];
  
  const questionElement = document.getElementById("questions");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  
  function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }
  
  function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
      showQuestion()
    }else{
      showScore();
    }
  }
  
  nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
      handleNextButton();
    }else{
      startQuiz();
    }
  })
  
  startQuiz();