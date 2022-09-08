// hide loading indicator.
hideLoading();
// get sign up container.
const signUpContainer = document.getElementById("signup");
// set up event for sign up close btn
const signUpCloseBtn = document.getElementById("signup__close-btn");
// set up event for create new account button.
const createNewAccountBtn = document.getElementById("login__create-account-btn");
// get input information from the input elements and validate those values.
const selectedPet = document.getElementById("signup__selected-pet");
const PetClose = document.getElementById("signup__pet-close");
const PetLabel = document.getElementById("signup__pet-label");
const PetInputElement = document.getElementById("signup__pet");
const emailInputElement = document.getElementById("signup__email");
const passwordInputElement = document.getElementById("signup__password");
const confirmPasswordInputElement = document.getElementById("signup__confirm-password");
const fullNameInputElement = document.getElementById("signup__fullname");
const ageInputElement = document.getElementById("signup__age");
const genderSelectElement = document.getElementById("signup__gender");

const emailLoginInputElement = document.getElementById("login__email");
const passwordLoginInputElement = document.getElementById("login__password");
// get sign up button.
const signUpBtn = document.getElementById("signup__btn");
// get login button.
const loginBtn = document.getElementById("login__submit-btn");

/**
 * hide sing up modal.
 */
function hideSignUp() {
  // add hide class to hide the sign up.
  signUpContainer.classList.add("signup--hide");
  // clear the input elements.
  if (emailInputElement && passwordInputElement && confirmPasswordInputElement) {
    emailInputElement.value = "";
    passwordInputElement.value = "";
    confirmPasswordInputElement.value = "";
  }
}

// add event for sign up close button.
if (signUpCloseBtn) {
  signUpCloseBtn.addEventListener("click", function () {
    hideSignUp();
  });
}

// add event for create a new account button.
if (createNewAccountBtn) {
  createNewAccountBtn.addEventListener("click", function () {
    signUpContainer.classList.remove("signup--hide");
  });
}

/**
 * validate input user's information when creating a new account.
 * @param {*} object - user's information that needs to be validated.
 * @returns valid, or not.
 */
function validateNewAccount({ avatars, email, password, confirmPassword, fullname, age, gender }) {
  if (!pets || pets.length === 0) {
    alert("Please select a pet");
    return false;
  }
  if (pets.length > 1) {
    alert("Please select a single image");
    return false;
  }
  const pet = pets[0];
  if (pet && !pet.type.includes("jpeg")) {
    alert("Your pet must be jpeg format");
    return false;
  }
  if (!validator.isEmail(email)) {
    alert("Please input your email");
    return false;
  }
  if (
    validator.isEmpty(password) ||
    !validator.isLength(password, { min: 6 })
  ) {
    alert(
      "Please input your password. You password must have at least 6 characters"
    );
    return false;
  }
  if (validator.isEmpty(confirmPassword)) {
    alert("Please input your confirm password");
    return false;
  }
  if (password !== confirmPassword) {
    alert("Confirm password and password must be the same");
    return false;
  }
  if (validator.isEmpty(fullname)) {
    alert("Please iput your fullname");
    return false;
  }
  if (validator.isEmpty(age) || !validator.isNumeric(age)) {
    alert("Please input your pets age, your age must be a number");
    return false;
  }
  if (validator.isEmpty(gender)) {
    alert("Please input your pets gender");
    return false;
  }
  return true;
}

const resetPetSelection = () => {
  selectedPet.src = "";
  selectedPet.classList.remove("show");
  selectedPet.classList.add("hide");
  petClose.classList.remove("show");
  petClose.classList.add("hide");
  petLabel.classList.remove("hide");
  petLabel.classList.add("show");
  petInputElement.value = "";
};

if (petClose) {
  petClose.addEventListener("click", function () {
    resetPetSelection();
  });
}

const onPetSelected = (input) => {
  if (input) {
    selectedPet.src = (window.URL ? URL : webkitURL).createObjectURL(
      input.files[0]
    );
    selectedPet.classList.remove("hide");
    selectedPet.classList.add("show");
    petClose.classList.remove("hide");
    petClose.classList.add("show");
    petLabel.classList.remove("show");
    petLabel.classList.add("hide");
  }
};

