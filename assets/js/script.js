const hamburger = document.querySelector(".hamburger");
const headerContainer = document.querySelector(".header-container");
const navLink = document.querySelectorAll(".header-container a");
const html = document.querySelector("html");

const sendBtn = document.querySelector(".send-btn");
const firstName = document.querySelector(".firstName");
const lastName = document.querySelector(".lastName");
const subject = document.querySelector(".subject");
const email = document.querySelector(".email");
const message = document.querySelector(".message");
const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const emailSubscription = document.querySelector(".emailSubscription");
const subscribeBtn = document.querySelector(".subscribe-btn");

const tabs = document.querySelectorAll(".tab-container > li");
const tables = document.querySelectorAll(".table-container > li");

const countContainer = document.querySelector(".counter-container");
const counts = document.querySelectorAll(".count");

const sliderContainer = document.querySelector(".slider-container");
const slideLeft = document.querySelector(".slide-left");
const slideRight = document.querySelector(".slide-right");
const classRadios = document.querySelectorAll(".slide-radio");

const cardRadios = document.querySelectorAll(".card-radio");
const cardContainer = document.querySelector(".card-container");

/* Hamburger logic */
//add active
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  headerContainer.classList.toggle("active-header");
  html.classList.toggle("html-scroll"); // prevent scrolling
})

//remove active
navLink.forEach(e => {
  e.addEventListener("click", () => {
    hamburger.classList.remove("active");
    headerContainer.classList.remove("active-header");
    html.classList.remove("html-scroll"); // remove prevent scrolling or user can scroll
  })
});

/**counter logic */
let activated = false;

const counterVisible = () => {
  // pageYOffset returns no. of pixels scrolled
  // offsetTop returns top position in px relative to parent
  // offsetheight return height of the element including vertical padding and border
  if (pageYOffset > countContainer.offsetTop - countContainer.offsetHeight - 500 && activated === false) {
    counts.forEach(count => {
      count.innerText = 0;
      let startVal = 0;

      function updateCount() {
        const endVal = parseInt(count.getAttribute("data-count"));
        if (startVal < endVal) {
          startVal++;
          count.innerText = startVal;
          setTimeout(updateCount, 2);
        } else {
          count.innerText = endVal;
        }
      }

      updateCount();
      activated = true;
    });
  } else if (pageYOffset < countContainer.offsetTop - countContainer.offsetHeight - 800 || pageYOffset === 0 && activated === true) { //
    counts.forEach(count => {
      count.innerText = 0;
    });
    activated = false;
  }
}

document.addEventListener('scroll', () => counterVisible()); //

/* contact form validation */
sendBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent contact form submitting 

  if (validateFields()) {
    emptyFormFields();
    alert("Your message is submitted successfully!");
  }
});

function validateFields() {
  let isValidFirstName = checkFirstName();
  let isValidLastName = checkLastName();
  let isValidSubject = checkSubject();
  let isValidEmail = checkEmail();
  let isValidMessage = checkMessage();

  // check all form fields are valid or not
  if (!isValidFirstName || !isValidLastName || !isValidSubject || !isValidEmail || !isValidMessage) {
    return false;
  } else {
    return true;
  }
}

// check contact fields on focus out
firstName.addEventListener("focusout", () => checkFirstName());
lastName.addEventListener("focusout", () => checkLastName());
subject.addEventListener("focusout", () => checkSubject());
email.addEventListener("focusout", () => checkEmail());
message.addEventListener("focusout", () => checkMessage());

function checkFirstName() {
  const firstNameValue = firstName.value.trim();

  if (firstNameValue === "") {
    const errorText = "*this field is required!";
    const errorParent = firstName.parentElement;

    showError(errorText, errorParent);
    return false;
  } else if (firstNameValue.length < 3) {
    const errorText = "*this field should be greater than 3 characters!";
    const errorParent = firstName.parentElement;

    showError(errorText, errorParent);
    return false;

  } else if (!isNaN(firstNameValue)) {
    const errorText = "*this field should not have numbers!";
    const errorParent = firstName.parentElement;

    showError(errorText, errorParent);
    return false;
  }
  else {
    showSuccess(firstName);
    return true;
  }
}

function checkLastName() {
  const lastNameValue = lastName.value.trim();

  if (lastNameValue === "") {
    const errorText = "*this field is required!";
    const errorParent = lastName.parentElement;

    showError(errorText, errorParent);
    return false;
  } else if (lastNameValue.length < 3) {
    const errorText = "*this field should be greater than 3 characters!";
    const errorParent = lastName.parentElement;

    showError(errorText, errorParent);
    return false;
  } else if (!isNaN(lastNameValue)) {
    const errorText = "*this field should not have numbers!";
    const errorParent = lastName.parentElement;

    showError(errorText, errorParent);
    return false;
  }
  else {
    showSuccess(lastName);
    return true;
  }
}

