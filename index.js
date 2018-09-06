// assigning variables to our DOM element values
const ageOfMember = document.getElementsByName("age")[0];
const relationToMember = document.getElementsByName("rel")[0];
const smoker = document.getElementsByName("smoker")[0];
const addButton = document.getElementsByClassName("add")[0];
const debug = document.getElementsByClassName("debug")[0];
// creating DOM elements to display our household
const list = document.createElement("ol");
const form = document.forms[0];
// creating an empty array to hold all of our household members
let hhList = [];

//Add an household
addButton.onclick = (event) => {
  const deleteBtn = document.createElement("button");
  // labeling our delete button
  deleteBtn.innerHTML = "Remove";
  // ensuring the page doesn't reload on submit
  event.preventDefault();
  if (checkInputs("add")) {
    // putting our values into an object that will be pushed to our hhList array
    let person = {
      age: ageOfMember.value,
      relationship: relationToMember.value,
      // conditional to change our smoker variable to a string
      smoker: smoker.checked === true ? "Yes" : "No"
    };
    let listNode = document.createElement("li");
    let personNode = document.createTextNode("Age: " + person.age + " Relationship: " + person.relationship + " Smoker: " + person.smoker);
    
    listNode.name = "li";
    // appending our elements to the DOM to display
    listNode.appendChild(personNode);
    listNode.appendChild(deleteBtn);
    list.appendChild(listNode);
    hhList.push(person);
    deleteBtn.addEventListener('click', () => {
      // logic to remove the person object from the hhList array
      // and remove the created <li> node
      const arrIndex = hhList.indexOf(person);
      hhList.splice(arrIndex, 1);
      listNode.remove();
      resetForm();
    });
    //reset form after adding a new person to the house hold
    resetForm();
  } else {
    // validating that we have at least one person in the household
    alert('Please fill out the form.');
  }
};
ageOfMember.onkeyup = (event) => {
  let age = parseInt(event.target.value);
  if (age < 1 || isNaN(age)) {
    alert('Age that is > 0 is required.');
    event.target.value = "";
  }
};

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
}

checkInputs = (type) => {
  switch (type) {
    case "add":
      if (ageOfMember.value.length === 0 || relationToMember.value.length === 0) return false;
      else return true;
      break;
    default:
  }
}