const ageInput = document.getElementsByName("age")[0];
const relationshipInput = document.getElementsByName("rel")[0];
const smokerInput = document.getElementsByName("smoker")[0];
const addButton = document.getElementsByClassName("add")[0];
const debug = document.getElementsByClassName("debug")[0];
const deleteButton = document.createElement("button");
const deleteInput = document.createElement("input");
const list = document.createElement("ol");
const form = document.forms[0];
let householdList = [];

deleteInput.placeholder = "# person you wish to delete";
deleteButton.innerHTML = "delete";
list.id = "list";

addButton.onclick = (event) => {
  event.preventDefault();
  if (checkInputs("add")) {
    console.log(ageInput.value);
    if(ageInput.value <= 0) {
        alert("Age has to be greater than 0")
    } else {
        let person = {
        age: ageInput.value,
        relationship: relationshipInput.value,
        smoker: smokerInput.checked === true ? "Yes" : "No"
        };
        let listNode = document.createElement("li");
        let personNode = document.createTextNode("Age: " + person.age + " | Relationship: " + person.relationship + " | Smoker: " + person.smoker);
    
        listNode.name = "li";
    
        listNode.appendChild(personNode);
        list.appendChild(listNode);
        householdList.push(person);
    
        resetDefaults();
    }
  } else {
    alert('Please insert data.');
  }
};
ageInput.onkeyup = () => {
  validation(this);
};
deleteButton.onclick = (event) => {
  event.preventDefault();
  let value = deleteInput.value;
  if (checkInputs("delete") && value <= householdList.length) {
    householdList.splice(value - 1, 1);
    list.removeChild(list.childNodes[value - 1]);
  }
  resetDefaults();
};
deleteInput.onkeyup = () => {
  validation(this);
};
form.onsubmit = function(event) {
  event.preventDefault();
  let serialize = JSON.stringify(householdList);
  debug.style.display = "block";
  debug.style.wordWrap = "break-word";
  debug.style.whiteSpace = "initial";
  debug.innerHTML = serialize;
};

form.appendChild(deleteInput);
form.appendChild(deleteButton);
form.appendChild(list);

validation = (event) => {
  let value = event.value;
  if (!(value.match(/^\d+$/)) || value <= 0) {
    event.value = "";
  }
}

resetDefaults = () => {
  ageInput.value = "";
  relationshipInput.value = "";
  smokerInput.checked = false;
  deleteInput.value = "";
}

checkInputs = (type) => {
  switch (type) {
    case "add":
      if (ageInput.value.length === 0 || relationshipInput.value.length === 0) return false;
      else return true;
      break;
    case "delete":
      if (deleteInput.value.length === 0 || householdList.length <= 0) return false;
      else return true;
      break;
    default:
  }
}