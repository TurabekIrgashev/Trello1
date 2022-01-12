import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-analytics.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlbODJfsf-pvCrNQdu0IOTwtbvZo90N60",
  authDomain: "fir-learning-2-c96ab.firebaseapp.com",
  databaseURL:
    "https://fir-learning-2-c96ab-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-learning-2-c96ab",
  storageBucket: "fir-learning-2-c96ab.appspot.com",
  messagingSenderId: "696256624301",
  appId: "1:696256624301:web:37ef196390ec712b343824",
  measurementId: "G-Q2RGQY8EDL",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();

const welcome = document.querySelector("#welcome");
const menuImg = document.querySelector("#menuImg");
const groups = document.querySelector("#groups");
const signContainer = document.querySelector("#signContainer");
const signupContainer = document.querySelector("#signupContainer");
const signInContainer = document.querySelector("#signInContainer");
const window = document.querySelector("#window");
const signupBtn = document.querySelector("#signupBtn");
const signInBtn = document.querySelector("#signInBtn");
const logOut = document.querySelector("#logOut");
const usernameMenu = document.querySelector("#usernameMenu");
// functions

logOut.onclick = () => {
  console.log("logout");
  dnone(window);
  dnone(menu);
  dnoner(signContainer);
  dnoner(signInBtn);
  dnoner(signupBtn);
};

const isSignIn = (callback = () => {}) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      callback(true);
    } else {
      console.warn("no sign in");
      callback(false);
    }
  });
};

isSignIn(() => {
  console.log("sign in bolgan");
  dnone(signContainer);
  dnone(welcome);
  dnoner(menu);
  dnone(signupBtn);
  dnone(signInBtn);

  // const menu = document.querySelector("#menu");
  // dnoner(menu);
  // const signupBtn = document.querySelector("#signupBtn");
  // const signInBtn = document.querySelector("#signInBtn");
  // dnone(signInBtn);
  // dnone(signupBtn);
  dnoner(window);
  getGroups();
});
// const body = document.querySelector("body");
// body.onload = () => {
//   isSignIn();
// };

const registr = () => {
  const signupForm = document.querySelector("#signupForm");
  dnoner(signupContainer);
  dnoner(signContainer);
  dnone(welcome);
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#signupEmail").value;
    const pass = document.querySelector("#signupPass").value;
    const username = document.querySelector("#signupUsername").value;
    const img = document.querySelector("#signupImg").value;
    usernameMenu.innerHTML = username;
    menuImg.src = img;
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        dnone(signContainer);
        dnoner(welcome);
        const title1 = document.querySelector("#welcomeTitle");
        title1.innerHTML = "Successfully signed! You can SignIn";
        console.log(userCredential.user);
        const user = userCredential.user;
        push(ref(db, "users/"), {
          username: username,
          email: email,
          imgUrl: img,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("signupda up hato");
      });
  });
};

const enter = () => {
  dnoner(signInContainer);
  dnoner(signContainer);
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#signInEmail").value;
    const pass = document.querySelector("#signInPass").value;
    const username = document.querySelector("#signInUsername").value;
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        console.log("signIn");
        const user = userCredential.user;
        if (user) {
          dnone(signContainer);
          dnone(welcome);
          const menu = document.querySelector("#menu");
          dnoner(menu);

          dnone(signInBtn);
          dnone(signupBtn);
          dnoner(window);
        }
        getUsers(username, email);
        getGroups();
      })
      .catch((error) => {
        alert("Password or email failed");
      });
  });
};

const getUsers = (username, email) => {
  const starCountRef = ref(db, "users/");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    // updateStarCount(postElement, data);
    const userProfile = Object.entries(data);
    userProfile.map((el) => {
      if (el[1].username == username && el[1].email == email) {
        menuImg.src = el[1].imgUrl;
      }
    });
  });
};

//Sign In function
//#region  setGroupName
const setGroupName = (name, username) => {
  push(ref(db, "groups/"), {
    title: name,
  });
  getGroups();
};
//#endregion setGroupName
const getGroups = () => {
  const starCountRef = ref(db, "groups/");
  const res = onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    let data1 = Object.entries(data);
    console.log(data1);
    renderGroup(data1);
  });
};
import { createElement } from "./createEl.js";
const groupLists = document.querySelector("#groupLists");
const renderGroup = (arr) => {
  console.log(arr);
  groupLists.innerHTML = "";
  arr.map((group) => {
    const keyGroup = group[0];
    const li = createElement(
      "li",
      "d-flex align-items-center shadow p-2 justify-content-between",
      "",
      groupLists
    );
    const left = createElement("div", "d-flex align-items-center", "", li);
    const icon = createElement(
      "span",
      "",
      ` <i class="fas fa-user-friends"></i>`,
      left
    );
    const button = createElement("button", "btn grBtn", group[1].title, left);
    button.value = group[1].title;
    button.onclick = () => {
      usersRender(keyGroup);
    };

    const right = createElement("div", "", "", li);

    const icons = createElement(
      "div",
      "d-flex justify-content-end ms-1 align-items-center",

      "",
      right
    );
    const join = createElement(
      "button",
      "btn",
      `<i class="fas fa-sign-in-alt"></i>`,
      icons
    );
    join.onclick = () => {
      getUser((user) => {
        addNewMember(keyGroup, user.uid);
      });
    };
    const trash = createElement(
      "button",
      "btn",
      ` <i class="fa fa-trash-alt"></i>`,
      icons
    );

    const edit = createElement(
      "button",
      "btn",
      `<i class="fa fa-pencil"></i>`,
      icons
    );
  });
};
const getUser = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      log.warn("User sign in qilmagan");
    }
  });
};
const headerGroup = document.querySelector("#headerGroup");
//#region  member
// const member = document.querySelector("#signInUsername").value;

const addNewMember = (keyGroup, userUid) => {
  console.log("member", member);
  const starCountRef = ref(db, "groups/");
  set(ref(db, `groups/${keyGroup}/members/${userUid}`), {
    userUid: `${userUid}`,
  });
};
const usersRender = (keyGroup) => {
  const starCountRef = ref(db, `groups/${keyGroup}`);
  const res = onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data.members);

    const starCountRef = ref(db, `users/${data.members}`);
    const res = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  });
};
//#endregion

const chat = document.querySelector("#chat");

export { registr, enter, getUsers, setGroupName };
