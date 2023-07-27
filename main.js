// signup
var btnSignup = document.getElementById("btnSignup");
var userNameInputSignup = document.getElementById("user-name-signup");
var userEmailInputSignup = document.getElementById("user-email-signup");
var userPasswordInputSignup = document.getElementById("user-password-signup");
var errorMessageSignup = document.getElementById("errorMessage-signup");
var signupContainer = document.getElementById("signup-container");
var showSignupPageBtn = document.getElementById("showSignupPage");

// login
var loginContainer = document.getElementById("login-container");
var btnLogin = document.getElementById("login");
var showLoginPageBtn = document.getElementById("showLoginPage");
var userEmailInputLogin = document.getElementById("user-email-login");
var userPasswordInputLogin = document.getElementById("user-password-login");
var errorMessageLogin = document.getElementById("errorMessage-login");

// other
var logoutBtn = document.getElementById("logout");
var h1 = document.getElementById("h1");

// events
btnLogin.addEventListener("click", login);
btnSignup.addEventListener("click", signup);
showLoginPageBtn.addEventListener("click", showLoginPage);
showSignupPageBtn.addEventListener("click", showSignupPage);
logoutBtn.addEventListener("click", logout);

var users = [];

checkProductInLocalStorage();
// ---------------------------------------------------------------- functions
function checkProductInLocalStorage() {
  let localStorageUsers = getFromLocalStorage("users");
  if (localStorageUsers != null && localStorageUsers.length > 0) {
    users = localStorageUsers;
  }
}

function isNameValid(userName = userNameInputSignup.value) {
  var regex = /^.{3,30}$/;

  var valid = regex.test(userName);

  if (!valid) {
    errorMessageSignup.innerText = " name not vaild";
  } else {
    errorMessageSignup.innerText = "";
  }

  return valid;
}

function isEmailValid(userEmail = userEmailInputSignup.value) {
  var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  var valid = regex.test(userEmail);

  if (!valid) {
    errorMessageSignup.innerText = " email not vaild";
  } else {
    errorMessageSignup.innerText = "";
  }

  return valid;
}

function isPasswordValid(password = userPasswordInputSignup.value) {
  var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  var valid = regex.test(password);

  if (!valid) {
    errorMessageSignup.innerText = " password not vaild";
  } else {
    errorMessageSignup.innerText = "";
  }

  return valid;
}

function logout() {
  removeClass(loginContainer);
  addClass(signupContainer);
  addClass(logoutBtn);
}

function showSignupPage(e) {
  e.preventDefault();
  addClass(loginContainer);
  removeClass(signupContainer);
}

function showLoginPage(e) {
  e.preventDefault();
  addClass(signupContainer);
  removeClass(loginContainer);
}

function signup() {
  // errorMessageSignup.innerText = "000";
  if (isNameValid() && isEmailValid() && isPasswordValid()) {
    if (!isUserExist(userEmailInputSignup.value)) {
      var user = {
        name: userNameInputSignup.value,
        email: userEmailInputSignup.value,
        password: userPasswordInputSignup.value,
      };
      users.push(user);
      saveInLocalStorage("users", users);
      addClass(signupContainer);
      removeClass(loginContainer);
    } else {
      errorMessageSignup.innerText = " user email already exist";
    }
  }
}

function login() {
  var user = null;
  for (var i = 0; i < users.length; i++) {
    if (
      userEmailInputLogin.value === users[i].email &&
      userPasswordInputLogin.value === users[i].password
    ) {
      user = users[i];
      break;
    }
  }

  if (user === null) {
    errorMessageLogin.innerText = "incorrect email or password";
  } else {
    addClass(loginContainer);
    removeClass(logoutBtn);
    h1.innerText = `hi ${user.name}`;
  }
}

function isUserExist(userEmail) {
  var valid = false;
  for (var i = 0; i < users.length; i++) {
    if (userEmail === users[i].email) {
      valid = true;
      break;
    }
  }
  return valid;
}

function saveInLocalStorage(key, value) {
  // convert value to string to store this value in local storage
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
}

function getFromLocalStorage(key) {
  let value = localStorage.getItem(key);
  // convert string that came from local storage to its type
  return JSON.parse(value);
}

function addClass(el, className = "d-none") {
  if (!el.classList.contains(className)) {
    el.classList.add(className);
  }
}

function removeClass(el, className = "d-none") {
  if (el.classList.contains(className)) {
    el.classList.remove(className);
  }
}
