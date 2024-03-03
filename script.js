
document.addEventListener('DOMContentLoaded', function () {

  let bill = document.querySelector('.bill-input');
  let tipButtons = document.querySelectorAll('.select-buttons button');
  let customTipInput = document.querySelector('.select-buttons input');
  let people = document.querySelector('.people-input');
  let tipResult = document.querySelector('.tip-result');
  let totalResult = document.querySelector('.total-result');
  let resetButton = document.querySelector('.reset');
  let errorMessage = document.querySelector('.errorMessage');

  function updateResults() {

      let billAmount = parseFloat(bill.value);
      let tipPercentage;

      if (customTipInput.value !== '') {
          tipPercentage = parseFloat(customTipInput.value);
      } else {
          tipButtons.forEach(function (button) {
              if (button.classList.contains('active')) {
                  tipPercentage = parseFloat(button.textContent);
              }
          });
      }

      let numberOfPeople = parseFloat(people.value);

      if (numberOfPeople <= 0) {
          errorMessage.textContent = 'Can’t be zero';
          people.classList.add('people-error');
      } else {
          if(people.classList.contains('people-error')){
            people.classList.remove('people-error');
          }
          errorMessage.textContent = '';
      }

      
      let tipAmount = (billAmount * tipPercentage) / 100 / numberOfPeople;
      let totalPerPerson = billAmount / numberOfPeople + tipAmount;

      tipResult.textContent = `$${tipAmount.toFixed(2)}`;
      totalResult.textContent = `$${totalPerPerson.toFixed(2)}`;
  }

  function resetCalculator() {
      bill.value = '';
      customTipInput.value = '';
      tipButtons.forEach(function (button) {
          button.classList.remove('active');
      });
      people.value = '';
      tipResult.textContent = '$0.00';
      totalResult.textContent = '$0.00';
      errorMessage.textContent = '';
  }


  bill.addEventListener('input', updateResults);

  tipButtons.forEach(function (button) {
      button.addEventListener('click', function () {
          tipButtons.forEach(function (btn) {
              btn.classList.remove('active');
          });
          button.classList.add('active');
          customTipInput.value = ''; 
          updateResults();
      });
  });

  customTipInput.addEventListener('input', function () {
      tipButtons.forEach(function (button) {
          button.classList.remove('active');
      });
      updateResults();
  });

  people.addEventListener('input', updateResults);

  resetButton.addEventListener('click', resetCalculator);
});
