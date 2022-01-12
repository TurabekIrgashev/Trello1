import { registr, enter } from "./firebase.js";

//consts

const signupBtn = document.querySelector("#signupBtn");
const signInBtn = document.querySelector("#signInBtn");
// consts

//onclicks

signupBtn.onclick = (e) => {
  e.preventDefault();
  try {
    registr();
  } catch (error) {
    console.log(error);
  }
};

signInBtn.onclick = (e) => {
  e.preventDefault();
  dnone(signupContainer);
  enter();
};
