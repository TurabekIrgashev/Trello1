const groupEdit = document.getElementById("group-edit");
const chatMembers = document.getElementById("chatMembers");
const mSet = document.getElementsByClassName("m-set");

const show = (div) => {

    if (div.classList.contains("d-none")) {
        div.classList.remove("d-none")
    } else {
        div.classList.add("d-none")
    };
};


const hide = (div) => {
    div.classList.add("d-none");
}

const createElement = (tag = "div", className = "", innerHTML = "", father = "") => {
    const element = document.createElement(tag);
    className && (element.className = className);
    innerHTML && (element.innerHTML = innerHTML);
    father && father.appendChild(element);

    return element;
};