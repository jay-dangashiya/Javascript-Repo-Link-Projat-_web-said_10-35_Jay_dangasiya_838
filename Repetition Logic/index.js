let qus = parseInt(prompt("Please enter the number of questions you want to solve :"))
let score = 0;

for (let i = 1; i <= qus; i++) {
    let num1 = Math.floor(Math.random() * 100) + 1;
    let num2 = Math.floor(Math.random() * 100) + 1;
    let answer = num1 + num2;

    let userAns = parseInt(prompt(`Q${i}: What is ${num1} + ${num2}?`));

    if (userAns === answer) {
        console.log("Correct!");
        score++;
    } else {
        console.log("Wrong! The answer was " + answer);
    }
}

console.log("Final Score: " + score + "/"+qus);