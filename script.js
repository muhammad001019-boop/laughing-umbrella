// --- 1. Dark Mode Toggle ---
const darkModeBtn = document.getElementById('darkModeToggle');
const body = document.body;

// Cek preferensi user di localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// --- 2. Animasi Scroll (Reveal) ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Panggil sekali saat load

// --- 3. Fitur Tab/Page untuk Contoh Materi ---
function openTab(tabName) {
    // Sembunyikan semua konten tab
    let contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }

    // Hilangkan state active dari tombol
    let buttons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    // Tampilkan yang dipilih
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}

// --- 4. Back to Top Button ---
let mybutton = document.getElementById("backToTopBtn");
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

mybutton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- 5. Kuis Sederhana (JavaScript Asli) ---
const quizData = [
    {
        question: "Bagian awal dari teks eksplanasi yang berisi gambaran umum disebut?",
        options: ["Deretan penjelas", "Interpretasi", "Pernyataan umum", "Kesimpulan"],
        correct: 2
    },
    {
        question: "Teks eksplanasi sangat mengandalkan informasi yang bersifat?",
        options: ["Fiktif", "Faktual", "Opini pribadi", "Mitos"],
        correct: 1
    },
    {
        question: "Kata hubung yang menunjukkan sebab-akibat dalam teks eksplanasi adalah?",
        options: ["Lalu", "Kemudian", "Oleh karena itu", "Di sana"],
        correct: 2
    }
];

let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');

function loadQuiz() {
    // Reset state
    optionsContainer.innerHTML = '';
    nextBtn.style.display = 'none';
    
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = `${currentQuiz + 1}. ${currentQuizData.question}`;

    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(index, button));
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex, buttonElement) {
    // Cegah klik ganda
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    const correctIndex = quizData[currentQuiz].correct;

    if (selectedIndex === correctIndex) {
        buttonElement.classList.add('correct');
        score++;
    } else {
        buttonElement.classList.add('wrong');
        // Tunjukkan jawaban benar
        allButtons[correctIndex].classList.add('correct');
    }

    nextBtn.style.display = 'inline-block';
}

nextBtn.addEventListener('click', () => {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
});

function showResult() {
    questionEl.innerText = "Kuis Selesai!";
    optionsContainer.innerHTML = '';
    nextBtn.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreText.innerText = `Skor kamu: ${score} dari ${quizData.length}`;
}

restartBtn.addEventListener('click', () => {
    currentQuiz = 0;
    score = 0;
    resultContainer.style.display = 'none';
    loadQuiz();
});

// Inisialisasi kuis saat halaman dimuat
loadQuiz();
