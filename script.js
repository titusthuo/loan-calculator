document.getElementById('calculateButton').addEventListener('click', calculateLoan);

function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value);
    const loanTerm = parseFloat(document.getElementById("loanTerm").value);

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) || loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
        alert("Please Enter Valid Positive Numbers for all the Fields");
        return;
    }

    const monthlyInterest = interestRate / 100 / 12;
    const totalPayments = loanTerm;
    const monthlyPayment = (loanAmount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -totalPayments));
    const totalInterest = (monthlyPayment * totalPayments) - loanAmount;

    displayResult(monthlyPayment, totalInterest);
    speakResult(`Monthly Payment is ${monthlyPayment.toFixed(2)} dollars, and Total Interest is ${totalInterest.toFixed(2)} dollars.`);
}

function displayResult(monthlyPayment, totalInterest) {
    const resultDiv = document.getElementById('resultContainer');

    resultDiv.innerHTML = `
    <p><strong>Monthly Payment: ${monthlyPayment.toFixed(2)}</strong></p>
    <p><strong>Total Interest: ${totalInterest.toFixed(2)}</strong></p>
    `;
}

function speakResult(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}
