import { setGroupName } from "./firebase.js";
const addNewGroupBtn = document.querySelector("#addNewGroupBtn");
const newGroupInput = document.querySelector("#newGroupInput");
const newGroup = document.querySelector("#newGroup");
const groupLists = document.querySelector("#groupLists");
const headerGroup = document.querySelector("#headerGroup");

newGroup.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("#signupUsername").value;
  if (newGroupInput.value) {
    setGroupName(newGroupInput.value, username);
  }
  newGroupInput.value = "";
});
