import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

import {
  getDatabase, ref, set, onValue, push, remove, update,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlbODJfsf-pvCrNQdu0IOTwtbvZo90N60",
  authDomain: "fir-learning-2-c96ab.firebaseapp.com",
  databaseURL:"https://fir-learning-2-c96ab-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-learning-2-c96ab",
  storageBucket: "fir-learning-2-c96ab.appspot.com",
  messagingSenderId: "696256624301",
  appId: "1:696256624301:web:37ef196390ec712b343824",
  measurementId: "G-Q2RGQY8EDL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// databasega ulanish 
const db = getDatabase();

// databasega murojat
const dbRef = ref(db);



// to do funksiyalar
const addTask = (task, form) => {
  push(ref(db, 'task_list/'), task)
    .then(() => {
      form.reset();
    });
}

const showTask = (callback) => {
  onValue(ref(db, 'task_list/'), (data) => {
    callback(data.val());
  })
}

const removeTask = (id) => {
  remove(ref(db, 'task_list/' + id));
}


const getProfil = (callback) =>{
  const starCountRef = ref(db, 'users/');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  
});
}
export { addTask, showTask, removeTask, getProfil};






