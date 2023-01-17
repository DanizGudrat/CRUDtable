const tbody = document.getElementById("tbody");
const btn = document.getElementById("btn");
let allow = true;

const allowOnlyNumbers = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

const allowOnlyLetters = (e) => {
  e.target.value = e.target.value.replace(/[^a-z\s]/gi, "");
};

btn.addEventListener("click", () => {
  if (allow) {
    let tr = document.createElement("tr");
    let orderTD = document.createElement("td");
    let nameTD = document.createElement("td");
    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Name");
    nameInput.addEventListener("input", allowOnlyLetters);
    nameTD.append(nameInput);
    let surnameTD = document.createElement("td");
    let surnameInput = document.createElement("input");
    surnameInput.setAttribute("type", "text");
    surnameInput.setAttribute("placeholder", "Surname");
    surnameInput.addEventListener("input", allowOnlyLetters);
    surnameTD.append(surnameInput);
    let salaryTD = document.createElement("td");
    let salaryInput = document.createElement("input");
    salaryInput.setAttribute("type", "number");
    salaryInput.setAttribute("placeholder", "Salary");
    salaryInput.addEventListener("input", allowOnlyNumbers);
    salaryTD.append(salaryInput);
    let operationsTD = document.createElement("td");
    let cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.classList.add("cancel");
    cancelButton.addEventListener("click", deleteRow);
    let saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.classList.add("save");
    saveButton.addEventListener("click", saveData);
    operationsTD.append(cancelButton, saveButton);
    tr.append(orderTD, nameTD, surnameTD, salaryTD, operationsTD);
    tbody.append(tr);
    allow = false;
  } else {
    alert("Complete the previous one!");
  }
  makeOrder();
});
const deleteRow = (e) => {
  let check = confirm("Delete?");
  if (check) {
    e.target.closest("tr").remove();
    allow = true;
  }
  makeOrder();
};
const saveData = (e) => {
  if (checkErrors()) {
    let inputs = [...document.querySelectorAll("input")];
    inputs.map((input) => {
      input.parentElement.innerText = input.value;
    });
    allow = true;
    e.target.innerText = "Correct it";
    e.target.classList.remove("save");
    e.target.classList.add("edit");
    e.target.removeEventListener("click", saveData);
    e.target.addEventListener("click", editData);
    e.target.previousElementSibling.innerText = "Delete";
  }
};
const editData = (e) => {
  console.log(e);
  let tr = e.target.closest("tr");
  let tdler = [...tr.querySelectorAll("td:not(:first-child,:last-child)")];
  tdler.map((a) => {
    let text = a.innerText;
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", text);
 
    a.innerText = "";
    a.append(input);
  });
  e.target.innerText = "Save";
  e.target.classList.remove("edit");
  e.target.classList.add("save");
  e.target.removeEventListener("click", editData);
  e.target.addEventListener("click", saveData);
};
const makeOrder = () => {
  const rows = [...document.querySelectorAll("tbody tr")];
  rows.map((a, b) => {
    a.querySelector("td").innerText = b + 1;
  });
};
const checkErrors = () => {
  let result = true;
  let inputs = [...document.querySelectorAll("input")];
  inputs.map((a) => {
    a.classList.remove("error");
    if (a.value.length < 3) {
      result = false;
      a.classList.add("error");
    }
  });
  return result;
};