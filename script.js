// Write your code here
// GATHERING DOM ELEMENTS 
const form = document.getElementById('contactForm');
const submitButton = document.querySelector('.submit');
const successMessage = document.getElementById('form-submitted-msg');
const formElements = [...form.elements];
// FUNCTION: Checking all formElements are valid
const allInputsValid = () => {
  const valid = formElements.every((element) => {
    return element.checkValidity();
  });
  return valid;
}
// Define a function to handle changes to any form element
const handleChange = () => {
  // Use the forEach() function to execute the provided function once for each element in the formElements array
  formElements.forEach((element) => {
    // If the element is invalid and is not a button, a select dropdown, a checkbox, or a radio button, style it with a red border and red text
    if(!element.checkValidity() && element.nodeName !== 'BUTTON') {
      element.style.borderColor = 'red';
      element.nextElementSibling.style.color = 'red';
      element.nextElementSibling.style.display = 'block';
      element.previousElementSibling.style.color = 'red';
    }
    // If the element is valid, reset its style to the original colors
    // The conditions are the same as above for excluding certain elements
    if(element.checkValidity() && element.nodeName !== 'BUTTON') {
      element.style.borderColor = '#CED4DA';
      element.nextElementSibling.style.color = '#CED4DA';
      element.nextElementSibling.style.display = 'none';
      element.previousElementSibling.style.color = '#212529';
    };
  });
  // If all form elements are valid, enable the submit button; otherwise, disable it
  if(allInputsValid()) {
    submitButton.removeAttribute('disabled', '');
  } else {
    submitButton.setAttribute('disabled', '');
  };
};
// Define a function to handle form submission
const handleSubmit = (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();
  // If all form elements are valid after the form submission, display a success message, reset the form, and disable the submit button
  if(allInputsValid()) {
    successMessage.style.display = 'block';
    form.reset();
    submitButton.setAttribute('disabled', '');
    // Hide the success message after 3 seconds
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3000);
  };
};
// FUNCTION: Reset form styles
const resetFormStyles = () => {
  formElements.forEach((element) => {
    if(element.nodeName !== 'BUTTON') {
      element.style.borderColor = '#CED4DA';
      element.nextElementSibling.style.color = '#CED4DA';
      element.nextElementSibling.style.display = 'none';
      element.previousElementSibling.style.color = '#212529';
    };
  });
};
// Add event listener to each form element
formElements.forEach((element) => {
  element.addEventListener('change', handleChange);
});
// Add submit listener to the form
form.addEventListener('submit', (e) => handleSubmit(e));

// Add event listener to the CLEARFORM button
const clearFormButton = form.querySelector("button[type='reset']");
clearFormButton.addEventListener("click",() => {
  form.reset();
  resetFormStyles();
  submitButton.setAttribute('disabled', '');
  successMessage.style.display = 'none';
});
