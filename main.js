const lowerCaseLetters = [];
for (let i=97 ; i <= 122 ; i++) 
lowerCaseLetters.push(String.fromCharCode(i));
  const upperCaseLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const symbols = [
    "`",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "+",
    "=",
  ];
  const sliderValueText = document.querySelector(".slider-value");
  const sliderInput = document.querySelector(".slider");
  const checkbox = document.querySelectorAll("input[type=checkbox]");
  const form = document.getElementById("submit");
  const generatedPassword = document.querySelector(".generated-password");
  const strengthBars = document.querySelectorAll(".bar");
  const strengthText = document.querySelector(".strength-text");
  const submitButton = document.querySelector(".submit-btn");
  const copyButton = document.querySelector(".fa-copy");
  const copyText = document.querySelector(".copy-confirmation-text");
  const hiddenInput = document.querySelector(".hidden-text-input");
  
  const translations = {
    en: {
      title: 'Password Generator Random',
      mainHeading: 'Password Generator Random',
      characterLength: 'Character length',
      includeUppercase: 'Include Uppercase Letters',
      includeLowercase: 'Include Lowercase Letters',
      includeNumbers: 'Include Numbers',
      includeSymbols: 'Include Symbols',
      strengthLabel: 'STRENGTH',
      strengthTooWeak: 'Too Weak!',
      strengthWeak: 'Weak',
      strengthMedium: 'Medium',
      strengthStrong: 'Strong',
      generate: 'GENERATE',
      pleaseSelectValue: 'Please select a value greater than 5!',
      pleaseCheckBox: 'Please check a box!',
      copied: 'Copied'
    },
    es: {
      title: 'Generador de Contraseñas',
      mainHeading: 'Generador de Contraseñas',
      characterLength: 'Longitud de caracteres',
      includeUppercase: 'Incluir mayúsculas',
      includeLowercase: 'Incluir minúsculas',
      includeNumbers: 'Incluir números',
      includeSymbols: 'Incluir símbolos',
      strengthLabel: 'FUERZA',
      strengthTooWeak: 'Muy Débil!',
      strengthWeak: 'Débil',
      strengthMedium: 'Media',
      strengthStrong: 'Fuerte',
      generate: 'GENERAR',
      pleaseSelectValue: 'Por favor selecciona un valor mayor a 5!',
      pleaseCheckBox: 'Por favor marca una casilla!',
      copied: 'Copiado'
    }
  };

  let currentLang = 'en';

  function getGenerateHTML() {
    return `${translations[currentLang].generate} <i class="fas fa-angle-right"></i>`;
  }

  function translatePage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    const elems = document.querySelectorAll('[data-i18n]');
    elems.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    document.title = translations[lang].title || document.title;
    if (!submitButton.disabled) submitButton.innerHTML = getGenerateHTML();
  }

  // Hook language selector if present
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener('change', (e) => translatePage(e.target.value));
  }
  // Set initial value
  sliderInput.value = 5;
  
  // Disable copy button
  copyButton.disabled = true;
  
  // Generate Password
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Remove copy text
    copyText.textContent = "";
    let passsWord = [];
    for (let i = 0; i <= sliderInput.value; i++) {
      if (checkbox[0].checked === true) {
        passsWord.push(
          upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)]
        );
      }
      if (checkbox[1].checked === true) {
        passsWord.push(
          lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)]
        );
      }
  
      if (checkbox[2].checked === true) {
        passsWord.push(numbers[Math.floor(Math.random() * numbers.length)]);
      }
      if (checkbox[3].checked === true) {
        passsWord.push(symbols[Math.floor(Math.random() * symbols.length)]);
      }
    }
    passsWord = passsWord
      .sort(() => 0.5 - Math.random())
      .slice(0, sliderInput.value)
      .join("");
    generatedPassword.textContent = passsWord;
    hiddenInput.value = passsWord;
  
    // Enable copy button & Copy Text
    copyButton.disabled = false;
    copyButton.addEventListener("click", () => {
      hiddenInput.select();
      hiddenInput.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(hiddenInput.value);
      copyText.textContent = translations[currentLang].copied;
    });
  });
  
  // Dispaly slider value & Logic
  sliderInput.addEventListener("change", () => {
    sliderValueText.textContent = sliderInput.value;
    let checkedBoxes = [];
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        checkedBoxes.push(i);
      }
    }
    if (sliderInput.value < 5) {
      submitButton.disabled = true;
      submitButton.textContent = translations[currentLang].pleaseSelectValue;
    }
    if (checkedBoxes.length === 0 && sliderInput.value >= 5) {
      submitButton.disabled = true;
      submitButton.textContent = translations[currentLang].pleaseCheckBox;
    }

    if (checkedBoxes.length > 0 && sliderInput.value >= 5) {
      submitButton.disabled = false;
      submitButton.innerHTML = getGenerateHTML();
    }
  });
  
  // Check how many checkboxes are true and update strength bars
  checkbox.forEach((box) => {
    box.addEventListener("change", () => {
      let strengthBarArray = Array.from(strengthBars);
      let checkedBoxes = [];
      for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
          checkedBoxes.push(i);
        }
      }
  
      // Reset colors of strength bars
      for (let i = 0; i < checkbox.length; i++) {
        strengthBarArray[i].style.backgroundColor = "black";
      }
  
      // if (checkedBoxes.length - 1 === -1) {
      //   strengthBarArray[0].style.backgroundColor = "red";
      //   strengthText.textContent = "Too Weak!";
      // }
  
      if (checkedBoxes.length - 1 === 0) {
        strengthBarArray[0].style.backgroundColor = "red";
        strengthText.textContent = translations[currentLang].strengthTooWeak;
      }
      if (checkedBoxes.length - 1 === 1) {
        strengthBarArray[0].style.backgroundColor = "orange";
        strengthBarArray[1].style.backgroundColor = "orange";
        strengthText.textContent = translations[currentLang].strengthWeak;
      }
      if (checkedBoxes.length - 1 === 2) {
        strengthBarArray[0].style.backgroundColor = "yellow";
        strengthBarArray[1].style.backgroundColor = "yellow";
        strengthBarArray[2].style.backgroundColor = "yellow";
        strengthText.textContent = translations[currentLang].strengthMedium;
      }
  
      if (checkedBoxes.length - 1 > 2) {
        strengthBarArray[0].style.backgroundColor = "green";
        strengthBarArray[1].style.backgroundColor = "green";
        strengthBarArray[2].style.backgroundColor = "green";
        strengthBarArray[3].style.backgroundColor = "green";
        strengthText.textContent = translations[currentLang].strengthStrong;
      }
  
      if (checkedBoxes.length === 0) {
        submitButton.disabled = true;
        submitButton.textContent = translations[currentLang].pleaseCheckBox;
      }
  
      if (sliderInput.value < 5 && checkedBoxes.length === 0) {
        submitButton.disabled = true;
        submitButton.textContent = translations[currentLang].pleaseSelectValue;
      }
  
      if (checkedBoxes.length > 0 && sliderInput.value >= 5) {
        submitButton.disabled = false;
        submitButton.innerHTML = getGenerateHTML();
      }
      if (checkedBoxes.length > 0 && sliderInput.value >= 5) {
        submitButton.disabled = false;
        submitButton.innerHTML = getGenerateHTML();
      }
    });
  });
  
  // Slider Logic
  
  const slider = document.getElementById("myinput");
  const min = slider.min;
  const max = slider.max;
  const value = slider.value;
  
  slider.style.background = `linear-gradient(to right, #ffec1d 0%, #FB2D ${
    ((value - min) / (max - min)) * 100
  }%,#18171f ${((value - min) / (max - min)) * 100}%, #18171f 100%)`;
  
  slider.oninput = function () {
    this.style.background = `linear-gradient(to right, #ffec1d 0%, #FB2D ${
      ((this.value - this.min) / (this.max - this.min)) * 100
    }%,#18171f ${
      ((this.value - this.min) / (this.max - this.min)) * 100
    }%, #18171f 100%)`;
  };