function checkEmail() {
  const emailValue = email.value.trim();

  if (emailValue === "") {
    const errorText = "*this field is required!";
    const errorParent = email.parentElement;

    showError(errorText, errorParent);
    return false;
  } else if (emailValue.match(emailPattern) == null) {
    const errorText = "*valid email is required!";
    const errorParent = email.parentElement;

    showError(errorText, errorParent);
    return false;
  }
  else {
    showSuccess(email);
    return true;
  }
}

function checkSubject() {
  const subjectValue = subject.value.trim();

  if (subjectValue === "") {
    const errorText = "*this field is required!";
    const errorParent = subject.parentElement;

    showError(errorText, errorParent);
    return false;
  } else if (subjectValue.length < 6) {
    const errorText = "*this field should be greater than 6 characters!";
    const errorParent = subject.parentElement;

    showError(errorText, errorParent);
    return false;
  }
  else {
    showSuccess(subject);
    return true;
  }
}

function checkMessage() {
  const messageValue = message.value.trim();

  if (messageValue === "") {
    const errorText = "*this field is required!";
    const errorParent = message.parentElement;

    showError(errorText, errorParent);
    return false;
  } else if (messageValue.length < 8) {
    const errorText = "*this field should be greater than 8 characters!";
    const errorParent = message.parentElement;

    showError(errorText, errorParent);
    return false;
  }
  else {
    showSuccess(message);
    return true;
  }
}

function showError(errorText, errorParent) {
  const showError = errorParent.querySelector(".error-text");
  showError.innerText = errorText;

  errorParent.classList.add("error");
  errorParent.classList.remove("success");
}

function showSuccess(element) {
  const successParent = element.parentElement;
  const showError = successParent.querySelector(".error-text");

  showError.innerText = "";

  successParent.classList.add("success");
  successParent.classList.remove("error");
}

// empty contact input fields
function emptyFormFields() {
  firstName.value = "";
  lastName.value = "";
  subject.value = "";
  email.value = "";
  message.value = "";
}

/* subscribe form logic */
subscribeBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent subscribe form submit

  if (checkEmail) {
    alert(checkEmailSubs());
    emailSubscription.value = "";
  }

});

function checkEmailSubs() {
  const emailValue = emailSubscription.value.trim();

  if (emailValue === "") {
    const errorText = "subscribtion email is required!";
    return errorText;
  } else if (emailValue.match(emailPattern) == null) {
    const errorText = "valid subscribtion email is required!";
    return errorText;
  }
  else {
    return "You will be get notified!";
  }
}

/**classes slider logic */
let activeSlide = 0;

slideRight.addEventListener("click", classRight);
slideLeft.addEventListener("click", classLeft);

classRadios.forEach((classRadio, idx) => {
  classRadio.addEventListener("click", () => handleClass(idx))
});

function handleClass(idx) {
  const activeRadio = document.querySelector(".active-radio");
  activeRadio.classList.remove("active-radio");

  classRadios[idx].classList.add("active-radio");
  if (idx == 1)
    sliderContainer.scrollLeft += 400;
  else
    sliderContainer.scrollLeft -= 400;
}

function classRight() {
  const activeRadio = document.querySelector(".active-radio");
  activeRadio.classList.remove("active-radio");

  activeSlide++;

  if (activeSlide > classRadios.length - 1) {
    activeSlide = 0;
    sliderContainer.scrollLeft -= 400;
  } else
    sliderContainer.scrollLeft += 400; // scroll sliderContainer to 400px horizontally

  classRadios[activeSlide].classList.add("active-radio");
}

function classLeft() {
  const activeRadio = document.querySelector(".active-radio");
  activeRadio.classList.remove("active-radio");

  activeSlide--;

  if (activeSlide < 0) {
    activeSlide = classRadios.length - 1;
    sliderContainer.scrollLeft += 400;
    classRadios[activeSlide].classList.add("active-radio");
  } else
    sliderContainer.scrollLeft -= 400; // scroll sliderContainer to -400px horizontally

  classRadios[activeSlide].classList.add("active-radio");
}

/**Services card logic */
cardRadios[1].addEventListener("click", () => {
  const activeCard = document.querySelector(".active-cards");

  cardContainer.scrollLeft += 620;
  activeCard.classList.remove("active-cards");
  cardRadios[1].classList.add("active-cards");
});

cardRadios[0].addEventListener("click", () => {
  const activeCard = document.querySelector(".active-cards");

  cardContainer.scrollLeft -= 620;
  activeCard.classList.remove("active-cards");
  cardRadios[0].classList.add("active-cards");
});

/* schedule tab logic */
const changeTab = idx => {
  removeActive();

  tabs[idx].classList.add("active-tab");
  tables[idx].classList.add("active-table");
}

tabs.forEach((tab, idx) => tab.addEventListener("click", () => changeTab(idx)));

function removeActive() {
  const activeContent = document.querySelector(".active-table");
  const activeTab = document.querySelector(".active-tab");

  activeContent.classList.remove("active-table");
  activeTab.classList.remove("active-tab");
}