// assigning variables to our DOM element values
const ageOfMember = document.getElementsByName("age")[0];
const relationToMember = document.getElementsByName("rel")[0];
const smoker = document.getElementsByName("smoker")[0];
const addButton = document.getElementsByClassName("add")[0];
const debug = document.getElementsByClassName("debug")[0];
// creating DOM elements to display our household and
const deleteBtn = document.createElement("button");
const deleteHouseHold = document.createElement("input");
const list = document.createElement("ol");
const form = document.forms[0];
// creating an empty array to hold all of our household members
let hhList = [];

// labeling our button
deleteBtn.innerHTML = "delete";
//Add an household
addButton.onclick = (event) => {
  // ensuring the page doesn't reload on submit
  event.preventDefault();
  if (checkInputs("add")) {
    if(ageOfMember.value < 1) {
        alert("Age has to be greater than 0")
    } else {
        // putting our values into an object that will be pushed to our hhList array
        let person = {
          age: ageOfMember.value,
          relationship: relationToMember.value,
          // conditional to change our smoker variable to a string
          smoker: smoker.checked === true ? "Yes" : "No"
        };
        
        let listNode = document.createElement("li");
        let personNode = document.createTextNode("Age: " + person.age + " Relationship: " + person.relationship + " Smoker: " + person.smoker);
        deleteBtn.addEventListener('click', () => {
          // logic to remove the person object from the hhList array
          // and remove the created <li> node
          var arrIndex = hhList.indexOf(person);
          hhList.splice(arrIndex, 1);
          listNode.remove();
          resetForm();
        });
        listNode.name = "li";
        // appending our elements to the DOM to display
        listNode.appendChild(personNode);
        listNode.appendChild(deleteBtn);
        list.appendChild(listNode);
        hhList.push(person);
        //reset form after adding a new person to the house hold
        resetForm();
    }
  } else {
    // validating that we have at least one person in the household
    alert('Please add at least one member to the houeshold.');
  }
};
ageOfMember.onkeyup = (event) => {
  let age = parseInt(event.target.value);
  if (age < 1 || isNaN(age)) {
    alert('Age that is > 0 is required.');
  }
};
// inputValidation = (value) => {
  //   if (!(value.match(/^\d+$/)) || value <= 0) {
  //     value = "";
  //   }
  // }

form.onsubmit = (event) => {
  // ensuring the page doesn't reload on submit
  event.preventDefault();
  // validating that we have at least one person in the household
  if(hhList.length === 0) {
    alert('Please add at least one member to the houeshold.');
  } else {
    let serialize = JSON.stringify(hhList);
    debug.style.display = "block";
    debug.style.wordWrap = "break-word";
    debug.style.whiteSpace = "initial";
    debug.innerHTML = serialize;
  }
};

form.appendChild(list);

//reset the form everytime user adds a new household
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
      if (deleteHouseHold.value.length === 0 || hhList.length <= 0) return false;
      else return true;
      break;
    default:
  }
}