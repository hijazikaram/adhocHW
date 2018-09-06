const ageOfMember = document.getElementsByName("age")[0];
const relationToMember = document.getElementsByName("rel")[0];
const smoker = document.getElementsByName("smoker")[0];
const addButton = document.getElementsByClassName("add")[0];
const debug = document.getElementsByClassName("debug")[0];
const deleteBtn = document.createElement("button");
const deleteHouseHold = document.createElement("input");
const list = document.createElement("ol");
const form = document.forms[0];
let householdList = [];

deleteHouseHold.placeholder = "number person you wish to delete";
deleteBtn.innerHTML = "delete";
list.id = "list";

//Add an household
addButton.onclick = (event) => {
  event.preventDefault();
  if (checkInputs("add")) {
    if(ageOfMember.value < 1) {
        alert("Age has to be greater than 0")
    } else {
        let person = {
            age: ageOfMember.value,
            relationship: relationToMember.value,
            smoker: smoker.checked === true ? "Yes" : "No"
        };
        let listNode = document.createElement("li");
        let personNode = document.createTextNode("Age: " + person.age + " Relationship: " + person.relationship + " Smoker: " + person.smoker);
    
        listNode.name = "li";
    
        listNode.appendChild(personNode);
        list.appendChild(listNode);
        householdList.push(person);
    
        resetForm();
    }
  } else {
    alert('Please insert data.');
  }
};
ageOfMember.onkeyup = () => {
  inputValidation(this);
};
deleteBtn.onclick = (event) => {
  event.preventDefault();
  let value = deleteHouseHold.value;
  if (checkInputs("delete") && value <= householdList.length) {
    householdList.splice(value - 1, 1);
    list.removeChild(list.childNodes[value - 1]);
  }
  resetForm();
};
deleteHouseHold.onkeyup = () => {
  inputValidation(this);
};
form.onsubmit = (event) => {
  event.preventDefault();
  let serialize = JSON.stringify(householdList);
  debug.style.display = "block";
  debug.style.wordWrap = "break-word";
  debug.style.whiteSpace = "initial";
  debug.innerHTML = serialize;
};

form.appendChild(deleteHouseHold);
form.appendChild(deleteBtn);
form.appendChild(list);

inputValidation = (event) => {
  let value = event.value;
  if (!(value.match(/^\d+$/)) || value <= 0) {
    event.value = "";
  }
}

resetForm = () => {
  ageOfMember.value = "";
  relationToMember.value = "";
  smoker.checked = false;
  deleteHouseHold.value = "";
}

checkInputs = (type) => {
  switch (type) {
    case "add":
      if (ageOfMember.value.length === 0 || relationToMember.value.length === 0) return false;
      else return true;
      break;
    case "delete":
      if (deleteHouseHold.value.length === 0 || householdList.length <= 0) return false;
      else return true;
      break;
    default:
  }
}