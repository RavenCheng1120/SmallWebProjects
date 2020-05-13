const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', (e) => {
  //取消DOM的預設功能
  e.preventDefault();
  if(checkInputs()){
    submitSuccess();
  }
});

const checkInputs = () => {
  //trim剪去空白
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  let check = true;

  if(usernameValue === ''){
    check = false;
    setErrorForm(username, "Username can not be blank.");
  }
  else
    setSuccessForm(username);

  if(emailValue === ''){
    check = false;
    setErrorForm(email, "Email can not be blank.");
  }
  else if(!isEmail(emailValue)){
    check = false;
    setErrorForm(email, "Not a valid email.");
  }
  else
    setSuccessForm(email);

  if(passwordValue === ''){
    check = false;
    setErrorForm(password, "Password can not be blank.");
  }
  else
    setSuccessForm(password);

  if(password2Value === ''){
    check = false;
    setErrorForm(password2, "Password can not be blank.");
  }
  else if(password2Value !== passwordValue){
    check = false;
    setErrorForm(password2, "Password is not the same.");
  }
  else
    setSuccessForm(password2);

  return check;
};


const setErrorForm = (section, message) => {
  const formControl = section.parentElement;
  const small = formControl.querySelector('small');
  small.innerText = message;
  formControl.classList.add('error');
  formControl.classList.remove('success');
};

const setSuccessForm = (section) => {
  const formControl = section.parentElement;
  formControl.classList.add('success');
  formControl.classList.remove('error');
};

const isEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const submitSuccess = () => {
  const container = document.querySelector(".container");
  const formControl = document.querySelectorAll(".form-control.success i.fa-check-circle");
  container.style.visibility = "hidden";
  formControl.forEach((item) => {
    console.log(item);
    item.style.visibility = "hidden";
  });
  document.querySelector(".success-page").style.visibility = "visible";
}
