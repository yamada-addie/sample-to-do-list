const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");
const inputField = document.getElementById("userInput");
const button = document.getElementById("submitBtn");
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const mainContent = document.querySelector(".main-content");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    mainContent.classList.toggle("shift");
});

for(const card of cards){
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
}

for(const list of lists){
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("drop", dragDrop);
}

button.addEventListener("click", addCard);

function dragStart(event){
    // this allows the drop location to know which element is being moved when you release it
    event.dataTransfer.setData("text/plain", this.id);
}

function dragEnd(){
    console.log("Drag ended");
}

function dragOver(event){
    // this line is important because by default, browsers don't allow you to drop elements onto other elements
    event.preventDefault();
}

function dragEnter(event){
    event.preventDefault();

    this.classList.add("over");
}

function dragLeave(){
    this.classList.remove("over");
}

function dragDrop(event){
    const id = event.dataTransfer.getData("text/plain");
    const card = document.getElementById(id);
    this.appendChild(card)

    this.classList.remove("over")
}

function addCard(){
    const cardText = inputField.value.trim();
    if(cardText === ""){
        return;
    }
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.textContent = cardText;
    newCard.setAttribute("draggable", "true");
    newCard.id = `card-${Date.now()}`;
    newCard.innerHTML = `
        ${cardText}
        <button class="delete-btn">
            <svg xmlns="http://w3.org" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        </button>
    `;
    const deleteBtn = newCard.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        newCard.remove();
    });
    newCard.addEventListener("dragstart", dragStart);
    newCard.addEventListener("dragend", dragEnd);
    lists[0].appendChild(newCard);
    inputField.value = "";
}
