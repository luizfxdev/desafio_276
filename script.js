// script.js
document.addEventListener('DOMContentLoaded', function () {
  // Elementos do DOM
  const inputElement = document.getElementById('numbersInput');
  const calculateBtn = document.getElementById('calculateBtn');
  const backBtn = document.getElementById('backBtn');
  const resultOutput = document.getElementById('resultOutput');
  const calculationSteps = document.getElementById('calculationSteps');

  // Função para calcular a soma dos produtos dos pares consecutivos
  function calculateSumOfProducts(numbers) {
    if (numbers.length <= 1) return 0;

    let sum = 0;
    let steps = [];

    for (let i = 0; i < numbers.length - 1; i++) {
      const product = numbers[i] * numbers[i + 1];
      sum += product;
      steps.push(`${numbers[i]} * ${numbers[i + 1]} = ${product}`);
    }

    return { sum, steps };
  }

  // Função para limpar o input e resultado
  function clearInput() {
    inputElement.value = '';
    resultOutput.textContent = '0';
    calculationSteps.textContent = '';
  }

  // Event listener para o botão Calcular
  calculateBtn.addEventListener('click', function () {
    // Obter e processar o valor do input
    const inputValue = inputElement.value;
    const numbersArray = inputValue
      .split(',')
      .map(num => num.trim())
      .filter(num => num !== '')
      .map(Number);

    // Validar se todos os valores são números
    if (numbersArray.some(isNaN)) {
      resultOutput.textContent = 'Erro: Insira apenas números válidos';
      calculationSteps.textContent = '';
      return;
    }

    // Calcular o resultado
    const { sum, steps } = calculateSumOfProducts(numbersArray);

    // Exibir o resultado
    resultOutput.textContent = sum;

    // Exibir os passos do cálculo
    if (steps.length > 0) {
      calculationSteps.textContent = `Cálculo: ${steps.join(' + ')} = ${sum}`;
    } else {
      calculationSteps.textContent = 'Lista com menos de 2 elementos. Resultado: 0';
    }
  });

  // Event listener para o botão Voltar
  backBtn.addEventListener('click', clearInput);

  // Permitir calcular pressionando Enter
  inputElement.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      calculateBtn.click();
    }
  });
});
