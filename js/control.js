import { addTask, showTask, removeTask, getProfil} from "./main.js";

const addForm = document.querySelector('#addForm');
const username = document.querySelector('#signInUsername').value;
const img = document.querySelector('#signupImg').value;
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("username bn img",username, img);
  getProfil()
  let task_text = addForm.task.value;
  let time = new Date();
  let curTime = `${time.getDate()} ${time.getHours()} : ${time.getMinutes()}`;
  addTask({
    text: task_text,
    date: curTime,
    img: img,
    user: username
  },
    addForm
  );
})

const taskListUl = document.querySelector('#taskList');

showTask(createList);

function createList(obj) {
  const tasks = obj ? Object.entries(obj) : [];
  console.log(tasks);
  taskListUl.innerHTML = "";
  tasks.forEach((idTask) => {
    let id = idTask[0];
    let item = idTask[1];
    
    const li = document.createElement('li');

    const btnCover = document.createElement('div');
    btnCover.className = 'btnCover'
    btnCover.innerHTML = `
    <button onclick="editTask('${id}')" class="btn btn-warning me-3"><i class="fa fa-pencil" aria-hidden="true"></i></button>
    <button onclick="removeTask('${id}')" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
    `

    const profileCover = document.createElement('div');
    profileCover.className = 'profile-cover'
    const messageImg = document.createElement('div');
    profileCover.appendChild(messageImg);

    const chatImg = document.createElement("img");
    chatImg.alt = "profileImg";
    chatImg.className = "profile-img";
    chatImg.src = `${item.img}`;
    messageImg.appendChild(chatImg);

    const nameDateInput = document.createElement("div");
    profileCover.appendChild(nameDateInput);

    const nameDate = document.createElement("p");
    nameDateInput.appendChild(nameDate);
    nameDate.className = "m-0 name-date";

    const itemUser = document.createElement("span");
    itemUser.innerHTML = item.user;
    nameDate.appendChild(itemUser);

    const itemDate = document.createElement("span");
    itemUser.innerHTML = item.date;
    nameDate.appendChild(itemDate);

    const input = document.createElement("input");
    input.value = item.text;
    input.type = "text";
    input.className = "p-2"
    input.style = "background: transparent; border-radius: 10px; outline: none; color: white;";
    nameDateInput.appendChild(input);

    input.readOnly = true;



    if(item.user === username)
    {
      li.className = "p-2 text-white mb-3 right" ;
      profileCover.className = 'profile-cover chatRight'
    }
    else{
      li.className = "p-2 text-white mb-3";
      profileCover.className = 'profile-cover'
    }


    li.append(profileCover, btnCover);
    taskListUl.append(li);
  })
}
function updateScroll() {
  var element = document.querySelector('li')[0];
  element.scrollTop = element.scrollHeight;
}

window.removeTask = removeTask;