const resetSignUpForm = () => {
  resetPetSelection();
  emailInputElement.value = ''
  passwordInputElement.value = ''
  confirmPasswordInputElement.value = ''
  fullNameInputElement.value = ''
  ageInputElement.value = ''
  genderSelectElement.value = 'Male'
};

const registerNewAccount = ({ pet, email, password, fullname, age, gender }) => {
  showLoading();
  const userUuid = uuid.v4();
  const form = new FormData();
  form.append("pet", pet);
  form.append("email", email);
  form.append("password", password);
  form.append("age", age);
  form.append("gender", gender);
  form.append("ccUid", userUuid);
  form.append("fullname", fullname);
  axios
    .post("/users/create", form)
    .then((res) => {
      if (res && res.data && res.data.message) {
        alert(res.data.message);
      } else if (res && res.data && res.data.insertId) {
        const user = new CometChat.User(userUuid);
        user.setName(fullname);
        user.setPet(`${window.location.origin}${res.data.avatar}`);
        const appSetting = new CometChat.AppSettingsBuilder()
          .subscribePresenceForAllUsers()
          .setRegion(config.CometChatRegion)
          .build();
        CometChat.init(config.CometChatAppId, appSetting).then(
          () => {
            CometChat.createUser(user, config.CometChatAuthKey).then(
              (user) => {
                alert("You account has been created successfully");
              },
              (error) => {
              }
            );
          },
          (error) => {
            // Check the reason for error and take appropriate action.
          }
        );
        hideLoading();
        resetSignUpForm();
        hideSignUp();
      } else {
        alert("Cannot create your account. Please try again");
      }
    })
    .catch((error) => {
      hideLoading();
    });
};

// add event for sign up button.
if (signUpBtn) {
  signUpBtn.addEventListener("click", function () {
    if (petInputElement && emailInputElement && passwordInputElement && confirmPasswordInputElement && fullNameInputElement && ageInputElement && genderSelectElement) {
      const pets = petInputElement.files;
      const email = emailInputElement.value;
      const password = passwordInputElement.value;
      const confirmPassword = confirmPasswordInputElement.value;
      const fullname = fullNameInputElement.value;
      const age = ageInputElement.value;
      const gender = genderSelectElement.value;
      if (
        validateNewAccount({ pets, email, password, confirmPassword, fullname, age, gender })
      ) {
        registerNewAccount({ pet: pets[0], email, password, fullname, age, gender });
      }
    }
  });
}

/**
 * check user's credentials is valid, or not.
 * @param {*} object - user's credentials.
 * @returns valid, or not.
 */
function isUserCredentialsValid({ email, password }) {
  return (
    email &&
    password &&
    validator.isEmail(email) &&
    validator.isLength(password, { min: 6 })
  );
}

// add event for login button.
if (loginBtn) {
  loginBtn.addEventListener("click", function () {
    // show loading indicator.
    showLoading();
    // get input user's credentials.
    const email = emailLoginInputElement ? emailLoginInputElement.value : null;
    const password = passwordLoginInputElement ? passwordLoginInputElement.value : null;
    if (isUserCredentialsValid({ email, password })) {
      axios
        .post("/login", { email, password })
        .then((res) => {
          if (res && res.data && res.data.uid) {
            const appSetting = new CometChat.AppSettingsBuilder()
              .subscribePresenceForAllUsers()
              .setRegion(config.CometChatRegion)
              .build();
            CometChat.init(config.CometChatAppId, appSetting).then(
              () => {
                // You can now call login function.
                CometChat.login(res.data.uid, config.CometChatAuthKey).then(
                  (loggedInUser) => {
                    // hide loading.
                    hideLoading();
                    // store logged in user in the local storage.
                    localStorage.setItem("auth", JSON.stringify({ ...loggedInUser, gender: res.data.gender }));
                    // redirect to home page.
                    window.location.href = "/";
                  }
                );
              },
              (error) => {
                // Check the reason for error and take appropriate action.
              }
            );
          } else {
            // hide loading.
            hideLoading();
            alert("Your user name or password is not correct");
          }

        })
        .catch((error) => {
          if (error) {
            hideLoading();
            alert("Your user name or password is not correct");
          }
        });
    } else {
      // hide loading indicator.
      hideLoading();
      alert(`Your user's name or password is not correct`);
    }
  });
}