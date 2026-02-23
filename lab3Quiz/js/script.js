document.addEventListener("DOMContentLoaded", function() {
    let options = [
        {text:"SSD", value:"ssd"},
        {text:"HDD", value:"hdd"},
        {text:"RAM", value:"ram"}
    ];
    options.sort(() => Math.random() - 0.5);
    let container = document.getElementById("q2options");
    options.forEach(opt => {
        container.innerHTML += `
        <label>
            <input type="checkbox" name="q2" value="${opt.value}">
            ${opt.text}
        </label><br>`;
    });
    let times = localStorage.getItem("quizTaken");
    if(times === null) {
        times = 0;
    }
    document.getElementById("timesTaken").innerHTML = "Total Times Quiz Taken: " + times;
    document.getElementById("submitBtn").addEventListener("click", gradeQuiz);
    function gradeQuiz() {
        let score = 0;
        let q1 = document.querySelector('input[name="q1"]:checked');
        if (q1 && q1.value === "a") {
            score += 20;
            showFeedback("f1", true);
        } else {
            showFeedback("f1", false);
        }
        let checked = document.querySelectorAll('input[name="q2"]:checked');
        let selected = Array.from(checked).map(x => x.value);
        if (selected.length === 2 && selected.includes("ssd") && selected.includes("hdd")) {
            score += 20;
            showFeedback("f2", true);
        } else {
            showFeedback("f2", false);
        }
        let q3 = document.querySelector('select[name="q3"]').value;
        if (q3 === "b") {
            score += 20;
            showFeedback("f3", true);
        } else {
            showFeedback("f3", false);
        }
        let q4 = document.querySelector('input[name="q4"]').value.toLowerCase().trim();
        if (q4 === "motherboard") {
            score += 20;
            showFeedback("f4", true);
        } else {
            showFeedback("f4", false);
        }
        let q5 = document.querySelector('input[name="q5"]:checked');
        if (q5 && q5.value === "b") {
            score += 20;
            showFeedback("f5", true);
        } else {
            showFeedback("f5", false);
        }
        document.getElementById("totalScore").innerHTML = "Your Score: " + score + " / 100";
        if (score > 80) {
            document.getElementById("congrats").innerHTML = "Congratulations! Excellent job!";
        } else {
            document.getElementById("congrats").innerHTML = "";
        }
        times++;
        localStorage.setItem("quizTaken", times);
        document.getElementById("timesTaken").innerHTML = "Total Times Quiz Taken: " + times;
    }
    function showFeedback(id, correct){
        let element = document.getElementById(id);
        if (correct) {
            element.innerHTML = '✓ Correct';
            element.style.color = 'lime';
        } else {
            element.innerHTML = '✗ Incorrect';
            element.style.color = 'red';
        }
    }
});